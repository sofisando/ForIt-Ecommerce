
import { AuthenticationRepo, Password, PasswordHash, PasswordReuseError, UserNotFoundError, UserRepository } from "@forit/domain";

interface ChangePasswordDeps {
  userRepository: UserRepository;
  passwordHasher: AuthenticationRepo;
}

type ChangePasswordPayload = {
  actor: AuthenticatedUser;
  currentPassword: string;
  newPassword: string;
};

export async function changePassword(
  { userRepository, passwordHasher }: ChangePasswordDeps,
  { actor, currentPassword, newPassword }: ChangePasswordPayload,
) {
  const user = await userRepository.getById(actor.id);

  if (!user) {
    throw new UserNotFoundError(actor.id);
  }
  //validar contraseña actual
  const isCurrentPasswordValid = await passwordHasher.compare(
    currentPassword,
    user.passwordHash.getValue(),
  );
  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect"); //poner el error desde el domain
  }
  //verificar que la nueva contraseña no sea igual a la actual
  const isSamePassword = await passwordHasher.compare(
    newPassword,
    user.passwordHash.getValue(),
  );

  if (isSamePassword) {
    throw new PasswordReuseError();
  }

  const passwordVO = new Password(newPassword); //acá valida si esta bien la contraseña, o esto deberia hacerse antes?
  const hashedNewPassword = await passwordHasher.hash(passwordVO.getValue());
  user.changePassword(new PasswordHash(hashedNewPassword));

  await userRepository.save(user);

  //enviar email

  //registrar estos cambios en el historial, auditoría

  //invalidar sesiones activas o lo que haya

  return user;
}
