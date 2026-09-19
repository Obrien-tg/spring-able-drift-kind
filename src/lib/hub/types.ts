export type Role = "student" | "parent" | "teacher";

export type Profile = {
  userId: string;
  displayName: string;
  email: string | null;
  role: Role;
  gradeLevel: string | null;
  parentEmail: string | null;
  linkedStudentId: string | null;
};

export type Subject = {
  id: number;
  slug: string;
  name: string;
  description: string;
  blurb: string;
  grades: string;
};

export type Material = {
  id: number;
  title: string;
  description: string;
  content: string;
  subjectId: number;
  subjectName: string;
  subjectSlug: string;
  materialType: string;
  difficulty: string;
  gradeLevel: string;
  estimatedMinutes: number;
  progressStatus: string | null;
  progressScore: number | null;
};

export type AssignmentRow = {
  id: number;
  title: string;
  description: string;
  instructions: string;
  materialId: number | null;
  materialTitle: string | null;
  dueAt: string | null;
  maxScore: number;
  submissionStatus: string | null;
  submissionScore: number | null;
  submissionContent: string | null;
  feedback: string | null;
};

export type Announcement = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};

export type ChatMessage = {
  id: number;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  mine: boolean;
};

export type StudentSummary = {
  userId: string;
  displayName: string;
  gradeLevel: string | null;
  completed: number;
  assigned: number;
};

export type GradeQueueItem = {
  submissionId: number;
  assignmentTitle: string;
  studentName: string;
  content: string;
  submittedAt: string;
};

export type DashboardData = {
  profile: Profile;
  announcements: Announcement[];
  stats: {
    materials: number;
    assignments: number;
    completed: number;
    averageScore: number | null;
  };
  upcoming: AssignmentRow[];
  recentMaterials: Material[];
  students: StudentSummary[];
  gradeQueue: GradeQueueItem[];
  childName: string | null;
};
