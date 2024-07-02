import { PlacedOrder, User, VerifiedOrder } from "../types";

export function placeOrder(order: VerifiedOrder, user: User): PlacedOrder {
  return {
    ...order,
    userEmail: user.email,
  };
}
