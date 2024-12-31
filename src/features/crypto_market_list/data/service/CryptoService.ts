import {API_ENDPOINTS} from '../../../../api/ApiEndpoints';
import {apiClient} from '../../../../api/ApiClient';
import {Cryptocurrency} from '../../domain/model/Cryptocurrency';

export class CryptoService {
  async fetchCryptos(): Promise<Array<Cryptocurrency>> {
    try {
      const response = await apiClient.get<Array<Cryptocurrency>>(
        API_ENDPOINTS.CRYPTOS,
      );
      return response;
    } catch (e) {
      throw new Error('Failed to fetch cryptos');
    }
  }
}
