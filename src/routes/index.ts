import { categoryRouter } from './category.routes'
import { specificationRouter } from './specification.routes'

import { Router } from 'express'

const router = Router()

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)

export { router }