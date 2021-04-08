import { categorySchema, specificationSchema, categoryImportSchema, securitySchema, sessionSchema } from './schemas/'

export default {
  category: categorySchema,
  specification: specificationSchema,
  categoryImport: categoryImportSchema,
  session: sessionSchema,
  security: securitySchema
}