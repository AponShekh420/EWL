export type ShippingMethodType = {
  methodName: string;
  cost: number;
};
export type ShippingType = {
  _id: string;
  zoneName: string;
  region: string;
  shippingMethods: ShippingMethodType[];
  createdAt: Date;
  updatedAt: Date;
};
type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};
export type ShippingErrorType = { [key: string]: ValidationErrorItem };
