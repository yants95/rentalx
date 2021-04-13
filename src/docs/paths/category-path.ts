export const categoryPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Category'],
    summary: 'Create a category',
    description: 'Create a new category',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/category'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Created'
      },
      500: {
        description: 'Internal server error'
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Category'],
    summary: 'List all categories',
    description: 'List all categories',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  created_at: {
                    type: 'date'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
