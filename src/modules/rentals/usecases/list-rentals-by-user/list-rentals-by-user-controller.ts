import { ListRentalsByUserUseCase } from '@/modules/rentals/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListRentalsByUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)
    const rentals = await listRentalsByUserUseCase.execute(request.user.id)

    return response.json(rentals)
  }
}
