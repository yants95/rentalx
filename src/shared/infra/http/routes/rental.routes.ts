
import { CreateRentalController } from '@/modules/rentals/usecases'
import { ensureAuthenticate } from '@/shared/infra/http/middlewares';

import { Router } from 'express'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);

export { rentalRoutes }