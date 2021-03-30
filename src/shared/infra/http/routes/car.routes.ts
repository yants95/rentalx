
import { CreateCarController }  from '@/modules/cars/usecases'

import { Router } from 'express'

const carRouter = Router()

const createCarController = new CreateCarController()

carRouter.post('/', createCarController.handle);

export { carRouter }