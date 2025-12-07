import { User, UserRole } from "../../entities";
import { UserService } from "../../services";

interface GetUserListDeps {
  userService: UserService;
}
interface GetUserListPayload {
  userId: User["id"];
}

export async function getUserList(
  { userService }: GetUserListDeps,
  { userId }: GetUserListPayload
): Promise<User[] | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const users = await userService.findAll();
  return users;
}
