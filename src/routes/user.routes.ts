
import { CreateUserController }  from '@/modules/accounts/usecases'

import { Router } from 'express'
import multer from 'multer'

const userRouter = Router()

const createUserController = new CreateUserController()

userRouter.post('/', createUserController.handle);

export { userRouter }