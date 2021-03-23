import { CreateSpecificationUseCase } from '@/modules/cars/usecases/create-specification/create-specification-usecase';

import { Request, Response } from 'express'
import { container } from 'tsyringe'
class CreateSpecificationController {

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
        const specification = createSpecificationUseCase.execute({ name, description });

        return response.status(201).json(specification);
    }
}

export { CreateSpecificationController }