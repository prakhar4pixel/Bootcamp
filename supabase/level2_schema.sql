-- Level 2 read model used by the Lovable-compatible portal.
-- The app only SELECTs from these tables; ingestion remains in the supplied
-- staging/normalisation scripts under data/level 2/.

create table if not exists public.company_json (
  company_id integer primary key,
  short_json jsonb not null default '{}'::jsonb,
  full_json jsonb not null default '{}'::jsonb
);

create table if not exists public.skill_set_master (
  skill_set_id integer primary key,
  skill_set_name text not null,
  short_name text not null,
  skill_set_description text
);

create table if not exists public.proficiency_levels (
  proficiency_level_id integer primary key,
  proficiency_name text not null,
  proficiency_code text not null,
  proficiency_description text
);

create table if not exists public.skill_set_topics (
  topic_id bigserial primary key,
  skill_set_id integer not null references public.skill_set_master(skill_set_id),
  level_number integer not null check (level_number between 1 and 10),
  topics text not null,
  created_at timestamptz not null default now(),
  unique (skill_set_id, level_number, topics)
);

create table if not exists public.company_skill_levels (
  id bigserial primary key,
  company_id integer not null references public.company_json(company_id),
  skill_set_id integer not null references public.skill_set_master(skill_set_id),
  required_level integer not null check (required_level between 1 and 10),
  required_proficiency_level_id integer not null references public.proficiency_levels(proficiency_level_id),
  created_at timestamptz not null default now(),
  unique (company_id, skill_set_id)
);

alter table public.company_json enable row level security;
alter table public.skill_set_master enable row level security;
alter table public.proficiency_levels enable row level security;
alter table public.skill_set_topics enable row level security;
alter table public.company_skill_levels enable row level security;

create policy "public can read company json" on public.company_json for select using (true);
create policy "public can read skill sets" on public.skill_set_master for select using (true);
create policy "public can read proficiency levels" on public.proficiency_levels for select using (true);
create policy "public can read skill topics" on public.skill_set_topics for select using (true);
create policy "public can read company skills" on public.company_skill_levels for select using (true);
