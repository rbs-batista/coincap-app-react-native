import cryptoColors from '../data/crypto_color.json';
export const Util = {

    getFirstQuantityCharacters({name, quantity}: {name: string, quantity: number}): string {
      return name.substring(0, quantity);
    },

    isNegative({value}: {value: number}): string {
      return value < 0 ? '#b96065' : '#3bdd8a';
    },

    cryptoBackgroundColor({symbol}: {symbol: string}) {
      const res = Object.entries(cryptoColors).filter(([key]) => key === symbol);
      return res.length > 0 ? res[0][1] : '#131a20';
    }
  }