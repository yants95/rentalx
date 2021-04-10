import "reflect-metadata"

import { CreateRentalUseCase } from '@/modules/rentals/usecases'
import { RentalRepositorySpy } from '@/tests/modules/rentals/mocks'
import { CarRepositorySpy } from '@/tests/modules/cars/repositories/mocks'
import { ICreateRentDTO } from "@/modules/rentals/dtos"
import { ICreateCarDTO } from "@/modules/cars/dtos"
import { AppError } from '@/shared/errors'
import { DayJSProvider } from '@/shared/container/providers/date-provider/implementations'

import dayjs from 'dayjs'

type SutTypes = {
  sut: CreateRentalUseCase
  rentalRepositorySpy: RentalRepositorySpy
  carRepositorySpy: CarRepositorySpy
  dayjsProvider: DayJSProvider
}

const makeSut = (): SutTypes => {
  const dayjsProvider = new DayJSProvider()
  const rentalRepositorySpy = new RentalRepositorySpy()
  const carRepositorySpy = new CarRepositorySpy()
  const sut = new CreateRentalUseCase(rentalRepositorySpy, dayjsProvider, carRepositorySpy)
  return {
    sut,
    rentalRepositorySpy,
    dayjsProvider,
    carRepositorySpy
  }
}

const makeCar = (): ICreateCarDTO => ({
  name: 'any_name', 
  description: 'any_description', 
  daily_rate: 1, 
  license_plate: 'any_license_plate', 
  fine_amount: 1, 
  brand: 'any_brand', 
  category_id: 'any_category_id',
  available: true
})

const dayAdd24Hours = dayjs().add(1, 'day').toDate()

const makeRental = (car_id: string): ICreateRentDTO => ({
  car_id,
  user_id: 'any_user_id',
  expected_return_date: dayAdd24Hours
}) 

describe('CreateRentalUseCase', () => {
  it('should be able to create a new rental', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const rental = await sut.execute(makeRental(car.id))
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    await sut.execute(makeRental(car.id))
    await expect(sut.execute(makeRental(car.id))).rejects.toEqual(new AppError("Car is unavailable!"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    expect(async() => {
      await sut.execute(makeRental(car.id))
      await sut.execute(makeRental(car.id))
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