import { categoryRouter } from './category.routes'
import { specificationRouter } from './specification.routes'
import { userRouter } from './user.routes'

import { Router } from 'express'

const router = Router()

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)
router.use('/users', userRouter)

export { router }