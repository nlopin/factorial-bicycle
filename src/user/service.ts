import {User} from "../types";

export function createUserIfMissing(user:User) {
    if(!getUser(user.email)) {
        createUser(user)
    }
}

function getUser(email: string): User|null {
    return null
}

function createUser(User: User) {
    //
}