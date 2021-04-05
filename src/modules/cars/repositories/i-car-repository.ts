import { ICreateCarDTO } from "@/modules/cars/dtos";
import { Car } from "@/modules/cars/infra/typeorm/entities";
export interface ICarRepository {
    create(data: ICreateCarDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>
    findById(car_id: string): Promise<Car>
    updateAvailable(id: string, available: boolean): Promise<void>
}