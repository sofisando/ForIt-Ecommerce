import type { User } from "../entities/user.js";
import type { Repository } from "../utils/types/repository.js";

export interface UserRepository extends Repository<User> {
  getByEmail: (email: string) => Promise<User | undefined>;
}