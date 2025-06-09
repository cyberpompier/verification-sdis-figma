import { VehicleCard } from './vehicle-card';

interface CardGridProps {
  data: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
  }[];
}

export function CardGrid({ data }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {data.map((item) => (
        <VehicleCard
          key={item.id}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
