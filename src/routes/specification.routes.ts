import { CreateSpecificationController } from '@/modules/cars/usecases/create-specification/create-specification-controller'

import { Router } from 'express'

const specificationRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRouter.post('/', createSpecificationController.handle)

export { specificationRouter }