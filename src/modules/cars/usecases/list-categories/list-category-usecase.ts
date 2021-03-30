import { Category } from '@/modules/cars/infra/typeorm/entities/category'
import { ICategoryRepository } from '@/modules/cars/repositories'

import { inject, injectable } from 'tsyringe'
@injectable()
export class ListCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        return await this.categoryRepository.list()
    } 
}