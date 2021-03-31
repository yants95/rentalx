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

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (brand) carsQuery.andWhere('c.brand = :brand', { brand })
        if (category_id) carsQuery.andWhere('c.category_id = :category_id', { category_id })
        if (name) carsQuery.andWhere('c.name = :name', { name })

        return await carsQuery.getMany();
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id)
    }
}