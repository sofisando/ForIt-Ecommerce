import { MockedUserService } from "../../services/mocks/mock-user-service";

interface DeleteUserDeps {
  userService: MockedUserService;
}

interface DeleteUserPayload {
  id: string;
}
export async function deleteUser(
  { userService }: DeleteUserDeps,
  { id }: DeleteUserPayload
) : Promise<void> {
  const foundUser = await userService.findById(id);
  if (!foundUser) throw new Error("User not found");

  await userService.delete(id);
}