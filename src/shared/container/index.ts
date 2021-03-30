import { CategoryRepository, SpecificationRepository, CarRepository } from '@/modules/cars/infra/typeorm/repositories'
import { IUserRepository, UserRepository } from '@/modules/accounts/repositories'
import { ICarRepository, ICategoryRepository, ISpecificationRepository } from '@/modules/cars/repositories'

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

container.registerSingleton<ICarRepository>(
    'CarRepository',
    CarRepository
)