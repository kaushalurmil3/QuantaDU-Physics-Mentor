/*
# Create flashcard_progress table

1. Plain-English summary
- "DU Physics Mentor" lets students mark flashcards as "Mastered" or "Needs Review".
- This table stores that per-card status so a student's progress survives
  reloads and devices. There is no sign-in in this app, so progress is stored
  per browser device (single shared/tenant-free dataset).

2. New Tables
- `flashcard_progress`
  - `card_id` (text, primary key) — stable identifier of the flashcard, e.g. "dsc2-mi-sphere".
  - `status` (text, not null) — either "mastered" or "review".
  - `updated_at` (timestamptz) — last time the card's status changed.

3. Modified Tables
- None.

4. Security
- RLS is ENABLED on `flashcard_progress`.
- This is an intentionally public, single-tenant, no-auth study tool: all rows
  are shared by design (there are no user accounts and no private data), so
  policies allow the anon + authenticated roles full CRUD via the Data API.
- Explicit GRANTs for anon + authenticated on only the verbs the app uses.
*/

CREATE TABLE IF NOT EXISTS flashcard_progress (
  card_id text PRIMARY KEY,
  status text NOT NULL CHECK (status IN ('mastered', 'review')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON flashcard_progress TO anon, authenticated;

DROP POLICY IF EXISTS "public can read card progress" ON flashcard_progress;
CREATE POLICY "public can read card progress"
ON flashcard_progress FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "public can insert card progress" ON flashcard_progress;
CREATE POLICY "public can insert card progress"
ON flashcard_progress FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "public can update card progress" ON flashcard_progress;
CREATE POLICY "public can update card progress"
ON flashcard_progress FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "public can delete card progress" ON flashcard_progress;
CREATE POLICY "public can delete card progress"
ON flashcard_progress FOR DELETE
TO anon, authenticated
USING (true);
