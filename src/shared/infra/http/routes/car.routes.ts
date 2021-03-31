
import { CreateCarController, ListAvailableCarsController }  from '@/modules/cars/usecases'

import { Router } from 'express'
import { ensureAuthenticate } from '../middlewares';
import { ensureAdmin } from '../middlewares/ensure-admin';

const carRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()

carRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);
carRouter.get('/available', listAvailableCarsController.handle);

export { carRouter }