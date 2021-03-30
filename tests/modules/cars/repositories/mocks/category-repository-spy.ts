import { Category } from '@/modules/cars/infra/typeorm/entities';
import { ICategoryRepository, ICreateCategoryDTO } from "@/modules/cars/repositories";

export class CategoryRepositorySpy implements ICategoryRepository {
    categories: Category[] = []

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()

        Object.assign(category, { name, description })

        this.categories.push(category)
    }

    async findByName(name: string): Promise<Category> {
        return await this.categories.find(category => category.name === name)
    }

    async list(): Promise<Category[]> {
        return await this.categories
    }
    
}