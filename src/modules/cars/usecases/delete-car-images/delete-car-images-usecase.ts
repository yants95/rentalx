import { ICarImagesRepository, ICarRepository } from '@/modules/cars/repositories'
import { IStorageProvider } from '@/shared/container/providers'
import { AppError } from '@/shared/errors'

import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteCarImagesUseCase {
  constructor (
    @inject('CarRepository')
    private readonly carRepository: ICarRepository,
    @inject('CarImagesRepository')
    private readonly carImagesRepository: ICarImagesRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute (car_id: string, images_name: string[]): Promise<void> {
    const carImage = await this.carImagesRepository.findImageByCarId(car_id)
    if (!carImage) throw new AppError('Image not found.')

    images_name.map(async image => await this.storageProvider.delete(image, 'cars'))
  }
}
