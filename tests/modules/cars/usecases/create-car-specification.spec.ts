import "reflect-metadata"

import { CreateCarSpecificationUseCase } from "@/modules/cars/usecases"
import { CarRepositorySpy } from '@/tests/modules/cars/repositories/mocks'
import { AppError } from "@/shared/errors"
import { ICreateCarDTO } from "@/modules/cars/dtos"

type SutTypes = {
    sut: CreateCarSpecificationUseCase
    carRepositorySpy: CarRepositorySpy
}

const makeSut = (): SutTypes => {
    const carRepositorySpy = new CarRepositorySpy()
    const sut = new CreateCarSpecificationUseCase(carRepositorySpy)
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

describe('CreateCarSpecificationUseCase', () => { 
    it('should be able to add a new specification to a car', async () => {
        const { sut, carRepositorySpy } = makeSut() 
        const car = await carRepositorySpy.create(makeCar())
        const specifications_id = ['54321']
        await sut.execute(car.id, specifications_id)
    })

    it('should not be able to add a new specification to an non-existing car', async () => {
        expect(async () => {
            const car_id = '123'
            const specifications_id = ['54321']
            const { sut } = makeSut() 
            await sut.execute(car_id, specifications_id)
        }).rejects.toBeInstanceOf(AppError)
    })
})