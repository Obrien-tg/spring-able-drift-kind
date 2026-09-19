import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-DC3rii9z.mjs";
import { t as authMiddleware } from "./middleware-3dweTO4C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CVH2nIGc.js
function asString(value) {
	if (value == null) return null;
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
function asNumber(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}
function mapProfile(row) {
	return {
		userId: String(row.user_id),
		displayName: String(row.display_name),
		email: asString(row.email),
		role: row.role,
		gradeLevel: asString(row.grade_level),
		parentEmail: asString(row.parent_email),
		linkedStudentId: asString(row.linked_student_id)
	};
}
function mapMaterial(row) {
	return {
		id: Number(row.id),
		title: String(row.title),
		description: String(row.description),
		content: String(row.content ?? ""),
		subjectId: Number(row.subject_id),
		subjectName: String(row.subject_name ?? ""),
		subjectSlug: String(row.subject_slug ?? ""),
		materialType: String(row.material_type),
		difficulty: String(row.difficulty),
		gradeLevel: String(row.grade_level),
		estimatedMinutes: Number(row.estimated_minutes ?? 20),
		progressStatus: asString(row.progress_status),
		progressScore: asNumber(row.progress_score)
	};
}
function mapAssignment(row) {
	return {
		id: Number(row.id),
		title: String(row.title),
		description: String(row.description),
		instructions: String(row.instructions ?? ""),
		materialId: asNumber(row.material_id),
		materialTitle: asString(row.material_title),
		dueAt: asString(row.due_at),
		maxScore: Number(row.max_score ?? 100),
		submissionStatus: asString(row.submission_status),
		submissionScore: asNumber(row.submission_score),
		submissionContent: asString(row.submission_content),
		feedback: asString(row.feedback)
	};
}
var ROLES = [
	"student",
	"parent",
	"teacher"
];
async function loadProfile(userId) {
	const rows = await (await getSql())`
    select user_id, display_name, email, role, grade_level, parent_email, linked_student_id
    from profiles where user_id = ${userId}
  `;
	return rows[0] ? mapProfile(rows[0]) : null;
}
async function requireProfile(userId) {
	const profile = await loadProfile(userId);
	if (!profile) throw new Error("Complete your profile first.");
	return profile;
}
function viewerStudentId(profile) {
	if (profile.role === "student") return profile.userId;
	if (profile.role === "parent") return profile.linkedStudentId;
	return null;
}
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "d5ad90f07208e023088bf312bd24cd7a47718f23a90d37a1fe01eb1a5338dd7b",
	name: "getMyProfile",
	filename: "src/lib/hub/api.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => loadProfile(context.userId));
var saveProfile_createServerFn_handler = createServerRpc({
	id: "fe4add55e62c4772ab7b87041d98bf121938732ec0647112da8a786637c2a3df",
	name: "saveProfile",
	filename: "src/lib/hub/api.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const displayName = input.displayName.trim();
	if (!displayName) throw new Error("Please enter a name.");
	if (!ROLES.includes(input.role)) throw new Error("Choose a role.");
	return {
		displayName,
		role: input.role,
		gradeLevel: input.gradeLevel?.trim() || null,
		parentEmail: input.parentEmail?.trim() || null
	};
}).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const email = (await sql`
      select email from "user" where id = ${context.userId}
    `)[0]?.email ?? null;
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
var linkChild_createServerFn_handler = createServerRpc({
	id: "1c029567216947b68bc429b327d2cb1e8d2c27a1ff594c8057aa49a1b549f15f",
	name: "linkChild",
	filename: "src/lib/hub/api.ts"
}, (opts) => linkChild.__executeServer(opts));
var linkChild = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((email) => email.trim().toLowerCase()).handler(linkChild_createServerFn_handler, async ({ context, data: email }) => {
	if (!email) throw new Error("Enter the student’s email.");
	if ((await requireProfile(context.userId)).role !== "parent") throw new Error("Only parents can link a child.");
	const sql = await getSql();
	const rows = await sql`
      select user_id from profiles
      where lower(email) = ${email} and role = 'student'
    `;
	if (!rows[0]) throw new Error("No student account uses that email yet.");
	await sql`
      update profiles set linked_student_id = ${String(rows[0].user_id)} where user_id = ${context.userId}
    `;
	return loadProfile(context.userId);
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "fe4d972369369c3ea04b441420cf33af98c7f1315634383a5287c95968470003",
	name: "getDashboard",
	filename: "src/lib/hub/api.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const profile = await loadProfile(context.userId);
	if (!profile) return null;
	const sql = await getSql();
	const studentId = viewerStudentId(profile);
	const announcements = (await sql`
        select id, title, body, created_at from announcements order by created_at desc limit 5
      `).map((row) => ({
		id: Number(row.id),
		title: String(row.title),
		body: String(row.body),
		createdAt: asString(row.created_at) ?? ""
	}));
	const recentMaterials = (await sql`
        select m.*, s.name as subject_name, s.slug as subject_slug,
          p.status as progress_status, p.score as progress_score
        from materials m
        join subjects s on s.id = m.subject_id
        left join material_progress p
          on p.material_id = m.id and p.student_id = ${studentId ?? context.userId}
        where m.is_active = true
        order by m.id desc
        limit 4
      `).map(mapMaterial);
	const upcoming = studentId ? (await sql`
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
          `).map(mapAssignment) : (await sql`
            select a.*, m.title as material_title,
              null as submission_status, null as submission_score,
              null as submission_content, null as feedback
            from assignments a
            left join materials m on m.id = a.material_id
            where a.is_active = true
            order by a.due_at nulls last
            limit 5
          `).map(mapAssignment);
	const materialCount = (await sql`select count(*)::int as n from materials where is_active = true`)[0]?.n ?? 0;
	const assignmentCount = (await sql`select count(*)::int as n from assignments where is_active = true`)[0]?.n ?? 0;
	let completed = 0;
	let averageScore = null;
	if (studentId) {
		completed = (await sql`
            select count(*)::int as n from submissions
            where student_id = ${studentId} and status in ('submitted', 'graded')
          `)[0]?.n ?? 0;
		averageScore = (await sql`
          select round(avg(score))::int as avg from submissions
          where student_id = ${studentId} and score is not null
        `)[0]?.avg ?? null;
	}
	let students = [];
	let gradeQueue = [];
	if (profile.role === "teacher") {
		students = (await sql`
          select p.user_id, p.display_name, p.grade_level,
            (select count(*)::int from submissions s where s.student_id = p.user_id) as completed,
            (select count(*)::int from assignments a where a.is_active = true) as assigned
          from profiles p
          where p.role = 'student'
          order by p.display_name
        `).map((row) => ({
			userId: String(row.user_id),
			displayName: String(row.display_name),
			gradeLevel: asString(row.grade_level),
			completed: Number(row.completed ?? 0),
			assigned: Number(row.assigned ?? 0)
		}));
		gradeQueue = (await sql`
          select sub.id, a.title as assignment_title, p.display_name as student_name,
            sub.content, sub.submitted_at
          from submissions sub
          join assignments a on a.id = sub.assignment_id
          join profiles p on p.user_id = sub.student_id
          where sub.status = 'submitted'
          order by sub.submitted_at asc
          limit 8
        `).map((row) => ({
			submissionId: Number(row.id),
			assignmentTitle: String(row.assignment_title),
			studentName: String(row.student_name),
			content: String(row.content),
			submittedAt: asString(row.submitted_at) ?? ""
		}));
	}
	let childName = null;
	if (profile.role === "parent" && profile.linkedStudentId) childName = (await loadProfile(profile.linkedStudentId))?.displayName ?? null;
	return {
		profile,
		announcements,
		stats: {
			materials: materialCount,
			assignments: assignmentCount,
			completed,
			averageScore
		},
		upcoming,
		recentMaterials,
		students,
		gradeQueue,
		childName
	};
});
var listSubjects_createServerFn_handler = createServerRpc({
	id: "1b7a1714eaea063e4f32a3ec0bd91ba64abad0de35ee41d3444060aecf0c93a9",
	name: "listSubjects",
	filename: "src/lib/hub/api.ts"
}, (opts) => listSubjects.__executeServer(opts));
var listSubjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSubjects_createServerFn_handler, async () => {
	return (await getSql())`select id, slug, name, description, blurb, grades from subjects order by id`;
});
var listMaterials_createServerFn_handler = createServerRpc({
	id: "e3f72aa846ad7232b9d5e7f38c4700c5b928d77a9b6049119025d897ba3fa01f",
	name: "listMaterials",
	filename: "src/lib/hub/api.ts"
}, (opts) => listMaterials.__executeServer(opts));
var listMaterials = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMaterials_createServerFn_handler, async ({ context }) => {
	const profile = await loadProfile(context.userId);
	const studentId = profile ? viewerStudentId(profile) : context.userId;
	return (await (await getSql())`
      select m.*, s.name as subject_name, s.slug as subject_slug,
        p.status as progress_status, p.score as progress_score
      from materials m
      join subjects s on s.id = m.subject_id
      left join material_progress p
        on p.material_id = m.id and p.student_id = ${studentId ?? context.userId}
      where m.is_active = true
      order by s.name, m.title
    `).map(mapMaterial);
});
var getMaterial_createServerFn_handler = createServerRpc({
	id: "d6b46511569c370c6fc88c46e51dd8e3554de8c808ec173ac9db849e053492e9",
	name: "getMaterial",
	filename: "src/lib/hub/api.ts"
}, (opts) => getMaterial.__executeServer(opts));
var getMaterial = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getMaterial_createServerFn_handler, async ({ context, data: id }) => {
	const profile = await loadProfile(context.userId);
	const studentId = profile ? viewerStudentId(profile) : context.userId;
	const rows = await (await getSql())`
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
var markMaterialDone_createServerFn_handler = createServerRpc({
	id: "ff34da0a0a060bed067fd996d7b71b330e9b69a66e0dac721dfa71200d9e3f04",
	name: "markMaterialDone",
	filename: "src/lib/hub/api.ts"
}, (opts) => markMaterialDone.__executeServer(opts));
var markMaterialDone = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(markMaterialDone_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "student") throw new Error("Students mark their own lessons.");
	await (await getSql())`
      insert into material_progress (student_id, material_id, status, score, updated_at)
      values (${context.userId}, ${data.materialId}, 'completed', ${data.score ?? null}, now())
      on conflict (student_id, material_id) do update set
        status = 'completed',
        score = coalesce(excluded.score, material_progress.score),
        updated_at = now()
    `;
	return { ok: true };
});
var savePracticeScore_createServerFn_handler = createServerRpc({
	id: "88e5b0daed7d135a95f29a8e6c721361008a0dcd91cb954efa32acd8436c8251",
	name: "savePracticeScore",
	filename: "src/lib/hub/api.ts"
}, (opts) => savePracticeScore.__executeServer(opts));
var savePracticeScore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(savePracticeScore_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "student") return { ok: true };
	const sql = await getSql();
	const rows = await sql`
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
var createMaterial_createServerFn_handler = createServerRpc({
	id: "17d5fa970a12fa2f58ade8d8dc70dd9acba1bd39dbf315c97c4a7fdd27c46b68",
	name: "createMaterial",
	filename: "src/lib/hub/api.ts"
}, (opts) => createMaterial.__executeServer(opts));
var createMaterial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim() || !input.content.trim()) throw new Error("Title and lesson text are required.");
	return input;
}).handler(createMaterial_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "teacher") throw new Error("Only the teacher can add lessons.");
	return { id: (await (await getSql())`
      insert into materials (
        title, description, content, subject_id, material_type, difficulty,
        grade_level, estimated_minutes, created_by
      ) values (
        ${data.title.trim()}, ${data.description.trim()}, ${data.content.trim()},
        ${data.subjectId}, ${data.materialType}, ${data.difficulty},
        ${data.gradeLevel}, ${data.estimatedMinutes}, ${context.userId}
      ) returning id
    `)[0].id };
});
var listAssignments_createServerFn_handler = createServerRpc({
	id: "3e967f10f73add1469d33f7ca7194cba06f86633cf2b6cca7682b974e5807014",
	name: "listAssignments",
	filename: "src/lib/hub/api.ts"
}, (opts) => listAssignments.__executeServer(opts));
var listAssignments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAssignments_createServerFn_handler, async ({ context }) => {
	const studentId = viewerStudentId(await requireProfile(context.userId));
	const sql = await getSql();
	if (!studentId) return (await sql`
        select a.*, m.title as material_title,
          null as submission_status, null as submission_score,
          null as submission_content, null as feedback
        from assignments a
        left join materials m on m.id = a.material_id
        where a.is_active = true
        order by a.due_at nulls last, a.id desc
      `).map(mapAssignment);
	return (await sql`
      select a.*, m.title as material_title,
        sub.status as submission_status, sub.score as submission_score,
        sub.content as submission_content, sub.feedback
      from assignments a
      left join materials m on m.id = a.material_id
      left join submissions sub
        on sub.assignment_id = a.id and sub.student_id = ${studentId}
      where a.is_active = true
      order by a.due_at nulls last, a.id desc
    `).map(mapAssignment);
});
var submitAssignment_createServerFn_handler = createServerRpc({
	id: "a02569e3c5d8605f48566bdaf175b7affadc4c7e87d272a088864233ecaaa41d",
	name: "submitAssignment",
	filename: "src/lib/hub/api.ts"
}, (opts) => submitAssignment.__executeServer(opts));
var submitAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const content = input.content.trim();
	if (!content) throw new Error("Write your answer before sending.");
	return {
		assignmentId: input.assignmentId,
		content
	};
}).handler(submitAssignment_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "student") throw new Error("Students submit their own work.");
	await (await getSql())`
      insert into submissions (assignment_id, student_id, content, status, submitted_at)
      values (${data.assignmentId}, ${context.userId}, ${data.content}, 'submitted', now())
      on conflict (assignment_id, student_id) do update set
        content = excluded.content, status = 'submitted',
        score = null, feedback = null, submitted_at = now()
    `;
	return { ok: true };
});
var createAssignment_createServerFn_handler = createServerRpc({
	id: "c71ef3d345019e38c9a7051e18ecae7815f92152fa1f51e957fafe7afb1fe576",
	name: "createAssignment",
	filename: "src/lib/hub/api.ts"
}, (opts) => createAssignment.__executeServer(opts));
var createAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim()) throw new Error("Give the assignment a title.");
	return input;
}).handler(createAssignment_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "teacher") throw new Error("Only the teacher can assign work.");
	await (await getSql())`
      insert into assignments (title, description, instructions, material_id, due_at, created_by)
      values (
        ${data.title.trim()}, ${data.description.trim()}, ${data.instructions.trim()},
        ${data.materialId ?? null}, ${data.dueAt || null}, ${context.userId}
      )
    `;
	return { ok: true };
});
var gradeSubmission_createServerFn_handler = createServerRpc({
	id: "aa912b56084e91fd518592814d47bdabb1cc3b98d2d79e4c6760c8be296bae91",
	name: "gradeSubmission",
	filename: "src/lib/hub/api.ts"
}, (opts) => gradeSubmission.__executeServer(opts));
var gradeSubmission = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(gradeSubmission_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "teacher") throw new Error("Only the teacher can grade.");
	const score = Math.max(0, Math.min(100, Math.round(data.score)));
	await (await getSql())`
      update submissions
      set score = ${score}, feedback = ${data.feedback.trim()}, status = 'graded'
      where id = ${data.submissionId}
    `;
	return { ok: true };
});
var listProgress_createServerFn_handler = createServerRpc({
	id: "ecddf596387b6f18bbe75d5cb8b7079374cdb70751c1cc177ca1821d31ff8dba",
	name: "listProgress",
	filename: "src/lib/hub/api.ts"
}, (opts) => listProgress.__executeServer(opts));
var listProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listProgress_createServerFn_handler, async ({ context }) => {
	const profile = await requireProfile(context.userId);
	const studentId = viewerStudentId(profile) ?? (profile.role === "teacher" ? null : profile.userId);
	const sql = await getSql();
	if (!studentId) return {
		profile,
		items: [],
		assignments: []
	};
	return {
		profile,
		items: (await sql`
        select m.*, s.name as subject_name, s.slug as subject_slug,
          p.status as progress_status, p.score as progress_score
        from materials m
        join subjects s on s.id = m.subject_id
        left join material_progress p
          on p.material_id = m.id and p.student_id = ${studentId}
        where m.is_active = true
        order by s.name, m.title
      `).map(mapMaterial),
		assignments: (await sql`
        select a.*, m.title as material_title,
          sub.status as submission_status, sub.score as submission_score,
          sub.content as submission_content, sub.feedback
        from assignments a
        left join materials m on m.id = a.material_id
        left join submissions sub
          on sub.assignment_id = a.id and sub.student_id = ${studentId}
        where a.is_active = true
        order by a.due_at nulls last
      `).map(mapAssignment)
	};
});
var listMessages_createServerFn_handler = createServerRpc({
	id: "e263cd93ed8a1f7ca675d2d66a0a4d24536703805ed90f21763a0a363e70b5f5",
	name: "listMessages",
	filename: "src/lib/hub/api.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMessages_createServerFn_handler, async ({ context }) => {
	await requireProfile(context.userId);
	const sql = await getSql();
	const room = (await sql`select id from rooms where kind = 'class' order by id limit 1`)[0];
	if (!room) return [];
	return (await sql`
      select id, sender_id, sender_name, content, created_at
      from messages where room_id = ${room.id}
      order by created_at asc
      limit 80
    `).map((row) => ({
		id: Number(row.id),
		senderId: String(row.sender_id),
		senderName: String(row.sender_name),
		content: String(row.content),
		createdAt: asString(row.created_at) ?? "",
		mine: String(row.sender_id) === context.userId
	}));
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "61e735748bf908063950956c6d8cfbafe998782839d9f65c3f300f1164868bd0",
	name: "sendMessage",
	filename: "src/lib/hub/api.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((content) => content.trim()).handler(sendMessage_createServerFn_handler, async ({ context, data: content }) => {
	if (!content) throw new Error("Type a message first.");
	const profile = await requireProfile(context.userId);
	const sql = await getSql();
	const room = (await sql`select id from rooms where kind = 'class' order by id limit 1`)[0];
	if (!room) throw new Error("Lounge is not ready yet.");
	await sql`
      insert into messages (room_id, sender_id, sender_name, content)
      values (${room.id}, ${context.userId}, ${profile.displayName}, ${content})
    `;
	return { ok: true };
});
var createAnnouncement_createServerFn_handler = createServerRpc({
	id: "3bac98e5741efce1f3f67838d8bdae87c7abb5ef071fea5c8f05809191db2a73",
	name: "createAnnouncement",
	filename: "src/lib/hub/api.ts"
}, (opts) => createAnnouncement.__executeServer(opts));
var createAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim() || !input.body.trim()) throw new Error("Title and note are required.");
	return {
		title: input.title.trim(),
		body: input.body.trim()
	};
}).handler(createAnnouncement_createServerFn_handler, async ({ context, data }) => {
	if ((await requireProfile(context.userId)).role !== "teacher") throw new Error("Only the teacher can announce.");
	await (await getSql())`
      insert into announcements (title, body, created_by)
      values (${data.title}, ${data.body}, ${context.userId})
    `;
	return { ok: true };
});
//#endregion
export { createAnnouncement_createServerFn_handler, createAssignment_createServerFn_handler, createMaterial_createServerFn_handler, getDashboard_createServerFn_handler, getMaterial_createServerFn_handler, getMyProfile_createServerFn_handler, gradeSubmission_createServerFn_handler, linkChild_createServerFn_handler, listAssignments_createServerFn_handler, listMaterials_createServerFn_handler, listMessages_createServerFn_handler, listProgress_createServerFn_handler, listSubjects_createServerFn_handler, markMaterialDone_createServerFn_handler, savePracticeScore_createServerFn_handler, saveProfile_createServerFn_handler, sendMessage_createServerFn_handler, submitAssignment_createServerFn_handler };
