import { DNI, Email, PasswordHash } from "../../ValueObjects/index.js";
import { User, UserRole } from "../user.js";
import { faker } from "@faker-js/faker";

export function userMock(opts?: Partial<User>): User {
  return new User(
      opts?.id ?? crypto.randomUUID(),
      opts?.name ?? faker.person.firstName(),
      opts?.DNI ?? new DNI(faker.string.numeric(8)),
      opts?.email ?? new Email(faker.internet.email()),
      opts?.passwordHash ?? new PasswordHash(faker.lorem.paragraph()),
      opts?.role ?? faker.helpers.arrayElement(Object.values(UserRole)),
    );
}
