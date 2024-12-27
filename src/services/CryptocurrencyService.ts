import { apiClient } from "../api/ApiClient";

export const fetchCryptos = async (): Promise<any[]> => {
    return await apiClient.get<any[]>(
      '/api/v1/cryptos',
    );
  };

  export const fetchCryptoCurrencie = async (id: string): Promise<any> => {
    return await apiClient.get<any>(
      `/api/v1/cryptos/${id}`,
    );
  };