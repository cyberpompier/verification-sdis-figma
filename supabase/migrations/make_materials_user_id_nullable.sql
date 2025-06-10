/*
      # Rendre la colonne user_id nullable dans la table materials

      1. Modifications de la table
        - `materials`
          - Modification de la colonne `user_id` pour qu'elle accepte les valeurs NULL.
      2. Données
        - Ré-insertion des données d'exemple dans la table `materials`.
    */

    DO $$
    BEGIN
      -- Vérifie si la colonne user_id existe et est NOT NULL
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'materials' AND column_name = 'user_id' AND is_nullable = 'NO'
      ) THEN
        -- Rend la colonne user_id nullable
        ALTER TABLE materials ALTER COLUMN user_id DROP NOT NULL;
      END IF;
    END $$;

    -- Insertion des données avec ON CONFLICT (name)
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