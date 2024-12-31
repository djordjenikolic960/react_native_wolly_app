import {BaseError} from '../../../../errors/BaseError';
import {ValidateEmailUseCase} from './ValidateEmailUseCase';
import {ValidatePasswordUseCase} from './ValidatePasswordUseCase';

export class ValidateLoginFormUseCase {
  private validateEmailUseCase: ValidateEmailUseCase;
  private validatePasswordUseCase: ValidatePasswordUseCase;

  constructor(
    validateEmailUseCase: ValidateEmailUseCase,
    validatePasswordUseCase: ValidatePasswordUseCase,
  ) {
    this.validateEmailUseCase = validateEmailUseCase;
    this.validatePasswordUseCase = validatePasswordUseCase;
  }

  execute(email: string, password: string): BaseError[] {
    const errors: BaseError[] = [];

    const emailResult = this.validateEmailUseCase.execute(email);
    const passwordResult = this.validatePasswordUseCase.execute(password);

    if (emailResult) errors.push(emailResult);
    if (passwordResult) errors.push(passwordResult);

    return errors;
  }
}
