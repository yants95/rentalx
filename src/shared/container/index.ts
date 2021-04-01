import { CategoryRepository, SpecificationRepository, CarRepository, CarImagesRepository } from '@/modules/cars/infra/typeorm/repositories'
import { IUserRepository, UserRepository } from '@/modules/accounts/repositories'
import { ICarRepository, ISpecificationRepository, ICategoryRepository, ICarImagesRepository } from '@/modules/cars/repositories'

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

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository
)