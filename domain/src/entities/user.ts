import type { Entity } from "../utils/types/entity.js";

export const UserRole = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User extends Entity {
    name: string;
    DNI: string;
    email: string;
    password: string; //en realidad hay que guardar el hash
    role: UserRole;
}

export type SecureUser = Omit<User, "password">;
export type UserUpdate = Partial<Omit<User, "id">>;