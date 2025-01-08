import {WalletCryptocurrency} from './WalletCryptocurrency';

export type Wallet = {
  totalBalance: number;
  cryptocurrencies: Array<WalletCryptocurrency>;
};
