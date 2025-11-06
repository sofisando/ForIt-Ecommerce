import { User } from "../../entities";
import { UserService } from "../../services";

import { UpdatePayload } from "../../utils/types/payload";

interface EditUserDeps {
  userService: UserService;
}

type EditUserPayload = UpdatePayload<User>

export async function editUser(
  { userService }: EditUserDeps,
  payload: EditUserPayload
): Promise<User> {
  const findUser = await userService.findById(payload.id);
  if (!findUser) throw new Error("User not found");
  const editedUser = await userService.editOne(payload);

  return editedUser;
}