import type { DetailedPaper } from './types';

export const DSC15: DetailedPaper = {
  kind: 'detailed',
  id: 'dsc15',
  code: 'DSC-15',
  name: 'Digital Systems and Applications',
  playlist: {
    label: 'NPTEL Digital Circuits (IIT)',
    url: 'https://www.youtube.com/results?search_query=NPTEL+Digital+Circuits+IIT',
  },
  chapters: [
    {
      title: 'Chapter 1: Number Systems & Boolean Algebra',
      topics: [
        'Binary, octal, hexadecimal and decimal conversions',
        'Binary arithmetic and 2\u2019s complement',
        'Boolean algebra and De Morgan\u2019s theorems',
        'Karnaugh maps and minimisation',
        'SOP and POS forms',
      ],
      notes: [
        'Positional number systems: a base-b number expresses value as Σdᵢbⁱ. Binary (base 2) is native to switches; hex (base 16) is the compact human-readable form of binary (each hex digit = 4 bits). Conversions both ways, including fractional parts, are the guaranteed short question; octal groups bits in threes.',
        'Negative numbers: 2\u2019s complement of an n-bit number is 2ⁿ − N, computed by flipping bits and adding 1. It gives a single representation of zero and makes subtraction into addition (A − B = A + [2\u2019s comp of B]) — the reason all modern arithmetic units use it. Know the ranges: unsigned 0…2ⁿ−1, signed −2ⁿ⁻¹…2ⁿ⁻¹−1, and the overflow rule (carry into the sign bit ≠ carry out).',
        'Boolean algebra: AND, OR, NOT with identities (A + 0 = A, A·1 = A, A + A\u2032 = 1, A·A\u2032 = 0) and De Morgan\u2019s theorems (A+B)\u2032 = A′B′ and (AB)′ = A′ + B′ — the workhorses for converting between AND-OR and NAND-NOR forms. Any Boolean function can be built from NAND gates alone (or NOR alone) — functional completeness is the conceptual point of the gate-universality discussion.',
        'Canonical forms: sum of products (SOP, minterms) and product of sums (POS, maxterms) are the two standard normal forms; a truth table maps directly to either. Minimisation merges terms: algebraically via AB + AB′ = A, or visually with Karnaugh maps, where adjacent cells differing in one variable let you spot such merges as blocks of 1, 2, 4, 8… cells. Blocks must be rectangular powers of two and wrap around the edges.',
        'K-map practice discipline: for 4 variables, draw the map with Gray-code ordering (00, 01, 11, 10) on both axes; choose the fewest blocks covering all 1s; each block drops the variables that change within it. Don\u2019t-care conditions (X) may be included in a block when they help. Minimisation matters physically: fewer terms means fewer gates, less cost, less delay.',
      ],
      derivations: [
        'De Morgan\u2019s theorems: verify by truth table that (A+B)′ = A′B′ and (AB)′ = A′ + B′; then show how they convert any SOP circuit into a NAND-only implementation (double-negation trick). The generalised De Morgan for n inputs follows by induction.',
        '2\u2019s complement subtraction: show that adding the complement is equivalent to subtracting, using the mod-2ⁿ arithmetic: A − B = A + (2ⁿ − B) mod 2ⁿ; demonstrate with a 4-bit example, and show how the discarded carry signals a positive result.',
        'K-map minimisation: given a truth table, transfer 1s to the map, group maximal powers-of-two blocks, and read off the product terms — worked examples with and without don\u2019t-cares; verify the result against the original truth table as the closing step.',
        'Gate universality: show NAND acts as NOT (tie inputs), AND (NAND + inverter) and OR (De Morgan), hence any Boolean function is NAND-realisable; same for NOR. This underlies IC manufacturing economy — one gate type fabricated well beats many types.',
      ],
      formulas: [
        { name: 'Positional value', expr: 'N = Σ dᵢ bⁱ (b the base, dᵢ digits)' },
        { name: '2\u2019s complement (n bits)', expr: 'N* = 2ⁿ − N = N′ + 1 (bit flip + 1)' },
        { name: 'De Morgan\u2019s theorems', expr: '(A + B)′ = A′B′ ;  (AB)′ = A′ + B′' },
        { name: 'Absorption & consensus', expr: 'A + AB = A ;  A + A′B = A + B' },
        { name: 'K-map groups', expr: 'block of 2ᵏ cells drops k variables' },
      ],
      tips: [
        'In conversions, show the positional expansion, not just the answer — method marks survive an arithmetic slip.',
        'State De Morgan\u2019s theorems in words (break the bar, change the sign) when applying them; the verbal rule prevents sign errors.',
        'On K-maps, always check you used the largest possible groups and that all 1s are covered — under-coverage is the classic mistake.',
      ],
    },
    {
      title: 'Chapter 2: Combinational Logic Circuits',
      topics: [
        'Half and full adders',
        'Parallel binary adders and subtractors',
        'Multiplexers and demultiplexers',
        'Encoders and decoders',
        'Magnitude comparators',
      ],
      notes: [
        'Half adder: inputs A, B; outputs Sum = A ⊕ B and Carry = AB. Full adder adds three bits (A, B, C_in): Sum = A ⊕ B ⊕ C_in, C_out = AB + C_in(A ⊕ B) — build it from two half adders plus an OR. Chaining n full adders (ripple-carry) adds n-bit numbers; each bit\u2019s carry ripples to the next, so delay grows linearly with n — state this limitation, it motivates the carry-look-ahead discussion.',
        'Subtraction via 2\u2019s complement: A − B = A + B′ + 1 with the final carry discarded (or indicating sign in some conventions); an adder/subtractor circuit uses XOR gates as programmable inverters controlled by the mode line M. One circuit doing both jobs is the standard design question.',
        'Multiplexer: 2ⁿ data inputs, n select lines, one output — a digitally controlled switch. Uses: data routing, parallel-to-serial conversion, and implementing Boolean functions (an 8:1 MUX realises any 3-variable function by wiring data inputs from the truth table). Demultiplexer is the inverse: one data input routed to one of 2ⁿ outputs by the select lines.',
        'Decoder: n inputs activating exactly one of 2ⁿ output lines (e.g. 3:8 decoder); with enable inputs, decoders cascade and also implement any SOP function directly (each minterm is one output line — OR the needed ones). Encoder is the inverse (2ⁿ → n); the priority encoder resolves multiple active inputs by highest priority — used in interrupt controllers.',
        'Comparator: checks A > B, A = B, A < B bit by bit; 1-bit version is a pair of gates; n-bit versions cascade with the higher-order bit dominating. Design questions usually ask you to build a full adder from two half adders, or a 4:1 MUX from 2:1 MUXes — practice the hierarchical construction, not just the block symbol.',
      ],
      derivations: [
        'Full adder from two half adders: derive Sum = A ⊕ B ⊕ C_in and C_out by adding (A + B) first (HA1), then adding C_in to that sum (HA2), OR-ing the two partial carries; draw the block wiring and verify against the truth table.',
        'Ripple-carry delay: each full adder\u2019s C_out must settle before the next stage computes: t_total ≈ n·t_carry; show with a 4-bit example how the worst case (e.g. 1111 + 0001) propagates a carry through every stage — the quantitative case for look-ahead carry.',
        'Function implementation with a MUX: for a 3-variable function, connect A, B, C to selects and each data input to the truth-table value of the remaining combination; prove the scheme by expanding the MUX output expression — a favourite application-of-concept question.',
        'Decoder-based SOP: the decoder generates every minterm; OR the minterms of the function (plus enable handling for larger functions) — show for a 2-variable example that the OR of selected outputs reproduces the truth table exactly.',
      ],
      formulas: [
        { name: 'Half adder', expr: 'Sum = A ⊕ B ;  Carry = AB' },
        { name: 'Full adder', expr: 'Sum = A ⊕ B ⊕ C_in ;  C_out = AB + C_in(A ⊕ B)' },
        { name: 'MUX output', expr: 'Y = Σ mᵢ·Sᵢ (Sᵢ the decoded select lines)' },
        { name: 'Decoder', expr: 'n inputs → 2ⁿ outputs, exactly one active' },
        { name: 'Adder/subtractor mode line', expr: 'B ⊕ M: M = 0 add, M = 1 subtract (adds B′ + 1)' },
      ],
      tips: [
        'Draw the block diagram with labelled inputs/outputs before writing gate-level logic — structure marks are awarded independently of algebra.',
        'For adder questions, state the ripple-carry delay scaling and name carry look-ahead as the fix, even if the derivation is not required.',
        'MUX/decoder implementation questions: write the target function in canonical form first; the wiring then reads off mechanically.',
      ],
    },
    {
      title: 'Chapter 3: Sequential Logic Circuits',
      topics: [
        'SR latch and clocked SR flip-flop',
        'JK, D and T flip-flops',
        'Race-around condition and its cure',
        'Shift registers',
        'Synchronous and asynchronous counters',
      ],
      notes: [
        'Sequential circuits have memory: outputs depend on present inputs AND past history (state). The SR latch (two cross-coupled NORs) stores 1 bit: S = 1 sets, R = 1 resets, S = R = 1 is forbidden (both outputs forced equal). Clocked versions update state only on the clock edge — synchronisation is the whole point of edge triggering.',
        'JK flip-flop: removes the forbidden input — J = K = 1 toggles. But with level triggering and J = K = 1 while the clock is high, the output toggles repeatedly within one clock pulse: the race-around condition, cured by making the pulse shorter than the propagation delay, or properly by master-slave/edge-triggered construction — know both the disease and the cures, it is the classic theory question.',
        'D flip-flop: output follows D at the clock edge (Q⁺ = D) — the standard register/delay element; T flip-flop: toggles when T = 1 (Q⁺ = T ⊕ Q) — the natural counter element. Characteristic tables and excitation tables (what J, K produce a desired Q → Q⁺ transition) are the working tools of all counter design; memorise the four rows.',
        'Shift registers: D flip-flops in series, shifting one position per clock — serial-in-serial-out, serial-in-parallel-out, parallel-in-serial-out and universal (bidirectional) types. Uses: serial communication, data delay, and multiplication/division by 2 in binary (shift left/right). Ring and Johnson (twisted-ring) counters are shift registers fed back on themselves, giving n-state and 2n-state sequences respectively.',
        'Counters: asynchronous (ripple) counters clock each stage from the previous stage\u2019s output — simple, but cumulative propagation delay limits speed and causes decoding glitches. Synchronous counters clock all stages together with combinational logic steering each J, K — fast and glitch-free; design a mod-N counter by K-mapping the J, K inputs from the count sequence and resetting after N. BCD (decade) counters and the 3-bit binary design are the standard worked examples.',
      ],
      derivations: [
        'SR latch behaviour: write the NOR feedback equations Q⁺ = (S + Q′)′ = S′(R′ + Q)... carefully in both stable branches; show the memory action (S = R = 0 holds state) and derive the forbidden condition S = R = 1 — the foundational sequential derivation.',
        'JK from SR: feed output feedback (Q and Q′ AND-ed with K and J respectively) into an SR core; show the J = K = 1 case now toggles rather than going invalid, and identify the race-around window: pulse width > propagation delay; show the master-slave pair (second flip-flop clocked inverted) samples once per cycle — the cure.',
        'Characteristic and excitation tables: from Q⁺ = JQ′ + K′Q derive all four J, K rows (hold, reset, set, toggle); construct the excitation table by inverting the characteristic table — the tool used in every synchronous counter design that follows.',
        'Mod-N synchronous counter design: list the count sequence, write each flip-flop\u2019s required Q → Q⁺ transition, read off J, K excitations, minimise with K-maps, and draw the wiring; verify by walking the clock through the sequence — the complete design workflow examiners want to see.',
      ],
      formulas: [
        { name: 'SR latch', expr: 'Q⁺ = S + R′Q (S = R = 1 forbidden)' },
        { name: 'JK characteristic', expr: 'Q⁺ = JQ′ + K′Q (J = K = 1 toggles)' },
        { name: 'D and T flip-flops', expr: 'Q⁺ = D ;  Q⁺ = T ⊕ Q' },
        { name: 'Ripple counter mod', expr: 'n flip-flops → mod-2ⁿ (divide-by-2ⁿ each stage)' },
        { name: 'Johnson counter', expr: 'n flip-flops → 2n states (twisted feedback)' },
      ],
      tips: [
        'Explain race-around with a timing sketch: level-triggered JK with J = K = 1 toggling several times in one high clock — the picture is worth the full mark.',
        'Counter design questions: show the excitation table even if not explicitly asked — it is the method and carries the marks.',
        'Distinguish clearly: asynchronous = clock ripples (slow, glitches); synchronous = common clock (fast) — one sentence with the reason.',
      ],
    },
    {
      title: 'Chapter 4: Microprocessor 8085 & Timers',
      topics: [
        '555 timer: astable and monostable modes',
        '555 timing equations and design',
        '8085 architecture: registers, buses, pins',
        'Instruction set basics and addressing modes',
        'Simple assembly programs and timing cycles',
      ],
      notes: [
        '555 timer: two comparators around a flip-flop driving a discharge transistor; the internal resistor chain fixes thresholds at ⅔V_CC and ⅓V_CC. Monostable: one stable state, an external trigger produces a single pulse of width t = 1.1RC — used for debouncing and delays. Astable: no stable state, the capacitor charges through R₁+R₂ and discharges through R₂ between the thresholds, oscillating continuously.',
        'Astable design equations: t_high = 0.69(R₁ + R₂)C, t_low = 0.69R₂C, so f = 1.44/((R₁ + 2R₂)C) and duty cycle D = (R₁ + R₂)/(R₁ + 2R₂) — always above 50% unless a diode bypasses R₂ (the standard modification). Timing numericals are guaranteed marks: given R, C compute f and duty cycle, or design R₁, R₂ for a target.',
        '8085 architecture: an 8-bit microprocessor with a 16-bit address bus (64 KB addressable) and 8-bit data bus. Registers: accumulator A, general purpose B, C, D, E, H, L (pairs BC, DE, HL for 16-bit), stack pointer SP, program counter PC, flag register (sign, zero, auxiliary carry, parity, carry). HL often serves as a memory pointer (the M register). Buses are multiplexed (AD₀–AD₇) and demultiplexed by the ALE signal — the one architectural subtlety always examined.',
        'Instruction classes: data transfer (MOV, MVI, LXI, LDA, STA), arithmetic (ADD, SUB, INR, DCR, DAD), logical (ANA, ORA, XRA, CMP, CMA), branching (JMP, JC, JZ, CALL, RET) and machine control (NOP, HLT). Addressing modes: immediate (MVI A, 32H), register (MOV A, B), direct (LDA 2050H), indirect/register-pair (MOV A, M), implied (CMA). Fetch-decode-execute: each instruction takes machine cycles (T-states) — adding two bytes via LDA/MOV/ADD/STA is the canonical first program.',
        'Applications stitching the chapter together: the 555 generates the clock or a delay; the 8085 counts, compares and responds — square-wave generation, timers and pulse-width measurement are the lab-style questions. Know the pin diagram\u2019s highlights (ALE, RD\u2032, WR\u2032, IO/M\u2032, READY, HOLD, interrupts RST 7.5/6.5/5.5, TRAP) and the memory-mapped vs IO-mapped device-select idea.',
      ],
      derivations: [
        '555 astable timing: capacitor charges from ⅓V_CC toward V_CC through R₁ + R₂ with time constant (R₁+R₂)C; solving V(t) = V_CC(1 − (2/3)e^{−t/τ}) for the ⅔ threshold gives t_high = 0.69(R₁ + R₂)C; discharging from ⅔ to ⅓ through R₂ gives t_low = 0.69R₂C — derive both, then add for the period.',
        '555 monostable pulse: trigger pulls pin 2 below ⅓V_CC, output rises and the capacitor charges from 0 toward V_CC through RC until ⅔V_CC resets the flip-flop: t = RC·ln(3) ≈ 1.1RC — a one-line RC solution worth reproducing exactly.',
        '8085 program timing: for a sample ADD B, tabulate opcode fetch (4 T-states) and execute (more for memory operands); show how total T-states set the instruction time at a given clock (2 MHz ⇒ T ≈ 0.5 μs per state) — connects architecture to numbers.',
        'Assembly example walkthrough: add the contents of 2050H and 2051H, store at 2052H: LXI H, 2050H / MOV A, M / INX H / ADD M / INX H / MOV M, A / HLT — annotate each instruction\u2019s addressing mode and effect on A, HL and the flags.',
      ],
      formulas: [
        { name: '555 monostable pulse', expr: 't = 1.1 R C' },
        { name: '555 astable periods', expr: 't_high = 0.69(R₁ + R₂)C ;  t_low = 0.69 R₂ C' },
        { name: '555 astable frequency', expr: 'f = 1.44 / ((R₁ + 2R₂)C) ;  D = (R₁ + R₂)/(R₁ + 2R₂)' },
        { name: '8085 capacity', expr: '8-bit data, 16-bit address → 64 KB' },
        { name: 'Machine timing', expr: 't_instruction = (T-states) × (1/f_clock)' },
      ],
      tips: [
        '555 numericals: check whether the capacitor charges through R₁+R₂ or R₂ alone for each half-cycle — the duty-cycle formula follows from that split.',
        'For 8085 questions, sketch the programming model (registers + flags) first; answers anchored to the register diagram read professionally.',
        'Quote instruction addressing modes explicitly in programs — examiners allocate a separate mark for the modes.',
      ],
    },
  ],
};
