import { apiClient } from '@/lib/api';

export interface Payment {
  id: number;
  commande_id: number;
  montant: number;
  methode: 'carte' | 'especes' | 'cheque' | 'virement';
  statut: 'en_attente' | 'paye' | 'echec';
  created_at: string;
}

export interface CreatePaymentData {
  commande_id: number;
  montant: number;
  methode: 'carte' | 'especes' | 'cheque' | 'virement';
}

export const paymentService = {
  async create(data: CreatePaymentData): Promise<Payment> {
    return apiClient.post<Payment>('/paiements', data);
  },

  async getByOrderId(orderId: number): Promise<Payment> {
    return apiClient.get<Payment>(`/paiements/${orderId}`);
  },

  async generateInvoice(orderId: number): Promise<Blob> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/paiements/${orderId}/facture`, {
      headers: {
        'Authorization': `Bearer ${apiClient.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la génération de la facture');
    }
    
    return response.blob();
  },
};



