import TokenManager from '../../../../utils/TokenManager';

export class LogoutUseCase {
  async execute(): Promise<void> {
    await TokenManager.deleteToken();
  }
}
