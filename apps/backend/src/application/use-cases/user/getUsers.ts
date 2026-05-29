import { Prisma } from "@infra/generated/prisma/client.js";
import { GetUserDTO } from "@app/DTOs/index.js";
import type { UserRepository } from "@forit/domain";

interface GetUsersDeps {
  userRepository: UserRepository;
}

export async function getUsers(
  {
    userRepository,
  }: GetUsersDeps,
  dto: GetUserDTO,
) {
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
