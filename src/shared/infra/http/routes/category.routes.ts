import { CreateCategoryController, ListCategoryController, ImportCategoryController } from '@/modules/cars/usecases'
import { ensureAuthenticate } from '@/shared/infra/http/middlewares'

import { Router } from 'express'
import multer from 'multer'

const categoryRouter = Router()
const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoryController()

categoryRouter.post('/', ensureAuthenticate, createCategoryController.handle)
categoryRouter.get('/', ensureAuthenticate, listCategoryController.handle)
categoryRouter.post('/import', ensureAuthenticate, upload.single('file'), importCategoryController.handle)

export { categoryRouter }
