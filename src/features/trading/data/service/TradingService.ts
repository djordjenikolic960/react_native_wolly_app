import {apiClient} from '../../../../api/ApiClient';
import {API_ENDPOINTS} from '../../../../api/ApiEndpoints';
import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import TradingOption from '../../domain/model/TradingOption';

export class TradingService {
  async fetchCrypto(id: string): Promise<Cryptocurrency> {
    try {
      const response = await apiClient.get<Cryptocurrency>(
        `/api/v1/cryptos/${id}`,
      );
      return response;
    } catch (e) {
      console.log('Failed to fetch cryptos');
      throw new Error('Failed to fetch cryptos');
    }
  }

  async tradeCrypto(
    cryptoId: string,
    value: number,
    tradingOption: TradingOption,
  ): Promise<void> {
    try {
      const endpoint =
        tradingOption === TradingOption.Buy
          ? API_ENDPOINTS.BUY_CRYPTO
          : API_ENDPOINTS.SELL_CRYPTO;

      const response = await apiClient.patch<void, void>(
        endpoint,
        undefined, // No request body
        {params: {cryptoId, value}}, // Send as query parameters
      );
      console.log(response);
    } catch (error) {
      console.error('Error while buying cryptocurrency:', error);
      throw error; // Propagate the error to handle it in the caller
    }
  }
}
