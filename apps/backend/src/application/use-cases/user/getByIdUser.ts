import { GetUserByIdDTO } from "@app/DTOs/index.js";
import { User, UserNotFoundError, type UserRepository } from "@forit/domain";

interface GetUserByIdDeps {
  userRepository: UserRepository;
}

export async function getUserById(
  { userRepository }: GetUserByIdDeps,
  dto: GetUserByIdDTO,
): Promise<User> {
  
//   if (actor.role !== UserRole.ADMIN) {
  //     throw new UnauthorizedError();
  //   }

  const user = await userRepository.getById(dto.id);

  if (!user) {
    throw new UserNotFoundError();
  }
  return user;
}
