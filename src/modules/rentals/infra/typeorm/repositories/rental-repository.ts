import { ICreateRentDTO } from '@/modules/rentals/dtos'
import { Rental } from "@/modules/rentals/infra/typeorm/entities";
import { IRentalRepository } from "@/modules/rentals/repositories";

import { getRepository, Repository } from "typeorm";

export class RentalRepository implements IRentalRepository {
    private repository: Repository<Rental>

    constructor () {
        this.repository = getRepository(Rental)
    }

    async create(data: ICreateRentDTO): Promise<Rental> {
        const rental = this.repository.create(data)
        return await this.repository.save(rental)
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ car_id })
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({ user_id })
    }
}