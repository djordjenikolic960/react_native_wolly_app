import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {Cryptocurrency} from '../../../crypto_market_list/domain/model/Cryptocurrency';
import TradingOption from '../../domain/model/TradingOption';
import {tradingContainer} from '../../di/TradingDependecyContainer';
import {dashboardContainer} from '../../../dashboard/di/DashboardDependecyContainer';
import {isBaseError} from '../../../../utils/ErrorUtils';

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
  trade: (
    cryptoId: string,
    value: number,
    tradingOption: TradingOption,
  ) => void;
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

const fetchCryptoUseCase = tradingContainer.getFetchCryptoUseCase();
const fetchCurrentAmountOfCryptoUseCase =
  tradingContainer.getFetchCurrentAmountOfCryptoUseCase();
const tradeCryptoUseCase = tradingContainer.getTradeCryptoUseCase();

const fetchWalletUseCase = dashboardContainer.getFetchWalletUseCase();

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
      const wallet = await fetchWalletUseCase.execute();
      const currentUserValue = fetchCurrentAmountOfCryptoUseCase.execute(
        crypto,
        wallet.cryptocurrencies,
      );
      set({
        selectedCrypto: crypto,
        loading: false,
        currentUserValue: currentUserValue,
      });
    } catch (error) {
    } finally {
      set({loading: false});
    }
  },
  trade: async (
    cryptoId: string,
    value: number,
    tradingOption: TradingOption,
  ) => {
    set({loading: true, error: null});
    try {
      const {fetchCryptoCurrencie} = useTradingStore.getState();
      await tradeCryptoUseCase.execute(cryptoId, value, tradingOption);
      await fetchCryptoCurrencie(cryptoId);
    } catch (error) {
      console.log(error);
      if (isBaseError(error)) {
        set({error});
      } else {
        set({loading: false});
      }
    } finally {
      set({loading: false});
    }
  },
}));

export default useTradingStore;
