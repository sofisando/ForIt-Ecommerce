import { LoginResponseDTO, LoginUserDTO } from "@app/DTOs/index.js";
import {
  type UserRepository,
  PasswordHasher,
  IncorrectPasswordError,
  UserNotFoundError,
  TokenProvider,
} from "@forit/domain";
import { UserMapper } from "@infra/mappers/user.mapper.js";

interface LoginUserDeps {
  userRepository: UserRepository;
  passwordHasher: PasswordHasher;
  tokenProvider: TokenProvider;
}

export async function loginUser(
  { userRepository, passwordHasher, tokenProvider }: LoginUserDeps,
  dto: LoginUserDTO,
): Promise<LoginResponseDTO> {
  const user = await userRepository.getByEmail(dto.email);

  if (!user) {
    throw new UserNotFoundError(dto.email);
  }

  const isPasswordValid = await passwordHasher.compare(
    dto.password,
    user.passwordHash.getValue(),
  );

  if (!isPasswordValid) {
    throw new IncorrectPasswordError();
  }

  const token = await tokenProvider.generate(user.id, user.role);

  // y luego mandar notificacion por email

  return UserMapper.LoginResponseDTO(user, token);
}
