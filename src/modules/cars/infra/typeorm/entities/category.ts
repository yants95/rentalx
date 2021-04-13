import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
@Entity('categories')
export class Category {
  @PrimaryColumn()
  id?: String

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
