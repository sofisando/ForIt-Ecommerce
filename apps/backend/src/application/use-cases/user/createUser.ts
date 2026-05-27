import { CreateUserDTO } from "@app/DTOs/index.js";
import {
  type UserRepository,
  User,
  UserAlreadyExistsError,
} from "@forit/domain";
import { DNI } from "@forit/domain/dist/ValueObjects/DNI.js";
import { Email } from "@forit/domain/dist/ValueObjects/Email.js";
import { Password } from "@forit/domain/dist/ValueObjects/Password.js";

interface CreateUserDeps {
  userRepository: UserRepository;
  //despues poner EmailRepository
}

export async function createUser(
  { userRepository }: CreateUserDeps,
  dto: CreateUserDTO,
): Promise<User> {
  const existingUser = await userRepository.findByEmail(dto.email);

  if (existingUser) {
    throw new UserAlreadyExistsError(dto.email);
  }

  const user = new User(
    crypto.randomUUID(),
    dto.name,
    new DNI(dto.DNI),
    new Email(dto.email),
    new Password(dto.password),
    dto.role,
  );

  await userRepository.save(user);

  // y luego mandar notificacion por email

  return user;
}
