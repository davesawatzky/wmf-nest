
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SGSlabel {
    SOLO = "SOLO",
    GROUP = "GROUP",
    SCHOOL = "SCHOOL",
    COMMUNITY = "COMMUNITY"
}

export class RegistrationInput {
    label?: Nullable<string>;
    performerType?: Nullable<SGSlabel>;
    dateSubmitted?: Nullable<string>;
    submittedAt?: Nullable<string>;
    totalAmt?: Nullable<number>;
    payedAmt?: Nullable<number>;
    transactionInfo?: Nullable<string>;
    confirmation?: Nullable<string>;
}

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

export class UserError {
    message: string;
    field: string[];
}

export class Registration {
    id: number;
    label?: Nullable<string>;
    performerType: SGSlabel;
    submittedAt?: Nullable<DateTime>;
    totalAmt?: Nullable<number>;
    payedAmt?: Nullable<number>;
    transactionInfo?: Nullable<string>;
    confirmation?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract registrations(): Nullable<Registration>[] | Promise<Nullable<Registration>[]>;

    abstract registration(id: number): Nullable<Registration> | Promise<Nullable<Registration>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id?: Nullable<number>, firstName?: Nullable<string>, lastName?: Nullable<string>, phone?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract registrationCreate(performerType: SGSlabel, label?: Nullable<string>): RegistrationPayload | Promise<RegistrationPayload>;

    abstract registrationUpdate(registrationID: number, registration: RegistrationInput): RegistrationPayload | Promise<RegistrationPayload>;

    abstract registrationDelete(id: number): RegistrationPayload | Promise<RegistrationPayload>;

    abstract createUser(createUserInput: CreateUserInput): UserPayload | Promise<UserPayload>;

    abstract updateUser(updateUserInput: UpdateUserInput): UserPayload | Promise<UserPayload>;

    abstract removeUser(id: number): UserPayload | Promise<UserPayload>;
}

export class RegistrationPayload {
    userErrors: UserError[];
    registration?: Nullable<Registration>;
}

export class User {
    id: number;
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
    registrations: Registration[];
}

export class UserPayload {
    userErrors: UserError[];
    user?: Nullable<User>;
}

export type DateTime = any;
export type Duration = any;
export type EmailAddress = any;
export type Time = any;
type Nullable<T> = T | null;
