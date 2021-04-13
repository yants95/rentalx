export const carSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    daily_rate: {
      type: 'numeric'
    },
    license_rate: {
      type: 'string'
    },
    fine_amount: {
      type: 'numeric'
    },
    brand: {
      type: 'string'
    },
    category_id: {
      type: 'string'
    }
  },
  example: {
    name: 'Create a new name',
    description: 'Create a new description',
    daily_rate: 'Create a new daily_rate',
    license_rate: 'Create a new license_rate',
    fine_amount: 'Create a new fine_amount',
    brand: 'Create a new brand',
    category_id: 'Create a new category_id'
  }
}
