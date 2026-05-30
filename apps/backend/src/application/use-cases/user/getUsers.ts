import { Prisma } from "@infra/generated/prisma/client.js";
import { GetUserDTO } from "@app/DTOs/index.js";
import type { User, UserRepository } from "@forit/domain";

interface GetUsersDeps {
  userRepository: UserRepository;
  //   userService: UserService;
}

export async function getUsers(
  {
    userRepository,
    // userService
  }: GetUsersDeps,
  dto: GetUserDTO,
) : Promise<User[]> {
  
  // const user = await userRepository.getById(dto.userId);
  // if (!user) throw new UserNotFoundError();

  // if (user.role !== UserRole.ADMIN) {
  //   throw new UnauthorizedError();
  // }

  const filters: Prisma.UserWhereInput = {};

  if (dto.search) { // con esto puedo buscar por nombre del cliente, el resto no
    filters.name = {
      contains: dto.search,
      mode: "insensitive",
    };
  }

  const users = await userRepository.getAll(filters);

  return users;
}
