import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import TokenManager from '../utils/TokenManager';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000, // Timeout in milliseconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await TokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  // GET method
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    console.log(endpoint);
    const response = await this.client.get(endpoint, {params});
    return response.data;
  }

  // POST method
  async post<T, R>(endpoint: string, data: T): Promise<R> {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  // PATCH method
  async patch<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await this.client.patch(endpoint, data);
    return response.data;
  }
}

export const apiClient = new ApiClient();
