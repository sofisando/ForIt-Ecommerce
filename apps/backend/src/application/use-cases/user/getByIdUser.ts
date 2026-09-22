import { GetUserByIdDTO } from "@app/DTOs/index.js";
import { AuthenticatedUser, UnauthorizedError, User, UserNotFoundError, UserRole, type UserRepository } from "@forit/domain";

interface GetUserByIdDeps {
  userRepository: UserRepository;
}

interface GetUserByIdPayload {
  actor: AuthenticatedUser;
  dto: GetUserByIdDTO;
}

export async function getUserById(
  { userRepository }: GetUserByIdDeps,
  { actor, dto }: GetUserByIdPayload,
): Promise<User> {
  
  if (actor.role !== UserRole.ADMIN) {
      throw new UnauthorizedError();
    }

  const user = await userRepository.getById(dto.id);

  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
}
