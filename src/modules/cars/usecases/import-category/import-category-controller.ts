import { ImportCategoryUseCase } from './import-category-usecase';

import { Request, Response } from 'express'
import { container } from 'tsyringe'
export class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
        const importtedCategories = await importCategoryUseCase.execute(file)

        return response.status(201).json(importtedCategories)
    }
}