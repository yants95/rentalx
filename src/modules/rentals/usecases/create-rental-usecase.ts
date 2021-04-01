import { ICreateRentDTO } from '@/modules/rentals/dtos'
import { Rental } from '@/modules/rentals/infra/typeorm/entities'
import { AppError } from '@/shared/errors'
import { IRentalRepository } from '@/modules/rentals/repositories'
import { IDateProvider } from '@/shared/container/providers'

import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateRentalUseCase {
    constructor (
        @inject('RentalRepository')
        private rentalRepository: IRentalRepository,
        @inject('DayJSProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute(data: ICreateRentDTO): Promise<Rental> {
        const minimalHours = 24

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(data.car_id)
        if (carUnavailable) throw new AppError('Car is unavailable!')

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(data.user_id)
        if (rentalOpenToUser) throw new AppError("There's a rental in progress for this users!")

        const currentDate = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(currentDate, data.expected_return_date)

        if (compare < minimalHours) throw new AppError('Invalid return time!')

        return await this.rentalRepository.create(data)
    }
}