import { 
    ICategoryRepository, 
    CategoryRepository, 
    ISpecificationRepository, 
    SpecificationRepository } 
from '@/modules/cars/repositories'

import { IUserRepository, UserRepository } from '@/modules/accounts/repositories'

import { container } from 'tsyringe'

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)