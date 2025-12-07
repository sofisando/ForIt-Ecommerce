import type { User } from "../../entities/user.js";
import type { EmailService, UserService } from "../../services";
import type { CreatePayload } from "../../utils/types/payload.js";
import { notifyUserRegistration } from "../email/notify-user-registration.js";

interface RegisterDeps {
  userService: UserService;
  emailService: EmailService;
}

type RegisterPayload = CreatePayload<User>;

export async function register(
  { userService, emailService }: RegisterDeps,
  payload: RegisterPayload
): Promise<User | Error> {
  const foundUser = await userService.findByEmail(payload.email);
  if (foundUser)
    return new Error(`Email ${payload.email} is already registered`);

  const user = await userService.create(payload);
  await notifyUserRegistration (
    { emailService, userService },
    { email: user.email}
  )

  return user;
}
