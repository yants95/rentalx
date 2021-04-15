import 'reflect-metadata'

import { ListAvailableCarsUseCase } from '@/modules/cars/usecases'
import { CarRepositorySpy } from '@/tests/modules/cars/repositories/mocks'
import { ICreateCarDTO } from '@/modules/cars/dtos'

type SutTypes = {
  sut: ListAvailableCarsUseCase
  carRepositorySpy: CarRepositorySpy
}

const makeSut = (): SutTypes => {
  const carRepositorySpy = new CarRepositorySpy()
  const sut = new ListAvailableCarsUseCase(carRepositorySpy)
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

describe('ListCarsUseCase', () => {
  it('should be able to list all available cars', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const cars = await sut.execute()
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const cars = await sut.execute(car.brand)
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const cars = await sut.execute(car.name)
    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const { sut, carRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const cars = await sut.execute(car.category_id)
    expect(cars).toEqual([car])
  })

  it('should return null if no available cars were found', async () => {
    const { sut, carRepositorySpy } = makeSut()
    await carRepositorySpy.create({ ...makeCar(), available: false })
    const cars = await sut.execute()
    expect(cars).toEqual([])
  })
})
