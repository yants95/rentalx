export * from './date-provider'
export * from './mail-provider'

import { IDateProvider, IMailProvider } from '@/shared/container/providers'
import { DayJSProvider, EtherealMailProvider } from '@/shared/container/providers'

import { container } from 'tsyringe'

container.registerSingleton<IDateProvider>(
  'DayJSProvider',
  DayJSProvider
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)