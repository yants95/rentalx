export const carImageSchema = {
  type: 'object',
  properties: {
    images: {
      type: 'array',
      items: {
        type: 'string',
        format: 'binary'
      }
    }
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Car id',
      required: true,
      type: 'string'
    }
  ]
}
