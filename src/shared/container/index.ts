import { CategoryRepository, SpecificationRepository, CarRepository, CarImagesRepository } from '@/modules/cars/infra/typeorm/repositories'
import { ICarRepository, ISpecificationRepository, ICategoryRepository, ICarImagesRepository } from '@/modules/cars/repositories'
import { IUserRepository, IUserTokenRepository } from '@/modules/accounts/repositories'
import { UserRepository, UserTokenRepository } from '@/modules/accounts/infra/typeorm/repositories'
import { IRentalRepository } from '@/modules/rentals/repositories'
import { RentalRepository } from '@/modules/rentals/infra/typeorm/repositories'

import '@/shared/container/providers'

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

container.registerSingleton<IRentalRepository>(
  'RentalRepository',
  RentalRepository
)

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
)