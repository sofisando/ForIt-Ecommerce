export const UserRole = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}