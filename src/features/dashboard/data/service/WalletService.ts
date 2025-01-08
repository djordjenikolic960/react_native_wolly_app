import {apiClient} from '../../../../api/ApiClient';
import {API_ENDPOINTS} from '../../../../api/ApiEndpoints';
import {Wallet} from '../../domain/model/Wallet';

export class WalletService {
  async fetchWallet(): Promise<Wallet> {
    try {
      const response = await apiClient.get<Wallet>(API_ENDPOINTS.WALLET);

      return response;
    } catch (e) {
      throw Error();
    }
  }
}

export const walletSertvice = new WalletService();
