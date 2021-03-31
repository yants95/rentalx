import { Car } from '@/modules/cars/infra/typeorm/entities'
import { ICarRepository } from '@/modules/cars/repositories'

import { inject, injectable } from 'tsyringe'

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        return await this.carRepository.findAvailable(brand, category_id, name)
    }
}