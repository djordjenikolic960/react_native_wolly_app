import {create} from 'zustand';
import {BaseError} from '../../errors/BaseError';
import CryptoCurrency from '../../types/cryptocurrency';
import {fetchCryptoCurrencie, fetchCryptos} from '../../services/CryptocurrencyService';

type TradingState = {
  loading: boolean;
  error: BaseError | null;
  crypto: CryptoCurrency | null;
  fetchCryptoCurrencie: (id: string) => Promise<void>;
};

const useTradingStore = create<TradingState>(set => ({
  crypto: null,
  error: null,
  loading: false,
  fetchCryptoCurrencie: async (id: string) => {
    set({loading: true, error: null});
    try {
      const response = await fetchCryptoCurrencie(id);
      console.log('ovo je response:' , response.name);
      const crypto: CryptoCurrency = ({
        id: response.id,
        name: response.name,
        iconUrl: `data:image/png;base64,${response.icon}`,
        valueOfOne: response.valueOfOne,
        abbrevation: response.abbreviation,
      });
      console.log('item is: ', crypto);
      set({crypto: crypto, loading: false});
    } catch (error) {
      throw new Error();
    } finally {
      set({loading: false});
    }
  },
}));

export default useTradingStore;
