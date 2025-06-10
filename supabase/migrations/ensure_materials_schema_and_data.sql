/*
      # Schema update for materials table

      1. New Tables
        - `materials`
          - `id` (uuid, primary key, default gen_random_uuid())
          - `name` (text, unique, not null)
          - `type` (text, not null)
          - `photo_url` (text, not null)
          - `user_id` (uuid, nullable, foreign key to auth.users)
          - `created_at` (timestamptz, default now())
      2. Security
        - Enable RLS on `materials` table
        - Add policies for authenticated users to:
          - SELECT: View materials where user_id is null OR user_id matches their auth.uid()
          - INSERT: Create new materials, setting user_id to their auth.uid()
          - UPDATE: Update their own materials (user_id matches auth.uid())
          - DELETE: Delete their own materials (user_id matches auth.uid())
      3. Changes
        - Ensures a UNIQUE constraint on the `name` column to prevent duplicate material names, even if the table existed previously without it.
        - Inserts sample data for materials, handling conflicts on the `name` column to ensure idempotency.
    */

    -- Create the materials table if it does not exist
    CREATE TABLE IF NOT EXISTS materials (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL, -- Removed UNIQUE here to add it explicitly below
      type text NOT NULL,
      photo_url text NOT NULL,
      user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
      created_at timestamptz DEFAULT now()
    );

    -- Add UNIQUE constraint on 'name' if it doesn't exist
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'public.materials'::regclass
          AND contype = 'u'
          AND conname = 'materials_name_key' -- Standard naming convention for unique constraints
      ) THEN
        ALTER TABLE materials ADD CONSTRAINT materials_name_key UNIQUE (name);
      END IF;
    END $$;

    -- Enable Row Level Security (RLS) for the materials table
    ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist to ensure clean re-creation
    DROP POLICY IF EXISTS "Authenticated users can view all materials or their own" ON materials;
    DROP POLICY IF EXISTS "Authenticated users can create materials" ON materials;
    DROP POLICY IF EXISTS "Authenticated users can update their own materials" ON materials;
    DROP POLICY IF EXISTS "Authenticated users can delete their own materials" ON materials;

    -- Policy for SELECT: Authenticated users can view materials where user_id is null (public) or their own
    CREATE POLICY "Authenticated users can view all materials or their own"
      ON materials
      FOR SELECT
      TO authenticated
      USING (
        auth.uid() = user_id OR user_id IS NULL
      );

    -- Policy for INSERT: Authenticated users can create materials, setting user_id to their own UID
    CREATE POLICY "Authenticated users can create materials"
      ON materials
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);

    -- Policy for UPDATE: Authenticated users can update their own materials
    CREATE POLICY "Authenticated users can update their own materials"
      ON materials
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);

    -- Policy for DELETE: Authenticated users can delete their own materials
    CREATE POLICY "Authenticated users can delete their own materials"
      ON materials
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);

    -- Insert sample data for materials, handling conflicts on 'name'
    INSERT INTO materials (name, type, photo_url, user_id)
    VALUES
      ('Casque F1', 'Protection individuelle', 'https://images.pexels.com/photos/163036/militaria-historical-helmet-armour-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL),
      ('Lance incendie', 'Matériel d''extinction', 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL),
      ('Appareil Respiratoire Isolant (ARI)', 'Protection respiratoire', 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL),
      ('Corde de sauvetage', 'Matériel de sauvetage', 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL),
      ('Tronçonneuse', 'Matériel de découpe', 'https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL)
    ON CONFLICT (name) DO UPDATE SET
      type = EXCLUDED.type,
      photo_url = EXCLUDED.photo_url,
      user_id = EXCLUDED.user_id;