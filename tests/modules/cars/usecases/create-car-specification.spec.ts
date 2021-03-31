import "reflect-metadata"

import { CreateCarSpecificationUseCase } from "@/modules/cars/usecases"
import { CarRepositorySpy, SpecificationRepositorySpy } from '@/tests/modules/cars/repositories/mocks'
import { AppError } from "@/shared/errors"
import { ICreateCarDTO } from "@/modules/cars/dtos"
import { ICreateSpecificationDTO } from '@/modules/cars/repositories'

type SutTypes = {
    sut: CreateCarSpecificationUseCase
    carRepositorySpy: CarRepositorySpy
    specificationRepositorySpy: SpecificationRepositorySpy
}

const makeSut = (): SutTypes => {
    const carRepositorySpy = new CarRepositorySpy()
    const specificationRepositorySpy = new SpecificationRepositorySpy()
    const sut = new CreateCarSpecificationUseCase(carRepositorySpy, specificationRepositorySpy)
    return {
      sut,
      carRepositorySpy,
      specificationRepositorySpy
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

const makeSpecification = (): ICreateSpecificationDTO => ({
    name: 'any_name', 
    description: 'any_description'
})

describe('CreateCarSpecificationUseCase', () => { 
    it('should be able to add a new specification to a car', async () => {
        const { sut, carRepositorySpy, specificationRepositorySpy } = makeSut() 
        const specification = await specificationRepositorySpy.create(makeSpecification())
        const car = await carRepositorySpy.create(makeCar())
        const carSpecifications = await sut.execute(car.id, [String(specification.id)])
        expect(carSpecifications).toHaveProperty('specifications')
        expect(carSpecifications.specifications.length).toBe(1)
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