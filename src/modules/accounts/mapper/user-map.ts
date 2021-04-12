import { User } from "@/modules/accounts/infra/typeorm/entities"
import { IUserResponseDTO } from "@/modules/accounts/dtos"

import { classToClass } from "class-transformer"

export class UserMap {
  static toDTO (user: User): IUserResponseDTO {
    return classToClass(user)
  }
}