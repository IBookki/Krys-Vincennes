"use client";
import { useState } from "react";
import { GlassesFormData } from "@/types/glasses";

const AddGlassesForm: React.FC = () => {
  const [formData, setFormData] = useState<GlassesFormData>({
    brand: "",
    model: "",
    category: "homme",
    price: 0,
    description: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      setMessage("❌ Veuillez sélectionner une image");
      return;
    }

    setIsSubmitting(true);
    setMessage("⏳ Ajout en cours...");
    
    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("image", image);

    try {
      console.log("Envoi des données...", formData);
      
      const response = await fetch("/api/glasses", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        setFormData({
          brand: "",
          model: "",
          category: "homme",
          price: 0,
          description: ""
        });
        setImage(null);
        setMessage("✅ Lunettes ajoutées avec succès!");
        
        // Reset le formulaire
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        setMessage("❌ Erreur: " + (result.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("❌ Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Ajouter des lunettes</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 
          message.includes('❌') ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marque *
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            placeholder="Ex: Ray-Ban"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modèle *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            placeholder="Ex: Aviator"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value as any})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="enfant">Enfant</option>
            <option value="solaire">Solaire</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix (€) *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            placeholder="Ex: 150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
            placeholder="Description optionnelle..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
              console.log("Image sélectionnée:", file?.name);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          {image && (
            <p className="text-sm text-gray-500 mt-1">
              Fichier sélectionné: {image.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter les lunettes"}
        </button>
      </form>
    </div>
  );
};

export default AddGlassesForm;