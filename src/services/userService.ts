import { apiClient } from '@/lib/api';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  telephone?: string;
}

export interface CreateUserData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string;
  telephone?: string;
}

export interface UpdateUserData {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  telephone?: string;
}

export const userService = {
  async getAll(): Promise<User[]> {
    return apiClient.get<User[]>('/users');
  },

  async getById(id: number): Promise<User> {
    return apiClient.get<User>(`/users/${id}`);
  },

  async create(data: CreateUserData): Promise<User> {
    return apiClient.post<User>('/users', data);
  },

  async update(id: number, data: UpdateUserData): Promise<User> {
    return apiClient.put<User>(`/users/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/users/${id}`);
  },

  async search(query: string): Promise<User[]> {
    return apiClient.get<User[]>(`/users/search?query=${encodeURIComponent(query)}`);
  },

  async updateRole(id: number, role: string): Promise<User> {
    return apiClient.patch<User>(`/users/${id}/role`, { role });
  },
};



