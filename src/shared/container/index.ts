import { ICategoryRepository, CategoryRepository } from '@/modules/cars/repositories'

import { container } from 'tsyringe'

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)