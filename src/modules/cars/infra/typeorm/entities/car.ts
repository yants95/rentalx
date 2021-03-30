import { Category } from '@/modules/cars/infra/typeorm/entities'

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'
@Entity('cars')
export class Car {
    @PrimaryColumn()
    id: string

    @Column()
    name: string
    
    @Column()
    description: string
    
    @Column()
    daily_rate: number
    
    @Column()
    license_plate: string
    
    @Column()
    fine_amount: number
    
    @Column()
    brand: string
    
    @Column()
    category_id: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category
    
    @Column()
    available: boolean
    
    @CreateDateColumn()
    created_at: Date

    constructor () {
        if (!this.id) {
            this.id = v4()
            this.available = true
        }
    }
}