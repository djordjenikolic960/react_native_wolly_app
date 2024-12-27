import {create} from 'zustand';
import {BaseError} from '../../errors/BaseError';
import CryptoCurrency from '../../types/cryptocurrency';
import {fetchCryptos} from '../../services/CryptocurrencyService';

type CryptoListState = {
  loading: boolean;
  error: BaseError | null;
  cryptos: CryptoCurrency[];
  fetchCryptoCurrencies: () => Promise<void>;
};

const useCryptoListStore = create<CryptoListState>(set => ({
  cryptos: [],
  error: null,
  loading: false,
  fetchCryptoCurrencies: async () => {
    set({loading: true, error: null});
    try {
      const response = await fetchCryptos();
      const cryptos: CryptoCurrency[] = response.map((crypto: any) => ({
        id: crypto.id,
        name: crypto.name,
        iconUrl: `data:image/png;base64,${crypto.icon}`,
        valueOfOne: crypto.valueOfOne,
        abbrevation: crypto.abbreviation,
      }));
      
      set({cryptos: cryptos});
    } catch (error) {
      throw new Error();
    } finally {
      set({loading: false});
    }
  },
}));

export default useCryptoListStore;
