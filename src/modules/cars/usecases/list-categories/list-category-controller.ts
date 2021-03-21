import { ListCategoryUseCase } from './list-category-usecase';

import { Request, Response } from 'express'

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    handle(_: Request, response: Response): Response {
        const categories = this.listCategoryUseCase.execute();
        return response.status(201).json(categories);
    }
}

export { ListCategoryController }