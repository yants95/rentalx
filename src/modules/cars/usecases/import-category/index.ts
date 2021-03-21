import { CategoryRepository } from '@/modules/cars/repositories/implementations'
import { ImportCategoryController } from './import-category-controller'
import { ImportCategoryUseCase } from './import-category-usecase'

const categoryRepository = CategoryRepository.getInstance()
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository)
const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export { importCategoryController }