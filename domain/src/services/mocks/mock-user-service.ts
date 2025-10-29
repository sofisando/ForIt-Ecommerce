import type { User } from "../../entities/user.js";
import type { UserService } from "../user-service.js";

export class MockedUserService implements UserService {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  editOne = async () => {
    throw "error";
  };
  findAll = async () => {
    return this.users;
  };
  findById = async () => {
    throw "error";
  };
  findByName = async () => {
    throw "error";
  };    
  create = async (data: User) => {
    this.users.push(data);
  };
  findByEmail = async (email: string) => {
    return this.users.find((user) => user.email == email);
  };
  delete = async (id: string) => {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
