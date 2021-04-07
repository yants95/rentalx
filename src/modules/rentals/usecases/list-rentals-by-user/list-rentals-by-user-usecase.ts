import { IRentalRepository } from "@/modules/rentals/repositories";
import { Rental } from "@/modules/rentals/infra/typeorm/entities";

import { injectable, inject } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCase {
  constructor (
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository
  ) {}

  async execute (user_id: string): Promise<Rental[]> {
    return await this.rentalRepository.findByUser(user_id)
  }
}