export function regexReplacer(
  pattern: string,
  replacement: string,
  testString: string
) {
  try {
    // Handle special case where dollar sign should not be removed
    if (pattern === "$" && replacement === "") {
      // Replace '$' only if it's followed by a digit or comma
      return testString.replace(/\$(?=\d|,)/g, "")
    }

    // For other patterns and replacements, perform regular replacement
    const regex = new RegExp(pattern, "g") // 'g' flag for global search and replace
    const replacedString = testString.replace(regex, replacement)

    // If the replacement pattern contains special characters that should be escaped, do so
    const escapedReplacement = replacement.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )

    // If the replacement string contains special characters that might interfere with regex replacement,
    // escape them using $1, $2, etc.
    return replacedString.replace(
      new RegExp(escapedReplacement, "g"),
      replacement
    )
  } catch (error) {
    console.error("Error in regexReplacer:", error)
    return testString // Return the original string if there's an error with the regex
  }
}
