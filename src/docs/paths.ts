import { categoryPath, specificationPath, categoryImportPath, sessionPath, carPath, carImagePath } from './paths/'

export default {
  '/categories': categoryPath,
  '/specifications': specificationPath,
  '/categories/import': categoryImportPath,
  '/sessions': sessionPath,
  '/cars': carPath,
  '/cars/images/{id}': carImagePath
}