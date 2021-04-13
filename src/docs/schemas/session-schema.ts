export const sessionSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    email: 'your@mail.com',
    password: 'your_password'
  }
}
