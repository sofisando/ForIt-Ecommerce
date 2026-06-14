import { TokenPayload, TokenProvider } from "@forit/domain";

export class MockTokenProvider implements TokenProvider {
  async generate(userId: string, role: string): Promise<string> {
    return `mock-token-${userId}`;
  }

  async verify(token: string): Promise<TokenPayload | null> {
    return {
      userId: "mock-user-id",
      role: "CLIENT" as any,
    };
  }
}