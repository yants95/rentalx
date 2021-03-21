import { createSpecificationController } from '@/modules/cars/usecases/create-specification'

import { Router } from 'express'

const specificationRouter = Router()

specificationRouter.post('/', (request, response) => {
    return createSpecificationController.handle(request, response);
})

export { specificationRouter }