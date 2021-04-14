import { Category } from '@/modules/cars/infra/typeorm/entities/category'
import { ICreateCategoryDTO } from '@/modules/cars/dtos'
export interface ICategoryRepository {
  create: ({ name, description }: ICreateCategoryDTO) => Promise<void>
  findByName: (name: string) => Promise<Category>
  list: () => Promise<Category[]>
}
