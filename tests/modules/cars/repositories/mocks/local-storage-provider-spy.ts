import { IStorageProvider } from '@/shared/container/providers'

export class LocalStorageProviderSpy implements IStorageProvider {
  files = []

  async save (file: string, folder: string): Promise<string> {
    const fileExisting = this.files.find(f => f.file === file && f.folder === folder)
    if (fileExisting) this.delete(file, folder)
    this.files.push(file, folder)
    return file
  }

  async delete (file: string, folder: string): Promise<void> {
    const filePosition = this.files.find(f => f.file === file && f.folder === folder)
    this.files.splice(this.files.indexOf(filePosition))
  }
}
