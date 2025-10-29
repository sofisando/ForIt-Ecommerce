import { UserRole, type User } from "../user.js";
import { faker } from "@faker-js/faker";

export function userMock(opts?: Partial<User>): User {
  return {
    id: crypto.randomUUID(),
    name: faker.person.firstName(),
    DNI: faker.string.numeric(8),
    email: faker.internet.email(),
    password: faker.lorem.paragraph(),
    role: faker.helpers.arrayElement(Object.values(UserRole)),
    ...opts,
  };
}
