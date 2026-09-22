import { UpdateUserDTO } from "@app/DTOs/index.js";
import { AuthenticatedUser, DNI, Email, UnauthorizedError, User, UserNotFoundError, UserRepository, UserRole } from "@forit/domain";

interface UpdateUserDeps {
  userRepository: UserRepository;
}

type UpdateUserPayload = {
  actor: AuthenticatedUser; 
  targetUserId: string;
  dto: UpdateUserDTO;
};

export async function updateUser(
  { userRepository }: UpdateUserDeps,
  { actor, targetUserId, dto }: UpdateUserPayload,
): Promise<User> {
  const user = await userRepository.getById(targetUserId);
  if (!user) {
    throw new UserNotFoundError(targetUserId);
  }
  
  // Comprobar que quien quiere cambiar los datos, es el mismo usuario o es ADMIN
  if (actor.userId !== user.id && actor.role !== UserRole.ADMIN) { //el && es un or acá
    throw new UnauthorizedError();
  }

  if (dto.name !== undefined) {
    user.changeName(dto.name);
  }

  if (dto.DNI !== undefined) {
    user.changeDNI(new DNI(dto.DNI));
  }

  if (dto.email !== undefined) {
    user.changeEmail(new Email(dto.email));
  }

  await userRepository.save(user);

  return user;
}
