import type { UserService } from "../../services/user-service.js";
import type { AuthService } from "../../services/auth-service.js";
import type { User } from "../../entities/user.js";

interface LoginUserDeps {
  userService: UserService;
  authService: AuthService;
}

interface LoginUserPayload {
  email: User["email"];
  password: User["password"];
}

export async function loginUser(
  { userService, authService }: LoginUserDeps,
  { email, password }: LoginUserPayload
) {
  const user = await userService.findByEmail(email);
  if (!user) return null;

  const valid = await authService.comparePassword(password, user.password);
  if (!valid) return null;

  // acá podrías generar el token o sesión
  return user;
}
