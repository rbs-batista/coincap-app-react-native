export const Money = {

    format({value}: {value: string | number}): number{

      if(value == null) return 0;

      if(typeof value === 'string') {
        const valorFloat: number = parseFloat(value);

        return parseFloat(valorFloat.toFixed(2));
      }

      return parseFloat(value.toFixed(2));
    },

    formatCurrency ({value}: {value: number | undefined}) {

      if (!value || isNaN(value)) {
          return ''; 
      }
  
      const formattedValue = value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      });
  
      return formattedValue;
  }
}