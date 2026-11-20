import type { Semester, SyllabusPaper } from './types';
import { DSC1, DSC2, DSC3, DSC4, DSC5, DSC6, DSC7, DSC8, DSC9, DSC10, DSC11, DSC12 } from '.';

function sp(
  id: string,
  code: string,
  name: string,
  chapters: [string, string[]][]
): SyllabusPaper {
  return {
    kind: 'syllabus',
    id,
    code,
    name,
    chapters: chapters.map(([title, topics]) => ({ title, topics })),
  };
}

const SEM2: SyllabusPaper[] = [
  sp('dsc4', 'DSC-4', 'Mathematical Physics II', [
    ['Chapter 1: Fourier Series & Transforms', ['Periodic functions and orthogonality of sines/cosines', 'Dirichlet conditions and convergence', 'Fourier series of standard waveforms', 'Fourier transform and its physical meaning']],
    ['Chapter 2: Special Functions', ['Legendre polynomials and generating function', 'Hermite and Laguerre polynomials', 'Beta and Gamma functions', 'Rodrigues’ recurrence relations']],
    ['Chapter 3: Partial Differential Equations', ['Wave equation and its solution', 'Heat conduction (diffusion) equation', 'Laplace equation; separation of variables', 'Boundary value problems in physics']],
  ]),
  sp('dsc5', 'DSC-5', 'Electricity and Magnetism', [
    ['Chapter 1: Electrostatics', ['Coulomb’s law and electric field', 'Gauss’s law and applications', 'Electric potential; conductors and capacitors', 'Dielectrics and polarisation']],
    ['Chapter 2: Magnetostatics & Electrodynamics', ['Biot–Savart law and Ampère’s law', 'Magnetic vector potential', 'Faraday’s law of induction', 'Displacement current and Maxwell’s equations']],
    ['Chapter 3: Electromagnetic Waves & Circuits', ['EM wave propagation in vacuum and matter', 'Poynting vector and energy flow', 'AC circuits: impedance and resonance', 'Maxwell’s equations in differential form']],
  ]),
  sp('dsc6', 'DSC-6', 'Electrical Circuit Analysis', [
    ['Chapter 1: DC Circuit Analysis', ['Kirchhoff’s laws; mesh and node analysis', 'Network theorems: Thevenin, Norton, superposition', 'Transient analysis of RC, RL circuits', 'Maximum power transfer']],
    ['Chapter 2: AC Circuits & Resonance', ['Phasor analysis of series and parallel circuits', 'Series and parallel resonance; Q factor', 'Power factor and real/reactive power', 'Three-phase circuits']],
    ['Chapter 3: Two-Port Networks & Filters', ['Two-port parameters (Z, Y, h)', 'Low-pass, high-pass, band-pass filters', 'Attenuators and coupled circuits', 'Laplace transform techniques for circuits']],
  ]),
];

const SEM3: SyllabusPaper[] = [
  sp('dsc7', 'DSC-7', 'Mathematical Physics III', [
    ['Chapter 1: Complex Analysis', ['Analytic functions; Cauchy–Riemann conditions', 'Complex integration; Cauchy’s theorem', 'Taylor and Laurent expansions', 'Residue theorem and contour integration']],
    ['Chapter 2: Integral Transforms', ['Laplace transform and physical applications', 'Convolution theorem', 'Fourier transforms revisited', 'Green’s function approach']],
    ['Chapter 3: Calculus of Variations', ['Euler–Lagrange equation', 'Brachistochrone problem', 'Functional derivatives', 'Constrained variations']],
  ]),
  sp('dsc8', 'DSC-8', 'Thermal Physics', [
    ['Chapter 1: Thermodynamics', ['Laws of thermodynamics and entropy', 'Thermodynamic potentials and Maxwell relations', 'Carnot cycle and heat engines', 'Third law and absolute temperature']],
    ['Chapter 2: Kinetic Theory', ['Maxwell–Boltzmann distribution', 'Mean free path and transport phenomena', 'Equipartition of energy', 'Real gases and van der Waals equation']],
    ['Chapter 3: Statistical Mechanics (Introduction)', ['Microstates and macrostates', 'Boltzmann distribution', 'Partition function and thermodynamic quantities', 'Blackbody radiation: Planck’s law']],
  ]),
  sp('dsc9', 'DSC-9', 'Light and Matter', [
    ['Chapter 1: Wave Optics', ['Interference: Young’s double slit, thin films', 'Diffraction: Fraunhofer and Fresnel', 'Polarisation; Malus’ law, Brewster’s angle', 'Resolving power and gratings']],
    ['Chapter 2: Quantum Nature of Light', ['Photoelectric effect', 'Compton scattering', 'Wave–particle duality', 'de Broglie hypothesis and electron diffraction']],
    ['Chapter 3: Matter Waves & Introductory QM', ['Heisenberg uncertainty principle', 'Wave packets and dispersion', 'Double-slit with particles', 'Matter wave interference experiments']],
  ]),
];

const SEM4: SyllabusPaper[] = [
  sp('dsc10', 'DSC-10', 'Modern Physics', [
    ['Chapter 1: Special Relativity II', ['Relativistic kinematics and dynamics', 'Invariant mass and collisions', 'Doppler effect for light', 'Introduction to general relativity concepts']],
    ['Chapter 2: Quantum Mechanics I', ['Schrödinger equation; wave function interpretation', 'Particle in a box; tunnelling', 'Hydrogen atom energy levels', 'Angular momentum quantisation']],
    ['Chapter 3: Nuclear & Particle Physics (Intro)', ['Nuclear structure and binding energy', 'Radioactive decay laws', 'Fission and fusion', 'Elementary particles and the standard model']],
  ]),
  sp('dsc11', 'DSC-11', 'Solid State Physics', [
    ['Chapter 1: Crystal Structure', ['Crystal lattices and unit cells', 'Bragg’s law and X-ray diffraction', 'Crystal binding and cohesion', 'Reciprocal lattice']],
    ['Chapter 2: Electronic Properties', ['Free electron theory; Fermi energy', 'Band theory of solids', 'Conductors, semiconductors, insulators', 'Hall effect']],
    ['Chapter 3: Magnetic & Dielectric Properties', ['Diamagnetism, paramagnetism, ferromagnetism', 'Curie law and hysteresis', 'Polarisation mechanisms', 'Superconductivity basics']],
  ]),
  sp('dsc12', 'DSC-12', 'Analog Systems and Applications', [
    ['Chapter 1: Semiconductor Devices', ['p-n junction diode; rectifiers', 'Bipolar junction transistor characteristics', 'FETs and MOSFETs', 'Amplifier biasing and load lines']],
    ['Chapter 2: Amplifiers & Oscillators', ['Small-signal amplifiers; frequency response', 'Feedback amplifiers', 'Operational amplifiers and applications', 'Oscillator circuits; phase shift and Wien bridge']],
    ['Chapter 3: Wave Shaping & Power Supplies', ['Clippers, clampers and multivibrators', 'Regulated power supplies', '555 timer applications', 'Signal generators']],
  ]),
];

const SEM5: SyllabusPaper[] = [
  sp('dsc13', 'DSC-13', 'Electromagnetic Theory', [
    ['Chapter 1: Electrostatics & Magnetostatics II', ['Boundary value problems; method of images', 'Multipole expansion', 'Magnetic fields in matter', 'Maxwell stress tensor']],
    ['Chapter 2: Time-Varying Fields & Waves', ['Maxwell’s equations in matter', 'EM waves in conducting and non-conducting media', 'Reflection, refraction, Fresnel equations', 'Waveguides and cavities']],
    ['Chapter 3: Radiation & Relativistic EM', ['Radiation from an oscillating dipole', 'Retarded potentials', 'Relativistic transformation of E and B fields', 'Field tensors']],
  ]),
  sp('dsc14', 'DSC-14', 'Quantum Mechanics I', [
    ['Chapter 1: Formalism of QM', ['Hilbert space and states', 'Operators and observables; commutators', 'Measurement postulate; expectation values', 'Dirac notation']],
    ['Chapter 2: One-Dimensional Systems', ['Harmonic oscillator (operator and differential methods)', 'Potential steps and barriers', 'Tunnelling and α-decay', 'WKB approximation']],
    ['Chapter 3: Angular Momentum & Hydrogen Atom', ['Spherical harmonics', 'Angular momentum algebra', 'Hydrogen atom solution', 'Spin and Pauli matrices']],
  ]),
  sp('dsc15', 'DSC-15', 'Digital Systems and Applications', [
    ['Chapter 1: Digital Fundamentals', ['Number systems and Boolean algebra', 'Logic gates; minimisation (K-maps)', 'Combinational circuits: adders, multiplexers', 'Decoders and encoders']],
    ['Chapter 2: Sequential Circuits', ['Flip-flops and latches', 'Counters and shift registers', 'Finite state machines', 'Timing diagrams']],
    ['Chapter 3: Applications', ['Memories: RAM, ROM', 'D/A and A/D converters', 'Microprocessor basics (8085)', 'Simple microprocessor programming']],
  ]),
];

const SEM6: SyllabusPaper[] = [
  sp('dsc16', 'DSC-16', 'Statistical Mechanics', [
    ['Chapter 1: Foundations', ['Macrostates, microstates, entropy', 'Classical and quantum statistics overview', 'Density of states', 'Partition function and free energy']],
    ['Chapter 2: Ensembles', ['Microcanonical, canonical and grand canonical ensembles', 'Partition functions and thermodynamic quantities', 'Equipartition theorem applications', 'Fluctuations']],
    ['Chapter 3: Quantum Statistics', ['Bose–Einstein and Fermi–Dirac distributions', 'Blackbody radiation and photon gas', 'Bose–Einstein condensation', 'Electron gas in metals; Pauli paramagnetism']],
  ]),
  sp('dsc17', 'DSC-17', 'Atomic and Molecular Physics', [
    ['Chapter 1: Atomic Spectra', ['Bohr model and refinements', 'Stern–Gerlach experiment and spin', 'Fine structure and Lamb shift', 'Zeeman and Stark effects']],
    ['Chapter 2: Molecular Structure', ['Molecular bonding: ionic, covalent', 'Rotational and vibrational spectra', 'Raman spectroscopy', 'Nuclear magnetic resonance basics']],
    ['Chapter 3: Laser Physics', ['Einstein coefficients; population inversion', 'Optical cavities and modes', 'Types of lasers: He-Ne, Nd:YAG, semiconductor', 'Laser applications']],
  ]),
  sp('dsc18', 'DSC-18', 'Nuclear and Particle Physics', [
    ['Chapter 1: Nuclear Properties & Models', ['Nuclear size, mass, binding energy', 'Liquid drop model; semi-empirical mass formula', 'Shell model; nuclear spin and moments', 'Nuclear stability and decay modes']],
    ['Chapter 2: Nuclear Reactions & Detectors', ['Nuclear fission and fusion', 'Cross sections; compound nucleus', 'Accelerators', 'Radiation detectors: GM counter, scintillators']],
    ['Chapter 3: Particle Physics', ['Classification of elementary particles', 'Conservation laws; quark model', 'Weak interactions; neutrinos', 'Standard Model overview']],
  ]),
];

export const SEMESTERS: Semester[] = [
  {
    id: 1,
    label: 'Semester 1',
    active: true,
    tagline: 'Full notes, flashcards and sample paper active',
    papers: [DSC1, DSC2, DSC3],
  },
  {
    id: 2,
    label: 'Semester 2',
    active: true,
    tagline: 'Full notes, flashcards and sample paper active',
    papers: [DSC4, DSC5, DSC6],
  },
  {
    id: 3,
    label: 'Semester 3',
    active: true,
    tagline: 'Full notes, flashcards and sample paper active',
    papers: [DSC7, DSC8, DSC9],
  },
  {
    id: 4,
    label: 'Semester 4',
    active: true,
    tagline: 'Full notes, flashcards and sample paper active',
    papers: [DSC10, DSC11, DSC12],
  },
  {
    id: 5,
    label: 'Semester 5',
    active: true,
    tagline: 'Chapter syllabus + AI Study Guide Generator',
    papers: SEM5,
  },
  {
    id: 6,
    label: 'Semester 6',
    active: true,
    tagline: 'Chapter syllabus + AI Study Guide Generator',
    papers: SEM6,
  },
  {
    id: 7,
    label: 'Semester 7',
    active: false,
    tagline: 'Coming soon',
    papers: [],
  },
  {
    id: 8,
    label: 'Semester 8',
    active: false,
    tagline: 'Coming soon',
    papers: [],
  },
];
