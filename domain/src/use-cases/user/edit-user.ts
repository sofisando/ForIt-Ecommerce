import { User, UserUpdate } from "../../entities";
import { MockedUserService } from "../../services/mocks/mock-user-service";

interface EditUserDeps {
  userService: MockedUserService;
}
interface EditUserPayload extends UserUpdate {
  id: string;
}

export async function editUser(
  { userService }: EditUserDeps,
  { id, ...data }: EditUserPayload
): Promise<User> {
  const findUser = await userService.findById(id);
  if (!findUser) throw new Error("User not found");
  const editedUser = await userService.editOne(id, data);

  return editedUser;
}