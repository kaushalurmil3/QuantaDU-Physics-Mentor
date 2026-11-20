export type Formula = { name: string; expr: string };

export type DetailedChapter = {
  title: string;
  topics: string[];
  notes: string[];
  derivations: string[];
  formulas: Formula[];
  tips: string[];
};

export type SyllabusChapter = {
  title: string;
  topics: string[];
};

export type DetailedPaper = {
  kind: 'detailed';
  id: string;
  code: string;
  name: string;
  playlist: { label: string; url: string };
  chapters: DetailedChapter[];
};

export type SyllabusPaper = {
  kind: 'syllabus';
  id: string;
  code: string;
  name: string;
  chapters: SyllabusChapter[];
};

export type Paper = DetailedPaper | SyllabusPaper;

export type Semester = {
  id: number;
  label: string;
  active: boolean;
  tagline: string;
  papers: Paper[];
};
