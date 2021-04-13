import { User } from '@/modules/accounts/infra/typeorm/entities'

import { v4 as uuidv4 } from 'uuid'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('users_token')
export class UserToken {
  @PrimaryColumn()
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  refresh_token: string

  @Column()
  expires_date: Date

  @CreateDateColumn()
  created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
