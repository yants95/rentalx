
import { CreateCategoryController }  from '@/modules/cars/usecases/create-category/create-category-controller'
import { ListCategoryController } from '@/modules/cars/usecases/list-categories/list-category-controller'
import { ImportCategoryController } from '@/modules/cars/usecases/import-category/import-category-controller'

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