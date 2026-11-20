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
  {
    id: 'dsc5-em-2024',
    title: 'End-Semester Examination — Sample Paper',
    paperCode: 'DSC-5 (12291202)',
    course: 'Electricity and Magnetism — B.Sc. (Hons.) Physics, Semester 2 (UGCF-2022)',
    maxMarks: 90,
    duration: '3 Hours',
    note: 'Write your Roll No. on the question paper. Answers must be to the point, with clear diagrams, correct vector notation and full derivations where asked. Use of a non-programmable calculator is permitted.',
    sections: [
      {
        title: 'Section A',
        instruction: 'Attempt all five questions. Each question carries 4 marks. (5 × 4 = 20 marks)',
        questions: [
          {
            number: 'Q1',
            marks: 4,
            text: 'Answer any four of the following in two or three lines each: (a) State Gauss\u2019s law in differential form and name the theorem used to convert it from the integral form. (b) What is displacement current and why was it introduced? (c) Write the Clausius–Mossotti relation and define each symbol. (d) Define the magnetic vector potential A and state the gauge condition used with it in magnetostatics. (e) Distinguish between free and bound charge in a dielectric.',
            subParts: [
              '(a) ∇·E = ρ/ε₀ — obtained from the integral form via Gauss\u2019s (divergence) theorem.',
              '(b) The equivalent current ε₀ dΦ_E/dt added by Maxwell to Ampere\u2019s law so that it remains consistent for time-varying fields (e.g. a charging capacitor) and predicts electromagnetic waves.',
              '(c) (ε_r − 1)/(ε_r + 2) = Nα/3ε₀, where ε_r is the relative permittivity, N the number density of molecules and α the molecular polarisability.',
              '(d) B = ∇×A; in magnetostatics the Coulomb gauge ∇·A = 0 is used, giving ∇²A = −μ₀J.',
              '(e) Free charge is charge that can be added/removed at will (conduction charge, electrodes); bound charge is displaced within the dielectric and appears as σ_b = P·n̂ or ρ_b = −∇·P.',
            ],
            solution: [
              'Each part carries 1 mark: state the law/relation correctly (½ mark) and give the physical role or symbol meaning (½ mark).',
              '(a) Full credit requires the differential form exactly and naming the divergence theorem.',
              '(b) The examiner looks for "consistency of Ampere\u2019s law with charge conservation" and one concrete situation — the capacitor circuit is the expected example.',
              '(c) All three symbols must be defined; writing the relation alone earns only half.',
              '(d) B = ∇×A plus any one valid gauge; mention that A simplifies magnetostatic calculations.',
              '(e) The bound-charge equations σ_b = P·n̂ and ρ_b = −∇·P are the expected answer; a verbal description alone earns half marks.',
            ],
          },
          {
            number: 'Q2',
            marks: 4,
            text: 'A point charge q is held at a distance d from an infinite grounded conducting plane. Find the force on the charge and explain in one line why the image method is legitimate.',
            solution: [
              'Replace the plane by an image charge −q at mirror distance d behind it (total separation 2d).',
              'Force on q: F = (1/4πε₀) · q(−q)/(2d)² = −q²/(16πε₀d²) — attractive, toward the plane.',
              'Legitimacy: the image configuration makes the potential exactly zero on the plane, and by the uniqueness theorem that is the unique solution of the boundary-value problem in the physical region.',
              'The induced surface charge, if integrated, totals −q — a consistency check worth quoting.',
            ],
          },
          {
            number: 'Q3',
            marks: 4,
            text: 'Starting from the force on a free charge, show that the magnetic field does no work on a charged particle, and state what quantity the field nevertheless changes.',
            solution: [
              'Lorentz force: F = qv×B is always perpendicular to v because v×B ⟂ v.',
              'Rate of work: dK/dt = F·v = q(v×B)·v = 0 — the kinetic energy is unchanged.',
              'The field changes the direction of motion: it supplies centripetal force, producing circular/helical motion at the cyclotron frequency ω = qB/m.',
              'Conclusion: magnetic fields redirect but never speed up particles — the basis of cyclotron and plasma-confinement physics.',
            ],
          },
          {
            number: 'Q4',
            marks: 4,
            text: 'Define self-inductance of a coil and obtain the self-inductance of a long solenoid of n turns per unit length, length l and cross-sectional area A.',
            solution: [
              'Self-inductance: flux linkage per unit current, L = NΦ/I; equivalently ε = −L dI/dt.',
              'Solenoid field: B = μ₀nI (uniform inside).',
              'Flux linkage: NΦ = (nl)(μ₀nI)A = μ₀n²lA·I.',
              'L = μ₀n²lA = μ₀n²·(volume). Dependence: quadratic in turn density — the standard exam remark.',
            ],
          },
          {
            number: 'Q5',
            marks: 4,
            text: 'State the condition for resonance in a series LCR circuit, and show that the voltage across the inductor at resonance is Q times the source voltage.',
            solution: [
              'Resonance: ωL = 1/ωC ⇒ ω₀ = 1/√(LC); impedance is purely resistive, Z = R.',
              'Current at resonance: I = V/R.',
              'Inductor voltage: V_L = Iω₀L = (V/R)ω₀L = QV, using Q = ω₀L/R.',
              'Note: since Q ≫ 1 for high-quality circuits, component voltages can far exceed the supply — the classic "voltage magnification" remark.',
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
            text: 'Using the method of images, find the electric potential and the induced surface charge density for a point charge q held a distance d above a large grounded conducting plane. Verify that the total induced charge is −q.',
            solution: [
              'Setup: conductor fills z < 0, charge q at (0, 0, d). Remove the conductor and place an image −q at (0, 0, −d).',
              'Potential at any point (x, y, z) with z > 0:',
              '  V = (q/4πε₀)[1/√(x² + y² + (z−d)²) − 1/√(x² + y² + (z+d)²)].',
              'Boundary check: on the plane z = 0, the two distances are equal for every (x, y), so V = 0 — the grounded condition is satisfied, and by the uniqueness theorem this V is the solution in z > 0.',
              'Field at the surface: E_z(0) = −∂V/∂z|_{z=0} = −qd/(2π(x² + y² + d²)^{3/2}) (pointing into the conductor).',
              'Induced charge density: σ = ε₀E_n = −qd/(2π(x² + y² + d²)^{3/2}).',
              'Total induced charge: integrate σ over the plane —',
              '  Q = ∫₀^{2π}∫₀^∞ σ s ds dφ with s² = x² + y².',
              '  Substituting u = d² + s² (du = 2s ds) gives Q = −qd·2π/(2π)·∫_{d²}^∞ du/(2u^{3/2}) = −qd·[1/d] = −q.',
              'Physical remark: the charge is attracted to the plane with F = q²/(4πε₀(2d)²), and the image charge is a mathematical construct — it exists only in the excluded region.',
            ],
          },
          {
            number: 'Q7',
            marks: 14,
            text: 'State the Biot–Savart law. Use it to derive the magnetic field on the axis of a circular current loop of radius a carrying current I, at a distance x from the centre. Discuss the limits x = 0 and x ≫ a.',
            solution: [
              'Biot–Savart law: dB = (μ₀/4π) I dl × r̂ / r².',
              'Geometry: a loop element dl at angle; every field point on the axis is at distance r = √(a² + x²) from dl, with dl ⟂ r.',
              'Symmetry: the component of dB perpendicular to the axis cancels in pairs of opposite elements; only the axial component survives, contributing dB_axial = (μ₀I dl/4πr²)(a/r) (the factor a/r = sinθ from the projection).',
              'Integrate around the loop: B = (μ₀Ia/4πr³)∮dl = μ₀Ia²/(2(a² + x²)^{3/2}).',
              'Limit x = 0 (centre): B = μ₀I/2a — the standard result.',
              'Limit x ≫ a (dipole): B ≈ μ₀Ia²/2x³ = μ₀m/2πx³ with dipole moment m = Iπa²; the loop behaves as a magnetic dipole at large distances.',
              'Diagram marks: label a, x, r, dl and the angle in the figure; the projection factor a/r must be visible.',
            ],
          },
          {
            number: 'Q8',
            marks: 14,
            text: "Write Maxwell's four equations in differential form for vacuum, giving the physical meaning of each. Starting from them, derive the electromagnetic wave equation for E in free space and show that light is an electromagnetic wave.",
            solution: [
              "The four equations (vacuum):",
              '  ∇·E = ρ/ε₀ (Gauss: charges are sources/sinks of E).',
              '  ∇·B = 0 (no magnetic monopoles; B-field lines close).',
              '  ∇×E = −∂B/∂t (Faraday: changing B induces circulating E).',
              '  ∇×B = μ₀J + μ₀ε₀ ∂E/∂t (Ampere–Maxwell: currents and changing E generate B).',
              'Free space: ρ = 0, J = 0.',
              'Take the curl of Faraday\u2019s law: ∇×(∇×E) = −∂(∇×B)/∂t.',
              'Use the identity ∇×(∇×E) = ∇(∇·E) − ∇²E; the first term vanishes since ∇·E = 0.',
              'Substitute ∇×B = μ₀ε₀ ∂E/∂t: −∇²E = −μ₀ε₀ ∂²E/∂t², i.e.',
              '  ∇²E = μ₀ε₀ ∂²E/∂t² — the wave equation with speed v = 1/√(μ₀ε₀).',
              'Evaluate: 1/√(μ₀ε₀) = 1/√((4π×10⁻⁷)(8.854×10⁻¹²)) ≈ 3×10⁸ m/s = c, the measured speed of light.',
              'Conclusion: electromagnetic disturbances propagate at exactly the speed of light, so light must be an electromagnetic wave — Hertz\u2019s experiments confirmed it.',
            ],
          },
          {
            number: 'Q9',
            marks: 14,
            text: '(a) Starting from the energy stored in an inductor, obtain the energy density of the magnetic field. (b) Show similarly that the electric energy density is ½ε₀E² and write the combined energy density of the electromagnetic field. (c) A parallel-plate capacitor with plate area A and separation d is charged to voltage V. Find the energy stored and verify it equals the work done by the battery.',
            solution: [
              '(a) Establishing current: power delivered against the back-EMF is P = εI = LI dI/dt; integrate from 0 to I:',
              '  U = ∫LI dI = ½LI².',
              'For a solenoid, L = μ₀n²·(volume) and B = μ₀nI:',
              '  U = ½(μ₀n²Vol)(B/μ₀n)² = (B²/2μ₀)·Vol ⇒ u_B = B²/2μ₀.',
              'Although derived for a solenoid, u_B is a general pointwise result (any field can be locally built from solenoid-like pieces).',
              '(b) Charging a capacitor: dW = (q/C)dq; total W = ½QV = ½CV². With C = ε₀A/d and E = V/d:',
              '  U = ½(ε₀A/d)(Ed)² = (½ε₀E²)·(Ad) ⇒ u_E = ½ε₀E².',
              'Combined electromagnetic energy density: u = ε₀E²/2 + B²/2μ₀ (identical structure: field strength squared over constitutive constant).',
              '(c) Stored energy: U = ½CV² with C = ε₀A/d ⇒ U = ε₀AV²/2d.',
              'Battery work: W = QV = (CV)V = CV²; half is dissipated in charging transients/resistance and half is stored — the factor ½ is exactly the accounting of that loss, so the result is consistent.',
            ],
          },
          {
            number: 'Q10',
            marks: 14,
            text: '(a) Define electric displacement D and derive Gauss\u2019s law in dielectrics, ∇·D = ρ_free. (b) Using the Lorentz local-field argument, derive the Clausius–Mossotti relation and state its two key assumptions. (c) A slab of dielectric (ε_r = 4) partially fills a parallel-plate capacitor, occupying half the gap area with plates parallel to the plates of the capacitor; find the ratio of the capacitance to that of the empty capacitor.',
            solution: [
              '(a) In a dielectric, E is produced by free charge plus bound charge: ∇·E = (ρ_free + ρ_b)/ε₀ with ρ_b = −∇·P.',
              'Define D = ε₀E + P; then ∇·D = ε₀∇·E + ∇·P = (ρ_free + ρ_b) − ρ_b = ρ_free.',
              'Integral form: ∮D·dA = Q_free,enc — the flux of D depends only on controllable free charge.',
              '(b) Local field: a molecule in a polarised dielectric sits in a tiny spherical cavity; the field acting on it is E_local = E + P/3ε₀ (the cavity-surface integral of P·n̂ supplies P/3ε₀).',
              'Polarisation: P = NαE_local = Nα(E + P/3ε₀), N = number density, α = molecular polarisability.',
              'Substitute P = ε₀χₑE and solve: χₑ/(3 + χₑ) = Nα/3ε₀, which rearranges to',
              '  (ε_r − 1)/(ε_r + 2) = Nα/3ε₀ — the Clausius–Mossotti relation.',
              'Assumptions: (i) the dielectric is linear, isotropic and homogeneous; (ii) molecules are effectively point polarisable entities with no permanent dipole interaction (non-polar or ideal spherical polarisation).',
              '(c) Half the area is dielectric (ε_r), half is vacuum; both slabs share the same plate separation d and the same voltage — they are capacitors in parallel.',
              'C = ε₀(A/2)/d + ε₀ε_r(A/2)/d = (ε₀A/2d)(1 + ε_r) = (ε₀A/2d)(5).',
              'Empty capacitor: C₀ = ε₀A/d ⇒ C/C₀ = 5/2 = 2.5.',
            ],
          },
        ],
      },
    ],
  },
];
