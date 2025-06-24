"use client";
import { useEffect, useState } from "react";
import GlassesCard from "@/components/GlassesCard";
import { Glasses } from "@/types/glasses";

export default function FemmePage() {
  const [glasses, setGlasses] = useState<Glasses[]>([]);

  useEffect(() => {
    fetch('/api/glasses?category=femme')
      .then(res => res.json())
      .then(data => setGlasses(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lunettes Femme</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {glasses.map((item) => (
          <GlassesCard key={item.id} glasses={item} />
        ))}
      </div>
      
      {glasses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Aucune lunette disponible pour le moment.</p>
      )}
    </div>
  );
}