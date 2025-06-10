/*
      # Création de la table Engin et migration des données

      1. Nouvelle table
        - `Engin`
          - `id` (uuid, clé primaire, par défaut gen_random_uuid())
          - `name` (text, unique, non nul) - Nom de l'engin
          - `type` (text, non nul) - Type de l'engin (ex: FPT, VSAV)
          - `image_src` (text) - URL de l'image de l'engin
          - `last_verification` (timestamptz) - Date de la dernière vérification
          - `created_at` (timestamptz, par défaut now())
          - `user_id` (uuid, nullable, référence auth.users)
          - `fire_station` (text, nullable) - Caserne d'affectation
          - `plate_number` (text, nullable) - Numéro d'immatriculation
      2. Sécurité
        - Activation du RLS sur la table `Engin`.
        - Ajout de politiques pour permettre aux utilisateurs authentifiés de lire et d'insérer leurs propres données.
      3. Données
        - Insertion de données d'exemple dans la table `Engin`.
    */

    CREATE TABLE IF NOT EXISTS Engin (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text UNIQUE NOT NULL,
      type text NOT NULL,
      image_src text,
      last_verification timestamptz,
      created_at timestamptz DEFAULT now(),
      user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
      fire_station text,
      plate_number text
    );

    ALTER TABLE Engin ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist to ensure idempotency
    DROP POLICY IF EXISTS "Authenticated users can view Engin" ON Engin;
    DROP POLICY IF EXISTS "Authenticated users can insert Engin" ON Engin;

    CREATE POLICY "Authenticated users can view Engin"
      ON Engin
      FOR SELECT
      TO authenticated
      USING (true); -- Permet à tous les utilisateurs authentifiés de voir tous les engins

    CREATE POLICY "Authenticated users can insert Engin"
      ON Engin
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id OR user_id IS NULL); -- Permet d'insérer si user_id est le leur ou NULL

    INSERT INTO Engin (name, type, image_src, last_verification, fire_station, plate_number)
    VALUES
      ('FPTSR 1', 'Fourgon Pompe Tonne Secours Routier', 'https://images.pexels.com/photos/1616098/pexels-photo-1616098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2023-10-26 10:00:00+00', 'Caserne Centrale', 'AB-123-CD'),
      ('VSAV 2', 'Véhicule de Secours et d''Assistance aux Victimes', 'https://images.pexels.com/photos/1616098/pexels-photo-1616098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2023-10-25 14:30:00+00', 'Caserne Nord', 'EF-456-GH'),
      ('CCF 3', 'Camion Citerne Feux de Forêts', 'https://images.pexels.com/photos/1616098/pexels-photo-1616098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2023-10-24 09:15:00+00', 'Caserne Sud', 'IJ-789-KL'),
      ('EPA 1', 'Échelle Pivotante Automatique', 'https://images.pexels.com/photos/1616098/pexels-photo-1616098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2023-10-23 11:00:00+00', 'Caserne Centrale', 'MN-012-OP'),
      ('VSR 1', 'Véhicule de Secours Routier', 'https://images.pexels.com/photos/1616098/pexels-photo-1616098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', '2023-10-22 16:45:00+00', 'Caserne Est', 'QR-345-ST')
    ON CONFLICT (name) DO UPDATE SET
      type = EXCLUDED.type,
      image_src = EXCLUDED.image_src,
      last_verification = EXCLUDED.last_verification,
      fire_station = EXCLUDED.fire_station,
      plate_number = EXCLUDED.plate_number;