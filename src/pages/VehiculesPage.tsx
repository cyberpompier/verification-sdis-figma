import { CardGrid } from '@/components/card-grid';

export const vehicles = [ // Export vehicles for use in detail page
  {
    id: 1,
    imageSrc: 'https://rescue18.com/wp-content/uploads/2022/03/fpt-sdis-35.jpg',
    title: 'FPT',
    description: 'Fourgon Pompe Tonne - Véhicule polyvalent pour la lutte contre l\'incendie et les opérations diverses.',
    lastVerification: '23/05/2025 à 08H34 par ADC Dupressoir',
  },
  {
    id: 2,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VSAV',
    description: 'Véhicule de Secours et d\'Assistance aux Victimes - Utilisé pour le transport et les premiers secours aux blessés.',
    lastVerification: '22/05/2025 à 10H00 par ADC Martin',
  },
  {
    id: 3,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'CCF',
    description: 'Camion Citerne Feux de Forêts - Spécialisé dans la lutte contre les incendies de végétation.',
    lastVerification: '21/05/2025 à 14H15 par ADC Dubois',
  },
  {
    id: 4,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VSR',
    description: 'Véhicule de Secours Routier - Équipé pour les désincarcérations et les accidents de la route.',
    lastVerification: '20/05/2025 à 09H30 par ADC Lefevre',
  },
  {
    id: 5,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'EPA',
    description: 'Échelle Pivotante Automatique - Pour les interventions en hauteur et le sauvetage de personnes.',
    lastVerification: '19/05/2025 à 11H45 par ADC Bernard',
  },
  {
    id: 6,
    imageSrc: 'https://images.pexels.com/photos/1616090/pexels-photo-1616090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'VL',
    description: 'Véhicule Léger - Utilisé pour le commandement, la reconnaissance ou le transport de personnel.',
    lastVerification: '18/05/2025 à 16H00 par ADC Robert',
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
