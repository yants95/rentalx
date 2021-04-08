export const categoryImportPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ["Category"],
    summary: "Upload a new category",
    description: "Upload a new category",
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            $ref: '#/schemas/categoryImport'
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