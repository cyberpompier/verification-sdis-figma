/*
  # Create vehicles table

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `image_src` (text, not null)
      - `title` (text, not null)
      - `description` (text, not null)
      - `last_verification` (text, not null)
      - `created_at` (timestamp with time zone, default now())
  2. Security
    - Enable RLS on `vehicles` table
    - Add policy for authenticated users to read all data
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to update data
  */

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_src text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  last_verification text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert some initial data if the table is empty
INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://rescue18.com/wp-content/uploads/2022/03/fpt-sdis-35.jpg', 'FPT', 'Fourgon Pompe Tonne - Véhicule polyvalent pour la lutte contre l''incendie et les opérations diverses.', '23/05/2025 à 08H34 par ADC Dupressoir'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'FPT');

INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VSAV', 'Véhicule de Secours et d''Assistance aux Victimes - Utilisé pour le transport et les premiers secours aux blessés.', '22/05/2025 à 10H00 par ADC Martin'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VSAV');

INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'CCF', 'Camion Citerne Feux de Forêts - Spécialisé dans la lutte contre les incendies de végétation.', '21/05/2025 à 14H15 par ADC Dubois'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'CCF');

INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VSR', 'Véhicule de Secours Routier - Équipé pour les désincarcérations et les accidents de la route.', '20/05/2025 à 09H30 par ADC Lefevre'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VSR');

INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'EPA', 'Échelle Pivotante Automatique - Pour les interventions en hauteur et le sauvetage de personnes.', '19/05/2025 à 11H45 par ADC Bernard'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'EPA');

INSERT INTO vehicles (image_src, title, description, last_verification)
SELECT 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VL', 'Véhicule Léger - Utilisé pour le commandement, la reconnaissance ou le transport de personnel.', '18/05/2025 à 16H00 par ADC Robert'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VL');