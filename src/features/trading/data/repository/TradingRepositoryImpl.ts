import {CryptocurrencyMapper} from '../../../crypto_market_list/data/mapper/CryptocurrencyMapper';
import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import {TradingRepository} from '../../domain/repository/TradingRepository';
import {TradingService} from '../service/TradingService';

export class TradingRepositoryImpl implements TradingRepository {
  tradingService: TradingService;
  cryptocurrenyMapper: CryptocurrencyMapper;

  constructor(
    tradingService: TradingService,
    cryptocurrenyMapper: CryptocurrencyMapper,
  ) {
    this.tradingService = tradingService;
    this.cryptocurrenyMapper = cryptocurrenyMapper;
  }

  async fetch(id: string): Promise<Cryptocurrency> {
    try {
      const response = await this.tradingService.fetchCrypto(id);
      return this.cryptocurrenyMapper.toModel(response);
    } catch (error) {
      throw new Error('TradingRepository: errpr fetching');
    }
  }
}
