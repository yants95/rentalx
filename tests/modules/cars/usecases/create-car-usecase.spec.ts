import 'reflect-metadata'

import { CreateCarUseCase } from '@/modules/cars/usecases'
import { ICreateCarDTO } from '@/modules/cars/dtos'
import { CarRepositorySpy } from '@/tests/modules/cars/repositories/mocks'
import { AppError } from '@/shared/errors'

type SutTypes = {
  sut: CreateCarUseCase
  carRepositorySpy: CarRepositorySpy
}

const makeSut = (): SutTypes => {
  const carRepositorySpy = new CarRepositorySpy()
  const sut = new CreateCarUseCase(carRepositorySpy)
  return {
    sut,
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

describe('CreateCarUseCase', () => {
  it('should be able to create a new car', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeCar())
    expect(response).toHaveProperty('id')
  })

  it('should not be able to create a car with an existing license plate', async () => {
    const { sut } = makeSut()
    await sut.execute(makeCar())
    await expect(sut.execute(makeCar())).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a car with availability true by default', async () => {
    const { sut } = makeSut()
    const car = makeCar()
    await sut.execute(car)
    expect(car.available).toBe(true)
  })
})
