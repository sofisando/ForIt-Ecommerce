import { Entity } from "../utils/types/entity";
import { DNI, Email, Password } from "../ValueObjects";

export const UserRole = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export class User extends Entity {
  constructor(
    id: string,
    private _name: string,
    private _DNI: DNI,
    private _email: Email,
    private _password: Password,
    private _role: UserRole,
  ) {
    super(id);

    if (!this._name.trim()) {
      throw new Error("Name is required");
    }

    if (!this._role) {
      throw new Error("Role is required");
    }
  }

  get name() {
    return this._name;
  }

  get DNI() {
    return this._DNI;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get role() {
    return this._role;
  }

  changeEmail(newEmail: Email) {
    this._email = newEmail;
  }

  changePassword(newPassword: Password) {
    this._password = newPassword;
  }
}
