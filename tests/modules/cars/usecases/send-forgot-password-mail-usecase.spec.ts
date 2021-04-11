import "reflect-metadata"

import { SendForgotPasswordMailUseCase } from "@/modules/accounts/usecases"
import { UserRepositorySpy, UserTokenRepositorySpy } from "@/tests/modules/accounts/mocks"
import { DayJSProvider } from "@/shared/container/providers"
import { EtherealMailProviderSpy } from  "@/tests/shared/container/providers"
import { ICreateUserDTO } from "@/modules/accounts/dtos"
import { AppError } from "@/shared/errors"

type SutTypes = {
  sut: SendForgotPasswordMailUseCase
  userRepositorySpy: UserRepositorySpy
  userTokenRepositorySpy: UserTokenRepositorySpy
  dateProvider: DayJSProvider
  mailProviderSpy: EtherealMailProviderSpy
}

const makeSut = (): SutTypes => {
  const userRepositorySpy =  new UserRepositorySpy()
  const userTokenRepositorySpy = new UserTokenRepositorySpy()
  const dateProvider = new DayJSProvider()
  const mailProviderSpy = new EtherealMailProviderSpy()
  const sut = new SendForgotPasswordMailUseCase(userRepositorySpy, userTokenRepositorySpy, dateProvider, mailProviderSpy)
  return {
    sut,
    userRepositorySpy,
    userTokenRepositorySpy,
    dateProvider,
    mailProviderSpy
  }
}

const makeUser = (): ICreateUserDTO => ({
  driver_license: 'any_driver_license',
  email: 'any_email@mail.com',
  password: 'any_passwprd',
  name: 'any_user'
})

describe('SendForgotPasswordMailUseCase', () => {
  it("should be able to send forgot password mail to user", async () => {
    const { sut, userRepositorySpy, mailProviderSpy } = makeSut()
    await userRepositorySpy.create(makeUser())
    const sendMail = spyOn(mailProviderSpy, "sendMail")
    await sut.execute(makeUser().email)
    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send email if user does not exists", async () => {
    const { sut } = makeSut()
    await expect(sut.execute(makeUser().email)).rejects.toEqual(new AppError("User not found."))
  })

  it("should be able to create an user token", async () => {
    const { sut, userRepositorySpy, userTokenRepositorySpy } = makeSut()
    const userTokenSpy = spyOn(userTokenRepositorySpy, "create")
    await userRepositorySpy.create(makeUser())
    await sut.execute(makeUser().email)
    expect(userTokenSpy).toHaveBeenCalled()
  })
})