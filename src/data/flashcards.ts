export type Flashcard = {
  id: string;
  paperCode: 'DSC-1' | 'DSC-2' | 'DSC-3';
  question: string;
  answer: string[];
};

export const FLASHCARDS: Flashcard[] = [
  // DSC-1: Mathematical Physics I
  {
    id: 'dsc1-taylor',
    paperCode: 'DSC-1',
    question: 'Write the Taylor expansion of f(x) about x = a, and state the meaning of each term.',
    answer: [
      'f(x) = f(a) + f′(a)(x−a) + f″(a)(x−a)²/2! + f‴(a)(x−a)³/3! + …',
      '• f(a) is the value at the expansion point.',
      '• f′(a)(x−a) is the linear (tangent) correction.',
      '• Higher derivatives correct the curvature at higher orders.',
      'Valid when successive derivatives exist and the remainder → 0 as n → ∞.',
    ],
  },
  {
    id: 'dsc1-ratio-test',
    paperCode: 'DSC-1',
    question: 'State the ratio test for the convergence of an infinite series and name one case where it fails.',
    answer: [
      'For Σ aₙ, compute L = lim (n→∞) |aₙ₊₁ / aₙ|.',
      '• L < 1: series converges absolutely.',
      '• L > 1: series diverges.',
      '• L = 1: the test is inconclusive.',
      'Fails (L = 1) for p-series like Σ 1/n³, which actually converge — use the integral or comparison test instead.',
    ],
  },
  {
    id: 'dsc1-div-curl',
    paperCode: 'DSC-1',
    question: 'Give the physical meaning of divergence and curl of a vector field, with one example each.',
    answer: [
      'Divergence (∇·F): net outflow per unit volume at a point — a source if positive, a sink if negative.',
      'Example: ∇·E = ρ/ε₀ (charges are sources of electrostatic field).',
      'Curl (∇×F): twice the local angular velocity of the field — measures local rotation.',
      'Example: ∇×B = μ₀J + μ₀ε₀ ∂E/∂t (currents and changing E swirl the magnetic field).',
    ],
  },
  {
    id: 'dsc1-eigen-checks',
    paperCode: 'DSC-1',
    question: 'How do you quickly verify the eigenvalues you computed for a matrix A are correct?',
    answer: [
      'Use two invariant checks:',
      '1. Trace: sum of eigenvalues = tr(A) = sum of diagonal entries.',
      '2. Determinant: product of eigenvalues = det(A).',
      'If either fails, an algebra slip occurred — recheck the characteristic equation det(A − λI) = 0.',
    ],
  },
  {
    id: 'dsc1-shm-ode',
    paperCode: 'DSC-1',
    question: 'Solve the second-order ODE y″ + 4y = 0 with y(0) = 1, y′(0) = 0.',
    answer: [
      'Try y = e^{mx}: m² + 4 = 0 ⇒ m = ±2i (complex conjugate roots).',
      'General solution: y = C₁ cos 2x + C₂ sin 2x.',
      'y(0) = 1 ⇒ C₁ = 1.',
      'y′(x) = −2 sin 2x + 2C₂ cos 2x; y′(0) = 0 ⇒ C₂ = 0.',
      'Answer: y = cos 2x.',
    ],
  },

  // DSC-2: Mechanics
  {
    id: 'dsc2-shell-theorem',
    paperCode: 'DSC-2',
    question: 'State and outline the proof of the shell theorem for a thin uniform spherical shell.',
    answer: [
      'Result: a uniform shell attracts an external particle as if all its mass were at the centre; inside the shell, the net field is zero.',
      '• Outside: divide the shell into rings defined by angle θ; integrate each ring’s contribution dM = (M/2) sinθ dθ along the line to the particle.',
      '• The integral gives g = GM/r², exactly as a point mass M at the centre.',
      '• Inside: the near part of the shell (small r, more mass) exactly cancels the far part; the integral over r from (R−r₀) to (R+r₀) gives g = 0.',
      'Conclusion: inside a uniform spherical planet, only the mass enclosed contributes to gravity.',
    ],
  },
  {
    id: 'dsc2-collision-types',
    paperCode: 'DSC-2',
    question: 'Distinguish elastic, inelastic and completely inelastic collisions: what is conserved in each?',
    answer: [
      'All collisions conserve total momentum (no external impulse).',
      '• Elastic: kinetic energy also conserved; objects separate; e = 1.',
      '• Inelastic: KE is partly lost to heat/deformation; e < 1; objects separate.',
      '• Completely inelastic: objects stick together and move with a common velocity; maximum KE loss consistent with momentum conservation; e = 0.',
      'Coefficient of restitution: e = (relative speed of separation)/(relative speed of approach).',
    ],
  },
  {
    id: 'dsc2-parallel-axis',
    paperCode: 'DSC-2',
    question: 'State the parallel axis theorem and use it to find the moment of inertia of a disc about an axis through a point on its rim, perpendicular to its plane.',
    answer: [
      'Theorem: I = I_cm + Mh², where h is the distance between the parallel axes.',
      'For a uniform disc: I_cm = MR²/2 (axis through centre, ⟂ to plane).',
      'Rim point: h = R.',
      'I = MR²/2 + MR² = (3/2) MR².',
    ],
  },
  {
    id: 'dsc2-time-dilation',
    paperCode: 'DSC-2',
    question: 'A muon lives τ₀ = 2.2 μs in its own frame and moves at v = 0.99c. How far does it travel in the lab frame?',
    answer: [
      'β = v/c = 0.99 ⇒ γ = 1/√(1−β²) ≈ 7.09.',
      'Lab-frame lifetime: Δt = γτ₀ ≈ 7.09 × 2.2 μs ≈ 15.6 μs.',
      'Distance in lab: d = v Δt ≈ 0.99 × 3×10⁸ × 15.6×10⁻⁶ ≈ 4.6 km.',
      'In the muon’s own frame, the atmosphere is length-contracted — both views agree on the outcome: many more muons reach sea level than Newtonian physics predicts.',
    ],
  },
  {
    id: 'dsc2-e-mc2',
    paperCode: 'DSC-2',
    question: 'Starting from E² = (pc)² + (mc²)², obtain the rest energy and the Newtonian limit of kinetic energy.',
    answer: [
      'Rest case (p = 0): E₀ = mc² — rest energy, the invariant mass–energy relation.',
      'For small v: p = γmv ≈ mv, and E = γmc².',
      'Kinetic energy: K = E − E₀ = (γ − 1) mc².',
      'Expand γ = 1 + β²/2 + … for β ≪ 1:',
      'K ≈ (β²/2) mc² = ½mv² — the Newtonian result recovered as the leading term.',
    ],
  },

  // DSC-3: Waves and Oscillations
  {
    id: 'dsc3-shm-solution',
    paperCode: 'DSC-3',
    question: 'Derive the equation of motion and solution for a mass m on a spring of constant k performing SHM.',
    answer: [
      'Hooke’s law: F = −kx. Newton’s second law: m x″ = −kx.',
      '⇒ x″ + (k/m) x = 0. Define ω = √(k/m).',
      'Standard form: x″ + ω²x = 0.',
      'General solution: x(t) = A sin(ωt + φ).',
      'A and φ come from initial conditions: A = √(x₀² + (v₀/ω)²), tanφ = ωx₀/v₀.',
      'Period T = 2π√(m/k), independent of amplitude (isochronous).',
    ],
  },
  {
    id: 'dsc3-shm-energy',
    paperCode: 'DSC-3',
    question: 'Show that total energy in SHM is constant and proportional to the square of the amplitude.',
    answer: [
      'x = A sin ωt ⇒ v = Aω cos ωt.',
      'KE = ½mv² = ½mω²A² cos²ωt.',
      'PE = ½kx² = ½kA² sin²ωt, and k = mω².',
      'Total E = ½mω²A² (cos²ωt + sin²ωt) = ½mω²A² = ½kA².',
      'E is time-independent and ∝ A². Energy oscillates between KE (max at x = 0) and PE (max at x = ±A).',
    ],
  },
  {
    id: 'dsc3-damping-cases',
    paperCode: 'DSC-3',
    question: 'Classify the motion of a damped oscillator x″ + 2bx′ + ω₀²x = 0 by the damping constant b.',
    answer: [
      'Try x = e^{λt}: λ = −b ± √(b² − ω₀²).',
      '• Light damping (b < ω₀): complex roots; oscillation with exponentially decaying amplitude A₀e^{−bt}.',
      '• Critical damping (b = ω₀): fastest return to equilibrium without oscillation — used in galvanometers and car shock absorbers.',
      '• Heavy (over) damping (b > ω₀): real distinct roots; slow, non-oscillatory crawl back to equilibrium.',
    ],
  },
  {
    id: 'dsc3-resonance',
    paperCode: 'DSC-3',
    question: 'Why does the resonant amplitude of a forced oscillator depend on damping? Give the expression and its physical meaning.',
    answer: [
      'Amplitude at (near) resonance: A_max ≈ F₀ / (2mbω).',
      'As b → 0, A_max → ∞ in the ideal limit: the oscillator absorbs energy from the driver in phase every cycle with nothing to dissipate it.',
      'Larger b (stronger damping) lowers the peak and broadens it — the resonance is less sharp.',
      'Sharpness is measured by the quality factor Q = ω₀/2b: high Q means a tall, narrow resonance (e.g. a ringing tuning fork), low Q a flat response.',
    ],
  },
  {
    id: 'dsc3-wave-speed',
    paperCode: 'DSC-3',
    question: 'Derive the speed of a transverse wave on a stretched string, v = √(T/μ).',
    answer: [
      'Consider a string element of length ds = v dt carrying a pulse; tension T acts at both ends at angle θ.',
      'Transverse force: F_y = T sinθ ≈ T tanθ = T (∂y/∂x).',
      'Mass per unit length μ accelerated transversely: μ ds (v /? ) — more directly, applying Newton’s law to the element:',
      'μ ∂²y/∂t² = T ∂²y/∂x²  ⇒  ∂²y/∂t² = (T/μ) ∂²y/∂x².',
      'Compare with the wave equation ∂²y/∂t² = v² ∂²y/∂x² ⇒ v = √(T/μ).',
      'Heavier strings (larger μ) carry slower waves; tighter strings carry faster ones.',
    ],
  },
  {
    id: 'dsc3-phase-group',
    paperCode: 'DSC-3',
    question: 'Define phase velocity and group velocity, and give their relation for a dispersive medium.',
    answer: [
      'Phase velocity: v_p = ω/k — speed of an individual wave crest of a single frequency.',
      'Group velocity: v_g = dω/dk — speed of the envelope (wave packet), i.e. the speed at which energy/information travels.',
      'Relation: v_g = v_p − λ dv_p/dλ.',
      '• Non-dispersive medium (dv_p/dλ = 0): v_g = v_p.',
      '• Normal dispersion: v_g < v_p. Deep-water waves are anomalous: v_g = v_p/2.',
    ],
  },
];
