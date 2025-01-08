import {WalletCryptocurrency} from '../model/WalletCryptocurrency';

export class FetchUsersBalanceInCryptoUseCase {
  execute(cryptos: Array<WalletCryptocurrency>): number {
    return cryptos.reduce((accumulated, current) => {
      return accumulated + current.sum * current.valueOfOne;
    }, 0);
  }
}
