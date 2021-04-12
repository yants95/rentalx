import 'reflect-metadata'
import "dotenv/config"
import 'module-alias/register'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'

import { router } from '@/shared/infra/http/routes'
import apiDocs from '@/docs'

import '@/shared/infra/typeorm';
import '@/shared/container'

import { AppError } from '@/shared/errors';

import swaggerUi from 'swagger-ui-express'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs))
app.use(router)

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3333, () => console.log('Server is running!'));