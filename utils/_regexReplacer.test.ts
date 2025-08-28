import { regexReplacer } from "./regexReplacer"

describe("Basic strings", () => {
  test("Basic Replacement", () => {
    expect(regexReplacer("world", "universe", "hello world")).toBe(
      "hello universe"
    )
  })

  test("Regular Expression Test", () => {
    expect(regexReplacer("l+", "X", "hello world")).toBe("heXo worXd")
  })

  test("Empty String Replacement", () => {
    expect(regexReplacer("world", "", "hello world")).toBe("hello ")
  })

  test("No Matches", () => {
    expect(regexReplacer("foo", "bar", "hello world")).toBe("hello world")
  })

  test("Case Sensitivity", () => {
    expect(regexReplacer("W", "X", "hello World")).toBe("hello Xorld")
  })

  test("Replacement with Special Characters", () => {
    expect(regexReplacer("world", "$100", "hello world")).toBe("hello $100")
  })

  test("Multiple Replacements", () => {
    expect(regexReplacer("o", "X", "hello world")).toBe("hellX wXrld")
  })

  test("Long Test String", () => {
    expect(
      regexReplacer("hello", "hi", "hello world, hello universe, hello galaxy")
    ).toBe("hi world, hi universe, hi galaxy")
  })

  test("Empty Inputs", () => {
    expect(regexReplacer("", "", "")).toBe("")
  })
})

describe("Special characters", () => {
  test("Money Test", () => {
    expect(regexReplacer("[$,]", "", "$2,000")).toBe("2000")
  })

  test("Special Characters and texts", () => {
    expect(regexReplacer("\\$2", "", "$2,000")).toBe(",000")
  })

  test("Dollar Sign Replacement", () => {
    expect(regexReplacer("$", "", "$2,000")).toBe("2,000")
  })

  test("Escaping Special Characters in Replacement String", () => {
    expect(regexReplacer("world", "$10", "hello world")).toBe("hello $10")
  })

  test("Regular Expression with Metacharacters", () => {
    expect(regexReplacer(".", "X", "hello world")).toBe("XXXXXXXXXXX")
  })

  test("Regular Expression with Quantifiers", () => {
    expect(regexReplacer("o+", "X", "hello world")).toBe("hellX wXrld")
  })

  test("Regular Expression with Anchors", () => {
    expect(regexReplacer("^hello", "hi", "hello world")).toBe("hi world")
  })

  test("Regular Expression with Character Classes", () => {
    expect(regexReplacer("[aeiou]", "X", "hello world")).toBe("hXllX wXrld")
  })

  test("Regular Expression with Escape Characters", () => {
    expect(regexReplacer("\\$", "", "$100")).toBe("100")
  })

  test("Combination of Special Characters", () => {
    expect(regexReplacer("[aeiou]+", "[X]", "hello world")).toBe(
      "h[X]ll[X] w[X]rld"
    )
  })
  test("incomplete input", () => {
    expect(regexReplacer("[", "", "hello world")).toBe("hello world")
  })
})
