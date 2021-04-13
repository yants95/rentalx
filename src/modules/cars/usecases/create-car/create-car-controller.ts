import { CreateCarUseCase } from '@/modules/cars/usecases'

import { container } from 'tsyringe'
import { Request, Response } from 'express'

export class CreateCarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase)
    const car = await createCarUseCase.execute(request.body)

    return response.status(201).json(car)
  }
}
