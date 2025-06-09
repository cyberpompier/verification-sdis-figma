import { CardGrid } from '@/components/card-grid';

const personnel = [
  {
    id: 1,
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSedxGVLsx50vDOe04zvxY4sdSvJfhCcAvCrQ&s',
    title: 'Chef d\'Agrès',
    description: 'Responsable d\'une équipe d\'intervention et de la gestion des opérations sur le terrain.',
  },
  {
    id: 2,
    imageSrc: 'https://images.pexels.com/photos/1089640/pexels-photo-1089640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Sapeur-Pompier',
    description: 'Intervient sur tous types de sinistres : incendies, secours à personnes, accidents.',
  },
  {
    id: 3,
    imageSrc: 'https://images.pexels.com/photos/1089640/pexels-photo-1089640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Infirmier Sapeur-Pompier',
    description: 'Assure les premiers soins médicaux et l\'assistance aux victimes sur les lieux d\'intervention.',
  },
  {
    id: 4,
    imageSrc: 'https://images.pexels.com/photos/1089640/pexels-photo-1089640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Officier',
    description: 'Encadre les équipes, planifie les opérations et gère les ressources humaines et matérielles.',
  },
  {
    id: 5,
    imageSrc: 'https://images.pexels.com/photos/1089640/pexels-photo-1089640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Opérateur CTA-CODIS',
    description: 'Gère les appels d\'urgence, coordonne les interventions et assure le suivi des opérations.',
  },
  {
    id: 6,
    imageSrc: 'https://images.pexels.com/photos/1089640/pexels-photo-1089640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Plongeur',
    description: 'Spécialisé dans les interventions en milieu aquatique pour le sauvetage et la recherche.',
  },
];

export function PersonnelPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20 pb-20 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <CardGrid data={personnel} />
      </main>
    </div>
  );
}
