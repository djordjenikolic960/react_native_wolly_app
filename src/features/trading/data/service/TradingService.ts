import {apiClient} from '../../../../api/ApiClient';
import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';

export class TradingService {
  async fetchCrypto(id: string): Promise<Cryptocurrency> {
    try {
      const response = await apiClient.get<Cryptocurrency>(
        `/api/v1/cryptos/${id}`,
      );
      console.log(response);
      return response;
    } catch (e) {
      console.log('Failed to fetch cryptos');
      throw new Error('Failed to fetch cryptos');
    }
  }
}
