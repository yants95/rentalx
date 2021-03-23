import { Category } from "@/modules/cars/entities/category";

export interface ICreateCategoryDTO {
    name: string
    description: string
}

export interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>
    findByName(name: string): Promise<Category>
    list(): Promise<Category[]>
}