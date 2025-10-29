import type { UserService } from "../../services/user-service.js";
import type { AuthService } from "../../services/auth-service.js";

interface LoginUserDeps {
  userService: UserService;
  authService: AuthService;
}

export async function loginUser(deps: LoginUserDeps, email: string, password: string) {
  const user = await deps.userService.findByEmail(email);
  if (!user) return null;

  const valid = await deps.authService.comparePassword(password, user.password);
  if (!valid) return null;

  // acá podrías generar el token o sesión
  return user;
}
