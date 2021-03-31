
import { CreateCarController }  from '@/modules/cars/usecases'

import { Router } from 'express'
import { ensureAuthenticate } from '../middlewares';
import { ensureAdmin } from '../middlewares/ensure-admin';

const carRouter = Router()

const createCarController = new CreateCarController()

carRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle);

export { carRouter }