import Image from "next/image";
import { Glasses } from "@/types/glasses";

interface GlassesCardProps {
  glasses: Glasses;
}

const GlassesCard: React.FC<GlassesCardProps> = ({ glasses }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={glasses.image}
          alt={`${glasses.brand} ${glasses.model}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{glasses.brand}</h3>
        <p className="text-gray-600">{glasses.model}</p>
        {glasses.description && (
          <p className="text-sm text-gray-500 mt-2">{glasses.description}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-black">{glasses.price}€</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm uppercase">
            {glasses.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlassesCard;