import bcrypt from "bcryptjs";

interface PasswordHasher {
  hash(password: string): Promise<string>;
}

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}