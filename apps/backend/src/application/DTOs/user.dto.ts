import { UserRole } from "@forit/domain";

export interface CreateUserDTO {
  name: string;
  DNI: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface GetUserDTO {
  search?: string;
}