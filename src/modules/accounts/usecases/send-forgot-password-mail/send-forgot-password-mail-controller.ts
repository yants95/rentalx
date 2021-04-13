import { SendForgotPasswordMailUseCase } from '@/modules/accounts/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class SendForgotPasswordMailController {
  async handle (request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordMailUse = container.resolve(SendForgotPasswordMailUseCase)
    await sendForgotPasswordMailUse.execute(request.body.email)
    return response.send()
  }
}
