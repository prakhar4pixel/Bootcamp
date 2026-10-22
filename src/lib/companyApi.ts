import { useQuery } from "@tanstack/react-query";
import { hasSupabaseConfig, supabase } from "./supabaseClient";
import { normalizeCompanyProfile, normalizeCompanySummary, normalizeDashboardSkills, type CompanyProfile, type CompanySummary, type DashboardSkill } from "./companyData";
import { SEED_COMPANIES } from "../data/seedCompanies";

export function useCompanies() {
  return useQuery<CompanySummary[]>({ queryKey: ["companies"], queryFn: async () => {
    if (!hasSupabaseConfig || !supabase) return SEED_COMPANIES.map((row) => normalizeCompanySummary(row.short_json, row.company_id));
    const { data, error } = await supabase.from("company_json").select("company_id, short_json").order("company_id");
    if (error) throw error;
    return (data ?? []).map((row) => normalizeCompanySummary(row.short_json as Record<string, unknown>, row.company_id));
  }, staleTime: 300_000, gcTime: 600_000, retry: 1 });
}

export function useCompanyProfile(id: number | undefined) {
  return useQuery<CompanyProfile>({ queryKey: ["company", id], enabled: Boolean(id), queryFn: async () => {
    if (!hasSupabaseConfig || !supabase) { const row = SEED_COMPANIES.find((item) => item.company_id === id) ?? SEED_COMPANIES[0]; return normalizeCompanyProfile(row.full_json, row.short_json, row.company_id); }
    const { data, error } = await supabase.from("company_json").select("company_id, short_json, full_json").eq("company_id", id).single();
    if (error) throw error;
    return normalizeCompanyProfile(data.full_json as Record<string, unknown>, data.short_json as Record<string, unknown>, data.company_id);
  }, staleTime: 300_000, gcTime: 600_000, retry: 1 });
}

export function useCompanySkills(id: number | undefined) {
  return useQuery<DashboardSkill[]>({ queryKey: ["skills", id], enabled: Boolean(id), queryFn: async () => {
    if (!hasSupabaseConfig || !supabase) return normalizeDashboardSkills((SEED_COMPANIES.find((item) => item.company_id === id) ?? SEED_COMPANIES[0]).skill_levels);
    const { data, error } = await supabase.from("company_skill_levels").select("required_level, skill_set_master(skill_set_name), proficiency_levels(proficiency_name), skill_set_topics(level_number, topics)").eq("company_id", id);
    if (error) throw error;
    return normalizeDashboardSkills((data ?? []).map((row: any) => ({ name: row.skill_set_master?.skill_set_name, score: row.required_level, criticality: Number(row.required_level) >= 7 ? "Critical" : Number(row.required_level) >= 5 ? "Important" : "Baseline", topics: (row.skill_set_topics ?? []).sort((a: any, b: any) => a.level_number - b.level_number).map((topic: any) => topic.topics) })));
  }, staleTime: 300_000, gcTime: 600_000, retry: 1 });
}
