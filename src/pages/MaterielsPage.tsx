import { CardGrid } from '@/components/card-grid';

const materiels = [
  {
    id: 1,
    imageSrc: 'https://www.men-fire.fr/452-large_default/sac-intervention-43l-reflex.jpg',
    title: 'Lance Incendie',
    description: 'Équipement essentiel pour la projection d\'eau ou de mousse sur un foyer d\'incendie.',
  },
  {
    id: 2,
    imageSrc: 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Appareil Respiratoire Isolant (ARI)',
    description: 'Permet aux pompiers de respirer dans des atmosphères toxiques ou enfumées.',
  },
  {
    id: 3,
    imageSrc: 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Défibrillateur',
    description: 'Utilisé pour réanimer une victime d\'arrêt cardiaque par choc électrique.',
  },
  {
    id: 4,
    imageSrc: 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Coussin de Levage',
    description: 'Permet de soulever des charges lourdes lors d\'opérations de désincarcération.',
  },
  {
    id: 5,
    imageSrc: 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Tronçonneuse',
    description: 'Outil de découpe pour dégager des accès ou des victimes.',
  },
  {
    id: 6,
    imageSrc: 'https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Projecteur Portable',
    description: 'Fournit un éclairage puissant sur les lieux d\'intervention nocturnes.',
  },
];

export function MaterielsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <CardGrid data={materiels} />
      </main>
    </div>
  );
}
