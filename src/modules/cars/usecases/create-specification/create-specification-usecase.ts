import { ISpecificationRepository } from '@/modules/cars/repositories'
import { Specification } from '@/modules/cars/infra/typeorm/entities/specification'
import { AppError } from '@/shared/errors'

import { inject, injectable } from 'tsyringe'
interface IRequest {
  name: string
  description: string
}
@injectable()
export class CreateSpecificationUseCase {
  constructor (
    @inject('SpecificationRepository')
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute ({ description, name }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!')
    }

    return await this.specificationRepository.create({ name, description })
  }
}
