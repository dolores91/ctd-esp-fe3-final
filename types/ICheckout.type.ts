export type ICheckout = {
  customer: ICustomer;
  card: ICard;
  order: IOrder;
};

export interface ICustomer {
  name: string;
  lastname: string;
  email: string;
  address?: IAddress;
}

export interface IAddress {
  address: string;
  //address: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export interface ICard {
  number: string;
  cvc: string;
  expDate: string;
  nameOnCard: string;
}

export interface IOrder {
  name: string;
  image: string;
  price: number;
}



