export interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  description?: string;
  max: number;
  total: number;
}

export interface AnotherItem {
  id: number;
  username: string;
  service: string;
  phone: number;
  time: string;
  date: string;
}

export interface RequestsUsers extends Item {
  service: string;
  username: string;
}
