
import { CreateCategoryController }  from '@/modules/cars/usecases/create-category/create-category-controller'
import { listCategoryController } from '@/modules/cars/usecases/list-categories'
import { importCategoryController } from '@/modules/cars/usecases/import-category/'

import { Router } from 'express'
import multer from 'multer'

const categoryRouter = Router()
const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()

categoryRouter.post('/', createCategoryController.handle);

categoryRouter.get('/', (request, response) => {
    return listCategoryController.handle(request, response);
})

categoryRouter.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
})

export { categoryRouter }