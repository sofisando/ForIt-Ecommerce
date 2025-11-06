import type { User } from "../../entities/user.js";
import { CreatePayload, UpdatePayload } from "../../utils/index.js";
import type { UserService } from "../user-service.js";

export class MockedUserService implements UserService {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  findById = async (id: string): Promise<User | null> => {
    return this.users.find((user) => user.id == id) ?? null;
  };
  findAll = async (): Promise<User[]> => {
    return this.users;
  };
  editOne = async (data: UpdatePayload<User>): Promise<User> => {
    const index = this.users.findIndex((user) => user.id === data.id);
    if (index === -1) throw Error("User not found");

    const edited = { ...this.users[index], ...data } as User;
    this.users[index] = edited;
    return edited;
  };
  create = async (data: CreatePayload<User>): Promise<User> => {
    const newUser = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies User;

    this.users.push(newUser);
    return newUser;
  };
  delete = async (data: {id: String}): Promise<void> => {
    this.users = this.users.filter((u) => u.id !== data.id);
  };
  findByName = async (name: string): Promise<User | undefined> => {
    return this.users.find((user) => user.name == name);
  };
  findByEmail = async (email: string): Promise<User | undefined> => {
    return this.users.find((user) => user.email == email);
  };
}
