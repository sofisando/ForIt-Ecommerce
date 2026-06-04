export interface TokenProvider {
  generate(userId: string): Promise<string>;
//   verify(token: string): Promise<string | null>;
}