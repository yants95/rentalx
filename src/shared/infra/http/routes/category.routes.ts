import { CreateCategoryController, ListCategoryController, ImportCategoryController } from '@/modules/cars/usecases'

import { Router } from 'express'
import multer from 'multer'

const categoryRouter = Router()
const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoryController = new ListCategoryController()

categoryRouter.post('/', createCategoryController.handle);
categoryRouter.get('/', listCategoryController.handle);
categoryRouter.post('/import', upload.single('file'), importCategoryController.handle);

export { categoryRouter }