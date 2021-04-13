import { CreateUserUseCase } from '@/modules/accounts/usecases'

import { container } from 'tsyringe'
import { Request, Response } from 'express'
export class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase)
    const userCreated = await createUserUseCase.execute(request.body)

    return response.status(201).json(userCreated)
  }
}
