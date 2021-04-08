export const carImagePath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ["Cars"],
    summary: "Upload images",
    description: "Upload images",
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            $ref: '#/schemas/carImage'
          }
        }
      }
    },
    responses: {
      201: {
        description: "Created"
      }
    }
  }
}