import { ICreateRentDTO } from '@/modules/rentals/dtos'
import { Rental } from '@/modules/rentals/infra/typeorm/entities'
import { AppError } from '@/shared/errors'
import { IRentalRepository } from '@/modules/rentals/repositories'
import { IDateProvider } from '@/shared/container/providers'
import { ICarRepository } from '@/modules/cars/repositories'

import { inject, injectable } from 'tsyringe'
@injectable()
export class CreateRentalUseCase {
  constructor (
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarRepository')
    private readonly carRepository: ICarRepository
  ) {}

  async execute (data: ICreateRentDTO): Promise<Rental> {
    const minimalHours = 24

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(data.car_id)
    if (carUnavailable) throw new AppError('Car is unavailable!')

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(data.user_id)
    if (rentalOpenToUser) throw new AppError("There's a rental in progress for this user!")

    const currentDate = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(currentDate, data.expected_return_date)

    if (compare < minimalHours) throw new AppError('Invalid return time!')

    await this.carRepository.updateAvailable(data.car_id, false)

    return await this.rentalRepository.create(data)
  }
}
