import { Prisma } from "@infra/generated/prisma/client.js";
import { GetUserDTO } from "@app/DTOs/index.js";
import { UnauthorizedError, UserRole, type AuthenticatedUser, type User, type UserRepository } from "@forit/domain";

interface GetUsersDeps {
  userRepository: UserRepository;
}

interface GetUserPayload {
  actor: AuthenticatedUser;
  dto: GetUserDTO;
}

export async function getUsers(
  { userRepository }: GetUsersDeps,
  { actor, dto }: GetUserPayload,
): Promise<User[]> {
  if (actor.role !== UserRole.ADMIN) {
    throw new UnauthorizedError();
  }

  const filters: Prisma.UserWhereInput = {};

  if (dto.search) {
    // con esto puedo buscar por nombre del cliente, el resto no
    filters.name = {
      contains: dto.search,
      mode: "insensitive",
    };
  }

  const users = await userRepository.getAll(filters);

  return users;
}
