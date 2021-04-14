import { ICarImagesRepository } from '@/modules/cars/repositories'
import { CarImage } from '@/modules/cars/infra/typeorm/entities'

export class CarImagesRepositorySpy implements ICarImagesRepository {
  carImages: CarImage[] = []

  async create (car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage()
    Object.assign(carImage, { car_id, image_name })
    this.carImages.push(carImage)
    return carImage
  }
}
