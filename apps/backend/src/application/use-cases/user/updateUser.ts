import { UpdateUserDTO } from "@app/DTOs/index.js";
import { DNI, Email, User, UserNotFoundError, UserRepository } from "@forit/domain";

interface UpdateUserDeps {
  userRepository: UserRepository;
}

type UpdateUserPayload = {
  // actor: AuthenticatedUser; //viene del midleware con jwt
  targetUserId: string;
  dto: UpdateUserDTO;
};

export async function updateUser(
  { userRepository }: UpdateUserDeps,
  { targetUserId, dto }: UpdateUserPayload,
): Promise<User> {
  const user = await userRepository.getById(targetUserId);

  if (!user) {
    throw new UserNotFoundError(targetUserId);
  }

  // Comprobar que quien quiere cambiar los datos, es el mismo usuario
  // if (actor.id !== user.id) {
  //   throw new UnauthorizedError();
  // }

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
