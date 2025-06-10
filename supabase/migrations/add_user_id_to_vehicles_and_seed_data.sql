/*
  # Ajouter la colonne user_id à la table vehicles et insérer les données

  1. Modifications du schéma
    - S'assurer que la table `vehicles` existe avec toutes ses colonnes.
    - Ajouter la colonne `user_id` si elle n'existe pas, avec `uuid REFERENCES auth.users(id)`. Cette colonne sera nullable pour permettre l'insertion de données initiales.
    - S'assurer que les colonnes `image_src`, `title`, `description`, `last_verification` existent et sont correctement définies.
  2. Sécurité
    - S'assurer que RLS est activé sur la table `vehicles`.
    - S'assurer que les politiques pour les utilisateurs authentifiés (lecture, insertion, mise à jour) sont présentes.
  3. Données
    - Insérer les données initiales des véhicules si elles ne sont pas déjà présentes, en définissant `user_id` à NULL pour ces données de démonstration.
*/

-- S'assurer que la table existe avec son schéma complet, incluant user_id
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id), -- Ajout de user_id, rendu nullable pour les données initiales
  image_src text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  last_verification text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- S'assurer que la colonne user_id existe et est du bon type (nullable)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vehicles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE vehicles ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- S'assurer que la colonne image_src existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vehicles' AND column_name = 'image_src'
  ) THEN
    ALTER TABLE vehicles ADD COLUMN image_src text NOT NULL DEFAULT '';
  END IF;
END $$;

-- S'assurer que la colonne title existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vehicles' AND column_name = 'title'
  ) THEN
    ALTER TABLE vehicles ADD COLUMN title text NOT NULL DEFAULT '';
  END IF;
END $$;

-- S'assurer que la colonne description existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vehicles' AND column_name = 'description'
  ) THEN
    ALTER TABLE vehicles ADD COLUMN description text NOT NULL DEFAULT '';
  END IF;
END $$;

-- S'assurer que la colonne last_verification existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vehicles' AND column_name = 'last_verification'
  ) THEN
    ALTER TABLE vehicles ADD COLUMN last_verification text NOT NULL DEFAULT '';
  END IF;
END $$;

-- S'assurer que RLS est activé
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- S'assurer que les politiques sont présentes
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

-- Insérer des données initiales si la table est vide
-- Ajout de NULL pour la colonne user_id pour éviter l'erreur de contrainte NOT NULL
INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://rescue18.com/wp-content/uploads/2022/03/fpt-sdis-35.jpg', 'FPT', 'Fourgon Pompe Tonne - Véhicule polyvalent pour la lutte contre l''incendie et les opérations diverses.', '23/05/2025 à 08H34 par ADC Dupressoir'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'FPT');

INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VSAV', 'Véhicule de Secours et d''Assistance aux Victimes - Utilisé pour le transport et les premiers secours aux blessés.', '22/05/2025 à 10H00 par ADC Martin'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VSAV');

INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'CCF', 'Camion Citerne Feux de Forêts - Spécialisé dans la lutte contre les incendies de végétation.', '21/05/2025 à 14H15 par ADC Dubois'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'CCF');

INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VSR', 'Véhicule de Secours Routier - Équipé pour les désincarcérations et les accidents de la route.', '20/05/2025 à 09H30 par ADC Lefevre'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VSR');

INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'EPA', 'Échelle Pivotante Automatique - Pour les interventions en hauteur et le sauvetage de personnes.', '19/05/2025 à 11H45 par ADC Bernard'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'EPA');

INSERT INTO vehicles (user_id, image_src, title, description, last_verification)
SELECT NULL, 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'VL', 'Véhicule Léger - Utilisé pour le commandement, la reconnaissance ou le transport de personnel.', '18/05/2025 à 16H00 par ADC Robert'
WHERE NOT EXISTS (SELECT 1 FROM vehicles WHERE title = 'VL');