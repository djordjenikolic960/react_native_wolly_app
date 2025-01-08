import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {CurrentUser} from '../../domain/model/CurrentUser';
import {userContainer} from '../../di/UserDependecyContainer';

type State = {
  loading: boolean;
  error: BaseError | null;
  user: CurrentUser | null;
  amountToAdd: string;
};

type Actions = {
  fetchCurrentUser: () => Promise<void>;
  addToCreditCard: (value: number) => void;
  setAmount: (value: string) => void;
  reset: () => void;
};

const initialState: State = {
  error: null,
  loading: false,
  user: null,
  amountToAdd: '',
};

const fetchUserUseCase = userContainer.getFetchCurrentUserUseCase();
const addToBalanceUseCase = userContainer.getAddToBalanceUseCase();

const useUserStore = create<State & Actions>(set => ({
  ...initialState,
  fetchCurrentUser: async () => {
    set({loading: true});
    try {
      const user = await fetchUserUseCase.execute();
      set({user: user, loading: false});
    } catch (error) {
    } finally {
      set({loading: false});
    }
  },
  addToCreditCard: async (value: number) => {
    try {
      await addToBalanceUseCase.execute(value);
    } catch (error) {}
  },
  reset: () => {
    set(initialState);
  },
  setAmount: amount => {
    set({amountToAdd: amount});
  },
}));

export default useUserStore;
