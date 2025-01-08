import {Cryptocurrency} from '../../domain/model/Cryptocurrency';
import {CryptoRepository} from '../../domain/repository/CryptoRepository';
import {CryptoDatabaseService} from '../data_source/local_data_source/CryptoDatabaseService';
import {CryptoService} from '../data_source/remote_data_source/CryptoService';
import {CryptocurrencyMapper} from '../mapper/CryptocurrencyMapper';

export class CryptoRepositoryImpl implements CryptoRepository {
  private remoteDataSource: CryptoService;
  private localDataSource: CryptoDatabaseService;
  private cryptoMapper: CryptocurrencyMapper;

  constructor(
    cryptoService: CryptoService,
    databaseService: CryptoDatabaseService,
    cryptoMapper: CryptocurrencyMapper,
  ) {
    this.remoteDataSource = cryptoService;
    this.localDataSource = databaseService;
    this.cryptoMapper = cryptoMapper;
  }

  async fetchCryptos(): Promise<Array<Cryptocurrency>> {
    try {
      const apiResponse = await this.remoteDataSource.fetchCryptos();
      await this.localDataSource.saveCryptos(apiResponse);
      const databaseResponse = await this.localDataSource.getCryptos();
      return databaseResponse;
    } catch (error) {
      throw new Error('Error fetching cryptos');
    }
  }
}
