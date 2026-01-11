import { apiClient } from '@/lib/api';

export interface Category {
  id: number;
  nom: string;
  description?: string;
}

export interface Dish {
  id: number;
  nom: string;
  description?: string;
  prix: number;
  category_id: number;
  image?: string;
  disponible: boolean;
  category?: Category;
}

export interface CreateDishData {
  nom: string;
  description?: string;
  prix: number;
  category_id: number;
  image?: File;
  disponible?: boolean;
}

export interface UpdateDishData {
  nom?: string;
  description?: string;
  prix?: number;
  category_id?: number;
  image?: File;
  disponible?: boolean;
}

export const dishService = {
  async getAll(): Promise<Dish[]> {
    return apiClient.get<Dish[]>('/dishes');
  },

  async getById(id: number): Promise<Dish> {
    return apiClient.get<Dish>(`/dishes/${id}`);
  },

  async create(data: CreateDishData): Promise<Dish> {
    if (data.image) {
      // Utiliser FormData pour l'upload d'image
      const formData = new FormData();
      formData.append('nom', data.nom);
      formData.append('prix', data.prix.toString());
      formData.append('category_id', data.category_id.toString());
      if (data.description) formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);
      if (data.disponible !== undefined) formData.append('disponible', data.disponible.toString());
      
      return apiClient.postFormData<Dish>('/dishes', formData);
    } else {
      return apiClient.post<Dish>('/dishes', data);
    }
  },

  async update(id: number, data: UpdateDishData): Promise<Dish> {
    if (data.image) {
      const formData = new FormData();
      if (data.nom) formData.append('nom', data.nom);
      if (data.prix) formData.append('prix', data.prix.toString());
      if (data.category_id) formData.append('category_id', data.category_id.toString());
      if (data.description) formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);
      if (data.disponible !== undefined) formData.append('disponible', data.disponible.toString());
      
      return apiClient.postFormData<Dish>(`/dishes/${id}`, formData);
    } else {
      return apiClient.put<Dish>(`/dishes/${id}`, data);
    }
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/dishes/${id}`);
  },

  async search(query: string): Promise<Dish[]> {
    return apiClient.get<Dish[]>(`/dishes/search?query=${encodeURIComponent(query)}`);
  },
};



