import { UserRole } from "../entities";

export interface TokenPayload{
  userId: string;
  role: UserRole;
}

export type AuthenticatedUser = TokenPayload;

export interface TokenProvider {
  generate(userId: string , role: UserRole): Promise<string>;
  verify(token: string): Promise<TokenPayload | null>;
}