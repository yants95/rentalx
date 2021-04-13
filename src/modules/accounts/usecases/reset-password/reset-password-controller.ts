import { ResetPasswordUseCase } from '@/modules/accounts/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ResetPasswordController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase)
    await resetPasswordUseCase.execute(String(token), password)

    return response.send()
  }
}
