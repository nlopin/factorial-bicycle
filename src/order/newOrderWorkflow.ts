import {
  UnverifiedOrder,
  User,
  Either,
  ValidationError,
  NewOrder,
} from "../types";
import { validateUser, createUserIfMissing } from "../user";

import { validateOrder } from "./validate";
import { placeOrder } from "./placeOrder";
import { calculatePrice } from "./priceOrder";
import { createOrder, notifyUser } from "./service";

export function newOrderWorkflow(
  order: UnverifiedOrder,
  user: User,
): Either<NewOrder, ValidationError[]> {
  const errors = validate(order, user);
  if (errors.length > 0) return errors;

  const placedOrder = placeOrder(order, user);
  const withPrice = calculatePrice(placedOrder);

  createUserIfMissing(user);
  const created = createOrder(withPrice);
  notifyUser(created, user); //could be done in a non-blocking way if we use an event bus

  return created;
}

function validate(order: UnverifiedOrder, user: User): ValidationError[] {
  const errors = [];
  const [isValidOrder, orderError] = validateOrder(order);
  if (!isValidOrder) {
    errors.push(orderError);
  }

  const [isValidClient, clientError] = validateUser(user);
  if (!isValidClient) {
    errors.push(clientError);
  }

  return errors;
}
