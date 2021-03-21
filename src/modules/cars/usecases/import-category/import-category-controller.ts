import { ImportCategoryUseCase } from './import-category-usecase';

import { Request, Response } from 'express'

export class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(request: Request, response: Response) {
        const { file } = request;
        this.importCategoryUseCase.execute(file)
        return response.send()
    }
}