import {Cryptocurrency} from '../model/Cryptocurrency';
import {CryptoRepository} from '../repository/CryptoRepository';

export class FetchCryptosUseCase {
  private cryptoRepository: CryptoRepository;

  constructor(cryptoRepository: CryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(): Promise<Array<Cryptocurrency>> {
    try {
      return await this.cryptoRepository.fetchCryptos();
    } catch (error) {
      throw new Error('FetchCryptosUseCase: error fetching');
    }
  }
}
