import {Wallet} from '../model/Wallet';
import {WalletRepository} from '../repository/WalletRepository';

export class FetchWalletUseCase {
  private walletRepository: WalletRepository;

  constructor(walletRepository: WalletRepository) {
    this.walletRepository = walletRepository;
  }

  async execute(): Promise<Wallet> {
    try {
      return await this.walletRepository.fetchWallet();
    } catch (error) {
      throw new Error();
    }
  }
}
