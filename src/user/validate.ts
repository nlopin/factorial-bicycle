import {User, ValidationResult} from "../types";

export function validateUser(user: User): ValidationResult {
    if (!isValidEmail(user.email)) {
        return [false, "INVALID_EMAIL"]
    }

    return [true]
}

function isValidEmail(email: string): boolean {
    return email.includes("@")
}