import User from "./user";

export default interface Job {
  id: number;
  name: string;
  description: string;
  price: number;
  poster: User;
}
