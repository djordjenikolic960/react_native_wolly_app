import { create, createStore } from "zustand";
import { BaseError } from "../../errors/BaseError";
import { isBlank, isValidEmail } from "../../utils/stringUtils";
import { login } from "../../services/AuthService";
import TokenManager from "../../utils/TokenManager";


type LoginState = {
    email: string,
    password: string,
    loading: boolean,
    emailError: BaseError | null,
    passwordError: BaseError | null,
    error: BaseError | null,
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    login: () => Promise<void>;
}

const useLoginStore = create<LoginState>((set) => ({
email: '',
password: '',
loading: false,
emailError: null,
passwordError: null,
error: null,
setEmail: (email) => set({email: email, emailError: null}),
setPassword: (password) => set(({password: password, passwordError: null})),

login: async () => {
    set({ emailError: null, passwordError: null });

    const { email, password } = useLoginStore.getState();
    const errors = validateLoginForm(email, password);

    const emailError = errors.find((err) => err.type === "EmailError") || null;
    const passwordError = errors.find((err) => err.type === "PasswordError") || null;
    set({ emailError, passwordError });

    if (errors.length > 0) {
      return; // Stop execution if there are validation errors
    }

    try {
    set({loading: true});
    const response = await login(email, password);
    await TokenManager.saveToken(response.jwtToken);

    } catch (e) {
        set({
            error: { type: "NetworkError", error: "UNKNOWN" } as BaseError,
          });
    } finally {
        set({loading: false});
    }
}, 
}));

export default useLoginStore;

function validateLoginForm(email: string, password: string): BaseError[] {
    const errors: BaseError[] = [];

    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
  
    if (emailResult) errors.push(emailResult);
    if (passwordResult) errors.push(passwordResult);
  
    return errors;

}

function validateEmail(email: string): BaseError | undefined {
    if (isBlank(email)) {
        return { type: 'EmailError', error: 'BLANK' };
    }

    if (!isValidEmail(email)) {
        return { type: 'EmailError', error: 'INVALID' };
    }

    return undefined;
}

function validatePassword(password: string): BaseError | undefined {
    if (isBlank(password)) {
        return { type: 'PasswordError', error: 'BLANK' };
    }

    if (password.length < 4) {
        return { type: 'PasswordError', error: 'TOO_SHORT' };
    }

    return undefined;
}
