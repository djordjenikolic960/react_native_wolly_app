import { BaseError } from "../errors/BaseError";

export const getErrorMessage = (error: BaseError): string | undefined => {
    switch (error.type) {
      case 'EmailError':
        if (error.error === 'INVALID') return 'Invalid email address.';
        if (error.error === 'BLANK') return 'Field cannot be blank';
        break;
      case 'PasswordError':
        if (error.error === 'TOO_SHORT') return 'Password is too short.';
        if (error.error === 'BLANK') return 'Field cannot be blank';
        break;
        case 'InputError': 
        if (error.error === 'BLANK') return 'Field cannot be blank';
      case 'NetworkError':
        return 'Network error occurred. Please try again.';
      default:
        return 'An unknown error occurred.';
    }
  };