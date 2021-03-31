
import { CreateCarController, ListAvailableCarsController, CreateCarSpecificationController }  from '@/modules/cars/usecases'
import { ensureAuthenticate, ensureAdmin } from '@/shared/infra/http/middlewares';

import { Router } from 'express'

const carRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);
carRouter.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle);
carRouter.get('/available', listAvailableCarsController.handle);

export { carRouter }