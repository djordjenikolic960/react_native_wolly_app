import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import {TradingRepository} from '../repository/TradingRepository';

export class FetchCryptoUseCase {
  tradingRepository: TradingRepository;

  constructor(tradingRepository: TradingRepository) {
    this.tradingRepository = tradingRepository;
  }

  async execute(id: string): Promise<Cryptocurrency> {
    try {
      return await this.tradingRepository.fetch(id);
    } catch (error) {
      throw new Error('FetchCryptoUseCase: error fetching');
    }
  }
}
