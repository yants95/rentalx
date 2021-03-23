import { Specification } from "@/modules/cars/entities/specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "@/modules/cars/repositories";

import { getRepository, Repository } from 'typeorm'
class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor () {
        this.repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description
        })

        return await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOne({ name })
    }
}

export { SpecificationRepository }