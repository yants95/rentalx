import { CategoryRepository } from "@/modules/cars/repositories/implementations";
import { CreateCategoryController } from "@/modules/cars/usecases/create-category/create-category-controller";
import { CreateCategoryUseCase } from '@/modules/cars/usecases/create-category/create-category-usecase'

export default (): CreateCategoryController => {
    const createCategoryRepository = new CategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepository);
    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController
}