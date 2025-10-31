import { User } from "../../entities";
import { MockedUserService } from "../../services/mocks/mock-user-service";

interface FindByNameDeps {
  userService: MockedUserService;
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
