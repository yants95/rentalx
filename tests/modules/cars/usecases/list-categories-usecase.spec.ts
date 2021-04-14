import 'reflect-metadata'

import { ListCategoryUseCase } from '@/modules/cars/usecases'
import { CategoryRepositorySpy } from '@/tests/modules/cars/repositories/mocks'

type SutTypes = {
  sut: ListCategoryUseCase
  categoryRepositorySpy: CategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const categoryRepositorySpy = new CategoryRepositorySpy()
  const sut = new ListCategoryUseCase(categoryRepositorySpy)
  return {
    sut,
    categoryRepositorySpy
  }
}

describe('ListCategoriesUseCase', () => {
  it('should be able to list categories', async () => {
    const { sut, categoryRepositorySpy } = makeSut()
    const listCategorySpy = jest.spyOn(categoryRepositorySpy, 'list')
    await sut.execute()
    expect(listCategorySpy).toHaveBeenCalled()
  })
})
