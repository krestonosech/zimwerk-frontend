export interface User {
  token: string;
  username: string;
  id: number;
  isAdmin: number;
  email: string;
}

export interface Requests {
  id: number;
  username: string;
  eventsName: string;
  count: number;
  date: string;
  email: string;
}
