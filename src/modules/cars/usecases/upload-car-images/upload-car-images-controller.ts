import { UploadCarImagesUseCase } from "@/modules/cars/usecases";

import { Request, Response } from "express";
import { container } from "tsyringe";

type IFiles = {
    filename: string
}

export class UploadCarImagesUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const images = request.files as IFiles[]
        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

        const images_name = images.map(file => file.filename)
        const carImages = await uploadCarImageUseCase.execute(id, images_name)
        
        return response.json(carImages)
    }
}