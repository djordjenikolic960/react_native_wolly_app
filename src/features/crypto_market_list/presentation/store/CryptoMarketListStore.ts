import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {Cryptocurrency} from '../../domain/model/Cryptocurrency';
import {CryptocurrencyMapper} from '../../data/mapper/CryptocurrencyMapper';
import {CryptoRepositoryImpl} from '../../data/repository/CryptoRepositoryImpl';
import {CryptoService} from '../../data/service/CryptoService';
import {FetchCryptosUseCase} from '../../domain/usecase/FetchCryptosUseCase';

type State = {
  loading: boolean;
  error: BaseError | null;
  cryptos: Cryptocurrency[];
};

type Actions = {
  fetchCryptoCurrencies: () => Promise<void>;
};

const cryptoMapper = new CryptocurrencyMapper();
const cryptoService = new CryptoService();
const cryptoRepository = new CryptoRepositoryImpl(cryptoService, cryptoMapper);
const fetchCryptosUseCase = new FetchCryptosUseCase(cryptoRepository);

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
