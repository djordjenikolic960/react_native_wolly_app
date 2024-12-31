import {LoginUseCase} from '../../../login/domain/usecase/LoginUseCase';
import {CreateAccountRepository} from '../repository/CreateAccountRepository';

export class CreateAccountUseCase {
  private createAccountRepository: CreateAccountRepository;
  private loginUseCase: LoginUseCase;

  constructor(
    createAccountRepository: CreateAccountRepository,
    loginUseCase: LoginUseCase,
  ) {
    this.createAccountRepository = createAccountRepository;
    this.loginUseCase = loginUseCase;
  }

  async execute(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      await this.createAccountRepository.createAccount(
        email,
        password,
        firstName,
        lastName,
      );
      await this.loginUseCase.execute(email, password);
    } catch (e) {
      throw new Error();
    }
  }
}
