import { useState, useEffect } from 'react';
    import { CardGrid } from '@/components/card-grid';
    import { supabase } from '@/lib/supabase';

    interface Material {
      id: string;
      name: string;
      type: string;
      photo_url: string;
    }

    export function MaterielsPage() {
      const [materials, setMaterials] = useState<Material[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function fetchMaterials() {
          setLoading(true);
          setError(null);
          try {
            const { data, error } = await supabase
              .from('materials')
              .select('id, name, type, photo_url');

            if (error) {
              throw error;
            }

            // Map Supabase data to CardGrid expected props
            const formattedMaterials = data.map(material => ({
              id: material.id,
              imageSrc: material.photo_url, // photo_url -> imageSrc
              title: material.name,       // name -> title
              description: material.type,   // type -> description
            }));

            setMaterials(formattedMaterials);
          } catch (err) {
            console.error('Erreur lors du chargement des matériels:', err);
            setError('Échec du chargement des matériels. Veuillez réessayer.');
          } finally {
            setLoading(false);
          }
        }

        fetchMaterials();
      }, []);

      if (loading) {
        return (
          <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
            <p className="text-gray-700 text-lg">Chargement des matériels...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        );
      }

      if (materials.length === 0) {
        return (
          <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
            <p className="text-gray-700 text-lg">Aucun matériel trouvé.</p>
          </div>
        );
      }

      return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
            <CardGrid data={materials} linkPrefix="/materiels" /> {/* Passe le préfixe */}
          </main>
        </div>
      );
    }
