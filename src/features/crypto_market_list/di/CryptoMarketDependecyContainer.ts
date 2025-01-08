import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {CryptoService} from '../data/data_source/remote_data_source/CryptoService';
import {CryptocurrencyMapper} from '../data/mapper/CryptocurrencyMapper';
import {CryptoRepositoryImpl} from '../data/repository/CryptoRepositoryImpl';
import {CryptoRepository} from '../domain/repository/CryptoRepository';
import {FetchCryptosUseCase} from '../domain/usecase/FetchCryptosUseCase';
import {DatabaseService} from '../../../db/DatabaseService';
import {CryptoDatabaseService} from '../data/data_source/local_data_source/CryptoDatabaseService';

class CryptoMarketDependencyContainer {
  private cryptoMapper: CryptocurrencyMapper;
  private cryptoService: CryptoService;
  private db: DatabaseService;
  private cryptoDatabaseService: CryptoDatabaseService;
  private cryptoRepository: CryptoRepository;
  private fetchCryptosUseCase: FetchCryptosUseCase;

  constructor() {
    this.cryptoMapper = new CryptocurrencyMapper();
    this.cryptoService = new CryptoService();
    this.db = new DatabaseService();
    this.cryptoDatabaseService = new CryptoDatabaseService(this.db);
    this.cryptoRepository = new CryptoRepositoryImpl(
      this.cryptoService,
      this.cryptoDatabaseService,
      this.cryptoMapper,
    );
    this.fetchCryptosUseCase = new FetchCryptosUseCase(this.cryptoRepository);
  }

  getFetchCryptosUseCase(): FetchCryptosUseCase {
    return this.fetchCryptosUseCase;
  }
}

export const cryptoMarketContainer = new CryptoMarketDependencyContainer();
