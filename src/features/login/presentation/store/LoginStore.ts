import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {LoginUseCase} from '../../domain/usecase/LoginUseCase';
import {LoginRepositoryImpl} from '../../data/repository/LoginRepositoryImpl';
import {SaveAuthTokenUseCase} from '../../domain/usecase/SaveAuthTokenUseCase';
import {ValidateEmailUseCase} from '../../domain/usecase/ValidateEmailUseCase';
import {ValidatePasswordUseCase} from '../../domain/usecase/ValidatePasswordUseCase';
import {ValidateLoginFormUseCase} from '../../domain/usecase/ValidateLoginFormUseCase';

type State = {
  email: string;
  password: string;
  loading: boolean;
  emailError: BaseError | null;
  passwordError: BaseError | null;
  error: BaseError | null;
};

type Actions = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
};

const loginRepository = new LoginRepositoryImpl();
const saveAuthTokenUseCase = new SaveAuthTokenUseCase();
const validateEmailUseCase = new ValidateEmailUseCase();
const validatePasswordUseCase = new ValidatePasswordUseCase();
const validateLoginFormUseCase = new ValidateLoginFormUseCase(
  validateEmailUseCase,
  validatePasswordUseCase,
);
const loginUseCase = new LoginUseCase(loginRepository, saveAuthTokenUseCase);

const useLoginStore = create<State & Actions>(set => ({
  email: '',
  password: '',
  loading: false,
  emailError: null,
  passwordError: null,
  error: null,
  setEmail: email => set({email: email, emailError: null}),
  setPassword: password => set({password: password, passwordError: null}),

  login: async () => {
    set({emailError: null, passwordError: null});

    const {email, password} = useLoginStore.getState();
    const errors = validateLoginFormUseCase.execute(email, password);

    const emailError = errors.find(err => err.type === 'EmailError') || null;
    const passwordError =
      errors.find(err => err.type === 'PasswordError') || null;
    set({emailError, passwordError});

    if (errors.length > 0) {
      return; // Stop execution if there are validation errors
    }

    try {
      set({loading: true});
      await loginUseCase.execute(email, password);
    } catch (e) {
      set({
        error: {type: 'NetworkError', error: 'UNKNOWN'} as BaseError,
      });
    } finally {
      set({loading: false});
    }
  },
}));

export default useLoginStore;
