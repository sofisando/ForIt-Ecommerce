import { CreateUserDTO } from "@app/DTOs/index.js";
import {
  type UserRepository,
  AuthenticationRepo,
  DNI,
  Email,
  Password,
  PasswordHash,
  User,
  UserAlreadyExistsError,
  UserRole,
} from "@forit/domain";

interface CreateUserDeps {
  userRepository: UserRepository;
  passwordHasher: AuthenticationRepo;
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
