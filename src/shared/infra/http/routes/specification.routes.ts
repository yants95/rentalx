import { CreateSpecificationController } from '@/modules/cars/usecases'
import { ensureAuthenticate } from '@/shared/infra/http/middlewares'

import { Router } from 'express'

const specificationRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRouter.post('/', ensureAuthenticate, createSpecificationController.handle)

export { specificationRouter }
