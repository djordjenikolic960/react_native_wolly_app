import {create} from 'zustand';
import {BaseError} from '../../../../errors/BaseError';
import {CreateAccountRepositoryImpl} from '../../data/repository/CreateAccountRepositoryImpl';
import {CreateAccountUseCase} from '../../domain/usecase/CreateAccountUseCase';
import {LoginRepositoryImpl} from '../../../login/data/repository/LoginRepositoryImpl';
import {LoginUseCase} from '../../../login/domain/usecase/LoginUseCase';
import {SaveAuthTokenUseCase} from '../../../login/domain/usecase/SaveAuthTokenUseCase';
import {ValidateEmailUseCase} from '../../../login/domain/usecase/ValidateEmailUseCase';
import {ValidatePasswordUseCase} from '../../../login/domain/usecase/ValidatePasswordUseCase';
import {ValidateInputFieldUseCase} from '../../domain/usecase/ValidateInputFieldUseCase';
import {ValidateCreateAccountFormUseCase} from '../../domain/usecase/ValidateCreateAccountFormUseCase';

type State = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  emailError: BaseError | null;
  passwordError: BaseError | null;
  firstNameError: BaseError | null;
  lastNameError: BaseError | null;
  error: BaseError | null;
};

type Actions = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  createAccount: () => Promise<void>;
};

const createAccountRepository = new CreateAccountRepositoryImpl();
const loginRepository = new LoginRepositoryImpl();

const saveAuthTokenUseCase = new SaveAuthTokenUseCase();
const loginUseCase = new LoginUseCase(loginRepository, saveAuthTokenUseCase);
const createAccountUseCase = new CreateAccountUseCase(
  createAccountRepository,
  loginUseCase,
);

const validateEmailUseCase = new ValidateEmailUseCase();
const validatePasswordUseCase = new ValidatePasswordUseCase();
const validateInputFieldUseCase = new ValidateInputFieldUseCase();

const validateCreateAccountFormUseCase = new ValidateCreateAccountFormUseCase(
  validateEmailUseCase,
  validatePasswordUseCase,
  validateInputFieldUseCase,
);

const useCreateAccountStore = create<State & Actions>(set => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  loading: false,
  emailError: null,
  passwordError: null,
  firstNameError: null,
  lastNameError: null,
  error: null,
  setEmail: email => set({email: email, emailError: null}),
  setPassword: password => set({password: password, passwordError: null}),
  setFirstName: firstName => set({firstName: firstName, firstNameError: null}),
  setLastName: lastName => set({lastName: lastName, lastNameError: null}),

  createAccount: async () => {
    set({
      emailError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
    });

    const {email, password, firstName, lastName} =
      useCreateAccountStore.getState();
    const errors = validateCreateAccountFormUseCase.execute(
      email,
      password,
      firstName,
      lastName,
    );

    const emailError = errors.find(err => err.type === 'EmailError') || null;
    const passwordError =
      errors.find(err => err.type === 'PasswordError') || null;
    const firstNameError =
      errors.find(err => err.type === 'InputError') || null;
    set({emailError, passwordError});

    if (errors.length > 0) {
      return; // Stop execution if there are validation errors
    }

    try {
      set({loading: true});
      await createAccountUseCase.execute(email, password, firstName, lastName);
    } catch (e) {
      set({
        error: {type: 'NetworkError', error: 'UNKNOWN'} as BaseError,
      });
    } finally {
      set({loading: false});
    }
  },
}));

export default useCreateAccountStore;
