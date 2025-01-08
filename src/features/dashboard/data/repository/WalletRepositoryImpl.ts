import {Wallet} from '../../domain/model/Wallet';
import {WalletRepository} from '../../domain/repository/WalletRepository';
import {WalletMapper} from '../mapper/WalletMapper';
import {WalletService} from '../service/WalletService';

export class WalletRepositoryImpl implements WalletRepository {
  private walletService: WalletService;
  private walletMapper: WalletMapper;

  constructor(walletService: WalletService, walletMapper: WalletMapper) {
    this.walletService = walletService;
    this.walletMapper = walletMapper;
  }

  async fetchWallet(): Promise<Wallet> {
    try {
      const response = await this.walletService.fetchWallet();
      return this.walletMapper.mapWalletResponseToModel(response);
    } catch (error) {
      throw new Error();
    }
  }
}
