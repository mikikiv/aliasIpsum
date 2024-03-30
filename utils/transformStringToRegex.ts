export function stringToRegex(pattern: string): RegExp {
  try {
    // Attempt to create RegExp object with the pattern
    return new RegExp(pattern, "g") // 'g' flag for global search and replace
  } catch (error) {
    return new RegExp("") // Return an empty RegExp object if there's an error
  }
}

export function performReplacement(
  regex: RegExp,
  replacement: string,
  testString: string
): string {
  try {
    // Perform regular replacement
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
    console.error("Error in performReplacement:", error)
    throw error // Throw the error if there's an issue performing the replacement
  }
}
