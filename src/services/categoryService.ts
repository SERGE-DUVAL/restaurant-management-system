import { apiClient } from '@/lib/api';

export interface Category {
  id: number;
  nom: string;
  description?: string;
}

export interface CreateCategoryData {
  nom: string;
  description?: string;
}

export interface UpdateCategoryData {
  nom?: string;
  description?: string;
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories');
  },

  async getById(id: number): Promise<Category> {
    return apiClient.get<Category>(`/categories/${id}`);
  },

  async create(data: CreateCategoryData): Promise<Category> {
    return apiClient.post<Category>('/categories', data);
  },

  async update(id: number, data: UpdateCategoryData): Promise<Category> {
    return apiClient.put<Category>(`/categories/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/categories/${id}`);
  },
};



