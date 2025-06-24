"use client";
import { useEffect, useState } from "react";
import GlassesCard from "@/components/GlassesCard";
import { Glasses } from "@/types/glasses";

export default function EnfantPage() {
  const [glasses, setGlasses] = useState<Glasses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlasses = async () => {
      try {
        console.log('Fetching glasses...');
        const response = await fetch('/api/glasses?category=enfant');
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (response.ok) {
          // Vérifier si data est un tableau
          if (Array.isArray(data)) {
            setGlasses(data);
          } else {
            console.error('Data is not an array:', data);
            setGlasses([]);
            setError('Format de données incorrect');
          }
        } else {
          // Si l'API retourne une erreur
          setError(data.error || 'Erreur de connexion');
          setGlasses([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Erreur de connexion à l\'API');
        setGlasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGlasses();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Chargement des lunettes enfant...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>Erreur: {error}</p>
          <p className="text-sm mt-2">Vérifiez votre connexion MongoDB</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lunettes Enfant</h1>
      
      {glasses.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          Aucune lunette enfant disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {glasses.map((item) => (
            <GlassesCard key={item.id} glasses={item} />
          ))}
        </div>
      )}
    </div>
  );
}