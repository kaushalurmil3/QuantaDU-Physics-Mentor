export type Paper = {
  id: string;
  code: string;
  name: string;
};

export type Resource = {
  label: string;
  url: string;
};

export type Unit = {
  title: string;
  topics: string[];
  notes: string[];
  formulas: { name: string; expr: string }[];
  references: string[];
  videos: Resource[];
};

export type Semester = {
  id: number;
  label: string;
  active: boolean;
  papers: (Paper & { units: Unit[] })[];
};

export const SEMESTERS: Semester[] = [
  {
    id: 1,
    label: 'Semester 1',
    active: true,
    papers: [
      {
        id: 'dsc1',
        code: 'DSC-1',
        name: 'Mathematical Physics I',
        units: [
          {
            title: 'Unit 1: Infinite Series & Calculus',
            topics: [
              'Convergence of series: comparison, ratio and integral tests',
              'Alternating series, absolute and conditional convergence',
              'Taylor and Maclaurin series with remainders',
              'Applications: error estimation in physics computations',
            ],
            notes: [
              'Start every series question by identifying whether terms are positive, alternating, or both — the test you choose depends on this.',
              'The ratio test fails for series like 1/n³ (ratio → 1). Keep the comparison and integral tests ready for these cases.',
              'Maclaurin expansions of eˣ, sin x, cos x, ln(1+x), (1+x)ⁿ are the working tools of physics — know them with their radii of convergence.',
            ],
            formulas: [
              { name: 'Taylor series (about a)', expr: 'f(x) = f(a) + f′(a)(x−a) + f″(a)(x−a)²/2! + …' },
              { name: 'Maclaurin of eˣ', expr: 'eˣ = 1 + x + x²/2! + x³/3! + …  (all x)' },
              { name: 'Binomial series', expr: '(1+x)ⁿ = 1 + nx + n(n−1)x²/2! + …  (|x| < 1)' },
              { name: 'Ratio test', expr: 'For Σaₙ, if lim |aₙ₊₁/aₙ| = L: converges if L < 1, diverges if L > 1' },
            ],
            references: [
              'Mathematical Methods for Physicists — Arfken, Weber & Harris (Ch. 1)',
              'Mathematical Physics — H.K. Dass & R. Verma (Unit 1)',
              'Mathematics for Physicists — Philippe Dennery',
            ],
            videos: [
              { label: 'NPTEL: Mathematical Physics — Series & Convergence', url: 'https://nptel.ac.in/courses/115106108' },
              { label: 'MIT OCW 18.01: Taylor Series (Lecture)', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/' },
            ],
          },
          {
            title: 'Unit 2: Vectors & Coordinate Systems',
            topics: [
              'Scalar and vector products, triple products',
              'Gradient, divergence and curl; physical meaning',
              'Green, Stokes and Gauss theorems',
              'Spherical polar and cylindrical coordinates',
            ],
            notes: [
              'Divergence measures outflow of a field from a point; curl measures local rotation. Exam questions often ask for physical interpretation, not just computation.',
              'Practice converting ∇, ∇·, ∇× into spherical polars — this is a repeated UGCF long question.',
              'Write Stokes and Gauss theorems in one line each and recall one physical example of each (e.g. magnetostatics, electrostatics).',
            ],
            formulas: [
              { name: 'Gradient', expr: '∇φ = x̂ ∂φ/∂x + ŷ ∂φ/∂y + ẑ ∂φ/∂z' },
              { name: 'Divergence theorem', expr: '∮ₛ F·dA = ∫ᵥ (∇·F) dV' },
              { name: 'Stokes theorem', expr: '∮_C F·dl = ∫ₛ (∇×F)·dA' },
              { name: 'Laplacian (spherical)', expr: '∇²φ = (1/r²) ∂/∂r (r² ∂φ/∂r) + (1/r² sinθ) ∂/∂θ (sinθ ∂φ/∂θ) + (1/r² sin²θ) ∂²φ/∂φ²' },
            ],
            references: [
              'Introduction to Electrodynamics — David J. Griffiths (Ch. 1)',
              'Vector Analysis — Murray R. Spiegel (Schaum)',
              'Mathematical Methods for Physicists — Arfken, Weber & Harris (Ch. 2–3)',
            ],
            videos: [
              { label: 'MIT OCW 8.02: Vector Fields & Divergence/Curl', url: 'https://ocw.mit.edu/courses/8-02sc-physics-ii-electricity-and-magnetism-fall-2010/' },
              { label: 'NPTEL: Mathematical Physics — Vector Calculus', url: 'https://nptel.ac.in/courses/115106108' },
            ],
          },
          {
            title: 'Unit 3: Matrices & Ordinary Differential Equations',
            topics: [
              'Matrix algebra, inverses, rank; eigenvalues and eigenvectors',
              'Diagonalisation of symmetric matrices',
              'First-order ODEs: separable, linear, exact',
              'Second-order linear ODEs with constant coefficients',
            ],
            notes: [
              'For eigenvalue problems, always verify with the trace and determinant checks: tr(A) = Σλᵢ and det(A) = Πλᵢ.',
              'The damped/forced oscillator problem in DSC-3 is solved by exactly this ODE technique — connect the two papers while revising.',
              'Diagonalising a real symmetric matrix by its eigenvector basis is the mathematical heart of normal modes (again, DSC-3).',
            ],
            formulas: [
              { name: 'Characteristic equation', expr: 'det(A − λI) = 0' },
              { name: 'Linear first-order ODE', expr: 'dy/dx + P(x)y = Q(x)  ⇒  y·e^{∫P dx} = ∫ Q e^{∫P dx} dx + C' },
              { name: '2nd-order ODE solution', expr: 'ay″ + by′ + cy = 0:  y = e^{mx},  m = (−b ± √(b²−4ac))/2a' },
            ],
            references: [
              'Mathematical Physics — H.K. Dass & R. Verma (Matrices & ODE units)',
              'Mathematical Methods for Physicists — Arfken, Weber & Harris (Ch. 4, 8)',
            ],
            videos: [
              { label: 'MIT OCW 18.03: Differential Equations', url: 'https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/' },
              { label: 'NPTEL: Matrices & Eigenvalue Problems', url: 'https://nptel.ac.in/courses/111106051' },
            ],
          },
        ],
      },
      {
        id: 'dsc2',
        code: 'DSC-2',
        name: 'Mechanics',
        units: [
          {
            title: 'Unit 1: Fundamentals of Newtonian Mechanics',
            topics: [
              'Newton’s laws; inertial frames; momentum and impulse',
              'Work–energy theorem, conservative forces and potential energy',
              'Central forces and the shell theorem',
              'Collisions in laboratory and centre-of-mass frames',
            ],
            notes: [
              'Always begin numericals by drawing a free-body diagram — DU marking schemes award explicit step marks for this.',
              'For collisions, distinguish elastic, inelastic and completely inelastic cases: what is conserved in each is the standard 2–3 mark conceptual question.',
              'The shell theorem derivation (field inside and outside a uniform sphere) is a favourite long question — practice it fully.',
            ],
            formulas: [
              { name: 'Work–energy theorem', expr: 'W_net = ΔK = ½mv² − ½mv₀²' },
              { name: 'Gravitational field of a shell (outside)', expr: 'g(r) = GM/r²   (r ≥ R)' },
              { name: 'Gravitational field of a shell (inside)', expr: 'g(r) = 0   (r < R)' },
              { name: 'Elastic collision (equal masses, target at rest)', expr: 'v₁′ = 0,  v₂′ = v₁' },
              { name: 'Reduced mass', expr: 'μ = m₁m₂ / (m₁ + m₂)' },
            ],
            references: [
              'An Introduction to Mechanics — Kleppner & Kolenkow (Ch. 1–6)',
              'Classical Mechanics — John R. Taylor (Ch. 4)',
              'University Physics — Sears & Zemansky (Mechanics chapters)',
            ],
            videos: [
              { label: 'MIT OCW 8.01: Classical Mechanics (Walter Lewin)', url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/' },
              { label: 'NPTEL: Engineering Mechanics — Collisions & Frames', url: 'https://nptel.ac.in/courses/122106048' },
            ],
          },
          {
            title: 'Unit 2: Rotational Motion & Rigid Bodies',
            topics: [
              'Angular momentum, torque, moment of inertia theorems',
              'Rotation about a fixed axis; kinetics of rolling',
              'Perpendicular and parallel axis theorems',
              'Gyroscope precession (qualitative)',
            ],
            notes: [
              'Moment of inertia integrals for ring, disc, rod, sphere and their combinations are bank questions — memorise the standard results and know which axis they refer to.',
              'Rolling problems: state whether you are using energy conservation or torque about the contact point; mixing them wastes time.',
              'The precession rate Ω = τ/L for a spinning gyroscope is a short conceptual favourite.',
            ],
            formulas: [
              { name: 'Parallel axis theorem', expr: 'I = I_cm + Mh²' },
              { name: 'Perpendicular axis theorem (planar body)', expr: 'I_z = I_x + I_y' },
              { name: 'Solid sphere about a diameter', expr: 'I = (2/5)MR²' },
              { name: 'Rod about its end', expr: 'I = ML²/3' },
              { name: 'Precession rate', expr: 'Ω = τ / L = mgr / (Iω)' },
            ],
            references: [
              'An Introduction to Mechanics — Kleppner & Kolenkow (Ch. 6–8)',
              'University Physics — Sears & Zemansky (Rotation chapters)',
            ],
            videos: [
              { label: 'MIT OCW 8.01: Rotations & Rigid Bodies', url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/' },
              { label: 'NPTEL: Rigid Body Dynamics', url: 'https://nptel.ac.in/courses/122106048' },
            ],
          },
          {
            title: 'Unit 3: Special Relativity (Introduction)',
            topics: [
              'Michelson–Morley experiment and its outcome',
              'Postulates of special relativity; Lorentz transformations',
              'Time dilation, length contraction, relativity of simultaneity',
              'Relativistic energy and momentum; mass–energy equivalence',
            ],
            notes: [
              'The Michelson–Morley null result and how it motivates the second postulate is asked repeatedly as a 4–6 mark question.',
              'Numericals almost always use β = v/c: compute β first, then γ = 1/√(1−β²). Never mix Newtonian and relativistic formulas.',
              'Write E² = (pc)² + (mc²)² once and derive E = mc² and p = γmv from it — a compact way to revise the whole unit.',
            ],
            formulas: [
              { name: 'Lorentz factor', expr: 'γ = 1 / √(1 − v²/c²)' },
              { name: 'Time dilation', expr: 'Δt = γ Δt₀' },
              { name: 'Length contraction', expr: 'L = L₀ / γ' },
              { name: 'Relativistic energy', expr: 'E² = (pc)² + (mc²)²' },
            ],
            references: [
              'Introduction to Special Relativity — Robert Resnick',
              'An Introduction to Mechanics — Kleppner & Kolenkow (Ch. 11–12)',
            ],
            videos: [
              { label: 'MIT OCW 8.033: Relativity (full course)', url: 'https://ocw.mit.edu/courses/8-033-relativity-fall-2006/' },
              { label: 'NPTEL: Special Theory of Relativity', url: 'https://nptel.ac.in/courses/122106048' },
            ],
          },
        ],
      },
      {
        id: 'dsc3',
        code: 'DSC-3',
        name: 'Waves and Oscillations',
        units: [
          {
            title: 'Unit 1: Simple Harmonic Motion',
            topics: [
              'Differential equation of SHM and its solution',
              'Energy in SHM: kinetic, potential, total',
              'Oscillations of spring–mass, simple pendulum, torsional pendulum',
              'Physical pendulum; effect of finite amplitude',
            ],
            notes: [
              'The exam pattern is consistent: derive x = A sin(ωt + φ) from Newton’s second law, then compute energy. Learn this derivation verbatim.',
              'For the simple pendulum, always state the small-angle approximation sin θ ≈ θ explicitly — marks are deducted for skipping it.',
              'Total energy in SHM ∝ A²ω² is the basis of several 2-mark conceptual questions; know the energy–time graph shape.',
            ],
            formulas: [
              { name: 'SHM equation', expr: 'd²x/dt² + ω²x = 0,  ω = √(k/m)' },
              { name: 'General solution', expr: 'x(t) = A sin(ωt + φ)' },
              { name: 'Energy in SHM', expr: 'E = ½ m ω² A²  = ½ k A²' },
              { name: 'Simple pendulum (small angle)', expr: 'T = 2π √(L/g)' },
            ],
            references: [
              'The Physics of Waves and Oscillations — N.K. Bajaj (Ch. 1–2)',
              'Waves — Berkeley Physics Course Vol. 3, Frank S. Crawford (Ch. 1)',
              'Fundamentals of Physics — Halliday, Resnick & Walker (Oscillations)',
            ],
            videos: [
              { label: 'MIT OCW 8.03: Oscillations (Walter Lewin)', url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/' },
              { label: 'NPTEL: Waves and Oscillations', url: 'https://nptel.ac.in/courses/115105103' },
            ],
          },
          {
            title: 'Unit 2: Damped & Forced Oscillations, Resonance',
            topics: [
              'Damped harmonic oscillator: light, critical and heavy damping',
              'Logarithmic decrement; quality factor Q',
              'Forced oscillations; amplitude and phase vs driving frequency',
              'Sharpness of resonance; applications (electrical analogy)',
            ],
            notes: [
              'Write the damped equation x″ + 2b x′ + ω₀² x = 0 and classify solutions by comparing b with ω₀ — this classification itself carries marks.',
              'At resonance the amplitude A_max = F₀/(2b m): note it depends on damping, a favourite conceptual probe.',
              'The electrical analogy L↔m, R↔b, 1/C↔k appears in at least one question most years.',
            ],
            formulas: [
              { name: 'Damped oscillator', expr: 'm x″ + b x′ + kx = 0' },
              { name: 'Amplitude decay', expr: 'A(t) = A₀ e^{−bt/m}' },
              { name: 'Quality factor', expr: 'Q = ω₀ / 2b' },
              { name: 'Resonance amplitude', expr: 'A_max = F₀ / (2 m b ω_d)' },
            ],
            references: [
              'The Physics of Waves and Oscillations — N.K. Bajaj (Ch. 2)',
              'Waves — Berkeley Physics Course Vol. 3, Crawford (Ch. 2–3)',
            ],
            videos: [
              { label: 'MIT OCW 8.03: Forced Oscillations & Resonance', url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/' },
              { label: 'NPTEL: Damped and Driven Oscillators', url: 'https://nptel.ac.in/courses/115105103' },
            ],
          },
          {
            title: 'Unit 3: Wave Motion & Superposition',
            topics: [
              'The wave equation; transverse waves on a string',
              'Plane vs spherical waves; intensity and the inverse-square law',
              'Superposition: stationary waves, beats, phase and group velocity',
              'Normal modes of a stretched string',
            ],
            notes: [
              'Deriving v = √(T/μ) from Newton’s second law on a string element is a standard long question; practice the full proof.',
              'Distinguish clearly: phase velocity = ω/k, group velocity = dω/dk. Questions often give one dispersion relation and ask for both.',
              'Normal modes: fₙ = n v / 2L for a string fixed at both ends — sketch the first three modes if asked.',
            ],
            formulas: [
              { name: 'Wave equation', expr: '∂²y/∂x² = (1/v²) ∂²y/∂t²' },
              { name: 'Speed on a string', expr: 'v = √(T/μ)' },
              { name: 'Normal modes (string, both ends fixed)', expr: 'fₙ = n v / 2L,  n = 1, 2, 3, …' },
              { name: 'Beats', expr: 'f_beat = |f₁ − f₂|' },
              { name: 'Group velocity', expr: 'v_g = dω/dk' },
            ],
            references: [
              'Waves — Berkeley Physics Course Vol. 3, Crawford (Ch. 1–4)',
              'The Physics of Waves and Oscillations — N.K. Bajaj (Ch. 3–4)',
              'Principles of Physics — Halliday, Resnick & Walker (Waves)',
            ],
            videos: [
              { label: 'MIT OCW 8.03: Travelling & Standing Waves', url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/' },
              { label: 'NPTEL: Wave Motion & Superposition', url: 'https://nptel.ac.in/courses/115105103' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Semester 2',
    active: false,
    papers: [],
  },
  {
    id: 3,
    label: 'Semester 3',
    active: false,
    papers: [],
  },
  {
    id: 4,
    label: 'Semester 4',
    active: false,
    papers: [],
  },
  {
    id: 5,
    label: 'Semester 5',
    active: false,
    papers: [],
  },
  {
    id: 6,
    label: 'Semester 6',
    active: false,
    papers: [],
  },
  {
    id: 7,
    label: 'Semester 7',
    active: false,
    papers: [],
  },
  {
    id: 8,
    label: 'Semester 8',
    active: false,
    papers: [],
  },
];
