
import { CreateUserController, UpdateUserAvatarController }  from '@/modules/accounts/usecases'
import { ensureAuthenticate } from '@/shared/infra/http/middlewares'
import uploadConfig from '@/config/upload'

import { Router } from 'express'
import multer from 'multer'

const userRouter = Router()
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

userRouter.post('/', createUserController.handle);
userRouter.patch(
    '/avatar', 
    ensureAuthenticate,
    uploadAvatar.single('avatar'), 
    updateUserAvatarController.handle
);

export { userRouter }