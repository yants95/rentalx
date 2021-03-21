import { ICategoryRepository } from '@/modules/cars/repositories';

import fs from 'fs'
import csvParse from 'csv-parse'

interface IImportCategory {
    name: string
    description: string
}

export class ImportCategoryUseCase {
    constructor(private categoryRepositories: ICategoryRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = []
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            
            stream.pipe(parseFile);
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

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async category => {
            const { name, description } = category;
            const existsCategory = this.categoryRepositories.findByName(name);

            if (!existsCategory) this.categoryRepositories.create({ name, description })
        })
    }
}