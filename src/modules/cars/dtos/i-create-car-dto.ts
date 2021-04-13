import { Specification } from '@/modules/cars/infra/typeorm/entities'

export type ICreateCarDTO = {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
  available: boolean
  specifications?: Specification[]
  id?: string
}
