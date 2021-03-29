import "reflect-metadata"

import { CreateCategoryUseCase } from "@/modules/cars/usecases/create-category/create-category-usecase"
import { CreateCategoryRepositorySpy } from "@/tests/modules/cars/repositories/mocks"
import { AppError } from "@/errors"

type SutTypes = {
    sut: CreateCategoryUseCase
    createCategoryRepositorySpy: CreateCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
    const createCategoryRepositorySpy = new CreateCategoryRepositorySpy()
    const sut = new CreateCategoryUseCase(createCategoryRepositorySpy)
    return {
      sut,
      createCategoryRepositorySpy
    }
}

describe('CreateCategoryUseCase', () => {
    it('should be able to create a new category', async () => {
        const { sut, createCategoryRepositorySpy } = makeSut()

        const category = {
            name: 'any_name',
            description: 'any_description'
        }

        await sut.execute({ 
            name: category.name,
            description: category.description
        })

        const categoryCreated = await createCategoryRepositorySpy.findByName(category.name)

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