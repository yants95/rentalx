import "reflect-metadata"

import { CreateCategoryUseCase } from "@/modules/cars/usecases/create-category/create-category-usecase"
import { CategoryRepositorySpy } from "@/tests/modules/cars/repositories/mocks"
import { AppError } from "@/errors"

type SutTypes = {
    sut: CreateCategoryUseCase
    categoryRepositorySpy: CategoryRepositorySpy
}

const makeSut = (): SutTypes => {
    const categoryRepositorySpy = new CategoryRepositorySpy()
    const sut = new CreateCategoryUseCase(categoryRepositorySpy)
    return {
      sut,
      categoryRepositorySpy
    }
}

describe('CreateCategoryUseCase', () => {
    it('should be able to create a new category', async () => {
        const { sut, categoryRepositorySpy } = makeSut()

        const category = {
            name: 'any_name',
            description: 'any_description'
        }

        await sut.execute({ 
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoryRepositorySpy.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id')
    })

    it('should not be able to create a new category with name already exists', async () => {
        const { sut } = makeSut()

        expect(async () => {
            const category = {
                name: 'any_name',
                description: 'any_description'
            }
    
            await sut.execute({ 
                name: category.name,
                description: category.description
            })
    
            await sut.execute({ 
                name: category.name,
                description: category.description
            }) 
        }).rejects.toBeInstanceOf(AppError)
    })
})