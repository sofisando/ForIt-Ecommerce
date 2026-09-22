import {
  AuthenticatedUser,
  UnauthorizedError,
  UserNotFoundError,
  UserRole,
  type UserRepository,
} from "@forit/domain";
import { DeleteUserDTO } from "@app/DTOs/index.js";

interface DeleteUserDeps {
  userRepository: UserRepository;
}

interface DeleteUserPayload {
  actor: AuthenticatedUser;
  dto: DeleteUserDTO;
}

export async function deleteUser(
  { userRepository }: DeleteUserDeps,
  { actor, dto }: DeleteUserPayload,
): Promise<void> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const user = await userRepository.getById(dto.id);
  if (!user) {
    throw new UserNotFoundError();
  }

  await userRepository.delete(dto.id);
}
