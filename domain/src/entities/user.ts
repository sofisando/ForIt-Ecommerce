import { Entity } from "../utils/types/entity";
import { DNI, Email, PasswordHash } from "../ValueObjects/index.js";

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
    private _passwordHash: PasswordHash,
    private _role: UserRole,
  ) {
    super(id);

    this.validateName(_name);
    this.validateRole(_role);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new Error("Name is required");
    }
  }

  private validateRole(role: UserRole): void {
    if (!role) {
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

  get passwordHash() {
    return this._passwordHash;
  }

  get role() {
    return this._role;
  }

  changeName(newName: string): void {
    this.validateName(newName);
    this._name = newName;
  }

  changeDNI(newDNI: DNI): void {
    this._DNI = newDNI;
  }

  changeEmail(newEmail: Email) {
    this._email = newEmail;
  }

  changePassword(newPasswordHash: PasswordHash): void {
    this._passwordHash = newPasswordHash;
  }
}

export type SecureUser = Omit<User, "passwordHash">;
