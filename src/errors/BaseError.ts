export type BaseError =
  | NetworkError
  | EmailError
  | PasswordError
  | InputError
  | TradingError;

// Network Errors
type NetworkError = {
  type: 'NetworkError';
  error: 'UNAUTHORIZED' | 'REQUEST_TIMEOUT' | 'CONFLICT' | 'PAYLOAD_TOO_LARGE' | 'SERVER_ERROR' | 'NO_INTERNET' | 'SERIALIZATION' | 'UNKNOWN';
};

// Email Errors
type EmailError = {
  type: 'EmailError';
  error: 'INVALID' | 'BLANK';
};

// Password Errors
type PasswordError = {
  type: 'PasswordError';
  error: 'TOO_SHORT' | 'BLANK';
};

// Input Errors
type InputError = {
  type: 'InputError';
  error: 'BLANK';
};

// Trading Errors
type TradingError = {
  type: 'TradingError';
  error: 'INSUFFICIENT_FUNDS';
};