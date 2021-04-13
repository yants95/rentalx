import { ICarRepository, ISpecificationRepository } from '@/modules/cars/repositories'
import { Car } from '@/modules/cars/infra/typeorm/entities'
import { AppError } from '@/shared/errors'

import { injectable, inject } from 'tsyringe'
@injectable()
export class CreateCarSpecificationUseCase {
  constructor (
    @inject('CarRepository')
    private readonly carRepository: ICarRepository,

    @inject('SpecificationRepository')
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute (car_id: string, specifications_id: string[]): Promise<Car> {
    const carExisting = await this.carRepository.findById(car_id)

    if (!carExisting) throw new AppError('Car not found!')

    const specifications = await this.specificationRepository.findByIds(specifications_id)

    carExisting.specifications = specifications

    return await this.carRepository.create(carExisting)
  }
}
