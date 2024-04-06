import { stringToRegex, performReplacement } from "./transformStringToRegex"

type Props = {
  pattern: string
  testString: string
} & (TargetProps | ReplacementProps)

type TargetProps = {
  matchReplace: "match"
}

type ReplacementProps = {
  matchReplace: "replace"
  replacementValue: string
}

export function regexReplacer(props: Props) {
  // if the pattern is not a regex, we will just use it as a string
  const pattern: string | RegExp = stringToRegex(props.pattern)

  if (props.matchReplace === "replace" && pattern instanceof RegExp) {
    return performReplacement(pattern, props.replacementValue, props.testString)
  }

  if (props.matchReplace === "match" && pattern instanceof RegExp) {
    if (props.testString.match(pattern)?.length == null) {
      return ""
    }
    if (props.testString.match(pattern)?.length === 1) {
      return props.testString.match(pattern)?.toString()
    }
    return `["${props.testString.match(pattern)?.join('", "')}"]`
  }
  if (props.matchReplace === "replace" && pattern instanceof String) {
    return props.testString.replace(pattern, props.replacementValue)
  }

  if (props.matchReplace === "match" && pattern instanceof String) {
    return props.testString.match(pattern)?.toString()
  }
}
