import {WalletMapper} from '../data/mapper/WalletMapper';
import {WalletRepositoryImpl} from '../data/repository/WalletRepositoryImpl';
import {WalletService} from '../data/service/WalletService';
import {FetchUsersBalanceInCryptoUseCase} from '../domain/usecase/FetchUsersBalanceInCryptoUseCase';
import {FetchWalletUseCase} from '../domain/usecase/FetchWalletUseCase';

class DependencyContainer {
  private walletService: WalletService;
  private walletMapper: WalletMapper;
  private walletRepository: WalletRepositoryImpl;
  private fetchWalletUseCase: FetchWalletUseCase;
  private fetchUsersBalanceInCryptoUseCase: FetchUsersBalanceInCryptoUseCase;

  constructor() {
    this.walletService = new WalletService();
    this.walletMapper = new WalletMapper();
    this.walletRepository = new WalletRepositoryImpl(
      this.walletService,
      this.walletMapper,
    );
    this.fetchWalletUseCase = new FetchWalletUseCase(this.walletRepository);
    this.fetchUsersBalanceInCryptoUseCase =
      new FetchUsersBalanceInCryptoUseCase();
  }

  getWalletService(): WalletService {
    return this.walletService;
  }

  getWalletMapper(): WalletMapper {
    return this.walletMapper;
  }

  getWalletRepository(): WalletRepositoryImpl {
    return this.walletRepository;
  }

  getFetchWalletUseCase(): FetchWalletUseCase {
    return this.fetchWalletUseCase;
  }

  getFetchUsersBalanceInCryptoUseCase(): FetchUsersBalanceInCryptoUseCase {
    return this.fetchUsersBalanceInCryptoUseCase;
  }
}

export const dashboardContainer = new DependencyContainer();
