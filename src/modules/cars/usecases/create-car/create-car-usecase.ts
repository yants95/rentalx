import { ICreateCarDTO } from '@/modules/cars/dtos'
import { ICarRepository } from '@/modules/cars/repositories'
import { Car } from '@/modules/cars/infra/typeorm/entities'
import { AppError } from '@/shared/errors'

import { injectable, inject } from 'tsyringe'

type IRequest = Omit<ICreateCarDTO, 'id'>
@injectable()
export class CreateCarUseCase {
    constructor (
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute(data: IRequest): Promise<Car> {
        const carExisting = await this.carRepository.findByLicensePlate(data.license_plate)

        if (carExisting) throw new AppError('Car already exists')

        return await this.carRepository.create(data)
    }
}