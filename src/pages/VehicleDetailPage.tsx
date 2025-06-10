import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface Engin { // Changed from Vehicle to Engin
  id: string;
  image_src: string;
  name: string; // Changed from title to name
  type: string; // Changed from description to type
  last_verification: string;
  fire_station: string; // Added fire_station
  plate_number: string; // Added plate_number
}

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [engin, setEngin] = useState<Engin | null>(null); // Changed from vehicle to engin
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEngin = async () => { // Changed from fetchVehicle to fetchEngin
      setLoading(true);
      const { data, error } = await supabase
        .from('Engin') // Changed from 'vehicles' to 'Engin'
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching engin:', error); // Changed error message
        setError(error.message);
        setEngin(null);
      } else {
        setEngin(data as Engin);
      }
      setLoading(false);
    };

    if (id) {
      fetchEngin();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-lg text-gray-700">Chargement de l'engin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-lg text-red-600">Erreur: {error}</p>
        <Button onClick={() => navigate('/vehicules')} className="mt-4 bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full font-bold shadow-md">
          Retour à la liste des véhicules
        </Button>
      </div>
    );
  }

  if (!engin) { // Changed from vehicle to engin
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Engin non trouvé</h1> {/* Changed message */}
        <Button onClick={() => navigate('/vehicules')} className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full font-bold shadow-md">
          Retour à la liste des véhicules
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg">
          <img
            src={engin.image_src} // Changed from vehicle.image_src to engin.image_src
            alt={engin.name} // Changed from vehicle.title to engin.name
            className="w-full sm:w-64 h-48 sm:h-48 object-cover rounded-lg shadow-md"
          />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{engin.name}</h1> {/* Changed from vehicle.title to engin.name */}
            <p className="text-gray-700 text-lg">
              Type : <span className="font-semibold">{engin.type}</span><br /> {/* Added type */}
              Caserne : <span className="font-semibold">{engin.fire_station}</span><br /> {/* Added fire_station */}
              Immatriculation : <span className="font-semibold">{engin.plate_number}</span><br /> {/* Added plate_number */}
              Dernière vérification le : <br />
              <span className="font-semibold">{engin.last_verification}</span> {/* Changed from vehicle.last_verification to engin.last_verification */}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm">
            Filtre vérifié / non vérifié
          </Button>
          <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm">
            Filtre emplacement
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 rounded-lg shadow-sm bg-white transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg">
              <img
                src={engin.image_src} // Changed from vehicle.image_src to engin.image_src
                alt={engin.name} // Changed from vehicle.title to engin.name
                className="w-24 h-16 object-cover rounded-md mr-4"
              />
              <span className="text-xl font-semibold text-gray-800 flex-grow">{engin.name}</span> {/* Changed from vehicle.title to engin.name */}
              <div className="flex flex-col gap-1">
                <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-sm"></div>
                <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="flex-grow bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-full font-bold shadow-md"
          >
            Retour
          </Button>
          <Button className="flex-grow bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-full font-bold shadow-md">
            Valider
          </Button>
        </div>
      </main>
    </div>
  );
}
