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
  const user = await userRepository.getById(id);

if (!user) {
  throw new UserNotFoundError(id);
}

if (dto.name !== undefined ) {
  user.changeName(dto.name);
}

if (dto.DNI !== undefined ) {
  user.changeDNI(new DNI(dto.DNI));
}

if (dto.email !== undefined ) {
  user.changeEmail(new Email(dto.email));
}

if (dto.password !== undefined ) {
  user.changePassword(new Password(dto.password));
}

await userRepository.save(user);

return user;
}
