
import 'reflect-metadata'

import { CreateUserUseCase } from '@/modules/accounts/usecases'
import { UserRepositorySpy } from '@/tests/modules/accounts/mocks'
import { ICreateUserDTO } from '@/modules/accounts/dtos'
import { AppError } from '@/shared/errors'

type SutTypes = {
  sut: CreateUserUseCase
  userRepositorySpy: UserRepositorySpy
}

const makeSut = (): SutTypes => {
  const userRepositorySpy = new UserRepositorySpy()
  const sut = new CreateUserUseCase(userRepositorySpy)
  return {
    sut,
    userRepositorySpy
  }
}

const makeUser = (): ICreateUserDTO => ({
  driver_license: 'any_driver_license',
  email: 'any_email@mail.com',
  password: 'any_passwprd',
  name: 'any_user'
})

describe('CreateUserUseCase', () => {
  it('should be able to create a new user', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeUser())
    expect(response).toHaveProperty('id')
  })

  it('should not be able to create a new user with email existent', async () => {
    const { sut } = makeSut()
    await sut.execute(makeUser())
    await expect(sut.execute(makeUser())).rejects.toBeInstanceOf(AppError)
  })
})
