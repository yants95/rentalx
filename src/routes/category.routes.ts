
import createCategoryController  from '@/modules/cars/usecases/create-category'
import { listCategoryController } from '@/modules/cars/usecases/list-categories'
import { importCategoryController } from '@/modules/cars/usecases/import-category/'

import { Router } from 'express'
import multer from 'multer'

const categoryRouter = Router()
const upload = multer({
    dest: './tmp'
})

categoryRouter.post('/', (request, response) => {
    return createCategoryController().handle(request, response);
})

categoryRouter.get('/', (request, response) => {
    return listCategoryController.handle(request, response);
})

categoryRouter.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
})

export { categoryRouter }