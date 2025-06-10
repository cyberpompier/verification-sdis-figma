/*
      # Création de la table materials et insertion de données

      1. Nouvelles Tables
        - `materials`
          - `id` (uuid, clé primaire, généré automatiquement)
          - `name` (text, non nul, utilisé comme titre)
          - `type` (text, non nul, utilisé comme description)
          - `photo_url` (text, non nul, URL de l'image)
          - `created_at` (timestamptz, par défaut maintenant)
      2. Sécurité
        - Activation de RLS sur la table `materials`
        - Ajout d'une politique pour permettre aux utilisateurs authentifiés de lire toutes les données des matériaux.
      3. Données
        - Insertion de données d'exemple dans la table `materials`.
    */

    CREATE TABLE IF NOT EXISTS materials (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      type text NOT NULL,
      photo_url text NOT NULL,
      created_at timestamptz DEFAULT now()
    );

    ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Authenticated users can view materials" ON materials;
    CREATE POLICY "Authenticated users can view materials"
      ON materials
      FOR SELECT
      TO authenticated
      USING (true);

    INSERT INTO materials (name, type, photo_url)
    VALUES
      ('Lance Incendie', 'Équipement essentiel pour la projection d''eau ou de mousse sur un foyer d''incendie.', 'https://www.men-fire.fr/452-large_default/sac-intervention-43l-reflex.jpg'),
      ('Appareil Respiratoire Isolant (ARI)', 'Permet aux pompiers de respirer dans des atmosphères toxiques ou enfumées.', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
      ('Défibrillateur', 'Utilisé pour réanimer une victime d''arrêt cardiaque par choc électrique.', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
      ('Coussin de Levage', 'Permet de soulever des charges lourdes lors d''opérations de désincarcération.', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
      ('Tronçonneuse', 'Outil de découpe pour dégager des accès ou des victimes.', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
      ('Projecteur Portable', 'Fournit un éclairage puissant sur les lieux d''intervention nocturnes.', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    ON CONFLICT (name) DO UPDATE SET
      type = EXCLUDED.type,
      photo_url = EXCLUDED.photo_url;