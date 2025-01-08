import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import {WalletCryptocurrency} from '../../../dashboard/domain/model/WalletCryptocurrency';

export class FetchCurrentAmountOfCryptoUseCase {
  execute(
    crypto: Cryptocurrency,
    walletCryptos: Array<WalletCryptocurrency>,
  ): number {
    const walletCrypto = walletCryptos.find(item => item.name === crypto.name);
    if (walletCrypto) {
      return walletCrypto.sum;
    }
    return 0;
  }
}
