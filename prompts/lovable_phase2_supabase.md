# Lovable follow-up: connect the existing portal to Supabase

Paste this into the existing Lovable project after importing this repository. Do not regenerate the UI.

```text
Connect the existing Placement Intelligence Hub to my Supabase project.

This is a read-only integration. Preserve the current routes, layout, styling, localStorage selection behavior, and public/no-login experience.

Use these environment variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Company data:
- Company list: SELECT company_id, short_json FROM public.company_json ORDER BY company_id
- Company detail: SELECT company_id, short_json, full_json FROM public.company_json WHERE company_id = :id
- Do not query companies, company_business, company_culture, or any other normalized company table.

Skill data:
- Read from public.company_skill_levels, public.skill_set_master, public.proficiency_levels, and public.skill_set_topics.
- Join only those four skill tables.
- Use required_level for the score and required_proficiency_level_id for the proficiency label.
- Order skill_set_topics by level_number and build the 10-level roadmap.

Implementation requirements:
1. Keep src/lib/companyData.ts as the normalization boundary.
2. Keep src/lib/companyApi.ts as the React Query data-access layer.
3. Keep the local seed fallback when either Supabase environment variable is empty.
4. Add loading skeletons and retryable error states to all Supabase-backed pages.
5. Do not add login, auth, protected routes, inserts, updates, deletes, migrations, edge functions, or admin UI.
6. Never display CTC, Stipend, or Selection Ratio.
7. Do not change the current route contract:
   - /
   - /company/intelligence
   - /company/skills
8. After wiring, verify company cards come from company_json.short_json and company details come from company_json.full_json.
9. Run npm install and npm run build.
```

In Lovable, add the two environment values through the project’s Supabase/environment settings. Do not paste the anon key into source files or prompts.
