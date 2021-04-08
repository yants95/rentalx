export const categoryImportSchema = {
  type: "object",
  properties: {
    "file": {
      type: "string",
      format: "binary"
    }
  }
}