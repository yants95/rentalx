import { CarImage } from '@/modules/cars/infra/typeorm/entities'
export interface ICarImagesRepository {
  create: (car_id: string, image_name: string) => Promise<CarImage>
  findImageByCarId: (car_id: string) => Promise<CarImage>
  deleteCarImage: (car_id: string, image_name: string) => Promise<void>
}
