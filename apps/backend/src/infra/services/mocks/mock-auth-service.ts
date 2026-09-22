import { PasswordHasher } from "@forit/domain";

export class MockPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed-${password}`;
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    return hash === `hashed-${plainPassword}`;
  }
}