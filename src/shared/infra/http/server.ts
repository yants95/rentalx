import "reflect-metadata"
import "dotenv/config"
import "module-alias/register"
import "express-async-errors"

import { router } from "@/shared/infra/http/routes"
import apiDocs from "@/docs"
import upload from "@/config/upload"

import "@/shared/infra/typeorm";
import "@/shared/container"

import { AppError } from "@/shared/errors";
import { rateLimiter } from "@/shared/infra/http/middlewares"

import swaggerUi from "swagger-ui-express"
import express, { NextFunction, Request, Response } from "express"
// import * as Sentry from "@sentry/node"
// import * as Tracing from "@sentry/tracing"

const app = express()

app.use(rateLimiter)

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Express({ app })
//   ],
//   tracesSampleRate: 1.0
// })

// app.use(Sentry.Handlers.requestHandler())
// app.use(Sentry.Handlers.tracingHandler())

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs))

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/car', express.static(`${upload.tmpFolder}/cars`))

app.use(router)

// app.use(Sentry.Handlers.errorHandler())

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