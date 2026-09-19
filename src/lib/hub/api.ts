import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { asNumber, asString, mapAssignment, mapMaterial, mapProfile } from "./map";
import type {
  Announcement,
  ChatMessage,
  DashboardData,
  GradeQueueItem,
  Profile,
  Role,
  StudentSummary,
} from "./types";

const ROLES: Role[] = ["student", "parent", "teacher"];

async function loadProfile(userId: string) {
  const sql = await getSql();
  const rows = await sql<Record<string, unknown>>`
    select user_id, display_name, email, role, grade_level, parent_email, linked_student_id
    from profiles where user_id = ${userId}
  `;
  return rows[0] ? mapProfile(rows[0]) : null;
}

async function requireProfile(userId: string) {
  const profile = await loadProfile(userId);
  if (!profile) throw new Error("Complete your profile first.");
  return profile;
}

function viewerStudentId(profile: Profile) {
  if (profile.role === "student") return profile.userId;
  if (profile.role === "parent") return profile.linkedStudentId;
  return null;
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => loadProfile(context.userId));

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    displayName: string;
    role: Role;
    gradeLevel?: string;
    parentEmail?: string;
  }) => {
    const displayName = input.displayName.trim();
    if (!displayName) throw new Error("Please enter a name.");
    if (!ROLES.includes(input.role)) throw new Error("Choose a role.");
    return {
      displayName,
      role: input.role,
      gradeLevel: input.gradeLevel?.trim() || null,
      parentEmail: input.parentEmail?.trim() || null,
    };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const users = await sql<{ email: string | null }>`
      select email from "user" where id = ${context.userId}
    `;
    const email = users[0]?.email ?? null;
    await sql`
      insert into profiles (user_id, display_name, email, role, grade_level, parent_email)
      values (
        ${context.userId},
        ${data.displayName},
        ${email},
        ${data.role},
        ${data.gradeLevel},
        ${data.parentEmail}
      )
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        email = coalesce(excluded.email, profiles.email),
        role = excluded.role,
        grade_level = excluded.grade_level,
        parent_email = excluded.parent_email
    `;
    return loadProfile(context.userId);
  });

export const linkChild = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((email: string) => email.trim().toLowerCase())
  .handler(async ({ context, data: email }) => {
    if (!email) throw new Error("Enter the student’s email.");
    const profile = await requireProfile(context.userId);
    if (profile.role !== "parent") throw new Error("Only parents can link a child.");
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select user_id from profiles
      where lower(email) = ${email} and role = 'student'
    `;
    if (!rows[0]) throw new Error("No student account uses that email yet.");
    const childId = String(rows[0].user_id);
    await sql`
      update profiles set linked_student_id = ${childId} where user_id = ${context.userId}
    `;
    return loadProfile(context.userId);
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DashboardData | null> => {
    const profile = await loadProfile(context.userId);
    if (!profile) return null;
    const sql = await getSql();
    const studentId = viewerStudentId(profile);

    const announcements = (
      await sql<Record<string, unknown>>`
        select id, title, body, created_at from announcements order by created_at desc limit 5
      `
    ).map(
      (row): Announcement => ({
        id: Number(row.id),
        title: String(row.title),
        body: String(row.body),
        createdAt: asString(row.created_at) ?? "",
      }),
    );

    const recentMaterials = (
      await sql<Record<string, unknown>>`
        select m.*, s.name as subject_name, s.slug as subject_slug,
          p.status as progress_status, p.score as progress_score
        from materials m
        join subjects s on s.id = m.subject_id
        left join material_progress p
          on p.material_id = m.id and p.student_id = ${studentId ?? context.userId}
        where m.is_active = true
        order by m.id desc
        limit 4
      `
    ).map(mapMaterial);

    const upcoming = studentId
      ? (
          await sql<Record<string, unknown>>`
            select a.*, m.title as material_title,
              sub.status as submission_status, sub.score as submission_score,
              sub.content as submission_content, sub.feedback
            from assignments a
            left join materials m on m.id = a.material_id
            left join submissions sub
              on sub.assignment_id = a.id and sub.student_id = ${studentId}
            where a.is_active = true
            order by a.due_at nulls last
            limit 5
          `
        ).map(mapAssignment)
      : (
          await sql<Record<string, unknown>>`
            select a.*, m.title as material_title,
              null as submission_status, null as submission_score,
              null as submission_content, null as feedback
            from assignments a
            left join materials m on m.id = a.material_id
            where a.is_active = true
            order by a.due_at nulls last
            limit 5
          `
        ).map(mapAssignment);

    const materialCount = (
      await sql<{ n: number }>`select count(*)::int as n from materials where is_active = true`
    )[0]?.n ?? 0;
    const assignmentCount = (
      await sql<{ n: number }>`select count(*)::int as n from assignments where is_active = true`
    )[0]?.n ?? 0;

    let completed = 0;
    let averageScore: number | null = null;
    if (studentId) {
      completed =
        (
          await sql<{ n: number }>`
            select count(*)::int as n from submissions
            where student_id = ${studentId} and status in ('submitted', 'graded')
          `
        )[0]?.n ?? 0;
      const avg = (
        await sql<{ avg: number | null }>`
          select round(avg(score))::int as avg from submissions
          where student_id = ${studentId} and score is not null
        `
      )[0]?.avg;
      averageScore = avg ?? null;
    }

    let students: StudentSummary[] = [];
    let gradeQueue: GradeQueueItem[] = [];
    if (profile.role === "teacher") {
      students = (
        await sql<Record<string, unknown>>`
          select p.user_id, p.display_name, p.grade_level,
            (select count(*)::int from submissions s where s.student_id = p.user_id) as completed,
            (select count(*)::int from assignments a where a.is_active = true) as assigned
          from profiles p
          where p.role = 'student'
          order by p.display_name
        `
      ).map((row) => ({
        userId: String(row.user_id),
        displayName: String(row.display_name),
        gradeLevel: asString(row.grade_level),
        completed: Number(row.completed ?? 0),
        assigned: Number(row.assigned ?? 0),
      }));
      gradeQueue = (
        await sql<Record<string, unknown>>`
          select sub.id, a.title as assignment_title, p.display_name as student_name,
            sub.content, sub.submitted_at
          from submissions sub
          join assignments a on a.id = sub.assignment_id
          join profiles p on p.user_id = sub.student_id
          where sub.status = 'submitted'
          order by sub.submitted_at asc
          limit 8
        `
      ).map((row) => ({
        submissionId: Number(row.id),
        assignmentTitle: String(row.assignment_title),
        studentName: String(row.student_name),
        content: String(row.content),
        submittedAt: asString(row.submitted_at) ?? "",
      }));
    }

    let childName: string | null = null;
    if (profile.role === "parent" && profile.linkedStudentId) {
      const child = await loadProfile(profile.linkedStudentId);
      childName = child?.displayName ?? null;
    }

    return {
      profile,
      announcements,
      stats: {
        materials: materialCount,
        assignments: assignmentCount,
        completed,
        averageScore,
      },
      upcoming,
      recentMaterials,
      students,
      gradeQueue,
      childName,
    };
  });

export const listSubjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: number;
      slug: string;
      name: string;
      description: string;
      blurb: string;
      grades: string;
    }>`select id, slug, name, description, blurb, grades from subjects order by id`;
  });

export const listMaterials = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await loadProfile(context.userId);
    const studentId = profile ? viewerStudentId(profile) : context.userId;
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select m.*, s.name as subject_name, s.slug as subject_slug,
        p.status as progress_status, p.score as progress_score
      from materials m
      join subjects s on s.id = m.subject_id
      left join material_progress p
        on p.material_id = m.id and p.student_id = ${studentId ?? context.userId}
      where m.is_active = true
      order by s.name, m.title
    `;
    return rows.map(mapMaterial);
  });

export const getMaterial = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => id)
  .handler(async ({ context, data: id }) => {
    const profile = await loadProfile(context.userId);
    const studentId = profile ? viewerStudentId(profile) : context.userId;
    const sql = await getSql();
    const rows = await sql<Record<string, unknown>>`
      select m.*, s.name as subject_name, s.slug as subject_slug,
        p.status as progress_status, p.score as progress_score
      from materials m
      join subjects s on s.id = m.subject_id
      left join material_progress p
        on p.material_id = m.id and p.student_id = ${studentId ?? context.userId}
      where m.id = ${id} and m.is_active = true
    `;
    return rows[0] ? mapMaterial(rows[0]) : null;
  });

export const markMaterialDone = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { materialId: number; score?: number }) => input)
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "student") throw new Error("Students mark their own lessons.");
    const sql = await getSql();
    await sql`
      insert into material_progress (student_id, material_id, status, score, updated_at)
      values (${context.userId}, ${data.materialId}, 'completed', ${data.score ?? null}, now())
      on conflict (student_id, material_id) do update set
        status = 'completed',
        score = coalesce(excluded.score, material_progress.score),
        updated_at = now()
    `;
    return { ok: true };
  });

export const savePracticeScore = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { materialTitle: string; score: number }) => input)
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "student") return { ok: true };
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      select id from materials where title = ${data.materialTitle} limit 1
    `;
    if (!rows[0]) return { ok: true };
    await sql`
      insert into material_progress (student_id, material_id, status, score, updated_at)
      values (${context.userId}, ${rows[0].id}, 'completed', ${data.score}, now())
      on conflict (student_id, material_id) do update set
        status = 'completed', score = excluded.score, updated_at = now()
    `;
    return { ok: true };
  });

export const createMaterial = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    title: string;
    description: string;
    content: string;
    subjectId: number;
    materialType: string;
    difficulty: string;
    gradeLevel: string;
    estimatedMinutes: number;
  }) => {
    if (!input.title.trim() || !input.content.trim()) {
      throw new Error("Title and lesson text are required.");
    }
    return input;
  })
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "teacher") throw new Error("Only the teacher can add lessons.");
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into materials (
        title, description, content, subject_id, material_type, difficulty,
        grade_level, estimated_minutes, created_by
      ) values (
        ${data.title.trim()}, ${data.description.trim()}, ${data.content.trim()},
        ${data.subjectId}, ${data.materialType}, ${data.difficulty},
        ${data.gradeLevel}, ${data.estimatedMinutes}, ${context.userId}
      ) returning id
    `;
    return { id: rows[0].id };
  });

export const listAssignments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await requireProfile(context.userId);
    const studentId = viewerStudentId(profile);
    const sql = await getSql();
    if (!studentId) {
      const rows = await sql<Record<string, unknown>>`
        select a.*, m.title as material_title,
          null as submission_status, null as submission_score,
          null as submission_content, null as feedback
        from assignments a
        left join materials m on m.id = a.material_id
        where a.is_active = true
        order by a.due_at nulls last, a.id desc
      `;
      return rows.map(mapAssignment);
    }
    const rows = await sql<Record<string, unknown>>`
      select a.*, m.title as material_title,
        sub.status as submission_status, sub.score as submission_score,
        sub.content as submission_content, sub.feedback
      from assignments a
      left join materials m on m.id = a.material_id
      left join submissions sub
        on sub.assignment_id = a.id and sub.student_id = ${studentId}
      where a.is_active = true
      order by a.due_at nulls last, a.id desc
    `;
    return rows.map(mapAssignment);
  });

export const submitAssignment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { assignmentId: number; content: string }) => {
    const content = input.content.trim();
    if (!content) throw new Error("Write your answer before sending.");
    return { assignmentId: input.assignmentId, content };
  })
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "student") throw new Error("Students submit their own work.");
    const sql = await getSql();
    await sql`
      insert into submissions (assignment_id, student_id, content, status, submitted_at)
      values (${data.assignmentId}, ${context.userId}, ${data.content}, 'submitted', now())
      on conflict (assignment_id, student_id) do update set
        content = excluded.content, status = 'submitted',
        score = null, feedback = null, submitted_at = now()
    `;
    return { ok: true };
  });

export const createAssignment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    title: string;
    description: string;
    instructions: string;
    materialId?: number | null;
    dueAt?: string | null;
  }) => {
    if (!input.title.trim()) throw new Error("Give the assignment a title.");
    return input;
  })
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "teacher") throw new Error("Only the teacher can assign work.");
    const sql = await getSql();
    await sql`
      insert into assignments (title, description, instructions, material_id, due_at, created_by)
      values (
        ${data.title.trim()}, ${data.description.trim()}, ${data.instructions.trim()},
        ${data.materialId ?? null}, ${data.dueAt || null}, ${context.userId}
      )
    `;
    return { ok: true };
  });

export const gradeSubmission = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { submissionId: number; score: number; feedback: string }) => input)
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "teacher") throw new Error("Only the teacher can grade.");
    const score = Math.max(0, Math.min(100, Math.round(data.score)));
    const sql = await getSql();
    await sql`
      update submissions
      set score = ${score}, feedback = ${data.feedback.trim()}, status = 'graded'
      where id = ${data.submissionId}
    `;
    return { ok: true };
  });

export const listProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await requireProfile(context.userId);
    const studentId = viewerStudentId(profile) ?? (profile.role === "teacher" ? null : profile.userId);
    const sql = await getSql();
    if (!studentId) {
      return {
        profile,
        items: [] as ReturnType<typeof mapMaterial>[],
        assignments: [] as ReturnType<typeof mapAssignment>[],
      };
    }
    const items = (
      await sql<Record<string, unknown>>`
        select m.*, s.name as subject_name, s.slug as subject_slug,
          p.status as progress_status, p.score as progress_score
        from materials m
        join subjects s on s.id = m.subject_id
        left join material_progress p
          on p.material_id = m.id and p.student_id = ${studentId}
        where m.is_active = true
        order by s.name, m.title
      `
    ).map(mapMaterial);
    const assignments = (
      await sql<Record<string, unknown>>`
        select a.*, m.title as material_title,
          sub.status as submission_status, sub.score as submission_score,
          sub.content as submission_content, sub.feedback
        from assignments a
        left join materials m on m.id = a.material_id
        left join submissions sub
          on sub.assignment_id = a.id and sub.student_id = ${studentId}
        where a.is_active = true
        order by a.due_at nulls last
      `
    ).map(mapAssignment);
    return { profile, items, assignments };
  });

export const listMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireProfile(context.userId);
    const sql = await getSql();
    const room = (
      await sql<{ id: number }>`select id from rooms where kind = 'class' order by id limit 1`
    )[0];
    if (!room) return [] as ChatMessage[];
    const rows = await sql<Record<string, unknown>>`
      select id, sender_id, sender_name, content, created_at
      from messages where room_id = ${room.id}
      order by created_at asc
      limit 80
    `;
    return rows.map(
      (row): ChatMessage => ({
        id: Number(row.id),
        senderId: String(row.sender_id),
        senderName: String(row.sender_name),
        content: String(row.content),
        createdAt: asString(row.created_at) ?? "",
        mine: String(row.sender_id) === context.userId,
      }),
    );
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((content: string) => content.trim())
  .handler(async ({ context, data: content }) => {
    if (!content) throw new Error("Type a message first.");
    const profile = await requireProfile(context.userId);
    const sql = await getSql();
    const room = (
      await sql<{ id: number }>`select id from rooms where kind = 'class' order by id limit 1`
    )[0];
    if (!room) throw new Error("Lounge is not ready yet.");
    await sql`
      insert into messages (room_id, sender_id, sender_name, content)
      values (${room.id}, ${context.userId}, ${profile.displayName}, ${content})
    `;
    return { ok: true };
  });

export const createAnnouncement = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title: string; body: string }) => {
    if (!input.title.trim() || !input.body.trim()) throw new Error("Title and note are required.");
    return { title: input.title.trim(), body: input.body.trim() };
  })
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.role !== "teacher") throw new Error("Only the teacher can announce.");
    const sql = await getSql();
    await sql`
      insert into announcements (title, body, created_by)
      values (${data.title}, ${data.body}, ${context.userId})
    `;
    return { ok: true };
  });

export { asNumber, asString };
