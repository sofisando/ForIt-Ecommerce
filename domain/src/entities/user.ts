import { Entity } from "../utils/types/entity";

export const UserRole = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const;

export type UserRole =
  typeof UserRole[keyof typeof UserRole];

export class User extends Entity {
  private _email: string;

  constructor(params: {
    id: string;
    name: string;
    DNI: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    super(params.id);

    if (!params.email.includes("@")) {
      throw new Error("Invalid email");
    }

    this.name = params.name;
    this.DNI = params.DNI;
    this._email = params.email;
    this.password = params.password;
    this.role = params.role;
  }

  public readonly name: string;
  public readonly DNI: string;
  public readonly password: string;
  public readonly role: UserRole;

  get email() {
    return this._email;
  }

  changeEmail(newEmail: string) {
    if (!newEmail.includes("@")) {
      throw new Error("Invalid email");
    }
    this._email = newEmail;
  }
}
