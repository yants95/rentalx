import { CreateCarSpecificationUseCase } from "@/modules/cars/usecases";

import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarSpecificationController {
    async handle (request: Request, response: Response): Promise<Response> {
        const { id: car_id } = request.params;
        const { specifications_id } = request.body
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)
        const specificationCarCreated = await createCarSpecificationUseCase.execute(car_id, specifications_id)
        
        return response.json(specificationCarCreated)
    }
}