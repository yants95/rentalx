import { Rental } from '@/modules/rentals/infra/typeorm/entities'
import { ICreateRentDTO } from '@/modules/rentals/dtos';

export interface IRentalRepository {
    create(data: ICreateRentDTO): Promise<Rental>
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
}