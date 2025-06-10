/*
  # Rendre la colonne user_id nullable et réinsérer les données

  1. Modifications du schéma
    - S'assurer que la colonne `user_id` de la table `vehicles` est nullable.
  2. Données
    - Réinsérer les données initiales des véhicules si elles ne sont pas déjà présentes, en définissant `user_id` à NULL.
*/

-- Rendre la colonne user_id nullable si elle existe et est NOT NULL
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'vehicles'
      AND column_name = 'user_id'
      AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE vehicles ALTER COLUMN user_id DROP NOT NULL;
  END IF;
END $$;

-- Insérer des données initiales si la table est vide
-- Ces insertions sont idempotentes grâce à WHERE NOT EXISTS
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