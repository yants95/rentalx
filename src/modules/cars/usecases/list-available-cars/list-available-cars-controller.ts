import { ListAvailableCarsUseCase } from '@/modules/cars/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListAvailableCarsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query

    const params = {
      brand: brand as string,
      name: name as string,
      category_id: category_id as string
    }

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const cars = await listAvailableCarsUseCase.execute(params.category_id, params.brand, params.name)

    return response.json(cars)
  }
}
