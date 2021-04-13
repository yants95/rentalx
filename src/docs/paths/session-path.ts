export const sessionPath = {
  post: {
    tags: ['Sessions'],
    summary: 'User authentication',
    description: 'Create a new session',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/session'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success'
      },
      400: {
        description: 'Email or password incorrect'
      }
    }
  }
}
