import { CreateSpecificationController } from '@/modules/cars/usecases'

import { Router } from 'express'

const specificationRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRouter.post('/', createSpecificationController.handle)

export { specificationRouter }