import {LoginRepository} from '../repository/LoginRepository';
import {SaveAuthTokenUseCase} from './SaveAuthTokenUseCase';

export class LoginUseCase {
  private repository: LoginRepository;
  private saveAuthTokenUseCase: SaveAuthTokenUseCase;

  constructor(
    repository: LoginRepository,
    saveAuthTokenUseCase: SaveAuthTokenUseCase,
  ) {
    this.repository = repository;
    this.saveAuthTokenUseCase = saveAuthTokenUseCase;
  }

  async execute(username: string, password: string): Promise<void> {
    try {
      const response = await this.repository.login(username, password);
      await this.saveAuthTokenUseCase.execute(response.token);
    } catch (e) {
      throw new Error();
    }
  }
}
