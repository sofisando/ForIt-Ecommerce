import type { AuthService } from "../auth-service";

export class MockedAuthService implements AuthService {
  async hashPassword(password: string): Promise<string> {
    return "hashed-" + password;
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    // lógica simple pero consistente con el hash simulado
    return hashed === "hashed-" + plain;
  }
}