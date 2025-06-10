import React, { useState, useEffect } from 'react';
import { MapPin, Search, LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GeolocalisationPage() {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching current location on component mount
    handleLocateMe();
  }, []);

  const handleLocateMe = () => {
    setIsLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simulate reverse geocoding
          setTimeout(() => {
            setCurrentLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)} (Localisation Actuelle)`);
            setIsLoading(false);
          }, 1500);
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          setError("Impossible d'obtenir la localisation. Veuillez autoriser l'accès à la géolocalisation.");
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    setError(null);
    // Simulate API call for search results
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes('sdis')) {
        setSearchResults([
          'SDIS 77 - Melun',
          'SDIS 91 - Evry',
          'SDIS 78 - Versailles',
          'SDIS 95 - Cergy-Pontoise',
          'SDIS 93 - Bobigny'
        ]);
      } else if (searchQuery.toLowerCase().includes('caserne')) {
        setSearchResults([
          'Caserne de Pompier - Paris 13e',
          'Caserne de Pompier - Lyon Centre',
          'Caserne de Pompier - Marseille Vieux-Port'
        ]);
      } else {
        setSearchResults([
          `Résultat pour "${searchQuery}" 1`,
          `Résultat pour "${searchQuery}" 2`,
          `Résultat pour "${searchQuery}" 3`
        ]);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 pt-24 md:pt-32 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-red-700 mb-8 drop-shadow-sm">
        <MapPin className="inline-block w-10 h-10 mr-3 text-red-600" />
        Géolocalisation des Ressources
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Carte */}
        <Card className="shadow-lg border-none rounded-xl overflow-hidden">
          <CardHeader className="bg-red-600 text-white py-4 px-6 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-2" /> Carte Interactive
            </CardTitle>
            <Button
              onClick={handleLocateMe}
              className="bg-white text-red-600 hover:bg-red-100 transition-colors duration-200 flex items-center"
              disabled={isLoading}
            >
              <LocateFixed className="w-5 h-5 mr-2" />
              {isLoading ? 'Localisation...' : 'Me Localiser'}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-medium relative">
              {/* Placeholder for a map */}
              <img
                src="https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Carte de localisation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-white text-xl font-semibold text-center p-4 bg-black bg-opacity-50 rounded-lg">
                  Carte interactive (simulation)
                  <br />
                  <span className="text-sm text-gray-300">Les fonctionnalités de carte réelle nécessitent une intégration de service tiers.</span>
                </p>
              </div>
            </div>
            {currentLocation && (
              <p className="p-4 text-center text-lg font-semibold text-gray-700 bg-red-50 border-t border-red-200">
                {currentLocation}
              </p>
            )}
            {error && (
              <p className="p-4 text-center text-lg font-semibold text-red-500 bg-red-100 border-t border-red-300">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Section Recherche et Résultats */}
        <Card className="shadow-lg border-none rounded-xl">
          <CardHeader className="bg-red-600 text-white py-4 px-6">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Search className="w-6 h-6 mr-2" /> Recherche de Points d'Intérêt
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex space-x-3 mb-6">
              <Input
                type="text"
                placeholder="Rechercher une caserne, un véhicule, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              />
              <Button
                onClick={handleSearch}
                className="bg-red-600 hover:bg-red-700 transition-colors duration-200 flex items-center px-6 py-3 rounded-lg"
                disabled={isLoading}
              >
                <Search className="w-5 h-5 mr-2" />
                {isLoading ? 'Recherche...' : 'Rechercher'}
              </Button>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Résultats de la Recherche :</h3>
            {isLoading && <p className="text-center text-gray-600">Chargement des résultats...</p>}
            {searchResults.length === 0 && !isLoading && (
              <p className="text-center text-gray-500 italic">Aucun résultat. Essayez de rechercher "SDIS" ou "caserne".</p>
            )}
            <ul className="space-y-3">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <MapPin className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700 font-medium">{result}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Section Informations Complémentaires */}
      <Card className="mt-8 shadow-lg border-none rounded-xl">
        <CardHeader className="bg-gray-800 text-white py-4 px-6">
          <CardTitle className="text-2xl font-bold flex items-center">
            <MapPin className="w-6 h-6 mr-2" /> Informations sur la Géolocalisation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 leading-relaxed">
          <p className="mb-4">
            Cette page simule les fonctionnalités de géolocalisation pour les ressources du SDIS.
            Elle permet de visualiser la position actuelle de l'utilisateur et de rechercher des points d'intérêt spécifiques
            tels que les casernes, les véhicules ou les équipements.
          </p>
          <p className="mb-4">
            Les données affichées sont des exemples. Pour une implémentation réelle, une intégration avec des services
            de cartographie (comme Google Maps, OpenStreetMap, etc.) et une base de données de localisation des ressources
            seraient nécessaires.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Utilisation de l'API Geolocation du navigateur pour la position actuelle.</li>
            <li>Fonctionnalité de recherche simulée pour les points d'intérêt.</li>
            <li>Interface utilisateur réactive et intuitive.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
