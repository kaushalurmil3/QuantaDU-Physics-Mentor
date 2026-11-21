export type ResourceLink = { label: string; url: string; desc?: string };

export type ResourceCard = {
  title: string;
  links: ResourceLink[];
};

export const ONLINE_RESOURCES: ResourceCard[] = [
  {
    title: 'Free Video Lectures',
    links: [
      { label: 'NPTEL Physics Courses (IIT Madras/Delhi/Kanpur)', url: 'https://nptel.ac.in/', desc: 'Full IIT courses matching DU papers' },
      { label: 'CEC-UGC University Physics Lectures', url: 'https://cec.nic.in/', desc: 'University-level lectures in all branches' },
    ],
  },
  {
    title: 'MIT OpenCourseWare',
    links: [
      { label: 'MIT 8.01 Classical Mechanics', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e', desc: "Walter Lewin's legendary mechanics course" },
      { label: 'MIT 8.02 Electricity & Magnetism', url: 'https://www.youtube.com/playlist?list=PLUdYlQf0_sSsfcNOPSNPQKHDhSjTJATPu', desc: 'Demonstration-driven E&M' },
      { label: 'MIT 8.03 Vibrations & Waves', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro22WeXM2QCKJm2NP_xHpGV89', desc: 'Pairs with DU DSC-3 oscillations' },
      { label: 'MIT OCW Physics Portal', url: 'https://ocw.mit.edu/search/?d=Physics', desc: 'All MIT physics courses, free' },
    ],
  },
  {
    title: 'Book Solutions & Problem Practice',
    links: [
      { label: 'Feynman Lectures on Physics (Official Free Online Edition)', url: 'https://www.feynmanlectures.caltech.edu/', desc: 'The complete classic, legally free' },
      { label: 'OpenStax University Physics & Solved Problem Sets', url: 'https://openstax.org/subjects/science', desc: 'Free textbook with worked problems' },
    ],
  },
  {
    title: 'Python & Computational Physics',
    links: [
      { label: 'Google Colab (Free Browser Python Lab for DU Practicals)', url: 'https://colab.research.google.com/', desc: 'No-install Python for data analysis' },
      { label: 'SciPy & NumPy Official Scientific Python Tutorials', url: 'https://scipy-lectures.org/', desc: 'Plotting, fitting and linear algebra' },
    ],
  },
];

export type Tag = 'BUY' | 'BORROW / LIBRARY' | 'REFERENCE ONLY';

export type Book = {
  semester: number;
  title: string;
  author: string;
  tag: Tag;
  rating: number;
  reason: string;
};

export const BOOKS: Book[] = [
  // Semester I
  { semester: 1, title: 'Mathematical Physics', author: 'H.K. Dass', tag: 'BUY', rating: 4.8, reason: 'Best for DU exam numericals & step-by-step derivations' },
  { semester: 1, title: 'An Introduction to Mechanics', author: 'Kleppner & Kolenkow', tag: 'BORROW / LIBRARY', rating: 4.9, reason: 'Gold standard for conceptual depth & rotational dynamics' },
  { semester: 1, title: 'The Physics of Waves and Oscillations', author: 'N.K. Bajaj', tag: 'BUY', rating: 4.7, reason: 'Directly aligned with DU DSC-3 syllabus' },
  // Semester II
  { semester: 2, title: 'Introduction to Electrodynamics', author: 'David J. Griffiths', tag: 'BUY', rating: 5.0, reason: 'Essential across Sem 2 & Sem 5; best investment for any Physics Hons student' },
  { semester: 2, title: 'Mathematical Methods in the Physical Sciences', author: 'Mary L. Boas', tag: 'BORROW / LIBRARY', rating: 4.8, reason: 'Crystal-clear explanations of Fourier series & PDEs' },
  // Semester III
  { semester: 3, title: 'Heat and Thermodynamics', author: 'Zemansky & Dittman', tag: 'BORROW / LIBRARY', rating: 4.7, reason: "Classic reference for Maxwell's relations & entropy" },
  { semester: 3, title: 'Optics', author: 'Ajoy Ghatak', tag: 'BUY', rating: 4.9, reason: 'Written by IIT Delhi professor; ideal for DU Optics derivations' },
  // Semester IV
  { semester: 4, title: 'Concepts of Modern Physics', author: 'Arthur Beiser', tag: 'BUY', rating: 4.8, reason: 'Best bridge into quantum & nuclear physics' },
  { semester: 4, title: 'Introduction to Solid State Physics', author: 'Charles Kittel', tag: 'REFERENCE ONLY', rating: 4.6, reason: 'Dense graduate-level classic; use library copy for crystal structure & band theory' },
  // Semester V
  { semester: 5, title: 'Introduction to Quantum Mechanics', author: 'David J. Griffiths', tag: 'BUY', rating: 5.0, reason: 'Must-own textbook for Sem 5 Quantum Mechanics' },
  { semester: 5, title: 'Digital Principles and Applications', author: 'Malvino & Leach', tag: 'BORROW / LIBRARY', rating: 4.7, reason: 'Great for flip-flops, counters & logic circuits' },
  // Semester VI
  { semester: 6, title: 'Statistical Mechanics', author: 'R.K. Pathria', tag: 'REFERENCE ONLY', rating: 4.7, reason: 'Use college library for ensembles; pair with Garg, Bansal & Ghosh for exams' },
  { semester: 6, title: 'Concepts of Nuclear Physics', author: 'Bernard L. Cohen', tag: 'BORROW / LIBRARY', rating: 4.6, reason: 'Clear coverage of nuclear models & reactions' },
];

export const DU_SYLLABUS_LINKS: ResourceLink[] = [
  { label: 'Official DU NEP UGCF-2022 Syllabi', url: 'https://www.du.ac.in/index.php?page=nep-ugcf-2022-syllabi' },
  { label: 'DU Physics Department Revised Syllabi', url: 'https://physics.du.ac.in/revised_syllabi.php' },
];
