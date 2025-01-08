import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {Wallet} from '../../domain/model/Wallet';
import {dashboardContainer} from '../../di/DashboardDependecyContainer';

type State = {
  loading: boolean;
  error: BaseError | null;
  wallet: Wallet | null;
  cryptoBalance: number | null;
};

type Actions = {
  fetchWallet: () => Promise<void>;
};

const fetchWalletUseCase = dashboardContainer.getFetchWalletUseCase();
const fetchUsersBalanceInCryptoUseCase =
  dashboardContainer.getFetchUsersBalanceInCryptoUseCase();

const useDashboardStore = create<State & Actions>(set => ({
  loading: false,
  error: null,
  wallet: null,
  cryptoBalance: null,
  fetchWallet: async () => {
    set({loading: true, error: null});
    try {
      const wallet = await fetchWalletUseCase.execute();
      const cryptoBalance = fetchUsersBalanceInCryptoUseCase.execute(
        wallet.cryptocurrencies,
      );
      set({wallet: wallet, cryptoBalance: cryptoBalance});
    } catch (error) {
      set({
        loading: false,
        error: {type: 'NetworkError', error: 'UNKNOWN'} as BaseError,
      });
    } finally {
      set({loading: false});
    }
  },
}));

export default useDashboardStore;
