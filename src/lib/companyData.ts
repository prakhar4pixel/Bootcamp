export type CompanySummary = { companyId: number; name: string; shortName: string; category: string; industry: string; headquarters: string; employeeSize: string; yoyGrowth: string; websiteUrl: string; logoUrl: string };
export type CompanyProfile = CompanySummary & { fields: Record<string, unknown> };
export type DashboardSkill = { name: string; score: number; criticality: string; topics: string[] };

export const asString = (value: unknown, fallback = "Not publicly available") => value === null || value === undefined || String(value).trim() === "" || ["na", "n/a", "none", "null", "-", "unknown"].includes(String(value).trim().toLowerCase()) ? fallback : String(value);
export const asRecord = (value: unknown): Record<string, unknown> => (value && typeof value === "object" ? value as Record<string, unknown> : {});
export const splitItems = (value: unknown) => asString(value, "").split(/[;\n•]+/).map((item) => item.trim()).filter(Boolean);
export const titleCaseFromCode = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
export const scoreToDifficulty = (score: number) => score >= 8 ? "EXPERT" : score >= 6 ? "ADVANCED" : score >= 4 ? "PRO" : "BEGINNER";

export function normalizeCompanySummary(raw: Record<string, unknown>, companyId = 0): CompanySummary {
  return { companyId, name: asString(raw.name, "Unnamed company"), shortName: asString(raw.short_name, asString(raw.name, "Company")), category: asString(raw.company_type, asString(raw.category, "Standard")), industry: asString(raw.industry, "Technology"), headquarters: asString(raw.headquarters_address), employeeSize: asString(raw.employee_size), yoyGrowth: asString(raw.yoy_growth_rate), websiteUrl: asString(raw.website_url, ""), logoUrl: asString(raw.logo_url, "") };
}
export function normalizeCompanyProfile(full: Record<string, unknown>, short: Record<string, unknown>, companyId = 0): CompanyProfile {
  return { ...normalizeCompanySummary({ ...short, ...full }, companyId), fields: { ...short, ...full } };
}
export function normalizeDashboardSkills(skillLevels: Array<Record<string, unknown>>): DashboardSkill[] {
  return skillLevels.map((skill) => ({ name: asString(skill.name, "Skill"), score: Number(skill.score ?? skill.required_level ?? 0), criticality: asString(skill.criticality, "Baseline"), topics: Array.isArray(skill.topics) ? skill.topics.map(String) : splitItems(skill.topics) })).sort((a, b) => b.score - a.score);
}
