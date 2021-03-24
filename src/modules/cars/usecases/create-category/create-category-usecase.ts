import { ICategoryRepository } from '@/modules/cars/repositories'
import { AppError } from "@/errors"

import { inject, injectable } from 'tsyringe'
interface IRequest {
    name: string
    description: string
}
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(name);

        if (categoryAlreadyExists) throw new AppError('Category already exists!');

        this.categoryRepository.create({ name, description });
    } 
}

export { CreateCategoryUseCase }