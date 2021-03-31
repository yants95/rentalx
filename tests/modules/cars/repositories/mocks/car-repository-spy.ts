import { ICarRepository } from "@/modules/cars/repositories";
import { ICreateCarDTO } from "@/modules/cars/dtos";
import { Car } from "@/modules/cars/infra/typeorm/entities"

export class CarRepositorySpy implements ICarRepository {
    cars: Car[] = []

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, { ...data })

        this.cars.push(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }
}