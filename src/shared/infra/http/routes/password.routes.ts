
import { SendForgotPasswordMailController, ResetPasswordController }  from '@/modules/accounts/usecases'

import { Router } from 'express'

const passwordRouter = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordController.handle);

export { passwordRouter }
