import 'reflect-metadata'

import { ICreateCarDTO } from '@/modules/cars/dtos'
import { UploadCarImagesUseCase } from '@/modules/cars/usecases'
import { CarImagesRepositorySpy, LocalStorageProviderSpy } from '@/tests/modules/cars/repositories/mocks'

type SutTypes = {
  sut: UploadCarImagesUseCase
  carImagesRepositorySpy: CarImagesRepositorySpy
  storageProviderSpy: LocalStorageProviderSpy
}

const makeSut = (): SutTypes => {
  const carImagesRepositorySpy = new CarImagesRepositorySpy()
  const storageProviderSpy = new LocalStorageProviderSpy()
  const sut = new UploadCarImagesUseCase(carImagesRepositorySpy, storageProviderSpy)
  return {
    sut,
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

describe('UploadCarImagesUsecase', () => {
  it('should be able upload one image to existing car', async () => {
    const { sut, carImagesRepositorySpy } = makeSut()
    const listCategorySpy = jest.spyOn(carImagesRepositorySpy, 'create')
    const car = makeCar()
    await sut.execute(car.id, ['any_image'])
    expect(listCategorySpy).toHaveBeenCalled()
  })

  it('should be able upload multiple images to existing car', async () => {
    const { sut, carImagesRepositorySpy } = makeSut()
    const listCategorySpy = jest.spyOn(carImagesRepositorySpy, 'create')
    const car = makeCar()
    await sut.execute(car.id, ['any_image', 'other_image'])
    expect(listCategorySpy).toHaveBeenCalled()
  })
})
