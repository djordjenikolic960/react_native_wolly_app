import {BaseError} from '../../../../errors/BaseError';
import {isBlank} from '../../../../utils/StringUtils';

export class ValidatePasswordUseCase {
  execute(password: string): BaseError | undefined {
    if (isBlank(password)) {
      return {type: 'PasswordError', error: 'BLANK'};
    }

    if (password.length < 4) {
      return {type: 'PasswordError', error: 'TOO_SHORT'};
    }

    return undefined;
  }
}
