import { IMailProvider } from '@/shared/container/providers'

export class EtherealMailProviderSpy implements IMailProvider {
  private readonly message: any[] = []

  async sendMail (to: string, subject: string, variables: any, path: string): Promise<void> {
    this.message.push(to, subject, variables, path)
  }
}
