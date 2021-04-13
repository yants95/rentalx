import { ProfileUserUseCase } from '@/modules/accounts/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ProfileUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const profileUserUseCase = container.resolve(ProfileUserUseCase)
    const user = await profileUserUseCase.execute(id)
    return response.json(user)
  }
}
