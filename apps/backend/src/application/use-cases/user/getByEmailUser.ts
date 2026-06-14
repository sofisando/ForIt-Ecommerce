import { GetUserByEmailDTO } from "@app/DTOs/index.js";
import { AuthenticatedUser, UnauthorizedError, User, UserNotFoundError, UserRole, type UserRepository } from "@forit/domain";

interface GetUserByEmailDeps {
  userRepository: UserRepository;
}

interface GetUserByEmailPayload {
  actor: AuthenticatedUser;
  dto: GetUserByEmailDTO;
}

export async function getUserByEmail(
  { userRepository }: GetUserByEmailDeps,
  { actor, dto }: GetUserByEmailPayload,
): Promise<User> {
  
  if (actor.role !== UserRole.ADMIN) {
      throw new UnauthorizedError();
    }

  const user = await userRepository.getByEmail(dto.email);

  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
}
