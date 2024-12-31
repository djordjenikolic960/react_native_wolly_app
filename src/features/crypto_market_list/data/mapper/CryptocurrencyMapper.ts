import {Cryptocurrency} from '../../domain/model/Cryptocurrency';

export class CryptocurrencyMapper {
  responseToModel(cryptos: Array<Cryptocurrency>): Array<Cryptocurrency> {
    return cryptos.map((crypto: Cryptocurrency) => this.toModel(crypto));
  }

  toModel(crypto: Cryptocurrency): Cryptocurrency {
    return {
      id: crypto.id,
      name: crypto.name,
      icon: `data:image/png;base64,${crypto.icon}`,
      valueOfOne: crypto.valueOfOne,
      abbreviation: crypto.abbreviation,
    };
  }
}
