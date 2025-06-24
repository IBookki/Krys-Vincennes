"use client";
import { useEffect, useState } from "react";
import GlassesCard from "@/components/GlassesCard";
import { Glasses } from "@/types/glasses";

export default function SolairePage() { // Changé de HommePage
  const [glasses, setGlasses] = useState<Glasses[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlasses = async () => {
      try {
        const response = await fetch('/api/glasses?category=solaire');
        const data = await response.json();
        setGlasses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
        setGlasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGlasses();
  }, []);

  if (loading) return <div className="text-center p-8">Chargement...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lunettes Solaires</h1>
      
      {glasses.length === 0 ? (
        <p className="text-center text-gray-500">Aucune lunette solaire disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {glasses.map((item) => (
            <GlassesCard key={item._id || item.id} glasses={item} />
          ))}
        </div>
      )}
    </div>
  );
}