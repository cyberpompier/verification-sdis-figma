import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface VehicleCardProps {
  id: number; // Add id to props
  imageSrc: string;
  title: string;
  description: string;
}

export function VehicleCard({ id, imageSrc, title, description }: VehicleCardProps) {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVerifyClick = () => {
    navigate(`/vehicules/${id}`); // Navigate to the detail page with the vehicle ID
  };

  return (
    <Card className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-purple-50">
      <CardHeader className="p-0">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold text-gray-800 mb-2">{title}</CardTitle>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-center">
        <Button
          className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-full font-bold shadow-md"
          onClick={handleVerifyClick} // Add onClick handler
        >
          Vérifier
        </Button>
      </CardFooter>
    </Card>
  );
}
