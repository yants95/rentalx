import { CategoryRepository } from "@/modules/cars/repositories/implementations/";
import { ListCategoryController } from "./list-category-controller";
import { ListCategoryUseCase } from "./list-category-usecase";

const listCatgoryRepository = null
const listCategoryUseCase = new ListCategoryUseCase(listCatgoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController }