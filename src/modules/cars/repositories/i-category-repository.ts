import { Category } from "@/modules/cars/entities/category";

export interface ICreateCategoryDTO {
    name: string
    description: string
}

export interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): void
    findByName(name: string): Category
    list(): Category[]
}