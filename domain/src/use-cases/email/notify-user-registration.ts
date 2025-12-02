import { User } from "../../entities";
import type { EmailService, UserService } from "../../services";

interface NotifyUserRegistrationDeps {
  emailService: EmailService;
  userService: UserService;
}

interface NotifyUserRegistrationPayload {
  email: User["email"];
}

export async function notifyUserRegistration(
  { emailService, userService }: NotifyUserRegistrationDeps,
  { email }: NotifyUserRegistrationPayload
): Promise<void | Error> {
  const user = await userService.findByEmail(email);
  if (!user) return new Error("User not found");
  
  const subject = "¡Bienvenido!";
  const body = "Tu cuenta fue creada con éxito";

  await emailService.sendEmail(email, subject, body);
}
