export type LabSemester = {
  semester: number;
  experiments: string;
  topics: string[];
  vivaTips: string[];
};

export const LAB_MARKS = [
  {
    component: 'End-Semester Lab Exam',
    marks: 30,
    detail: 'External exam: one full experiment performed in the lab, with readings, calculations and error analysis.',
  },
  {
    component: 'Lab Record / Practical File',
    marks: 10,
    detail: 'Certified file with all experiments written in the standard format — aim, apparatus, theory, procedure, observations, result with units.',
  },
  {
    component: 'Viva-Voce',
    marks: 5,
    detail: 'Oral questions on theory, apparatus, sources of error and the physics behind your experiment.',
  },
  {
    component: 'Continuous Evaluation',
    marks: 5,
    detail: 'Attendance, regular performance in weekly lab sessions and class tests.',
  },
];

export const LAB_SEMESTERS: LabSemester[] = [
  {
    semester: 1,
    experiments: 'Measurements, mechanics & computing basics',
    topics: [
      'Error analysis, significant figures and propagation of errors',
      'Graph plotting and least-squares straight-line fitting',
      'Simple pendulum: determination of g; correction for finite amplitude',
      'Spring-mass system: time period and acceleration due to gravity',
      'Introduction to programming for physicists (basic C/Python exercises)',
    ],
    vivaTips: [
      'Be ready to define random vs. systematic error and give one correction for each in your experiment.',
      'Explain why we plot T² vs. L (pendulum) instead of T vs. L — the straight-line trick.',
      'Know the least count of every instrument you used: metre scale (0.1 cm), vernier calliper (0.01 cm), screw gauge (0.001 cm).',
    ],
  },
  {
    semester: 2,
    experiments: 'AC/DC circuits & computational exercises',
    topics: [
      'Series and parallel RC, RL and RLC circuits: phase, impedance and resonance',
      'Wheatstone bridge: specific resistance of a wire; Carey-Foster variation',
      'Potentiometer: measurement of EMF and internal resistance of a cell',
      'Charging and discharging of a capacitor through a resistor',
      'Computational exercises: curve fitting and simulation of circuit transients',
    ],
    vivaTips: [
      'State the balance condition of the Wheatstone bridge and why the galvanometer shows no deflection at balance.',
      'Explain why a potentiometer measures the true EMF (no current drawn at balance) while a voltmeter does not.',
      'Draw the phasor diagram for a series RLC circuit at, below and above resonance without hesitating.',
    ],
  },
  {
    semester: 3,
    experiments: 'Electronics, optics & waves lab',
    topics: [
      'Logic gates: truth tables of AND, OR, NOT, NAND, NOR using ICs',
      'Flip-flops and latches: RS and JK behaviour on a digital trainer',
      'Optics experiments: Newton\u2019s rings, Young\u2019s double slit, diffraction grating',
      'Polarisation: verification of Malus\u2019 law; Brewster\u2019s angle',
      'Waves on a string: verification of v = √(T/μ) and Meldé\u2019s experiments',
    ],
    vivaTips: [
      'Convert every gate circuit to its NAND-only (or NOR-only) equivalent — a favourite viva question.',
      'For Newton\u2019s rings, explain why the central spot is dark in reflected light (λ/2 phase flip).',
      'Carry your grating/interference formulae: nλ = 2d sinθ, d sinθ = nλ, and know how λ was extracted from your graph.',
    ],
  },
  {
    semester: 4,
    experiments: 'Modern physics & transistor circuits lab',
    topics: [
      'e/m measurement of the electron (Thomson method / helical method)',
      'Black-body radiation: Stefan-Boltzmann law and Planck constant estimation (photo-cell)',
      'Photoelectric effect: determination of Planck\u2019s constant',
      'Transistor characteristics: CB, CE configurations; input/output resistance',
      'Transistor amplifier: voltage gain measurement and frequency response',
    ],
    vivaTips: [
      'Explain how the magnetic field B is produced and measured in the e/m tube (Helmholtz coils formula).',
      'Know the working of the filter circuits and the role of the collector current in the CE output characteristics.',
      'Sketch the photo-cell I–V curves for two intensities and explain why saturation current changes but stopping voltage does not.',
    ],
  },
  {
    semester: 5,
    experiments: 'EM & condensed matter experiments',
    topics: [
      'Hall effect: determination of the Hall coefficient and carrier type/density',
      'Magnetic susceptibility: Quincke\u2019s method and/or Gouy balance',
      'Microwave experiments: klystron characteristics, standing wave ratio, Brewster angle in microwaves',
      'Electromagnetic experiments: LCR resonance quality factor, coupled circuits',
      'Dielectric constant measurement of a material',
    ],
    vivaTips: [
      'Explain the sign of the Hall voltage for p-type vs n-type semiconductors — the standard viva opener.',
      'Be able to derive the Hall coefficient R_H = 1/ne and state what each symbol becomes in your calculation.',
      'For microwaves, know what the klystron repeller voltage does and how the SWR is measured with the slotted line.',
    ],
  },
  {
    semester: 6,
    experiments: 'Nuclear, spectroscopy & data analysis lab',
    topics: [
      'Nuclear counting statistics: GM counter, Poisson and Gaussian distributions of counts',
      'Verification of the inverse square law and half-life measurement of a radioisotope',
      'Spectroscopy: hydrogen spectrum and determination of the Rydberg constant',
      'Absorption of gamma/beta radiation; attenuation coefficient of a material',
      'Statistical data analysis of laboratory data: mean, variance, chi-square test',
    ],
    vivaTips: [
      'Explain dead time of the GM counter and why counts follow Poisson statistics (rare independent events).',
      'Know how the Rydberg constant follows from the Balmer series plot of 1/λ vs. (1/4 − 1/n²).',
      'Carry the definitions: activity (Becquerel), half-life vs. mean life, and the attenuation law I = I₀e^{−μx}.',
    ],
  },
];
