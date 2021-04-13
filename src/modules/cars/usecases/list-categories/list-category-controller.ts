import { ListCategoryUseCase } from './list-category-usecase'

import { Request, Response } from 'express'
import { container } from 'tsyringe'
class ListCategoryController {
  async handle (_: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase)
    const categories = await listCategoryUseCase.execute()

    return response.status(200).json(categories)
  }
}

export { ListCategoryController }
