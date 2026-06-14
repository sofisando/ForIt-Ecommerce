import { UserRole } from "@forit/domain";

export interface CreateUserDTO {
  name: string;
  DNI: string;
  email: string;
  password: string;
}

export interface GetUserDTO {
  search?: string;
}

export interface GetUserByIdDTO {
  id: string;
}

export interface GetUserByEmailDTO {
  email: string;
}

export interface DeleteUserDTO {
  id: string;
}

export interface UpdateUserDTO {
  name?: string;
  DNI?: string;
  email?: string;
  //sin password, el cambio de password se hace con otras restricciones
  //no lo voy a poner el role, para que no se lo pueda cambiar el propio usuario, si quisiera cambiar el rol tendría que hacerlo un admin en un use case aparte
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;

  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

export interface changePasswordDTO {
  currentPassword: string;
  newPassword: string;
}