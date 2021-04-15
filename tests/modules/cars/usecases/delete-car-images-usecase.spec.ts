import 'reflect-metadata'

import { ICreateCarDTO } from '@/modules/cars/dtos'
import { DeleteCarImagesUseCase } from '@/modules/cars/usecases'
import { CarImagesRepositorySpy, CarRepositorySpy, LocalStorageProviderSpy } from '@/tests/modules/cars/repositories/mocks'
import { AppError } from '@/shared/errors'

type SutTypes = {
  sut: DeleteCarImagesUseCase
  carRepositorySpy: CarRepositorySpy
  carImagesRepositorySpy: CarImagesRepositorySpy
  storageProviderSpy: LocalStorageProviderSpy
}

const makeSut = (): SutTypes => {
  const carImagesRepositorySpy = new CarImagesRepositorySpy()
  const carRepositorySpy = new CarRepositorySpy()
  const storageProviderSpy = new LocalStorageProviderSpy()
  const sut = new DeleteCarImagesUseCase(carRepositorySpy, carImagesRepositorySpy, storageProviderSpy)
  return {
    sut,
    carRepositorySpy,
    carImagesRepositorySpy,
    storageProviderSpy
  }
}

const makeCar = (): ICreateCarDTO => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  daily_rate: 1,
  license_plate: 'any_license_plate',
  fine_amount: 1,
  brand: 'any_brand',
  category_id: 'any_category_id',
  available: true
})

describe('DeleteCarImagesUsecase', () => {
  it('should be able delete one existing car image', async () => {
    const { sut, carRepositorySpy, carImagesRepositorySpy } = makeSut()
    const car = await carRepositorySpy.create(makeCar())
    const carImage = await carImagesRepositorySpy.create(car.id, 'any_image')
    const recoverCarImage = await carImagesRepositorySpy.findImageByCarId(carImage.car_id)
    const response = await sut.execute(recoverCarImage.car_id, ['any_image'])
    expect(response).toBeUndefined()
  })

  it('should not be able delete one not existing car image', async () => {
    const { sut, carImagesRepositorySpy, carRepositorySpy } = makeSut()
    await carRepositorySpy.create(makeCar())
    await carImagesRepositorySpy.deleteCarImage('any_image')
    expect(sut.execute('any_id', ['any_image'])).rejects.toBeInstanceOf(new AppError('Car not found.'))
  })
})
