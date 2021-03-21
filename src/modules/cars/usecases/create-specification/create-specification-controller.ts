import { CreateSpecificationUseCase } from '@/modules/cars/usecases/create-specification/create-specification-usecase';

import { Request, Response } from 'express'

class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        const category = this.createSpecificationUseCase.execute({ name, description });

        return response.status(201).json(category);
    }
}

export { CreateSpecificationController }