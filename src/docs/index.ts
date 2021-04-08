import paths from './paths'
import schemas from './schemas'

export default {
  openapi: "3.0.0",
  info: {
    title: "RentX Documentation",
    description: "This is an API Rent",
    version: "1.0.0",
    contact: {
      name: "Yan Soares",
      email: "yts.1995@gmail.com"
    }
  },
  paths,
  schemas
}