import { ICarRepository } from "@/modules/cars/repositories";
import { AppError } from "@/shared/errors";

import { inject } from "tsyringe";

export class CreateCarSpecificationUseCase {
    constructor (
        // @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute(car_id: string, specifications_id: string[]): Promise<void> {
        const carExisting = await this.carRepository.findById(car_id)

        if (!carExisting) throw new AppError('Car not found!')
    }
}