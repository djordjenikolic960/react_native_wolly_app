import {create, createStore} from 'zustand';
import {BaseError} from '../../errors/BaseError';
import {isBlank, isValidEmail} from '../../utils/stringUtils';
import TokenManager from '../../utils/TokenManager';
import { registerUser } from '../../services/UserService';
import { login } from '../../services/AuthService';

type CreateAccountState = {
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
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  createAccount: () => Promise<void>;
};

const useCreateAccountStore = create<CreateAccountState>(set => ({
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
    const errors = validateRegistrationForm(
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
      const {user} = await registerUser(email, password, firstName, lastName);
      console.log(user);
      const response = await login(email, password);
      await TokenManager.saveToken(response.jwtToken);
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

function validateRegistrationForm(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): BaseError[] {
  const errors: BaseError[] = [];

  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);
  const firstNameResult = validateInputField(firstName);
  const lastNameResult = validateInputField(lastName);

  if (emailResult) errors.push(emailResult);
  if (passwordResult) errors.push(passwordResult);
  if (firstNameResult) errors.push(firstNameResult);
  if (lastNameResult) errors.push(lastNameResult);

  return errors;
}

function validateEmail(email: string): BaseError | undefined {
  if (isBlank(email)) {
    return {type: 'EmailError', error: 'BLANK'};
  }

  if (!isValidEmail(email)) {
    return {type: 'EmailError', error: 'INVALID'};
  }

  return undefined;
}

function validatePassword(password: string): BaseError | undefined {
  if (isBlank(password)) {
    return {type: 'PasswordError', error: 'BLANK'};
  }

  if (password.length < 4) {
    return {type: 'PasswordError', error: 'TOO_SHORT'};
  }

  return undefined;
}

function validateInputField(input: string): BaseError | undefined {
  if (isBlank(input)) {
    return {type: 'InputError', error: 'BLANK'};
  }
  return undefined;
}
