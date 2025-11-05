import { User } from "../../entities";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { UpdatePayload } from "../../utils/types/payload";

interface EditUserDeps {
  userService: MockedUserService;
}

type EditUserPayload = UpdatePayload<User>

export async function editUser(
  { userService }: EditUserDeps,
  { id, ...data }: EditUserPayload
): Promise<User> {
  const findUser = await userService.findById(id);
  if (!findUser) throw new Error("User not found");
  const editedUser = await userService.editOne(id, data);

  return editedUser;
}