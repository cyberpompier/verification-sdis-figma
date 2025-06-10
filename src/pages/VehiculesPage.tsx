import { useState, useEffect } from 'react';
import { CardGrid } from '@/components/card-grid';
import { supabase } from '@/lib/supabase';

interface Engin {
  id: string;
  image_src: string;
  name: string;
  type: string;
}

export function VehiculesPage() {
  const [engins, setEngins] = useState<Engin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEngins() {
      setLoading(true);
      setError(null);
      try {
        console.log('Tentative de récupération des engins depuis Supabase...');

        // Vérifier la session utilisateur
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log('Session utilisateur Supabase:', session);
        if (sessionError) {
          console.error('Erreur lors de la récupération de la session:', sessionError);
          // Ne pas bloquer, mais noter l'erreur
        }

        if (!session || !session.user) {
          console.warn('Aucun utilisateur authentifié. Les politiques RLS peuvent empêcher la récupération des données.');
          // Optionnel: Si vous voulez afficher un message spécifique pour les non-authentifiés
          // setError('Veuillez vous connecter pour voir les engins.');
          // setLoading(false);
          // return;
        }

        const { data, error: supabaseError } = await supabase
          .from('Engin')
          .select('id, image_src, name, type');

        // Logs détaillés pour le débogage
        console.log('Réponse brute de Supabase - data:', data);
        console.log('Réponse brute de Supabase - error:', supabaseError);

        if (supabaseError) {
          console.error('Erreur Supabase lors de la récupération des engins:', supabaseError);
          throw supabaseError;
        }

        if (!data || data.length === 0) {
          console.log('Aucune donnée d\'engin trouvée.');
          setEngins([]);
          return;
        }

        console.log('Données brutes récupérées:', data);

        const formattedEngins = data.map(engin => ({
          id: engin.id,
          imageSrc: engin.image_src,
          title: engin.name,
          description: engin.type,
        }));

        console.log('Données formatées pour CardGrid:', formattedEngins);
        setEngins(formattedEngins);
      } catch (err) {
        console.error('Erreur générale lors du chargement des engins:', err);
        setError('Échec du chargement des engins. Veuillez réessayer.');
      } finally {
        setLoading(false);
        console.log('Chargement terminé.');
      }
    }

    fetchEngins();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 text-lg">Chargement des engins...</p>
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

  if (engins.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 text-lg">Aucun engin trouvé.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <CardGrid data={engins} linkPrefix="/vehicules" />
      </main>
    </div>
  );
}
