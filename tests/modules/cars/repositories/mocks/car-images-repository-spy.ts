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

  async findImageByCarId (car_id: string): Promise<CarImage> {
    return this.carImages.find(carImage => carImage.car_id === car_id)
  }

  async deleteCarImage (image_id: string): Promise<void> {
    const deleteImage = this.carImages.find(car => car.id === image_id)
    this.carImages.splice(this.carImages.indexOf(deleteImage))
  }
}
