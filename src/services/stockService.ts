import { apiClient } from '@/lib/api';

export interface Stock {
  id: number;
  nom: string;
  quantite: number;
  unite: string;
  seuil_alerte: number;
  prix_unitaire?: number;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: number;
  stock_id: number;
  type: 'entree' | 'sortie';
  quantite: number;
  raison?: string;
  created_at: string;
}

export interface CreateStockData {
  nom: string;
  quantite: number;
  unite: string;
  seuil_alerte: number;
  prix_unitaire?: number;
}

export interface UpdateStockData {
  nom?: string;
  quantite?: number;
  unite?: string;
  seuil_alerte?: number;
  prix_unitaire?: number;
}

export const stockService = {
  async getAll(): Promise<Stock[]> {
    return apiClient.get<Stock[]>('/stocks');
  },

  async getById(id: number): Promise<Stock> {
    return apiClient.get<Stock>(`/stocks/${id}`);
  },

  async create(data: CreateStockData): Promise<Stock> {
    return apiClient.post<Stock>('/stocks', data);
  },

  async update(id: number, data: UpdateStockData): Promise<Stock> {
    return apiClient.put<Stock>(`/stocks/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/stocks/${id}`);
  },

  async getMovements(): Promise<StockMovement[]> {
    return apiClient.get<StockMovement[]>('/stocks/movements');
  },
};



