export type RawCompany = {
  company_id: number;
  short_json: Record<string, unknown>;
  full_json: Record<string, unknown>;
  skill_levels: Array<Record<string, unknown>>;
};

const profile = (name: string, shortName: string, category: string, industry: string, extra: Record<string, unknown> = {}) => ({
  name, short_name: shortName, category, company_type: category, industry,
  logo_url: "", headquarters_address: "Bengaluru, India", employee_size: "10,000+ employees",
  operating_countries: "India; United States; United Kingdom; Singapore", office_count: "40+",
  office_locations: "Bengaluru, India; London, United Kingdom; New York, United States",
  yoy_growth_rate: "8%", website_url: `https://www.${shortName.toLowerCase()}.com`,
  overview_text: `${name} builds products and services that help ambitious organisations operate with more clarity and speed.`,
  vision_statement: "Create enduring value through technology and human ingenuity.",
  mission_statement: "Make complex work simpler for the people and teams we serve.",
  core_values: "Customer obsession; Integrity; Learning; Ownership",
  technology_stack: "Cloud platforms; Data engineering; AI and automation",
  key_competitors: "Industry leaders; Specialist challengers; Emerging platforms",
  website_rating: "8.5/10", glassdoor_rating: "4.2/5", indeed_rating: "4.1/5",
  primary_contact_email: `careers@${shortName.toLowerCase()}.com`, primary_phone_number: "+91 80 0000 0000",
  leadership: "Experienced executive team with product and engineering backgrounds",
  recent_news: "Expanding campus hiring and investing in responsible AI capabilities",
  work_culture_summary: "Collaborative, learning-led, and outcome-focused",
  learning_culture: "Mentorship, internal mobility, and structured learning paths",
  area_safety: "Central business district with standard workplace safety controls",
  ...(extra as Record<string, unknown>),
});

export const SEED_COMPANIES: RawCompany[] = [
  { company_id: 1, short_json: profile("Accenture plc", "Accenture", "Super Dream", "Professional Services", { headquarters_address: "Dublin, Ireland", employee_size: "740,000 employees", yoy_growth_rate: "3%" }), full_json: profile("Accenture plc", "Accenture", "Super Dream", "Professional Services", { linkedin_url: "https://www.linkedin.com/company/accenture", recent_news: "Invested in generative AI strategy and acquired cloud consulting firms in Europe", operating_countries: "United States; United Kingdom; India; Germany; France; Japan; Australia" }), skill_levels: [{ name: "Consulting & Problem Solving", score: 9, criticality: "Critical", topics: ["Structured problem framing", "Stakeholder mapping", "Case synthesis"] }, { name: "Cloud & Data", score: 8, criticality: "Critical", topics: ["Cloud foundations", "Data pipelines", "Responsible AI"] }, { name: "Communication", score: 7, criticality: "Important", topics: ["Executive writing", "Storytelling", "Client workshops"] }] },
  { company_id: 2, short_json: profile("Tata Consultancy Services", "TCS", "Dream", "Information Technology"), full_json: profile("Tata Consultancy Services", "TCS", "Dream", "Information Technology", { website_url: "https://www.tcs.com", linkedin_url: "https://www.linkedin.com/company/tata-consultancy-services" }), skill_levels: [{ name: "Software Engineering", score: 8, criticality: "Critical", topics: ["Programming foundations", "Testing", "System design"] }, { name: "Cloud & Data", score: 7, criticality: "Important", topics: ["Cloud foundations", "Data modelling", "Analytics"] }, { name: "Communication", score: 6, criticality: "Important", topics: ["Professional writing", "Presentation", "Collaboration"] }] },
  { company_id: 3, short_json: profile("Infosys Limited", "Infosys", "Standard", "Information Technology"), full_json: profile("Infosys Limited", "Infosys", "Standard", "Information Technology", { website_url: "https://www.infosys.com" }), skill_levels: [{ name: "Software Engineering", score: 7, criticality: "Critical", topics: ["Programming foundations", "APIs", "Testing"] }, { name: "Problem Solving", score: 7, criticality: "Important", topics: ["Root cause analysis", "Trade-offs", "Delivery"] }, { name: "Communication", score: 5, criticality: "Baseline", topics: ["Writing", "Listening", "Teamwork"] }] },
  { company_id: 4, short_json: profile("Deloitte India", "Deloitte", "Regular", "Consulting"), full_json: profile("Deloitte India", "Deloitte", "Regular", "Consulting", { website_url: "https://www.deloitte.com/in/en.html" }), skill_levels: [{ name: "Business Analysis", score: 8, criticality: "Critical", topics: ["Requirements", "Process mapping", "Insight synthesis"] }, { name: "Problem Solving", score: 6, criticality: "Important", topics: ["Hypothesis thinking", "Data interpretation", "Recommendation"] }, { name: "Communication", score: 6, criticality: "Important", topics: ["Presentation", "Client conversations", "Documentation"] }] },
];
