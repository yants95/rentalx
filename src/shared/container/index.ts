import { 
    ICategoryRepository, 
    CategoryRepository, 
    ISpecificationRepository, 
    SpecificationRepository } 
from '@/modules/cars/repositories'

import { container } from 'tsyringe'

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)