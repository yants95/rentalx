import { categoryRouter } from './category.routes'
import { specificationRouter } from './specification.routes'
import { userRouter } from './user.routes'
import { authenticateRouter } from './auth.routes'
import { carRouter } from './car.routes'
import { rentalRoutes } from './rental.routes'

import { Router } from 'express'

const router = Router()

router.use('/categories', categoryRouter)
router.use('/specifications', specificationRouter)
router.use('/users', userRouter)
router.use('/cars', carRouter)
router.use('/rentals', rentalRoutes)
router.use(authenticateRouter)

export { router }