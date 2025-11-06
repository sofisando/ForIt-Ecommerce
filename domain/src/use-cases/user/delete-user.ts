import { User } from "../../entities";
import { UserService } from "../../services";

import { DeletePayload } from "../../utils/types/payload";

interface DeleteUserDeps {
  userService: UserService;
}

type DeleteUserPayload = DeletePayload<User>

export async function deleteUser(
  { userService }: DeleteUserDeps,
  { id }: DeleteUserPayload
) : Promise<void> {
  const foundUser = await userService.findById(id);
  if (!foundUser) throw new Error("User not found");

  await userService.delete({id});
}