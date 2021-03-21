import { CategoryRepository } from "@/modules/cars/repositories/implementations";
import { CreateCategoryController } from "@/modules/cars/usecases/create-category/create-category-controller";
import { CreateCategoryUseCase } from '@/modules/cars/usecases/create-category/create-category-usecase'

const createCatgoryRepository = CategoryRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(createCatgoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController, createCategoryUseCase }