export const colorSelector = (textElement: string) => {
  switch (textElement) {
    case "sentences":
      return "teal"
    case "paragraphs":
      return "indigo"
    case "words":
    case "string":
      return "red"
    case "json":
      return "orange"
    case "function":
    case "array":
      return "yellow"
    case "email":
      return "blue"
    case "list":
    case "regex":
      return "lime"
    default:
      return "black"
  }
}
