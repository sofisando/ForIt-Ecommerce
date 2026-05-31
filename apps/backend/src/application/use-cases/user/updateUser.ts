import { UpdateUserDTO } from "@app/DTOs/index.js";
import {
  User,
  UserNotFoundError,
  UserRepository
} from "@forit/domain";
import { DNI } from "@forit/domain/dist/ValueObjects/DNI.js";
import { Email } from "@forit/domain/dist/ValueObjects/Email.js";
import { Password } from "@forit/domain/dist/ValueObjects/Password.js";

interface UpdateUserDeps {
  userRepository: UserRepository;
}

type UpdateUserPayload = {
  id: string; //lo pongo acá porque este dato viene desde la url
  dto: UpdateUserDTO;
};

export async function updateUser(
  { userRepository }: UpdateUserDeps,
  { id, dto }: UpdateUserPayload,
): Promise<User> {
  const existingUser = await userRepository.getById(id);
  if (!existingUser) {
    throw new UserNotFoundError(id);
  }

  const updatedUser = new User(
    existingUser.id,
    dto.name,
    new DNI(dto.DNI),
    new Email(dto.email),
    new Password(dto.password),
    existingUser.role,
  );

  await userRepository.save(updatedUser);

  return updatedUser;
}
