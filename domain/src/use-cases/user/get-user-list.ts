import { UserService } from "../../services";

interface GetUserListDeps {
  userService: UserService;
}
//no tiene payload porque no necesita nada para traer la lista de usuarios

export async function getUserList({ userService }: GetUserListDeps) {
  const users = await userService.findAll();
  return users;
}
