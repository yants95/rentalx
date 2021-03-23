import { CategoryRepository } from "@/modules/cars/repositories/implementations";
import { CreateSpecificationController } from "@/modules/cars/usecases/create-specification/create-specification-controller";
import { CreateSpecificationUseCase } from "@/modules/cars/usecases/create-specification/create-specification-usecase";

const createSpecificationRepository = null
const createSpecificationUseCase = new CreateSpecificationUseCase(createSpecificationRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController }