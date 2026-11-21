import { SEMESTERS } from './semesterData';
import { FLASHCARDS } from './flashcards';
import { SAMPLE_PAPERS } from './samplePapers';
import { PYQ_BANK } from './pyqBank';
import { BOOKS } from './resources';

export type SearchTab = 'hub' | 'flashcards' | 'papers' | 'pyq' | 'grader' | 'lab' | 'resources';

export type SearchResult = {
  id: string;
  tab: SearchTab;
  location: string;   // e.g. "Sem 1 • DSC-2 Mechanics • Chapter 4"
  snippet: string;    // one-line context where the term appears
  // navigation payload: which semester/paper/section to open
  semester?: number;
  paperId?: string;
  chapterIndex?: number;
  questionNumber?: string;
  pyqId?: string;
};

function snippetAround(text: string, q: string, len = 110): string {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text.slice(0, len) + (text.length > len ? '…' : '');
  const start = Math.max(0, idx - 40);
  const slice = text.slice(start, start + len);
  return (start > 0 ? '…' : '') + slice + (start + len < text.length ? '…' : '');
}

function buildIndex(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];
  const push = (r: SearchResult) => results.push(r);

  // 1. Notes & chapters (Semester Hub)
  for (const sem of SEMESTERS) {
    if (!sem.active) continue;
    for (const paper of sem.papers) {
      for (let ci = 0; ci < paper.chapters.length; ci++) {
        const ch = paper.chapters[ci];
        const hay = [ch.title, ...ch.topics, ...('notes' in paper ? [] : [])].join(' ').toLowerCase();
        const detailedHay =
          paper.kind === 'detailed'
            ? [
                ch.title,
                ...ch.topics,
                ...paper.chapters[ci].notes,
                ...('derivations' in ch ? ch.derivations : []),
                ...('formulas' in ch ? ch.formulas.map((f) => `${f.name} ${f.expr}`) : []),
              ].join(' ')
              .toLowerCase()
            : [ch.title, ...ch.topics].join(' ').toLowerCase();
        if (detailedHay.includes(q) || hay.includes(q)) {
          const body = paper.kind === 'detailed'
            ? [ch.title, ...ch.topics, ...('notes' in paper ? paper.chapters[ci].notes : [])].join(' — ')
            : [ch.title, ...ch.topics].join(' — ');
          push({
            id: `note-${paper.id}-${ci}`,
            tab: 'hub',
            location: `Sem ${sem.id} • ${paper.code} ${paper.name} • ${ch.title.split(':')[0]}`,
            snippet: snippetAround(body, q),
            semester: sem.id,
            paperId: paper.id,
            chapterIndex: ci,
          });
        }
      }
    }
  }

  // 2. Flashcards
  for (const card of FLASHCARDS) {
    if ((card.question + ' ' + card.answer.join(' ')).toLowerCase().includes(q)) {
      push({
        id: `fc-${card.id}`,
        tab: 'flashcards',
        location: `Flashcards • ${card.paperCode}`,
        snippet: snippetAround(card.question, q),
        pyqId: card.id,
      });
    }
  }

  // 3. Sample papers
  for (const paper of SAMPLE_PAPERS) {
    for (const section of paper.sections) {
      for (const question of section.questions) {
        if (question.text.toLowerCase().includes(q)) {
          const semMatch = paper.course.match(/Semester (\d)/);
          push({
            id: `sp-${paper.id}-${question.number}`,
            tab: 'papers',
            location: `Sem ${semMatch?.[1] ?? '?'} • ${paper.paperCode.split(' ')[0]} Sample Paper • ${question.number}`,
            snippet: snippetAround(question.text, q),
            questionNumber: question.number,
            semester: semMatch ? Number(semMatch[1]) : undefined,
            paperId: paper.id,
          });
        }
      }
    }
  }

  // 4. PYQ Bank
  for (const pyq of PYQ_BANK) {
    if (
      pyq.question.toLowerCase().includes(q) ||
      pyq.keywords.some((k) => k.includes(q))
    ) {
      push({
        id: `pyq-${pyq.id}`,
        tab: 'pyq',
        location: `Sem ${pyq.semester} • PYQ Bank • ${pyq.paper} ${pyq.paperName}`,
        snippet: snippetAround(pyq.question, q),
        pyqId: pyq.id,
        semester: pyq.semester,
        paperId: pyq.paper.toLowerCase().replace('-', ''),
      });
    }
  }

  // 5. Book roadmap
  for (const book of BOOKS) {
    if ((`${book.title} ${book.author} ${book.reason}`).toLowerCase().includes(q)) {
      push({
        id: `book-${book.semester}-${book.title}`,
        tab: 'resources',
        location: `Sem ${book.semester} • Book Roadmap • ${book.tag}`,
        snippet: `${book.title} — ${book.author}: ${book.reason} (AI Professor Rating ${book.rating.toFixed(1)}/5)`,
        semester: book.semester,
      });
    }
  }

  // 6. Static sections (Lab Hub, Grader, Online Resources)
  const staticSections: { q: string[]; tab: SearchTab; location: string; snippet: string }[] = [
    {
      q: ['lab', 'practical', 'viva', 'experiment', 'error analysis', 'wheatstone', 'hall effect', 'gm counter', 'pendulum experiment', 'bridge'],
      tab: 'lab',
      location: 'Practicals & Lab Hub',
      snippet: 'Lab marks breakdown, semester-wise experiments and viva-voce preparation tips.',
    },
    {
      q: ['grader', 'gemini', 'ai professor', 'grade', 'answer evaluation'],
      tab: 'grader',
      location: 'AI Professor Grader',
      snippet: 'Write your derivation and get graded the way a DU professor would.',
    },
    {
      q: ['nptel', 'mit', 'ocw', 'feynman', 'openstax', 'colab', 'python', 'numpy', 'scipy', 'online resources', 'book', 'textbook', 'syllabus'],
      tab: 'resources',
      location: 'Online Resources & Book Roadmap',
      snippet: 'Free video lectures, problem sets, Python labs and the semester-wise textbook guide.',
    },
  ];
  for (const s of staticSections) {
    if (s.q.some((k) => k.includes(q) || q.includes(k))) {
      push({ id: `static-${s.tab}`, tab: s.tab, location: s.location, snippet: s.snippet });
    }
  }

  return results.slice(0, 12);
}

export { buildIndex };
