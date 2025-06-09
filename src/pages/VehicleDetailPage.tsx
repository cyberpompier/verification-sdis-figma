import { useParams, useNavigate } from 'react-router-dom';
import { vehicles } from './VehiculesPage'; // Import the vehicles data
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === Number(id));

  if (!vehicle) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Véhicule non trouvé</h1>
        <Button onClick={() => navigate('/vehicules')} className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full font-bold shadow-md">
          Retour à la liste des véhicules
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <main className="flex-grow flex items-center justify-center pt-20 pb-20">
        <Card className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl bg-purple-100 border-purple-300 p-6">
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-0 mb-6">
            <img
              src={vehicle.imageSrc}
              alt={vehicle.title}
              className="w-full sm:w-64 h-48 sm:h-48 object-cover rounded-lg shadow-md"
            />
            <div className="flex-grow text-center sm:text-left">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</CardTitle>
              <p className="text-gray-700 text-lg">
                Dernier vérification le : <br />
                <span className="font-semibold">{vehicle.lastVerification}</span>
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm border border-gray-300">
                Filtre vérifié / non vérifié
              </Button>
              <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm border border-gray-300">
                Filtre emplacement
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {/* Example verification items */}
              {[1, 2, 3].map((item) => (
                <Card key={item} className="flex items-center p-4 rounded-lg shadow-sm bg-white border border-gray-200">
                  <img
                    src={vehicle.imageSrc}
                    alt={vehicle.title}
                    className="w-24 h-16 object-cover rounded-md mr-4"
                  />
                  <span className="text-xl font-semibold text-gray-800 flex-grow">{vehicle.title}</span>
                  <div className="flex flex-col gap-1">
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-sm"></div>
                    <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between gap-4">
              <Button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="flex-grow bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-full font-bold shadow-md"
              >
                Retour
              </Button>
              <Button className="flex-grow bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-full font-bold shadow-md">
                Valider
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
