export * from './date-provider'

import { IDateProvider } from '@/shared/container/providers'
import { DayJSProvider } from '@/shared/container/providers/date-provider/implementations'

import { container } from 'tsyringe'

container.registerSingleton<IDateProvider>(
    'DayJSProvider',
    DayJSProvider
)