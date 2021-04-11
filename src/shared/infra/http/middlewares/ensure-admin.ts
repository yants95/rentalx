import { UserRepository } from "@/modules/accounts/infra/typeorm/repositories";
import { AppError } from "@/shared/errors";

import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, _: Response, next: NextFunction) {
  const { id } = request.user;
  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.isAdmin) throw new AppError('User is not an admin!')

  return next()
}