import TokenManager from '../../../../utils/TokenManager';

export class SaveAuthTokenUseCase {
  async execute(authToken: string): Promise<void> {
    await TokenManager.saveToken(authToken);
  }
}
