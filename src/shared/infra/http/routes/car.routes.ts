
import { CreateCarController, ListAvailableCarsController, CreateCarSpecificationController, UploadCarImagesUseController } from '@/modules/cars/usecases'
import { ensureAuthenticate, ensureAdmin } from '@/shared/infra/http/middlewares'
import uploadConfig from '@/config/upload'

import { Router } from 'express'
import multer from 'multer'

const carRouter = Router()
const upload = multer(uploadConfig)

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesUseController = new UploadCarImagesUseController()

carRouter.post('/', ensureAuthenticate, ensureAdmin, createCarController.handle)
carRouter.post('/specifications/:id', ensureAuthenticate, ensureAdmin, createCarSpecificationController.handle)
carRouter.post('/images/:id', ensureAuthenticate, ensureAdmin, upload.array('images'), uploadCarImagesUseController.handle)
carRouter.get('/available', ensureAuthenticate, listAvailableCarsController.handle)

export { carRouter }
