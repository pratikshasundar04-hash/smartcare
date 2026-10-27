/*
# SmartCare appointments table

1. New Tables
- `appointments` — public appointment bookings made by patients.
  - id (uuid PK), booking_ref (text unique), patient_name, patient_age, phone, email,
    department, doctor_slug, doctor_name, location, appt_date (date), time_slot,
    reason, consultation_type, status (text default 'pending'), created_at, updated_at.

2. Security
- Enable RLS on `appointments`.
- Grant CRUD to `anon, authenticated` so the public booking form (anon key) can insert
  and so visitors can look up their booking by reference.
- SELECT/INSERT open to anon+authenticated (public booking flow);
  UPDATE/DELETE restricted to authenticated (admin/doctor management via signed-in session).
- A unique constraint on (doctor_slug, appt_date, time_slot) prevents overlapping bookings.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref text UNIQUE NOT NULL DEFAULT ('SC-' || upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8))),
  patient_name text NOT NULL,
  patient_age int,
  phone text NOT NULL,
  email text NOT NULL,
  department text NOT NULL,
  doctor_slug text NOT NULL,
  doctor_name text NOT NULL,
  location text NOT NULL,
  appt_date date NOT NULL,
  time_slot text NOT NULL,
  reason text,
  consultation_type text DEFAULT 'In-person',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- unique constraint to prevent double-booking a doctor slot
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uniq_doctor_slot') THEN
    ALTER TABLE appointments ADD CONSTRAINT uniq_doctor_slot UNIQUE (doctor_slug, appt_date, time_slot);
  END IF;
END $$;

GRANT SELECT, INSERT, UPDATE, DELETE ON appointments TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_appointments" ON appointments;
CREATE POLICY "public_select_appointments"
ON appointments FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_appointments" ON appointments;
CREATE POLICY "public_insert_appointments"
ON appointments FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_appointments" ON appointments;
CREATE POLICY "auth_update_appointments"
ON appointments FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_appointments" ON appointments;
CREATE POLICY "auth_delete_appointments"
ON appointments FOR DELETE
TO authenticated USING (true);
