import { UserRepository } from "@/modules/accounts/repositories";
import { AppError } from '@/errors'

import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export async function ensureAuthenticate(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError('Token is missing', 401)

    const [, token] = authHeader.split(' ')
    
    try {
        const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

        const userRepository = new UserRepository()
        const userExists = await userRepository.findById(user_id)

        if (!userExists) throw new AppError('User not found!', 401)
        
        next()
    } catch {
        throw new AppError('Invalid token!', 401)
    }
}