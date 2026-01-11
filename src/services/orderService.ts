import { apiClient } from '@/lib/api';

export interface Order {
  id: number;
  client_id: number;
  user_id: number;
  total: number;
  statut: 'en_attente' | 'payee' | 'annulee';
  created_at: string;
  updated_at: string;
  clients?: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
  users?: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
  };
  plats?: Array<{
    id: number;
    nom: string;
    prix: number;
    pivot: {
      quantite: number;
    };
  }>;
}

export interface CreateOrderData {
  client_id: number;
  user_id: number;
  total: number;
}

export interface UpdateOrderData {
  client_id?: number;
  user_id?: number;
  total?: number;
  statut?: 'en_attente' | 'payee' | 'annulee';
}

export const orderService = {
  async getAll(): Promise<Order[]> {
    return apiClient.get<Order[]>('/orders');
  },

  async getById(id: number): Promise<Order> {
    return apiClient.get<Order>(`/orders/${id}`);
  },

  async create(data: CreateOrderData): Promise<Order> {
    return apiClient.post<Order>('/orders', data);
  },

  async update(id: number, data: UpdateOrderData): Promise<Order> {
    return apiClient.put<Order>(`/orders/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/orders/${id}`);
  },

  async addDish(orderId: number, platId: number, quantite: number): Promise<Order> {
    return apiClient.post<Order>(`/orders/${orderId}/add-dish`, { plat_id: platId, quantite });
  },

  async removeDish(orderId: number, platId: number): Promise<Order> {
    return apiClient.post<Order>(`/orders/${orderId}/remove-dish`, { plat_id: platId });
  },

  async getHistory(): Promise<Order[]> {
    return apiClient.get<Order[]>('/orders/history');
  },
};



