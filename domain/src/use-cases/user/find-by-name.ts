import { User } from "../../entities";
import { UserService } from "../../services";

interface FindByNameDeps {
  userService: UserService;
}
interface FindByNamePayload {
  name: string;
}
export async function findByName(
  { userService }: FindByNameDeps,
  { name }: FindByNamePayload
): Promise<User | undefined> {
  const findUser = await userService.findByName(name);
  if (!findUser) throw new Error("User not found");
  return findUser;
}
