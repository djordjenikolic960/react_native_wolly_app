import {create} from 'zustand';
import {LogoutUseCase} from '../domain/usecase/LogoutUseCase';

type Actions = {
  logout: () => Promise<void>;
};

const logoutUseCase = new LogoutUseCase();

const useSettingsStore = create<Actions>(set => ({
  logout: async () => {
    await logoutUseCase.execute();
  },
}));

export default useSettingsStore;
