
import { CreateUserController, UpdateUserAvatarController }  from '@/modules/accounts/usecases'
import uploadConfig from '@/config/upload'
import { ensureAuthenticate } from '@/middlewares'

import { Router } from 'express'
import multer from 'multer'

const userRouter = Router()
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

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