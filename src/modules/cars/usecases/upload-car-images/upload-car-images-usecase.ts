import { ICarImagesRepository } from "@/modules/cars/repositories";
import { IStorageProvider } from "@/shared/container/providers";

import { inject, injectable } from 'tsyringe'
@injectable()
export class UploadCarImagesUseCase {
  constructor (
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(car_id: string, images_name: string[]): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image)
      await this.storageProvider.save(image, "cars")
    })
  }
}