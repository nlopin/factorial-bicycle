import { UnverifiedOrder, ValidationResult } from "../types";

export type OrderValidationFunction = (UnverifiedOrder) => ValidationResult;

export function validateOrder(order: UnverifiedOrder): ValidationResult {
  let error = null;
  const validations: OrderValidationFunction[] = [
    checkMountainWheelsCombination,
    checkFatBikeWheelsCombination,
    checkAvailability,
  ];

  const isValid = validations.every((el) => {
    const [isOk, err] = el(order);
    if (!isOk) error = err;

    return isOk;
  });

  return isValid ? [true] : [false, error];
}

function checkMountainWheelsCombination(
  order: UnverifiedOrder,
): ValidationResult {
  if (order.wheels === "MOUNTAIN" && order.frameType !== "FULL_SUSPENSION") {
    return [false, "MOUNTAIN_WHEELS_MUST_HAVE_FULL_SUSPENSION"];
  }

  return [true];
}

function checkFatBikeWheelsCombination(
  order: UnverifiedOrder,
): ValidationResult {
  if (order.wheels === "FAT_BIKE" && order.rimColor === "RED") {
    return [false, "FAT_BIKE_RED_RIM_NOT_POSSIBLE"];
  }

  return [true];
}

function checkAvailability(order: UnverifiedOrder): ValidationResult {
  // @ts-ignore todo call DB
  const isAvailable = getCombinationAvailability(order);

  if (!isAvailable) {
    return [false, "COMBINATION_NOT_IN_STOCK"];
  }

  return [true];
}
