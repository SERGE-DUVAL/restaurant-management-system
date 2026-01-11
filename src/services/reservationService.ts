import { apiClient } from '@/lib/api';

export interface Reservation {
  id: number;
  client_id: number;
  date: string;
  heure: string;
  nombre_personnes: number;
  statut: 'en_attente' | 'confirmee' | 'annulee';
  notes?: string;
  created_at: string;
}

export interface CreateReservationData {
  client_id: number;
  date: string;
  heure: string;
  nombre_personnes: number;
  notes?: string;
}

export const reservationService = {
  async getAll(): Promise<Reservation[]> {
    return apiClient.get<Reservation[]>('/reservations');
  },

  async getById(id: number): Promise<Reservation> {
    return apiClient.get<Reservation>(`/reservations/${id}`);
  },

  async create(data: CreateReservationData): Promise<Reservation> {
    return apiClient.post<Reservation>('/reservations', data);
  },

  async update(id: number, data: Partial<CreateReservationData>): Promise<Reservation> {
    return apiClient.put<Reservation>(`/reservations/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/reservations/${id}`);
  },
};



