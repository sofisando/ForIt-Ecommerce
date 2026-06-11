import { User, UserRepository } from "@forit/domain";

export class MockedUserRepository implements UserRepository {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  getById = async (id: string): Promise<User | null> => {
    return this.users.find((user) => user.id == id) ?? null;
  };
  getAll = async (): Promise<User[]> => {
    return this.users;
  };
  async save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      this.users.push(user);
    } else {
      this.users[index] = user;
    }
  }
  delete = async (id: String): Promise<void> => {
    this.users = this.users.filter((u) => u.id !== id);
  };
  getByEmail = async (email: string): Promise<User | undefined> => {
    return this.users.find((user) => String(user.email) == email);
  };
}
