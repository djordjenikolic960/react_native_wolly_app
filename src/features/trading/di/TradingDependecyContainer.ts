import {CryptocurrencyMapper} from '../../crypto_market_list/data/mapper/CryptocurrencyMapper';
import {userContainer} from '../../user/di/UserDependecyContainer';
import {FetchUsersCardBalanceUseCase} from '../../user/domain/usecase/FetchUsersCardBalanceUseCase';
import {TradingRepositoryImpl} from '../data/repository/TradingRepositoryImpl';
import {TradingService} from '../data/service/TradingService';
import {TradingRepository} from '../domain/repository/TradingRepository';
import {FetchCryptoUseCase} from '../domain/usecase/FetchCryptoUseCase';
import {FetchCurrentAmountOfCryptoUseCase} from '../domain/usecase/FetchCurrentAmountOfCryptoUseCase';
import {TradeCryptoUseCase} from '../domain/usecase/TradeCryptoUseCase';

class TradingDependencyContainer {
  private tradingService: TradingService;
  private cryptocurrencyMapper: CryptocurrencyMapper;
  private tradingRepository: TradingRepository;
  private fetchCryptoUseCase: FetchCryptoUseCase;
  private tradeCryptoUseCase: TradeCryptoUseCase;
  private fetchCurrentAmountOfCryptoUseCase: FetchCurrentAmountOfCryptoUseCase;
  private fetchUsersCurrentBalanceUseCase: FetchUsersCardBalanceUseCase;

  constructor() {
    this.tradingService = new TradingService();
    this.cryptocurrencyMapper = new CryptocurrencyMapper();
    this.tradingRepository = new TradingRepositoryImpl(
      this.tradingService,
      this.cryptocurrencyMapper,
    );
    this.fetchUsersCurrentBalanceUseCase =
      userContainer.getFetchUsersCardBalanceUseCase();
    this.fetchCryptoUseCase = new FetchCryptoUseCase(this.tradingRepository);
    this.tradeCryptoUseCase = new TradeCryptoUseCase(
      this.tradingRepository,
      this.fetchUsersCurrentBalanceUseCase,
    );
    this.fetchCurrentAmountOfCryptoUseCase =
      new FetchCurrentAmountOfCryptoUseCase();
  }

  getTradingService(): TradingService {
    return this.tradingService;
  }

  getCryptocurrencyMapper(): CryptocurrencyMapper {
    return this.cryptocurrencyMapper;
  }

  getTradingRepository(): TradingRepository {
    return this.tradingRepository;
  }

  getFetchCryptoUseCase(): FetchCryptoUseCase {
    return this.fetchCryptoUseCase;
  }

  getTradeCryptoUseCase(): TradeCryptoUseCase {
    return this.tradeCryptoUseCase;
  }

  getFetchCurrentAmountOfCryptoUseCase(): FetchCurrentAmountOfCryptoUseCase {
    return this.fetchCurrentAmountOfCryptoUseCase;
  }
}

export const tradingContainer = new TradingDependencyContainer();
