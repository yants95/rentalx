import { ICreateCarDTO } from "@/modules/cars/dtos";
import { ICarRepository } from "@/modules/cars/repositories";

export class CarRepository implements ICarRepository {
    create(data: ICreateCarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}