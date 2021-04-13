import { DevolutionRentalUseCase } from '@/modules/rentals/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DevolutionRentalController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUseCase.execute(rental_id, request.user.id)

    return response.status(200).json(rental)
  }
}
