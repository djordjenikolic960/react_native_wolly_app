import {Cryptocurrency} from '../../domain/model/Cryptocurrency';
import {CryptoRepository} from '../../domain/repository/CryptoRepository';
import {CryptocurrencyMapper} from '../mapper/CryptocurrencyMapper';
import {CryptoService} from '../service/CryptoService';

export class CryptoRepositoryImpl implements CryptoRepository {
  private cryptoService: CryptoService;
  private cryptoMapper: CryptocurrencyMapper;

  constructor(
    cryptoService: CryptoService,
    cryptoMapper: CryptocurrencyMapper,
  ) {
    this.cryptoService = cryptoService;
    this.cryptoMapper = cryptoMapper;
  }

  async fetchCryptos(): Promise<Array<Cryptocurrency>> {
    try {
      const response = await this.cryptoService.fetchCryptos();
      return this.cryptoMapper.responseToModel(response);
    } catch (error) {
      throw new Error('Error fetching cryptos');
    }
  }
}
