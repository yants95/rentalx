
import { AuthenticateUserController }  from '@/modules/accounts/usecases'

import { Router } from 'express'

const authenticateRouter = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRouter.post('/sessions', authenticateUserController.handle);

export { authenticateRouter }