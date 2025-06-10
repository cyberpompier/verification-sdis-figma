import { ItemCard } from './item-card'; // Importe ItemCard

    interface CardGridProps {
      data: {
        id: string;
        imageSrc: string;
        title: string;
        description: string;
      }[];
      linkPrefix: string; // Nouvelle prop pour le préfixe du lien
    }

    export function CardGrid({ data, linkPrefix }: CardGridProps) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
          {data.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              imageSrc={item.imageSrc}
              title={item.title}
              description={item.description}
              linkPrefix={linkPrefix} // Passe le préfixe à ItemCard
            />
          ))}
        </div>
      );
    }
