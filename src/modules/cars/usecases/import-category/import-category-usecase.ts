import { ICategoryRepository } from '@/modules/cars/repositories'

import fs from 'fs'
import csvParse from 'csv-parse'
import { inject, injectable } from 'tsyringe'
interface IImportCategory {
  name: string
  description: string
}
@injectable()
export class ImportCategoryUseCase {
  constructor (
    @inject('CategoryRepository')
    private readonly categoryRepositories: ICategoryRepository
  ) {}

  async loadCategories (file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []
      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse()

      stream.pipe(parseFile)
      parseFile
        .on('data', async line => {
          const [name, description] = line
          categories.push({
            name,
            description
          })
        })
        .on('end', () => {
          resolve(categories)
          fs.promises.unlink(file.path)
        })
        .on('err', (err) => reject(err))

      return categories
    })
  }

  async execute (file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category
      const existsCategory = await this.categoryRepositories.findByName(name)

      if (!existsCategory) await this.categoryRepositories.create({ name, description })
    })
  }
}
