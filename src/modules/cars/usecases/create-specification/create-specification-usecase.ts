import { ISpecificationRepository } from '@/modules/cars/repositories'

interface IRequest {
    name: string
    description: string
}

export class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute({ description, name }: IRequest): void {
        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!');
        }

        this.specificationRepository.create({ name, description });
    } 
}