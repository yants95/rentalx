import { CreateRentalUseCase } from '@/modules/rentals/usecases'
import { ICreateRentDTO } from '@/modules/rentals/dtos'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateRentalController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body
    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental: ICreateRentDTO = {
      user_id: request.user.id,
      car_id,
      expected_return_date
    }

    const rentalCreated = await createRentalUseCase.execute(rental)

    return response.json(rentalCreated)
  }
}
