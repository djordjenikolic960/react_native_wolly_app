import {Wallet} from '../model/Wallet';

export abstract class WalletRepository {
  abstract fetchWallet(): Promise<Wallet>;
}
