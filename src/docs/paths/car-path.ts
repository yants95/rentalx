export const carPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Cars'],
    summary: 'Create a car',
    description: 'Create a new car',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/car'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Created'
      },
      400: {
        description: 'Car already exists'
      },
      500: {
        description: 'Internal server error'
      }
    }
  }
}
