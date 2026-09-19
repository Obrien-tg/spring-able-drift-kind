-- PG Tutoring Hub schema. Per-user rows use TEXT user_id (Better Auth ids).

create table if not exists profiles (
  user_id text primary key,
  display_name text not null,
  email text,
  role text not null check (role in ('student', 'parent', 'teacher')),
  grade_level text,
  parent_email text,
  linked_student_id text,
  created_at timestamptz not null default now()
);
create index if not exists profiles_role_idx on profiles (role);
create index if not exists profiles_email_idx on profiles (email);

create table if not exists subjects (
  id serial primary key,
  slug text not null unique,
  name text not null,
  description text not null,
  blurb text not null,
  grades text not null
);

create table if not exists materials (
  id serial primary key,
  title text not null,
  description text not null,
  content text not null,
  subject_id integer not null references subjects (id),
  material_type text not null,
  difficulty text not null,
  grade_level text not null,
  estimated_minutes integer not null default 20,
  created_by text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists materials_subject_idx on materials (subject_id, is_active);

create table if not exists assignments (
  id serial primary key,
  title text not null,
  description text not null,
  instructions text not null default '',
  material_id integer references materials (id),
  due_at timestamptz,
  max_score integer not null default 100,
  created_by text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id serial primary key,
  assignment_id integer not null references assignments (id) on delete cascade,
  student_id text not null,
  content text not null,
  status text not null default 'submitted',
  score integer,
  feedback text,
  submitted_at timestamptz not null default now(),
  unique (assignment_id, student_id)
);
create index if not exists submissions_student_idx on submissions (student_id);

create table if not exists material_progress (
  student_id text not null,
  material_id integer not null references materials (id) on delete cascade,
  status text not null default 'in_progress',
  score integer,
  updated_at timestamptz not null default now(),
  primary key (student_id, material_id)
);

create table if not exists rooms (
  id serial primary key,
  name text not null,
  kind text not null default 'class',
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id serial primary key,
  room_id integer not null references rooms (id) on delete cascade,
  sender_id text not null,
  sender_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_room_idx on messages (room_id, created_at);

create table if not exists announcements (
  id serial primary key,
  title text not null,
  body text not null,
  created_by text not null,
  created_at timestamptz not null default now()
);
