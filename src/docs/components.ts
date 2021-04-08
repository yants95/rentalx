import { securitySchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: securitySchema
  }
}