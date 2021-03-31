import { ICreateSpecificationDTO, ISpecificationRepository } from "@/modules/cars/repositories";
import { Specification } from "@/modules/cars/infra/typeorm/entities";

export class SpecificationRepositorySpy implements ISpecificationRepository {
    specifications: Specification[] = []

    async create(data: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, { ...data })
        this.specifications.push(specification)
        return specification
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(specification => ids.includes(String(specification.id)))
    }
}