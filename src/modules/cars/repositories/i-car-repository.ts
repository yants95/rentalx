import { ICreateCarDTO } from "@/modules/cars/dtos";
import { Car } from "@/modules/cars/infra/typeorm/entities";

export interface ICarRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
}