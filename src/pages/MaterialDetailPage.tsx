import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Material {
  id: string;
  name: string;
  type: string;
  photo_url: string;
  user_id: string | null;
  created_at: string;
}

export function MaterialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMaterial() {
      if (!id) {
        setError("ID du matériel manquant.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .eq('id', id)
          .single(); // Use .single() to get a single record

        if (error) {
          throw error;
        }

        if (data) {
          setMaterial(data);
        } else {
          setError("Matériel non trouvé.");
        }
      } catch (err) {
        console.error('Erreur lors du chargement du matériel:', err);
        setError('Échec du chargement du matériel. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 text-lg">Chargement des détails du matériel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-red-500 text-lg">{error}</p>
        <Button onClick={() => navigate('/materiels')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
          Retour à la liste des matériels
        </Button>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 text-lg">Matériel introuvable.</p>
        <Button onClick={() => navigate('/materiels')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
          Retour à la liste des matériels
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <Button onClick={() => navigate('/materiels')} className="mb-6 bg-gray-700 text-white hover:bg-gray-800">
          &larr; Retour à la liste des matériels
        </Button>
        <Card className="w-full rounded-lg shadow-xl overflow-hidden bg-white">
          <CardHeader className="p-0">
            <img src={material.photo_url} alt={material.name} className="w-full h-80 object-cover rounded-t-lg" />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-3">{material.name}</CardTitle>
            <CardDescription className="text-lg text-gray-700 mb-4">
              Type: <span className="font-semibold">{material.type}</span>
            </CardDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
              <p>
                <span className="font-semibold">ID:</span> {material.id}
              </p>
              <p>
                <span className="font-semibold">Ajouté le:</span> {new Date(material.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Ajouté par (ID utilisateur):</span> {material.user_id || 'N/A (Public)'}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Description Détaillée</h3>
              <p className="text-gray-600 leading-relaxed">
                Ce matériel, un <span className="font-medium">{material.name}</span> de type{' '}
                <span className="font-medium">{material.type}</span>, est un équipement essentiel pour les opérations.
                Sa conception robuste et sa fonctionnalité spécifique en font un atout indispensable pour la sécurité
                et l'efficacité des interventions. Il est régulièrement inspecté et maintenu pour garantir sa fiabilité.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
