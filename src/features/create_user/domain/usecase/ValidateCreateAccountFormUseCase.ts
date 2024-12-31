import {BaseError} from '../../../../errors/BaseError';
import {ValidateEmailUseCase} from '../../../login/domain/usecase/ValidateEmailUseCase';
import {ValidatePasswordUseCase} from '../../../login/domain/usecase/ValidatePasswordUseCase';
import {ValidateInputFieldUseCase} from './ValidateInputFieldUseCase';

export class ValidateCreateAccountFormUseCase {
  private validateEmailUseCase: ValidateEmailUseCase;
  private validatePasswordUseCase: ValidatePasswordUseCase;
  private validateInputFieldUseCase: ValidateInputFieldUseCase;

  constructor(
    validateEmailUseCase: ValidateEmailUseCase,
    validatePasswordUseCase: ValidatePasswordUseCase,
    validateInputFieldUseCase: ValidateInputFieldUseCase,
  ) {
    this.validateEmailUseCase = validateEmailUseCase;
    this.validatePasswordUseCase = validatePasswordUseCase;
    this.validateInputFieldUseCase = validateInputFieldUseCase;
  }

  execute(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): BaseError[] {
    const errors: BaseError[] = [];

    const emailResult = this.validateEmailUseCase.execute(email);
    const passwordResult = this.validatePasswordUseCase.execute(password);
    const firstNameResult = this.validateInputFieldUseCase.execute(firstName);
    const lastNameResult = this.validateInputFieldUseCase.execute(lastName);

    if (emailResult) errors.push(emailResult);
    if (passwordResult) errors.push(passwordResult);
    if (firstNameResult) errors.push(firstNameResult);
    if (lastNameResult) errors.push(lastNameResult);

    return errors;
  }
}
