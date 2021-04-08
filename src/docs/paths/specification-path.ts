export const specificationPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ["Specifications"],
    summary: "Create a specification",
    description: "Create a new specification",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/specification"
          }
        }
      }
    },
    responses: {
      201: {
        description: "Created"
      },
      500: {
        description: "Specification already exists"
      }
    }
  }
}