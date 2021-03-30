import { ICreateCategoryDTO, ICategoryRepository } from '@/modules/cars/repositories'
import { Category } from '@/modules/cars/infra/typeorm/entities'

import { getRepository, Repository } from 'typeorm'

export class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>

    constructor() {
        this.repository = getRepository(Category)
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        })

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        return await this.repository.find()
    }

    async findByName(name: string): Promise<Category> {
        return await this.repository.findOne({ name })
    }
}