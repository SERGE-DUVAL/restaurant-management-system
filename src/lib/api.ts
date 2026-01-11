/**
 * Configuration et client API pour communiquer avec le backend Laravel
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Mode développement avec données mock (si le backend n'est pas disponible)
const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

// Fonction pour obtenir l'URL de base de l'API
function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Côté client, utiliser la variable d'environnement ou la valeur par défaut
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  }
  // Côté serveur, utiliser la valeur par défaut
  return 'http://localhost:8000/api';
}

// Fonction pour vérifier si le backend est accessible
async function checkBackendAvailability(): Promise<boolean> {
  try {
    const response = await fetch(`${getApiBaseUrl().replace('/api', '')}/api/test`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // Timeout de 2 secondes
    });
    return response.ok;
  } catch {
    return false;
  }
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || getApiBaseUrl();
    
    // Récupérer le token depuis localStorage au démarrage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    // Ajouter le token d'authentification si disponible
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      // Ajouter un timeout pour éviter les attentes infinies
      signal: AbortSignal.timeout(5000), // 5 secondes
    };

    try {
      const response = await fetch(url, config);
      
      // Gérer les erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Erreur HTTP ${response.status}` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Si la réponse est vide (204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error: any) {
      console.error('API Error:', error);
      console.error('URL tentée:', url);
      
      // Améliorer le message d'erreur pour les erreurs de réseau
      if (error instanceof TypeError && (error.message === 'Failed to fetch' || error.message.includes('fetch'))) {
        const helpfulMessage = `Le backend Laravel n'est pas accessible. Démarrez-le avec: cd backend && php artisan serve`;
        console.error('🔴 ERREUR: Backend non accessible');
        console.error('📍 URL tentée:', url);
        console.error('📋 Solution rapide:');
        console.error('   1. Ouvrez un terminal');
        console.error('   2. cd backend');
        console.error('   3. php artisan serve');
        console.error('   4. Vérifiez: http://localhost:8000/api/test');
        console.error('');
        console.error('💡 Ou utilisez le script: start-backend.bat');
        throw new Error(helpfulMessage);
      }
      
      // Gérer les erreurs de timeout
      if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        const timeoutMessage = `Timeout: Le backend ne répond pas. Vérifiez qu'il est démarré sur http://localhost:8000`;
        console.error('⏱️', timeoutMessage);
        throw new Error(timeoutMessage);
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Méthode pour les uploads de fichiers
  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {};
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

// Instance singleton du client API
export const apiClient = new ApiClient();

// Types pour les réponses API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

