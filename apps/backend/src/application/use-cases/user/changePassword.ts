
import { changePasswordDTO } from "@app/DTOs/user.dto.js";
import { PasswordHasher, IncorrectPasswordError, Password, PasswordHash, PasswordReuseError, UserNotFoundError, UserRepository, AuthenticatedUser } from "@forit/domain";

interface ChangePasswordDeps {
  userRepository: UserRepository;
  passwordHasher: PasswordHasher;
}

type ChangePasswordPayload = {
  actor: AuthenticatedUser;
  dto: changePasswordDTO
};

export async function changePassword(
  { userRepository, passwordHasher }: ChangePasswordDeps,
  { actor, dto }: ChangePasswordPayload,
) {
  const user = await userRepository.getById(actor.userId);

  if (!user) {
    throw new UserNotFoundError(actor.userId);
  }
  //validar contraseña actual
  const isCurrentPasswordValid = await passwordHasher.compare(
    dto.currentPassword,
    user.passwordHash.getValue(),
  );
  if (!isCurrentPasswordValid) {
    throw new IncorrectPasswordError()
  }
  //verificar que la nueva contraseña no sea igual a la actual
  const isSamePassword = await passwordHasher.compare(
    dto.newPassword,
    user.passwordHash.getValue(),
  );

  if (isSamePassword) {
    throw new PasswordReuseError();
  }

  const passwordVO = new Password(dto.newPassword);
  const hashedNewPassword = await passwordHasher.hash(passwordVO.getValue());
  user.changePassword(new PasswordHash(hashedNewPassword));

  await userRepository.save(user);

  //enviar email

  //registrar estos cambios en el historial, auditoría

  //invalidar sesiones activas o lo que haya

  return user;
}
