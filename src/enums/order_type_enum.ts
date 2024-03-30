export enum OrderTypeEnum {
    BUY,
    SALE,
    UNKNOW,
}

export const OrderTypeFromEnum = (type: string): OrderTypeEnum => {
    switch (type) {
      case 'BUY':
        return OrderTypeEnum.BUY;
      case 'SALE':
        return OrderTypeEnum.SALE;
      default:
        return OrderTypeEnum.UNKNOW;  
    }
}

export const OrderTypeToEnum = (type: OrderTypeEnum): string => {
    switch (type) {
      case OrderTypeEnum.BUY:
        return 'BUY';
      case OrderTypeEnum.SALE:
        return 'SALE';
      default:
        return 'UNKNOW';
    }
}