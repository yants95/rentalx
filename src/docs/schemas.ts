import { categorySchema, specificationSchema, categoryImportSchema, securitySchema, sessionSchema, carSchema, carImageSchema } from './schemas/'

export default {
  category: categorySchema,
  specification: specificationSchema,
  categoryImport: categoryImportSchema,
  session: sessionSchema,
  security: securitySchema,
  car: carSchema,
  carImage: carImageSchema
}