import "dotenv/config";
import { TokenPayload, TokenProvider } from "@forit/domain";
import jwt from "jsonwebtoken";

export class JwtTokenProvider
  implements TokenProvider {

  async generate(userId: string, role: string): Promise<string> {
    return jwt.sign(
      { userId , role },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1h",
      },
    );
  }
  async verify(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    );

    return decoded as TokenPayload;
  } catch {
    return null;
  }
}
}