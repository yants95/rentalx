import { Specification } from "@/modules/cars/infra/typeorm/entities/specification";

export interface ICreateSpecificationDTO {
    name: string
    description: string
}

export interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
    findByName(name: string): Promise<Specification>
}