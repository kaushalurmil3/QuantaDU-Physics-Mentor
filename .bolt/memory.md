# Project memory

## Product intent & audience

- App: **DU Physics Mentor** — open-access educational web app for Delhi University B.Sc. Hons Physics students.
- Core offering: semester hub (Sem 1–6) with notes, interactive flashcards, PYQs/sample papers, AI professor grader.
- Free/public, student-facing; mobile-friendly by requirement.

## Brand personality & voice

- Clean, modern, non-intrusive, helpful.
- Mentor-like tone; student-friendly labels (e.g., "Help Improve DU Physics Mentor", "Thank you! Your feedback helps DU Physics students").

## Visual design & UX direction

- Vite + React + Tailwind + lucide-react; `@/` path alias to `src/`.
- Mobile-first responsive behavior.
- Floating pill button bottom-right for global actions; gentle hover lift.
- Modals: slide-up from bottom on phones, centered on desktop.
- Interactive star rating UI; copy-to-clipboard fallback pattern.
- Existing UI must remain intact: tabs, search, site map, notes, flashcards, PYQs, footer.

## Decisions, constraints & rationale

- No backend server; features implemented client-side only.
- Feedback collection handoffs to GitHub Issues via pre-filled URL (repo: `kaushalurmil3/du-physics-mentor`) — public logging without infra.
- Feedback types fixed set: Request a PYQ / Topic, Report a Formula Typo, General Suggestion / Rating.
- Semesters constrained to 1–6.
- Submission flow: instant on-screen confirmation + GitHub "new issue" link + copy-text backup.
- Non-destructive additions only — do not remove existing tabs/sections/footer.

## Open questions & assumptions

- Assumes GitHub Issues is the durable feedback channel and repo stays public.
- Assumes no persistence of submitted feedback locally (no localStorage usage confirmed).
- AI professor grader details/integration not yet specified in context.