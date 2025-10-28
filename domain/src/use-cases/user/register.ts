// import { UserRole } from "../../entities/user.js";
// import type { UserService } from "../../services/user-service.js";

// interface RegisterDeps {
//   userService: UserService;
// }

// interface RegisterPayload {
//   name: string;
//   email: string;
//   password: string;
//   DNI: string;
//   role: UserRole;
// }

// export async function register(
//   { userService }: RegisterDeps,
//   { email, name, password }: RegisterPayload
// ) {
//   const foundUser = await userService.findByEmail(email);
//   if (foundUser) return new Error();

//   await userService.save({
//     id: crypto.randomUUID(),
//     name,
//     email,
//     password,
//     role,
//     DNI,
//   });
// }
