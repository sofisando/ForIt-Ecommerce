import "dotenv/config";
import { TokenProvider } from "@forit/domain";
import jwt from "jsonwebtoken";

export class JwtTokenProvider
  implements TokenProvider {

  async generate(userId: string): Promise<string> {
    return jwt.sign(
      { userId },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1h",
      },
    );
  }
}