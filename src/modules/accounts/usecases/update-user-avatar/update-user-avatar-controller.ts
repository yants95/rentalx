import { UpdateUserAvatarUseCase } from '@/modules/accounts/usecases'

import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user
        const avatar_file = request.file.filename

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
        const userUpdated = await updateUserAvatarUseCase.execute(id, avatar_file)
        
        return response.status(200).json(userUpdated)
    }
}