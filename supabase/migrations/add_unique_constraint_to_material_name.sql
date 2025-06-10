/*
      # Ajout d'une contrainte UNIQUE à la colonne 'name' de la table 'materials'

      1. Modifications de la table
        - `materials`
          - Ajout d'une contrainte UNIQUE sur la colonne `name` pour permettre l'utilisation de `ON CONFLICT (name)`.
      2. Données
        - Ré-insertion des données d'exemple avec la clause `ON CONFLICT (name)` mise à jour.
    */

    DO $$
    BEGIN
      -- Vérifie si la contrainte unique sur 'name' existe déjà
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'materials_name_key' AND conrelid = 'public.materials'::regclass
      ) THEN
        -- Ajoute la contrainte unique si elle n'existe pas
        ALTER TABLE materials ADD CONSTRAINT materials_name_key UNIQUE (name);
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