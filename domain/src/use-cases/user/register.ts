import type { User } from "../../entities/user.js";
import type { UserService } from "../../services/user-service.js";
import type { CreatePayload } from "../../utils/types/payload.js";

interface RegisterDeps {
  userService: UserService;
}

type RegisterPayload = CreatePayload<User>;

export async function register(
  { userService }: RegisterDeps,
  payload: RegisterPayload
): Promise<User | Error> {
  const foundUser = await userService.findByEmail(payload.email);
  if (foundUser)
    return new Error(`Email ${payload.email} is already registered`);

  const user = await userService.create(payload);

  return user;
}
