import { Specification } from "@/modules/cars/infra/typeorm/entities";
import { ISpecificationRepository, ICreateSpecificationDTO } from "@/modules/cars/repositories";

import { getRepository, Repository } from 'typeorm'

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor () {
        this.repository = getRepository(Specification)
    }

    async create(data: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create(data)
        return await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return await this.repository.findOne({ name })
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.repository.findByIds(ids)
    }
}

export { SpecificationRepository }