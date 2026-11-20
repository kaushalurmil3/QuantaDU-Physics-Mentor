export type Question = {
  number: string;
  marks: number;
  text: string;
  subParts?: string[];
  solution: string[];
};

export type ExamSection = {
  title: string;
  instruction: string;
  questions: Question[];
};

export type SamplePaper = {
  id: string;
  title: string;
  paperCode: string;
  course: string;
  maxMarks: number;
  duration: string;
  note: string;
  sections: ExamSection[];
};

export const SAMPLE_PAPERS: SamplePaper[] = [
  {
    id: 'dsc2-mechanics-2024',
    title: 'End-Semester Examination — Sample Paper',
    paperCode: 'DSC-2 (12291102)',
    course: 'Mechanics — B.Sc. (Hons.) Physics, Semester 1 (UGCF-2022)',
    maxMarks: 90,
    duration: '3 Hours',
    note: 'Write your Roll No. on the question paper. Answers must be to the point, with clear diagrams, dimensional checks and full derivations where asked. Use of a non-programmable calculator is permitted.',
    sections: [
      {
        title: 'Section A',
        instruction: 'Attempt all five questions. Each question carries 4 marks. (5 × 4 = 20 marks)',
        questions: [
          {
            number: 'Q1',
            marks: 4,
            text: 'Can an inertial frame of reference exist in the presence of gravity? Justify your answer with reference to Newton’s first law.',
            solution: [
              'Newton’s first law defines inertial frames: a frame where a body with zero net force moves with constant velocity.',
              'A frame with gravity present can be treated as approximately inertial only over small regions where g is effectively uniform and the body’s motion is analysed relative to a freely falling reference (equivalence principle intuition).',
              'Strictly, a lab frame on Earth is non-inertial because of Earth’s rotation (centrifugal and Coriolis corrections) — these are small and usually neglected in mechanics numericals.',
              'Expected answer: a lab frame is inertial to good approximation; a truly inertial frame is an idealisation; freely falling frames locally simulate inertiality (this level of insight earns full marks).',
            ],
          },
          {
            number: 'Q2',
            marks: 4,
            text: 'A body slides down a frictionless incline of height h. Use the work–energy theorem to find its speed at the bottom.',
            solution: [
              'Work–energy theorem: W_net = ΔK.',
              'Only gravity does work: W = mgh (normal force is ⟂ to displacement and does no work).',
              'mgh = ½mv² − 0 ⇒ v = √(2gh).',
              'Dimensional check: [gh] = m²/s², so √(2gh) has units of speed — consistent.',
              'Note the mass cancels: all objects take the incline with the same speed at the bottom, independent of mass.',
            ],
          },
          {
            number: 'Q3',
            marks: 4,
            text: 'Distinguish between conservative and non-conservative forces, giving one example of each. State the condition the curl of a force field must satisfy for it to be conservative.',
            solution: [
              'Conservative force: work done in moving between two points is path-independent; round trip gives zero net work. Example: gravity, spring force, electrostatic force.',
              'Non-conservative force: work depends on path (usually dissipated as heat). Example: kinetic friction, air resistance.',
              'For a force F to be conservative, ∇×F = 0 (the field is irrotational), which then guarantees a potential energy function exists with F = −∇V.',
            ],
          },
          {
            number: 'Q4',
            marks: 4,
            text: 'Two identical carts move toward each other with equal speeds v and stick together after collision. Find the final velocity and the fraction of kinetic energy lost.',
            solution: [
              'Momentum: mv + (−mv) = 2m V ⇒ V = 0. The combined wreck is at rest.',
              'Initial KE: 2 × ½mv² = mv². Final KE: 0.',
              'Fraction lost = 100% — all kinetic energy converts to heat/deformation.',
              'This is allowed because momentum is conserved (zero total momentum) even though KE is not: momentum conservation only fixes the final velocity, not the energy.',
            ],
          },
          {
            number: 'Q5',
            marks: 4,
            text: 'State the two postulates of Einstein’s special theory of relativity and name the experiment whose null result they explain.',
            solution: [
              'Postulate 1 (Principle of relativity): the laws of physics have the same form in all inertial frames — no preferred inertial frame exists.',
              'Postulate 2 (Constancy of light speed): the speed of light in vacuum, c, is the same for all inertial observers, independent of the motion of the source or observer.',
              'The Michelson–Morley experiment (1887) found no shift in interference fringes from Earth’s motion through the “ether”, a null result explained directly by Postulate 2 and resolved formally by the Lorentz transformations.',
            ],
          },
        ],
      },
      {
        title: 'Section B',
        instruction: 'Attempt any five questions. Each question carries 14 marks. (5 × 14 = 70 marks)',
        questions: [
          {
            number: 'Q6',
            marks: 14,
            text: 'State the shell theorem. Derive the gravitational field at a point (a) outside and (b) inside a thin uniform spherical shell of mass M and radius R. Hence write the field inside a uniform solid sphere as a function of r.',
            solution: [
              'Statement: a uniformly thin shell attracts an external body as though its whole mass were concentrated at its centre; the field everywhere inside the shell is zero.',
              '(a) Outside (r > R): slice the shell into rings at polar angle θ with half-angle dθ.',
              '  • Ring area: dA = 2πR² sinθ dθ; ring mass: dM = (M/2) sinθ dθ.',
              '  • Distance from field point to ring: s = √(r² + R² − 2rR cosθ).',
              '  • Only the component along the line joining the centre to the field point survives; integrate d g = G dM cosα / s² with cosα = (r − R cosθ)/s.',
              '  • The integral over θ (substitute u = s², du = 2rR sinθ dθ) collapses cleanly to g = GM/r², directed radially inward — identical to a point mass at the centre.',
              '(b) Inside (r < R): the same geometry gives the integral ∝ [1/(r−R) − 1/(r+R)]·(r factors cancel) and evaluates to exactly zero: the attractive pull of the near cap is perfectly balanced by the far cap.',
              'Solid sphere: a shell of radius a contributes GM(a)/r² if a < r (enclosed mass) and zero if a > r.',
              '  • Enclosed mass M(r) = M r³/R³ ⇒ g(r) = GM r/R³: field inside a uniform sphere grows linearly with r, peaking at the surface.',
            ],
          },
          {
            number: 'Q7',
            marks: 14,
            text: '(a) Derive an expression for the moment of inertia of a uniform solid sphere of mass M and radius R about a diameter. (b) A solid sphere rolls without slipping down an incline of angle θ. Show its acceleration is (5/7) g sinθ and explain why it is less than the sliding value g sinθ.',
            solution: [
              '(a) Choose a thin disc-slab at height x from the centre, thickness dx, radius y = √(R² − x²).',
              '  • dm = ρ π y² dx with ρ = 3M/4πR³.',
              '  • Moment of the slab: dI = ½ dm y² = (3M/8R³) (R² − x²)² dx.',
              '  • Integrate x from −R to R: I = (3M/8R³) ∫(R² − x²)² dx = (3M/8R³)(16R⁵/15) = (2/5) MR².',
              '(b) Rolling without slipping: a = Rα and friction f provides the torque about the centre.',
              '  • Translational: mg sinθ − f = ma.',
              '  • Rotational about centre: f R = I α = (2/5)MR² (a/R) ⇒ f = (2/5) m a.',
              '  • Substitute: mg sinθ = ma + (2/5)ma = (7/5)ma ⇒ a = (5/7) g sinθ.',
              '  • It is less than g sinθ because part of the potential energy goes into rotational kinetic energy (½Iω²), not just translation. Static friction does no net work (contact point is instantaneously at rest), so energy is still conserved overall.',
            ],
          },
          {
            number: 'Q8',
            marks: 14,
            text: '(a) Derive the Lorentz transformation equations from the postulates of special relativity. (b) Using them, obtain the expression for length contraction. (c) A rod of proper length 1 m moves at 0.8c along its length; compute its lab-frame length.',
            solution: [
              '(a) Demand the transformation be linear (homogeneity of space) and keep x = 0 → x′ = −vt consistent: x′ = γ(x − vt), x = γ(x′ + vt′).',
              '  • Substitute one into the other and require consistency: γ²(1 − β²) = 1 ⇒ γ = 1/√(1 − β²).',
              '  • Then t′ = γ(t − vx/c²) from eliminating x′.',
              '  • Full set: x′ = γ(x − vt), y′ = y, z′ = z, t′ = γ(t − vx/c²).',
              '(b) Length contraction: measure a rod moving at v by noting both ends simultaneously in the lab (Δt = 0).',
              '  • From t′ = γ(Δt − vΔx/c²) with Δt = 0 ⇒ Δt′ = −γvΔx/c², and Δx′ = γΔx.',
              '  • Proper length L₀ = Δx′ (rod frame) ⇒ L = L₀/γ = L₀√(1 − β²): moving rods contract only along the direction of motion.',
              '(c) β = 0.8 ⇒ γ = 1/√(1 − 0.64) = 5/3 ≈ 1.667.',
              '  • L = 1 m / 1.667 = 0.60 m (60 cm).',
            ],
          },
          {
            number: 'Q9',
            marks: 14,
            text: '(a) Define centre of mass and derive its position vector for a system of particles. (b) Two blocks of masses m₁ = 2 kg and m₂ = 3 kg are connected by a light string over a frictionless pulley (Atwood machine). Find the acceleration of the system and the tension in the string. Take g = 10 m/s².',
            solution: [
              '(a) Centre of mass: R_cm = (Σ mᵢ rᵢ)/(Σ mᵢ) — the mass-weighted mean position, where the system’s entire momentum may be treated as concentrated: M R̈_cm = ΣF_ext.',
              '(b) Heavier block (m₂) descends with acceleration a; lighter rises with the same a.',
              '  • Block 2: m₂g − T = m₂a ⇒ 30 − T = 3a.',
              '  • Block 1: T − m₁g = m₁a ⇒ T − 20 = 2a.',
              '  • Add: 10 = 5a ⇒ a = 2 m/s².',
              '  • T = 20 + 2(2) = 24 N (check: 30 − 3(2) = 24 N ✓).',
              '  • Sanity: a = (m₂ − m₁)g/(m₁ + m₂) = (1)(10)/5 = 2 m/s² and T = 2m₁m₂g/(m₁+m₂) = 24 N ✓.',
            ],
          },
          {
            number: 'Q10',
            marks: 14,
            text: '(a) Show that if a force F acts on a particle, its angular momentum L about a fixed point changes according to dL/dt = τ, where τ is the torque about the same point. (b) A comet of mass m moves in a parabolic orbit around the Sun. Using conservation of angular momentum, explain why its speed is greatest at perihelion.',
            solution: [
              '(a) L = r × p. Differentiate: dL/dt = (dr/dt × p) + (r × dp/dt).',
              '  • dr/dt × p = v × mv = m(v × v) = 0.',
              '  • dp/dt = F ⇒ dL/dt = r × F = τ. For a central force (F ∥ r), r × F = 0 and L is conserved.',
              '(b) Gravitational force on the comet is central ⇒ angular momentum m r² θ̇ (specific form: L = m r v_perp) is conserved.',
              '  • At perihelion r is smallest, so the transverse speed v must be largest to keep m r v_perp constant.',
              '  • Equivalently, Kepler’s second law: equal areas in equal times — the comet sweeps area fastest when closest to the Sun.',
              '  • Energy conservation agrees: at smallest r, potential energy U = −GMm/r is most negative, so kinetic energy is maximal.',
            ],
          },
        ],
      },
    ],
  },
];
