import { Request, Response, NextFunction } from "express";
import { JwtTokenProvider } from "@infra/services/JwtTokenProvider.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const tokenProvider = new JwtTokenProvider();
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const payload = await tokenProvider.verify(token);

  if (!payload) {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }

  req.user = payload;

  next();
};