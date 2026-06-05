import { Request, Response } from "express";
import { prisma } from "@infra/prisma/prisma.js";

import { UserRepositoryPrisma } from "@infra/repos/index.js";
import { BcryptPasswordHasher } from "@infra/services/hash-service.js";
import {
  CreateUserDTO,
  DeleteUserDTO,
  GetUserByIdDTO,
  GetUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from "@app/DTOs/index.js";
import { UnauthorizedError, UserAlreadyExistsError, UserNotFoundError } from "@forit/domain";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@app/use-cases/index.js";
import { loginUser } from "@app/use-cases/user/loginUser.js";
import { JwtTokenProvider } from "@infra/services/JwtTokenProvider.js";

const db = prisma;
const userRepository = new UserRepositoryPrisma(db);
const passwordHasher = new BcryptPasswordHasher();
const tokenProvider = new JwtTokenProvider();

export const createUserController = async (req: Request, res: Response) => {
  const dto: CreateUserDTO = req.body;

  try {
    const user = await createUser(
      {
        userRepository,
        passwordHasher,
      },
      dto,
    );

    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const dto: LoginUserDTO = req.body;

  try {
    const user = await loginUser(
      {
        userRepository,
        passwordHasher,
        tokenProvider,
      },
      dto,
    );

    res
      .cookie("access_token", user.token, {
        httpOnly: true, //la cookie solo se puede acceder desde el servidor
        // secure: process.env.NODE_ENV === "production", //la cookie solo se envía en conexiones seguras https
        // sameSite: "strict", //la cookie solo se envía en solicitudes del mismo dominio
        maxAge: 1000 * 60 * 60 * 24, //la cookie expira en 1 día
      })
      .status(201)
      .json(user);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔥 después podés mejorar esto con error handling centralizado
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  const dto: GetUserDTO = {};

  if (typeof req.query.search === "string") {
    dto.search = req.query.search;
  }
  //con este search puedo buscar por nombre del cliente, el resto no

  try {
    const users = await getUsers(
      {
        userRepository,
      },
      dto,
    );

    res.status(200).json(users);
  } catch (error: unknown) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: GetUserByIdDTO = {
    id: String(req.params.id),
  };

  try {
    const user = await getUserById({ userRepository }, dto);
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({
      message: "Error fetching user",
    });
  }
};

// ver si se puede "borrar" el usuario o desabilitarlo en su defecto, o ver si tienen derecho a borrarlo, que creo que si
export const deleteUserController = async (
  req: Request,
  res: Response,
) => {
  const actor = req.user;

  if (!actor) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }
  const dto: DeleteUserDTO = {
    id: String(req.params.id),
  };

  try {
    await deleteUser({ userRepository }, { actor,dto });
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({
      message: "Error deleting user",
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const targetUserId = String(req.params.id);
  const dto: UpdateUserDTO = req.body;

  try {
    const updatedUser = await updateUser(
      { userRepository },
      { targetUserId, dto },
    );
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error);
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({
      message: "Error updating user",
    });
  }
};
