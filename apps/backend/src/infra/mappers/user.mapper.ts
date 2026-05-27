import { User } from "@forit/domain";
import { DNI } from "@forit/domain/dist/ValueObjects/DNI.js";
import { Email } from "@forit/domain/dist/ValueObjects/Email.js";
import { Password } from "@forit/domain/dist/ValueObjects/Password.js";
import { User as PrismaUser } from "@infra/generated/prisma/client.js";

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.name,
      new DNI(prismaUser.DNI),
      new Email(prismaUser.email),
      new Password(prismaUser.password),
      prismaUser.role
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      DNI: user.DNI.toString(),
      email: user.email.toString(),
      password: user.password.toString(),
      role: user.role,
    };
  }
}