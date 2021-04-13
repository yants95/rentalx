import { IRentalRepository } from '@/modules/rentals/repositories'
import { ICarRepository } from '@/modules/cars/repositories'
import { IDateProvider } from '@/shared/container/providers'
import { AppError } from '@/shared/errors'
import { Rental } from '@/modules/rentals/infra/typeorm/entities'

import { injectable, inject } from 'tsyringe'

@injectable()
export class DevolutionRentalUseCase {
  constructor (
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository,
    @inject('CarRepository')
    private readonly carRepository: ICarRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute (rental_id: string, user_id: string): Promise<Rental> {
    const minimal_daily = 1
    const rental = await this.rentalRepository.findById(rental_id)

    if (!rental) throw new AppError('Rental not found!')

    const car = await this.carRepository.findById(rental.car_id)

    const currentDate = this.dateProvider.dateNow()
    let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())

    if (daily <= 0) daily = minimal_daily

    const delay = this.dateProvider.compareInDays(currentDate, rental.expected_return_date)
    let total = 0

    if (delay > 0) {
      const calculate_final = delay * car.fine_amount
      total = calculate_final
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalRepository.create(rental)
    await this.carRepository.updateAvailable(car.id, true)

    return rental
  }
}
