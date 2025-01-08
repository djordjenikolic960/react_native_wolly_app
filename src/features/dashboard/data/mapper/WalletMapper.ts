import {Wallet} from '../../domain/model/Wallet';

export class WalletMapper {
  mapWalletResponseToModel(wallet: Wallet): Wallet {
    return {
      totalBalance: wallet.totalBalance,
      cryptocurrencies: wallet.cryptocurrencies.map(crypto => ({
        cryptocurrencyId: crypto.cryptocurrencyId,
        name: crypto.name,
        icon: `data:image/png;base64,${crypto.icon}`,
        valueOfOne: crypto.valueOfOne,
        abbreviation: crypto.abbreviation,
        sum: crypto.sum,
      })),
    };
  }
}
