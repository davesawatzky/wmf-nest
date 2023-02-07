
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    staff?: Nullable<boolean>;
    admin?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
    staff?: Nullable<boolean>;
    admin?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id?: Nullable<string>, firstName?: Nullable<string>, lastName?: Nullable<string>, phone?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): UserPayload | Promise<UserPayload>;

    abstract updateUser(updateUserInput: UpdateUserInput): UserPayload | Promise<UserPayload>;

    abstract removeUser(id: number): UserPayload | Promise<UserPayload>;
}

export class User {
    id: string;
    email?: Nullable<string>;
    staff?: Nullable<boolean>;
    admin?: Nullable<boolean>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    apartment?: Nullable<string>;
    streetNumber?: Nullable<string>;
    streetName?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export class UserPayload {
    userErrors: UserError[];
    user?: Nullable<User>;
}

export class UserError {
    message: string;
    field: string[];
}

type Nullable<T> = T | null;
