import {UserRepository} from '../repository/UserRepository';

export class FetchUsersCardBalanceUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<number> {
    try {
      const user = await this.userRepository.getUser();
      return user.currentCardBalance;
    } catch (error) {
      throw error;
    }
  }
}
