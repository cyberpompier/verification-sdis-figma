import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);

    // Simulate a scan operation
    try {
      // In a real application, you would integrate with a barcode/QR code scanner library
      // For example, using a camera API or a dedicated scanner module.
      // This is a placeholder for demonstration.
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network/processing delay

      const simulatedData = Math.random() > 0.5 ? "VEHICULE-ABC-123" : "MATERIEL-XYZ-456";
      setScanResult(`Résultat du scan : ${simulatedData}`);
    } catch (err) {
      console.error("Erreur lors du scan:", err);
      setError("Échec du scan. Veuillez réessayer.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4 pt-20">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red-600">Page de Scan</CardTitle>
          <p className="text-gray-600 mt-2">Scannez un code-barres ou un QR code pour identifier un élément.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              <img
                src="https://images.pexels.com/photos/163097/qr-code-barcode-scanner-type-code-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Placeholder pour scanner"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-md transition-colors duration-300"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Scan en cours...
                </>
              ) : (
                'Lancer le Scan'
              )}
            </Button>
          </div>

          {scanResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              <h3 className="font-semibold text-lg mb-2">Résultat du Scan :</h3>
              <p className="break-words">{scanResult}</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
              <h3 className="font-semibold text-lg mb-2">Erreur :</h3>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">Informations sur le Scan</h4>
            <p className="text-gray-700">
              Cette page est conçue pour simuler la fonctionnalité de scan de codes-barres ou de QR codes.
              En production, elle serait intégrée avec une API de caméra ou un module de scan dédié pour
              lire les identifiants uniques des véhicules ou des matériels.
            </p>
            <p className="text-gray-700">
              Le résultat du scan pourrait ensuite être utilisé pour rechercher des informations détaillées
              dans la base de données Supabase et afficher les données pertinentes à l'utilisateur.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
