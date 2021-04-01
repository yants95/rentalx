import { CreateRentalUseCase } from '@/modules/rentals/usecases'
import { RentalRepositorySpy } from '@/tests/modules/rentals/mocks'
import { ICreateRentDTO } from "@/modules/rentals/dtos"
import { AppError } from '@/shared/errors'
import { DayJSProvider } from '@/shared/container/providers/date-provider/implementations'

import dayjs from 'dayjs'

type SutTypes = {
    sut: CreateRentalUseCase
    rentalRepositorySpy: RentalRepositorySpy
    dayjsProvider: DayJSProvider
}

const makeSut = (): SutTypes => {
    const dayjsProvider = new DayJSProvider()
    const rentalRepositorySpy = new RentalRepositorySpy()
    const sut = new CreateRentalUseCase(rentalRepositorySpy, dayjsProvider)
    return {
        sut,
        rentalRepositorySpy,
        dayjsProvider
    }
}

const dayAdd24Hours = dayjs().add(1, 'day').toDate()

const makeRental = (): ICreateRentDTO => ({
    car_id: 'any_car_id',
    user_id: 'any_user_id',
    expected_return_date: dayAdd24Hours
}) 

describe('CreateRentalUseCase', () => {
    it('should be able to create a new rental', async () => {
        const { sut } = makeSut()
        const rental = await sut.execute(makeRental())
        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        const { sut } = makeSut()
        expect(async() => {
            await sut.execute(makeRental())
            await sut.execute(makeRental())
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        const { sut } = makeSut()
        expect(async() => {
            await sut.execute(makeRental())
            await sut.execute(makeRental())
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with invalid return time', async () => {
        const { sut } = makeSut()
        expect(async() => {
            await sut.execute({
                car_id: 'any_car_id',
                user_id: 'any_user_id',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})