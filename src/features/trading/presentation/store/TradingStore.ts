import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import {TradingService} from '../../data/service/TradingService';
import {TradingRepositoryImpl} from '../../data/repository/TradingRepositoryImpl';
import {FetchCryptoUseCase} from '../../domain/usecase/FetchCryptoUseCase';
import TradingOption from '../../domain/model/TradingOption';
import {CryptocurrencyMapper} from '../../../crypto_market_list/data/mapper/CryptocurrencyMapper';
type State = {
  loading: boolean;
  error: BaseError | null;
  tradingOption: TradingOption;
  selectedCrypto: Cryptocurrency | null;
  currentUserValue: number;
  tradeValue: number;
  enteredTradeValue: string;
};

type Actions = {
  fetchCryptoCurrencie: (id: string) => Promise<void>;
  setTradingOption: (tradingOption: TradingOption) => void;
  setEnteredTradeValue: (value: string) => void;
  reset: () => void;
};

const initialState: State = {
  selectedCrypto: null,
  error: null,
  loading: false,
  tradingOption: TradingOption.Buy,
  currentUserValue: 0,
  tradeValue: 0,
  enteredTradeValue: '',
};

const tradingService = new TradingService();
const cryptocurrencyMapper = new CryptocurrencyMapper();
const tradingRepository = new TradingRepositoryImpl(
  tradingService,
  cryptocurrencyMapper,
);
const fetchCryptoUseCase = new FetchCryptoUseCase(tradingRepository);

const useTradingStore = create<State & Actions>(set => ({
  ...initialState,
  reset: () => {
    set(initialState);
  },
  setEnteredTradeValue: (value: string) => {
    set(state => {
      const tradeValue = state.selectedCrypto
        ? Number(value) * state.selectedCrypto.valueOfOne
        : 0;
      return {enteredTradeValue: value, tradeValue};
    });
  },
  setTradingOption: (tradingOption: TradingOption) => {
    set({tradingOption: tradingOption});
  },
  fetchCryptoCurrencie: async (id: string) => {
    set({loading: true, error: null});
    try {
      const crypto = await fetchCryptoUseCase.execute(id);
      /* const walletResponse = await fetchCryptoUseCase();
      const userCryptos = transformWalletResponse(walletResponse);

      const currentUserValue = await getCurrentAmountOfCryptocurrency(
        crypto.name,
      ); */
      set({
        selectedCrypto: crypto,
        loading: false,
      });
    } catch (error) {
      throw new Error();
    } finally {
      set({loading: false});
    }
  },
}));

export default useTradingStore;
