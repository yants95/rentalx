import { UserRepository } from "@/modules/accounts/repositories";

import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export async function ensureAuthenticate(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error('Token is missing')

    const [, token] = authHeader.split(' ')
    
    try {
        const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

        const userRepository = new UserRepository()
        const userExists = await userRepository.findById(user_id)

        if (!userExists) throw new Error('User not found!')
        
        next()
    } catch {
        throw new Error('Invalid token!')
    }
}