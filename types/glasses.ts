export interface Glasses {
  _id?: string;
  id?: string;
  brand: string;
  model: string;
  category: 'homme' | 'femme' | 'enfant' | 'solaire';
  price: number;
  image: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface GlassesFormData {
  brand: string;
  model: string;
  category: 'homme' | 'femme' | 'enfant' | 'solaire';
  price: number;
  description?: string;
}