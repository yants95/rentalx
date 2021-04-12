export * from './date-provider'
export * from './mail-provider'
export * from './storage-provider'

import { IDateProvider, IMailProvider, IStorageProvider } from '@/shared/container/providers'
import { DayJSProvider, EtherealMailProvider, LocalStorageProvider, S3StorageProvider } from '@/shared/container/providers'

import { container } from 'tsyringe'

container.registerSingleton<IDateProvider>(
  'DayJSProvider',
  DayJSProvider
)

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)