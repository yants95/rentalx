import { ISpecificationRepository } from '@/modules/cars/repositories'
import { inject, injectable } from 'tsyringe'
interface IRequest {
    name: string
    description: string
}
@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository
    ) {}

    execute({ description, name }: IRequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!');
        }

        this.specificationRepository.create({ name, description });
    } 
}