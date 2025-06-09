import { useParams, useNavigate } from 'react-router-dom';
import { vehicles } from './VehiculesPage'; // Import the vehicles data
import { Button } from '@/components/ui/button'; // Only Button is needed now

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
    <div className="flex flex-col min-h-screen"> {/* Outer div for full height */}
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8"> {/* Main content area with padding and background */}
        {/* Vehicle Header Section - now a div with background and shadow */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg">
          <img
            src={vehicle.imageSrc}
            alt={vehicle.title}
            className="w-full sm:w-64 h-48 sm:h-48 object-cover rounded-lg shadow-md"
          />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1> {/* Changed from CardTitle to h1 */}
            <p className="text-gray-700 text-lg">
              Dernier vérification le : <br />
              <span className="font-semibold">{vehicle.lastVerification}</span>
            </p>
          </div>
        </div>

        {/* Filter Buttons Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm"> {/* Removed border */}
            Filtre vérifié / non vérifié
          </Button>
          <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm"> {/* Removed border */}
            Filtre emplacement
          </Button>
        </div>

        {/* Verification Items Section - now divs with background and shadow */}
        <div className="space-y-4 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-4 rounded-lg shadow-sm bg-white transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg"> {/* Changed from Card to div, removed border */}
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
            </div>
          ))}
        </div>

        {/* Action Buttons Section */}
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
