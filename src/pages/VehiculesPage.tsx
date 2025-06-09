import { CardGrid } from '@/components/card-grid';

const vehicles = [
  {
    id: 1,
    imageSrc: 'https://rescue18.com/wp-content/uploads/2022/03/fpt-sdis-35.jpg',
    title: 'FPT',
    description: 'Fourgon Pompe Tonne - Véhicule polyvalent pour la lutte contre l\'incendie et les opérations diverses.',
  },
  {
    id: 2,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VSAV',
    description: 'Véhicule de Secours et d\'Assistance aux Victimes - Utilisé pour le transport et les premiers secours aux blessés.',
  },
  {
    id: 3,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'CCF',
    description: 'Camion Citerne Feux de Forêts - Spécialisé dans la lutte contre les incendies de végétation.',
  },
  {
    id: 4,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VSR',
    description: 'Véhicule de Secours Routier - Équipé pour les désincarcérations et les accidents de la route.',
  },
  {
    id: 5,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'EPA',
    description: 'Échelle Pivotante Automatique - Pour les interventions en hauteur et le sauvetage de personnes.',
  },
  {
    id: 6,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VL',
    description: 'Véhicule Léger - Utilisé pour le commandement, la reconnaissance ou le transport de personnel.',
  },
];

export function VehiculesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <CardGrid data={vehicles} />
      </main>
    </div>
  );
}
