export type Food = {
  id: number;
  name: string;
  quantity: number;
  minimumQuantity: number;
  type: string;
};

export type NewFood = {
  name: string;
  quantity: string;
  minimumQuantity: string;
  type: string;
};
