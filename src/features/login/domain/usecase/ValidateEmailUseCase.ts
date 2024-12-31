import {BaseError} from '../../../../errors/BaseError';
import {isBlank, isValidEmail} from '../../../../utils/StringUtils';

export class ValidateEmailUseCase {
  execute(email: string): BaseError | undefined {
    if (isBlank(email)) {
      return {type: 'EmailError', error: 'BLANK'};
    }

    if (!isValidEmail(email)) {
      return {type: 'EmailError', error: 'INVALID'};
    }

    return undefined;
  }
}
