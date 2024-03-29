import { User } from "@prisma/client";

export type UserCreateUpdate = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export type UserUpdatePassword = {
    password: string | undefined | null
};

export type UserGet = Omit<User, 'password'>;

export const excludeUser = <User, Key extends keyof User> (user: User, keys : Key[]): Omit<User, Key> => {
    for (const key of keys) {
        delete user[key]
    }
    return user;
}

