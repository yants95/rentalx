import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCarImagesUseCase } from './delete-car-images-usecase'

export class DeleteCarImagesController {
  async handle (request: Request, _: Response): Promise<void> {
    const { car_id } = request.params
    const { images_name } = request.body
    const deleteCarImagesUseCase = container.resolve(DeleteCarImagesUseCase)
    await deleteCarImagesUseCase.execute(car_id, images_name)
  }
}
