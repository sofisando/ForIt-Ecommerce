import { AuthenticationRepo } from "@forit/domain";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements AuthenticationRepo {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}
