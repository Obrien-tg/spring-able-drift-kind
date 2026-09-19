import type { AssignmentRow, Material, Profile } from "./types";

export function asString(value: unknown) {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function asNumber(value: unknown) {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function mapProfile(row: Record<string, unknown>): Profile {
  return {
    userId: String(row.user_id),
    displayName: String(row.display_name),
    email: asString(row.email),
    role: row.role as Profile["role"],
    gradeLevel: asString(row.grade_level),
    parentEmail: asString(row.parent_email),
    linkedStudentId: asString(row.linked_student_id),
  };
}

export function mapMaterial(row: Record<string, unknown>): Material {
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
    progressScore: asNumber(row.progress_score),
  };
}

export function mapAssignment(row: Record<string, unknown>): AssignmentRow {
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
    feedback: asString(row.feedback),
  };
}
