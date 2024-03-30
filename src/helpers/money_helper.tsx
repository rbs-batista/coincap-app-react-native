

export const Money = {

    format({value}: {value: string}): number{
      if(value != null) {
        const valorFloat: number = parseFloat(value);

        return parseFloat(valorFloat.toFixed(2));
      }

      return 0;
    },

    isNegative({value}: {value: number}): string {
      return value < 0 ? '#b96065' : '#3bdd8a';
    }
  }