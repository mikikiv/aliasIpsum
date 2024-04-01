import { stringToRegex, performReplacement } from "./transformStringToRegex"

export function regexReplacer(
  pattern: string,
  replacement: string,
  testString: string
): string {
  try {
    // Handle special case where dollar sign should not be removed
    if (pattern === "$" && replacement === "") {
      // Replace '$' only if it's followed by a digit or comma
      return testString.replace(/\$(?=\d|,)/g, "")
    }

    // Transform the pattern string into a regular expression
    const regex = stringToRegex(pattern)

    // Perform the replacement using the regular expression
    return performReplacement(regex, replacement, testString)
  } catch (error) {
    console.error("Error in regexReplacer:", error)
    return testString // Return the original string if there's an error
  }
}
