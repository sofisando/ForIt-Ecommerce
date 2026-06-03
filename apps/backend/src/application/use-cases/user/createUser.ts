import { CreateUserDTO } from "@app/DTOs/index.js";
import {
  type UserRepository,
  User,
  UserAlreadyExistsError,
  UserRole,
} from "@forit/domain";
import { DNI } from "@forit/domain/dist/ValueObjects/DNI.js";
import { Email } from "@forit/domain/dist/ValueObjects/Email.js";
import { Password } from "@forit/domain/dist/ValueObjects/Password.js";
import { PasswordHash } from "@forit/domain/dist/ValueObjects/PasswordHash.js";
import { BcryptPasswordHasher } from "@app/utils/hasher.js";

interface CreateUserDeps {
  userRepository: UserRepository;
  passwordHasher: BcryptPasswordHasher;
  //despues poner EmailRepository
}

export async function createUser(
  { userRepository, passwordHasher }: CreateUserDeps,
  dto: CreateUserDTO,
): Promise<User> {
  const existingUser = await userRepository.getByEmail(dto.email);

  if (existingUser) {
    throw new UserAlreadyExistsError(dto.email);
  }

  const password = new Password(dto.password);
  const hash = await passwordHasher.hash(password.getValue());

  const user = new User(
    crypto.randomUUID(),
    dto.name,
    new DNI(dto.DNI),
    new Email(dto.email),
    new PasswordHash(hash),
    UserRole.CLIENT,
  );

  await userRepository.save(user);

  // y luego mandar notificacion por email

  return user;
}
