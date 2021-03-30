import { ICreateCarDTO } from "@/modules/cars/dtos";
import { ICarRepository } from "@/modules/cars/repositories";
import { Car } from "@/modules/cars/infra/typeorm/entities";

import { getRepository, Repository } from "typeorm";
export class CarRepository implements ICarRepository {
    private repository: Repository<Car>

    constructor () {
        this.repository = getRepository(Car)
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(data)
        return this.repository.save(car)
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate })
    }
}