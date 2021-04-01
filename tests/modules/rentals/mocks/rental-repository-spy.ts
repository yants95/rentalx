import { IRentalRepository } from "@/modules/rentals/repositories";
import { ICreateRentDTO } from "@/modules/rentals/dtos";
import { Rental } from "@/modules/rentals/infra/typeorm/entities";

export class RentalRepositorySpy implements IRentalRepository {
    rentals: Rental[] = []

    async create(data: ICreateRentDTO): Promise<Rental> {
        const rental = new Rental()
        Object.assign(rental, { ...data, start_date: new Date('2021-01-04') })
        this.rentals.push(rental)
        return rental
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
    }
}