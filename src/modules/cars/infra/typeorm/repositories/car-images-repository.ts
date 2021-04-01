import { ICarImagesRepository } from '@/modules/cars/repositories'
import { CarImage } from '@/modules/cars/infra/typeorm/entities'

import { getRepository, Repository } from 'typeorm'

export class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImage>

    constructor() {
        this.repository = getRepository(CarImage)
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        })
        return await this.repository.save(carImage)
    }
}