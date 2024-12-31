import {BaseError} from '../../../../errors/BaseError';
import {isBlank} from '../../../../utils/StringUtils';

export class ValidateInputFieldUseCase {
  execute(input: string): BaseError | undefined {
    if (isBlank(input)) {
      return {type: 'InputError', error: 'BLANK'};
    }
    return undefined;
  }
}
