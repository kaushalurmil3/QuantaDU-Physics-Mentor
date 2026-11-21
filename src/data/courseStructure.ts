export type CourseCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: string;
  examples: string;
  tips: string[];
};

// DU NEP UGCF-2022 course structure — per-semester non-DSC categories.
// DSC papers themselves live in semesterData.ts; this covers the rest of the degree.
export const COURSE_CATEGORIES: Record<number, CourseCategory[]> = {
  1: [
    {
      id: 'sec',
      code: 'SEC',
      name: 'Skill Enhancement Course',
      description: 'Hands-on skill courses run in small batches — assessed largely on practical work.',
      credits: '2–3 credits · usually one per semester',
      examples: 'Python Programming / Physics Workshop Skills; LaTeX & Document Preparation; IT Skills; Electronics instrumentation basics.',
      tips: [
        'SECs are graded heavily on weekly assignments — attend from week one; the load is continuous, not end-loaded.',
        'Python/LaTeX skills compound: they directly help your later lab reports and data analysis.',
      ],
    },
    {
      id: 'aec',
      code: 'AEC',
      name: 'Ability Enhancement Course',
      description: 'University-mandated language and environment competence courses.',
      credits: '2–4 credits · compulsory to qualify for the degree',
      examples: 'Environmental Science (EVS); Hindi / Modern Indian Language (MIL) paper.',
      tips: [
        'EVS is a scoring paper — previous year questions repeat heavily; prepare from the university question bank.',
        'Do not leave the MIL/AEC pending: clearing it is a hard requirement for the final degree.',
      ],
    },
    {
      id: 'vac',
      code: 'VAC',
      name: 'Value Added Course',
      description: 'Cross-disciplinary courses on digital and civic competence, common across all honours students.',
      credits: '2–4 credits · one in year 1',
      examples: 'Digital Empowerment / Understanding India; Constitutional Values & Fundamental Duties; Financial Literacy.',
      tips: [
        'VAC papers are often MCQ/short-note based — focus on definitions, articles and scheme names.',
        'Attendance rules apply strictly to VACs; a missed internal cannot be repeated.',
      ],
    },
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'A subject outside Physics taken through all six semesters to earn a Minor degree alongside the Physics Major.',
      credits: '4–5 credits per semester · continuous track',
      examples: 'Mathematics (Calculus, Linear Algebra, Differential Equations); Chemistry; Computer Science; Statistics.',
      tips: [
        'Choose the Minor subject you can sustain for six semesters — Mathematics pairs best with Physics derivations.',
        'Minor-paper marks count toward your final CGPA identically; never treat them as a side subject.',
      ],
    },
  ],
  2: [
    {
      id: 'sec',
      code: 'SEC',
      name: 'Skill Enhancement Course',
      description: 'Second skill course in the sequence.',
      credits: '2–3 credits',
      examples: 'Technical writing & communication; simulation tools (spreadsheet/Python plotting); radiation safety awareness modules.',
      tips: ['Keep your SEC project files — they become portfolio material for summer internships.'],
    },
    {
      id: 'aec',
      code: 'AEC',
      name: 'Ability Enhancement Course',
      description: 'Continuation/completion of the language & environment requirement.',
      credits: '2–4 credits',
      examples: 'Environmental Science (completion); English Communication / MIL continuation.',
      tips: ['If EVS internals were weak in Sem 1, the end-sem weight can recover them — re-derive all definitions.'],
    },
    {
      id: 'vac',
      code: 'VAC',
      name: 'Value Added Course',
      description: 'Second value-added course.',
      credits: '2–4 credits',
      examples: 'Financial Literacy; Emotional Intelligence & Stress Management; Digital and AI literacy modules.',
      tips: ['VAC internals often include group presentations — form your group early in the semester.'],
    },
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'Minor subject paper for the semester, e.g. Mathematics-II.',
      credits: '4–5 credits',
      examples: 'Linear Algebra & Differential Equations; Chemistry-II; Data Structures.',
      tips: ['Differential equations from the Minor feed directly into your DSC oscillation derivations — study them together.'],
    },
  ],
  3: [
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'Minor subject continues; the load rises as DSCs deepen.',
      credits: '4–5 credits',
      examples: 'Advanced Calculus; Physical Chemistry; Operating Systems.',
      tips: ['Balance: Sem 3 has the heaviest DSC math (complex analysis) — schedule Minor study around it.'],
    },
    {
      id: 'sec',
      code: 'SEC',
      name: 'Skill Enhancement Course',
      description: 'Optional/additional skill modules depending on college offerings.',
      credits: '2 credits',
      examples: 'Instrumentation & measurement; scientific figure preparation; data visualisation.',
      tips: ['Prefer SECs that overlap with lab work — one preparation, two scores.'],
    },
  ],
  4: [
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'Fourth Minor paper.',
      credits: '4–5 credits',
      examples: 'Abstract Algebra; Numerical Methods; Inorganic Chemistry.',
      tips: ['By now the Minor track should feel like a second major — keep a separate formula notebook for it.'],
    },
  ],
  5: [
    {
      id: 'dse',
      code: 'DSE',
      name: 'Discipline Specific Elective',
      description: 'Advanced Physics electives — from Sem 5 you choose specialised tracks within the discipline.',
      credits: '4–5 credits per elective · usually one per semester',
      examples: 'Astronomy & Astrophysics; Nuclear & Particle Physics techniques; Nanomaterials & Applications; Computational Physics; Condensed Matter Physics.',
      tips: [
        'Pick DSEs by career direction: Computational Physics for data/ML careers, Astronomy for research, Nanomaterials for materials/CMES jobs.',
        'DSE papers have smaller batches — professors notice attendance and reward internal marks accordingly.',
      ],
    },
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'Fifth Minor paper; only minor-earners continue.',
      credits: '4–5 credits',
      examples: 'Probability & Statistics; Quantum Chemistry; Machine Learning basics.',
      tips: ['If aiming for a research career, keep the Minor in Mathematics/Stats — pure-science masters programmes value it.'],
    },
  ],
  6: [
    {
      id: 'dse',
      code: 'DSE',
      name: 'Discipline Specific Elective',
      description: 'Final advanced electives of the degree.',
      credits: '4–5 credits',
      examples: 'Astronomy & Astrophysics (Galactic/Extragalactic); Advanced Nuclear Physics; Nanomaterials characterisation; Computational Physics projects; Biophysics.',
      tips: [
        'DSE project components are a chance to build a demonstrable portfolio piece (code, simulations, data analysis).',
        'Choose the DSE whose question bank you can genuinely master in six weeks of revision — breadth beats ambition here.',
      ],
    },
    {
      id: 'ge',
      code: 'Minor / GE',
      name: 'Generic Elective (Minor Subject)',
      description: 'Final Minor paper completing the Minor degree requirement.',
      credits: '4–5 credits',
      examples: 'Final Mathematics/Chemistry/CS paper of the Minor track.',
      tips: ['Completing all six Minor semesters awards the "Degree with Minor" title on your final certificate — verify your college\u2019s audit early.'],
    },
  ],
};

export const CATEGORY_META: Record<string, { label: string; color: string }> = {
  DSC: { label: 'Discipline Specific Core', color: 'bg-navy-800 text-white' },
  DSE: { label: 'Discipline Specific Elective', color: 'bg-emerald-100 text-emerald-800' },
  'Minor / GE': { label: 'Generic Elective (Minor)', color: 'bg-sky-100 text-sky-800' },
  SEC: { label: 'Skill Enhancement Course', color: 'bg-amber-100 text-amber-800' },
  VAC: { label: 'Value Added Course', color: 'bg-rose-100 text-rose-800' },
  AEC: { label: 'Ability Enhancement Course', color: 'bg-violet-100 text-violet-800' },
};
