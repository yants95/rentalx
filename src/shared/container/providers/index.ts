import { IDateProvider, IMailProvider, IStorageProvider , DayJSProvider, EtherealMailProvider, LocalStorageProvider, S3StorageProvider, SESMailProvider } from '@/shared/container/providers'

import { container } from 'tsyringe'
import { } from './storage-provider'

export * from './date-provider'
export * from './mail-provider'
export * from './storage-provider'

container.registerSingleton<IDateProvider>(
  'DayJSProvider',
  DayJSProvider
)

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)

const storageProvider = {
  local: container.resolve(LocalStorageProvider),
  s3: container.resolve(S3StorageProvider)
}

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  storageProvider[process.env.MAIL_PROVIDER]
)
