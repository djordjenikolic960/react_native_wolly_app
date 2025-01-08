import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {Cryptocurrency} from '../../domain/model/Cryptocurrency';
import {cryptoMarketContainer} from '../../di/CryptoMarketDependecyContainer';

type State = {
  loading: boolean;
  error: BaseError | null;
  cryptos: Cryptocurrency[];
};

type Actions = {
  fetchCryptoCurrencies: () => Promise<void>;
};

const fetchCryptosUseCase = cryptoMarketContainer.getFetchCryptosUseCase();

const useCryptoMarketListStore = create<State & Actions>(set => ({
  cryptos: [],
  error: null,
  loading: false,
  fetchCryptoCurrencies: async () => {
    set({loading: true, error: null});
    try {
      const cryptos = await fetchCryptosUseCase.execute();
      set({cryptos: cryptos});
    } catch (error) {
      throw new Error();
    } finally {
      set({loading: false});
    }
  },
}));

export default useCryptoMarketListStore;
