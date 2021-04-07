
import { CreateRentalController, DevolutionRentalController, ListRentalsByUserController } from '@/modules/rentals/usecases'
import { ensureAuthenticate } from '@/shared/infra/http/middlewares';

import { Router } from 'express'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticate, createRentalController.handle);
rentalRoutes.post('/devolution/:rental_id', ensureAuthenticate, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticate, listRentalsByUserController.handle);

export { rentalRoutes }