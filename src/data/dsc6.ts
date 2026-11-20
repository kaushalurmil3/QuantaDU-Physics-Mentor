import type { DetailedPaper } from './types';

export const DSC6: DetailedPaper = {
  kind: 'detailed',
  id: 'dsc6',
  code: 'DSC-6',
  name: 'Electrical Circuit Analysis',
  playlist: {
    label: 'NPTEL Basic Electrical Circuits (IIT Madras)',
    url: 'https://www.youtube.com/results?search_query=NPTEL+Electrical+Circuit+Analysis+IIT+Madras',
  },
  chapters: [
    {
      title: "Chapter 1: DC & AC Circuit Theorems",
      topics: [
        "Kirchhoff's laws; mesh and nodal analysis",
        'Superposition theorem',
        "Thevenin's and Norton's theorems",
        'Maximum Power Transfer theorem',
        'AC/DC network analysis',
      ],
      notes: [
        "Kirchhoff's laws are the foundation of all circuit analysis: the junction rule ΣI = 0 (charge conservation) and the loop rule ΣV = 0 (energy conservation). Mesh analysis applies the loop rule to independent loops with assigned circulating currents; nodal analysis applies the junction rule to node voltages relative to a ground. Choose nodal analysis when the circuit has few nodes and many branches — that judgement call is itself examined.",
        'Superposition: in a linear circuit with several independent sources, the current/voltage anywhere is the algebraic sum of the contributions of each source acting alone. When deactivating a source, replace an ideal voltage source with a short circuit and an ideal current source with an open circuit — stating this deactivation rule correctly is the most-tested detail of the theorem. It applies to linear circuits only; it never works for power directly, since power is quadratic in currents and voltages.',
        "Thevenin's theorem: any linear two-terminal network of sources and resistors is equivalent to a single source V_Th in series with R_Th, found by open-circuiting the load (V_Th = V_oc) and killing sources to measure R_Th. Norton's theorem is the dual — a current source I_N = I_sc in parallel with R_Th, with R_N = R_Th and I_N = V_Th/R_Th. Source transformation (V_Th–R_Th series ⇌ I_N–R_N parallel) lets you shuffle between the two freely, and numericals on maximum power transfer are almost always solved by Thevenin reduction first.",
        'Maximum Power Transfer: a source with Thevenin impedance Z_Th delivers maximum average power to a load Z_L when Z_L = Z_Th* — the complex conjugate. For a purely resistive network this reduces to R_L = R_Th, and the peak power is P_max = V_Th²/4R_Th. Note the efficiency in the matched case is only 50% (equal power dissipated in source and load) — quoting this caveat is a favourite follow-up mark. For reactive loads, match the resistances and cancel the reactances (X_L = −X_Th).',
        'The theorems work identically in AC (using phasor impedances) and DC (plain resistances). The only change: use complex arithmetic and jω-impedances (Z_R = R, Z_L = jωL, Z_C = 1/jωC). Practising one theorem in both DC and AC forms is the efficient way to revise this chapter.',
      ],
      derivations: [
        "Maximum power transfer (DC): load R_L on a Thevenin source V_Th, R_Th; current I = V_Th/(R_Th + R_L); power P = I²R_L = V_Th²R_L/(R_Th + R_L)²; differentiate with respect to R_L, set dP/dR_L = 0, and solve: R_L = R_Th, giving P_max = V_Th²/4R_Th.",
        "Maximum power transfer (AC): with Z_L = R_L + jX_L and Z_Th = R_Th + jX_Th, P = |V_Th|²R_L/((R_Th + R_L)² + (X_Th + X_L)²); first set X_L = −X_Th (kills the reactance term), then maximise over R_L exactly as in the DC case to get R_L = R_Th — i.e. Z_L = Z_Th*.",
        "Thevenin's theorem (proof sketch): apply superposition — network without load plus injected opposing current at the terminals; the linearity of the network equations guarantees the terminal voltage–current relation V = V_oc − I R_int for some R_int, which is the Thevenin form; R_int is measured with sources deactivated.",
        'Norton/Thevenin equivalence: with the load removed, V_oc = V_Th; with the terminals shorted, I_sc = V_Th/R_Th; a source with open-circuit voltage V_Th and short-circuit current V_Th/R_Th is indistinguishable at the terminals from either model — equivalence follows.',
      ],
      formulas: [
        { name: "Kirchhoff's loop rule", expr: 'Σ V = 0 around any closed loop' },
        { name: "Thevenin's equivalent", expr: 'V_load = V_Th · R_L/(R_Th + R_L)' },
        { name: 'Norton equivalent', expr: 'I_N = V_Th / R_Th,  R_N = R_Th' },
        { name: 'Max power transfer (DC)', expr: 'R_L = R_Th ⇒ P_max = V_Th² / 4R_Th' },
        { name: 'Max power transfer (AC)', expr: 'Z_L = Z_Th* (complex conjugate)' },
        { name: 'Impedances', expr: 'Z_R = R,  Z_L = jωL,  Z_C = 1/(jωC)' },
      ],
      tips: [
        'Reduce the circuit to its Thevenin equivalent before any maximum-power or load-analysis question — it turns a hard problem into two lines.',
        'In superposition, deactivate sources correctly (short ideal voltage sources, open ideal current sources) and label which sub-circuit each contribution came from.',
        'State "linear network" as a condition of applicability when quoting a theorem — it is an assumption mark.',
      ],
    },
    {
      title: 'Chapter 2: Complex Impedance & AC Bridges',
      topics: [
        'Phasors and complex impedance',
        'Series and parallel LCR resonance',
        'Bandwidth and Q-factor',
        'Maxwell, Schering and Wien AC bridges',
      ],
      notes: [
        'Phasor analysis converts steady-state AC problems into complex algebra: a sinusoid v(t) = V_m cos(ωt + φ) becomes the phasor V = V_m∠φ, and impedances are complex numbers Z = R + jX. Ohm\'s and Kirchhoff\'s laws hold in phasor form, so every DC technique from Chapter 1 transfers directly. Expressing both impedance and admittance (Y = 1/Z) in rectangular and polar forms, and converting between them, is the mechanical skill this chapter rests on.',
        'Series LCR resonance: impedance Z = R + j(ωL − 1/ωC) is purely real and minimum (= R) when ωL = 1/ωC, i.e. at ω₀ = 1/√(LC). At resonance the current peaks at V/R, the voltage across L and C can each exceed the source voltage (Q times, in fact), and the power factor is unity. The parallel (anti-resonance) case is the dual: impedance is maximum at ω₀ and line current dips to a minimum — knowing which quantity peaks and which dips in each case settles half the conceptual questions.',
        'Q-factor and bandwidth: Q = ω₀L/R = 1/(ω₀CR) = (1/R)√(L/C) measures the sharpness of resonance. The bandwidth Δω = ω₂ − ω₁ between half-power (3 dB) frequencies satisfies Δω = ω₀/Q. High Q means a narrow, selective circuit (radio tuning); low Q means a broad response. Deriving Δω = ω₀/Q from |Z| = √2·R is the standard examined step.',
        'AC bridges extend Wheatstone\'s idea to impedances: four arms, a null detector, and the balance condition Z₁Z₃ = Z₂Z₄, which in general splits into two real equations (magnitude and phase). Because there are two conditions, an AC bridge needs two adjustable elements to balance.',
        'The named bridges each target a specific measurement: the Maxwell bridge (inductance in terms of a known capacitance and resistance — best for low-Q coils), the Schering bridge (capacitance and dissipation factor of a capacitor — the standard instrument for dielectric testing, used at high voltages), and the Wien bridge (frequency measurement and, in its amplifier-equipped form, the Wien-bridge oscillator). For each, memorise the balance condition and the one-line "what it measures" — that pairing is exactly what the exam asks.',
      ],
      derivations: [
        'Series resonance: write Z(ω) = R + j(ωL − 1/ωC); set the imaginary part to zero for resonance ⇒ ω₀ = 1/√(LC); expand |Z(ω)|² about ω₀ and set it equal to 2R² to find the half-power frequencies, giving Δω = R/L = ω₀/Q.',
        'Q-factor: define Q = ω₀/Δω; substitute ω₀ = 1/√(LC) and Δω = R/L to get Q = ω₀L/R = (1/R)√(L/C); verify the voltage step-up across L at resonance: V_L = Q·V.',
        "Maxwell bridge balance: arms Z₁ = R₁ + jωL₁ (unknown), Z₂ = R₂, Z₃ = R₃, Z₄ = 1/(1/R₄ + jωC₄); impose Z₁Z₃ = Z₂Z₄, separate real and imaginary parts ⇒ L₁ = R₂R₃C₄ and R₁ = R₂R₃/R₄ — both components of the unknown coil in one balance.",
        "Schering bridge balance: with the unknown capacitor (C₁, series r₁) in arm 1, balance yields C₁ = C₄R₃/R₂ and r₁ = C₄/(C₃)·(R₂)… reduced to the dissipation factor D = ωC₁r₁ = ωC₄R₄; emphasise D as the measured quantity.",
        "Wien bridge: arms are series RC and parallel RC; balance requires ω² = 1/(R₁R₂C₁C₂) and the amplitude condition R₃/R₄ = R₂/C-ratio; at ω = 1/RC the bridge measures the source frequency directly.",
      ],
      formulas: [
        { name: 'Series LCR impedance', expr: 'Z = R + j(ωL − 1/ωC)' },
        { name: 'Resonant frequency', expr: 'ω₀ = 1/√(LC),  f₀ = 1/(2π√(LC))' },
        { name: 'Q-factor (series)', expr: 'Q = ω₀L/R = 1/(ω₀CR) = (1/R)√(L/C)' },
        { name: 'Bandwidth', expr: 'Δω = ω₂ − ω₁ = ω₀/Q' },
        { name: 'AC bridge balance', expr: 'Z₁Z₃ = Z₂Z₄ (magnitude AND phase)' },
        { name: 'Maxwell bridge', expr: 'L₁ = R₂R₃C₄,  R₁ = R₂R₃/R₄' },
        { name: 'Schering bridge dissipation factor', expr: 'D = tanδ = ωC₁r₁ = ωC₄R₄' },
        { name: 'Wien bridge frequency', expr: 'ω = 1/(RC) (equal R, equal C arms)' },
      ],
      tips: [
        'Convert every element to its jω impedance before writing any loop equation — mixing instantaneous and phasor quantities is the classic error.',
        'At series resonance remember: Z minimum, I maximum, P unity; at parallel resonance, the reverse. Recite this pair when a conceptual question appears.',
        'For bridges, always separate the balance condition into magnitude and phase equations — a single complex equation hides the two real conditions the examiner wants.',
      ],
    },
    {
      title: 'Chapter 3: Two-Port Networks & Coupled Circuits',
      topics: [
        'Z, Y, h and ABCD parameters',
        'Magnetically coupled coils',
        'Coefficient of coupling',
        'Ideal transformers',
      ],
      notes: [
        'A two-port network is any circuit accessed through two terminal pairs (input and output). Because only four terminal variables exist (V₁, I₁, V₂, I₂), any linear two-port is described by a 2×2 parameter matrix: Z-parameters (open-circuit impedance), Y-parameters (short-circuit admittance), h-parameters (hybrid — used for transistors), and ABCD or transmission parameters (used for cascaded networks like transmission lines and filters). The open-circuit/short-circuit measurement definitions are what the exam tests first.',
        'Parameter interconversion: for any given network, all parameter sets describe the same behaviour and can be converted (e.g. from Z to Y by matrix inversion). T and π networks give clean Z and Y parameters respectively, and h-parameters sit naturally between them — being able to compute the parameter set for a T-network of resistors is the standard drill.',
        "Magnetically coupled coils: a current i₁ in coil 1 links coil 2 with mutual inductance M; v₂ = M di₁/dt. The dot convention fixes the sign: a current entering the dotted terminal of one coil induces a positive voltage at the dotted terminal of the other. Getting the dot convention right is the make-or-break of every coupled-circuit problem — state it before writing loop equations.",
        'Coefficient of coupling k = M/√(L₁L₂), with 0 ≤ k ≤ 1 by energy arguments: k = 1 means perfect flux linkage (tight core), k small means loose coupling (air core). Deriving the bound from the inequality L₁L₂ − M² ≥ 0 (positive definiteness of the coupled energy) is a compact, frequently asked proof.',
        'The ideal transformer is the k = 1, lossless limit: voltage ratio v₁/v₂ = N₁/N₂, current ratio i₁/i₂ = N₂/N₁, and impedance transformation Z_in = (N₁/N₂)² Z_load. Applications: impedance matching for maximum power transfer (directly connecting to Chapter 1\'s theorem) and stepped power transmission. Deriving the impedance transformation from the turns ratios is the standard 6-mark tail of a long question.',
      ],
      derivations: [
        'Z-parameters of a T-network: write loop equations V₁ = (Z₁ + Z₃)I₁ + Z₃I₂ and V₂ = Z₃I₁ + (Z₂ + Z₃)I₂; read off Z₁₁ = Z₁ + Z₃, Z₁₂ = Z₂₁ = Z₃, Z₂₂ = Z₂ + Z₃; note the symmetry/reciprocity condition Z₁₂ = Z₂₁ for passive networks.',
        'Coupled-coil energy and the k-bound: coupled energy W = ½L₁I₁² + ½L₂I₂² ± MI₁I₂ must be non-negative for all (I₁, I₂); the discriminant condition gives M ≤ √(L₁L₂), hence k = M/√(L₁L₂) ≤ 1.',
        "Dot-convention loop equations: for two meshes coupled by M, write mesh 1: V = R₁I₁ + L₁dI₁/dt + M dI₂/dt (sign per dots) and mesh 2 analogously; solve the coupled pair for the transfer function I₂/I₁ — work one sign convention fully and the rest follows.",
        'Ideal transformer impedance transformation: with v₁/v₂ = N₁/N₂ and i₁/i₂ = N₂/N₁, the input impedance Z_in = v₁/i₁ = (N₁/N₂)²·(v₂/i₂) = (N₁/N₂)² Z_L; then set Z_in = Z_source (via Chapter 1\'s maximum power theorem) to find the matching turns ratio N₁/N₂ = √(Z_source/Z_L).',
      ],
      formulas: [
        { name: 'Z-parameters', expr: 'V₁ = Z₁₁I₁ + Z₁₂I₂ ;  V₂ = Z₂₁I₁ + Z₂₂I₂' },
        { name: 'h-parameters', expr: 'V₁ = h₁₁I₁ + h₁₂V₂ ;  I₂ = h₂₁I₁ + h₂₂V₂' },
        { name: 'ABCD (transmission)', expr: 'V₁ = AV₂ + B(−I₂) ;  I₁ = CV₂ + D(−I₂)' },
        { name: 'Mutual inductance', expr: 'v₂ = M dI₁/dt,  M = k√(L₁L₂)' },
        { name: 'Coupling bound', expr: '0 ≤ k ≤ 1 (from energy positivity)' },
        { name: 'Ideal transformer', expr: 'v₁/v₂ = N₁/N₂,  i₁/i₂ = N₂/N₁,  Z_in = (N₁/N₂)² Z_L' },
      ],
      tips: [
        'Always mark the dots and declare the sign convention before writing coupled-circuit equations; silent sign errors sink entire numericals.',
        'Reciprocity check (Z₁₂ = Z₂₁ for passive networks) is a free self-check on computed parameters.',
        'For cascaded networks use ABCD parameters (they multiply), then convert — examiners set cascade questions specifically to test this.',
      ],
    },
  ],
};
