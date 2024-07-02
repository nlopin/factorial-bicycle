import { NewOrder, PricedOrder, User } from "../types";

export function createOrder(order: PricedOrder): NewOrder {
  // db save
  return {
    ...order,
    id: 123, // from the db
    createdAt: new Date(), // from the db
    state: "new",
  };
}

export function notifyUser(order: NewOrder, user: User) {
  // send the data to the EmailService
}
