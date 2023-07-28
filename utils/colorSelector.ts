export const colorSelector = (textElement: string) => {
  switch (textElement) {
    case "sentences":
      return "teal"
    case "paragraphs":
      return "indigo"
    case "words":
      return "red"
    case "json":
      return "orange"
    case "array":
      return "yellow"
    case "email":
      return "blue"
    case "list":
      return "lime"
    default:
      return "black"
  }
}
