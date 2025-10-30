import type { User, UserUpdate } from "../../entities/user.js";
import type { UserService } from "../user-service.js";

export class MockedUserService implements UserService {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  findById = async (id: string): Promise<User | undefined> => {
    return this.users.find((user) => user.id == id);
  };
  findAll = async (): Promise<User[]> => {
    return this.users;
  };
  editOne = async (id: string, updated: UserUpdate): Promise<User | null> => {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const edited = { ...this.users[index], ...updated } as User;
    this.users[index] = edited;
    return edited;
  };
  create = async (data: User): Promise<User> => {
    this.users.push(data);
    return data;
  };
  delete = async (id: string): Promise<void> => {
    this.users = this.users.filter((u) => u.id !== id);
  };
  findByName = async (name: string): Promise<User | undefined> => {
    return this.users.find((user) => user.name == name);
  };
  findByEmail = async (email: string): Promise<User | undefined> => {
    return this.users.find((user) => user.email == email);
  };
}
