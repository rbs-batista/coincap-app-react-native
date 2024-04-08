
enum OrderTypeEnum {
  BUY,
  SALE,
  UNKNOW,
}

const OrderTypeFromEnum = (type: string): OrderTypeEnum => {
  switch (type) {
    case 'BUY':
      return OrderTypeEnum.BUY;
    case 'SALE':
      return OrderTypeEnum.SALE;
    default:
      return OrderTypeEnum.UNKNOW;  
  }
}

const OrderTypeToEnum = (type: OrderTypeEnum): string => {
  switch (type) {
    case OrderTypeEnum.BUY:
      return 'BUY';
    case OrderTypeEnum.SALE:
      return 'SALE';
    default:
      return 'UNKNOW';
  }
}

const OrderTypeTranslate = (type: OrderTypeEnum): string => {
switch (type) {
  case OrderTypeEnum.BUY:
    return 'Compra de Ativos';
  case OrderTypeEnum.SALE:
    return 'Venda de Ativos';
  default:
    return 'Tipo Desconhecido';
}
}

export {
  OrderTypeEnum,
  OrderTypeFromEnum,
  OrderTypeToEnum,
  OrderTypeTranslate
}
