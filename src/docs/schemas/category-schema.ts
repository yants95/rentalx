export const categorySchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    description: {
      type: "string"
    }
  },
  example: {
    name: "category name sample",
    description: "category description sample"
  }
}