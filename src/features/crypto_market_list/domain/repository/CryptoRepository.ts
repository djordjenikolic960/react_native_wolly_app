import {Cryptocurrency} from '../model/Cryptocurrency';

export abstract class CryptoRepository {
  abstract fetchCryptos(): Promise<Array<Cryptocurrency>>;
}
