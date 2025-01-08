import {UserRepository} from '../repository/UserRepository';

export class AddToBalanceUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(value: number): Promise<void> {
    try {
      await this.userRepository.addToBalance(value);
    } catch (error) {
      throw error;
    }
  }
}
