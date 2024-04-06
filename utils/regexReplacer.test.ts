import { regexReplacer } from "./regexReplacer"

describe("Basic replacement strings", () => {
  test("Basic Replacement", () => {
    expect(
      regexReplacer({
        pattern: "world",
        replacementValue: "universe",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello universe")
  })

  test("Regular Expression Test", () => {
    expect(
      regexReplacer({
        pattern: "l+",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("heXo worXd")
  })

  test("Empty String Replacement", () => {
    expect(
      regexReplacer({
        pattern: "world",
        replacementValue: "",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello ")
  })

  test("No Matches", () => {
    expect(
      regexReplacer({
        pattern: "foo",
        replacementValue: "bar",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello world")
  })

  test("Case Sensitivity", () => {
    expect(
      regexReplacer({
        pattern: "W",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello World",
      })
    ).toBe("hello Xorld")
  })

  test("Replacement with Special Characters", () => {
    expect(
      regexReplacer({
        pattern: "world",
        replacementValue: "$100",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello $100")
  })

  test("Multiple Replacements", () => {
    expect(
      regexReplacer({
        pattern: "o",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hellX wXrld")
  })

  test("Long Test String", () => {
    expect(
      regexReplacer({
        pattern: "hello",
        replacementValue: "hi",
        matchReplace: "replace",
        testString: "hello world, hello universe, hello galaxy",
      })
    ).toBe("hi world, hi universe, hi galaxy")
  })

  test("Empty Inputs", () => {
    expect(
      regexReplacer({
        pattern: "",
        replacementValue: "",
        matchReplace: "replace",
        testString: "",
      })
    ).toBe("")
  })
})

describe("Replace Special characters", () => {
  test("Money Test", () => {
    expect(
      regexReplacer({
        pattern: "[\\$,]",
        matchReplace: "replace",
        testString: "$2,000",
        replacementValue: "",
      })
    ).toBe("2000")
  })

  test("Special Characters and texts", () => {
    expect(
      regexReplacer({
        pattern: "\\$2",
        replacementValue: "",
        matchReplace: "replace",
        testString: "$2,000",
      })
    ).toBe(",000")
  })

  test("Dollar Sign Replacement", () => {
    expect(
      regexReplacer({
        pattern: "\\$",
        replacementValue: "",
        matchReplace: "replace",
        testString: "$2,000",
      })
    ).toBe("2,000")
  })

  test("Escaping Special Characters in Replacement String", () => {
    expect(
      regexReplacer({
        pattern: "world",
        replacementValue: "$10",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello $10")
  })

  test("Regular Expression with Metacharacters", () => {
    expect(
      regexReplacer({
        pattern: ".",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("XXXXXXXXXXX")
  })

  test("Regular Expression with Quantifiers", () => {
    expect(
      regexReplacer({
        pattern: "o+",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hellX wXrld")
  })

  test("Regular Expression with Anchors", () => {
    expect(
      regexReplacer({
        pattern: "^hello",
        replacementValue: "hi",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hi world")
  })

  test("Regular Expression with Character Classes", () => {
    expect(
      regexReplacer({
        pattern: "[aeiou]",
        replacementValue: "X",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hXllX wXrld")
  })

  test("Regular Expression with Escape Characters", () => {
    expect(
      regexReplacer({
        pattern: "\\$",
        replacementValue: "",
        matchReplace: "replace",
        testString: "$100",
      })
    ).toBe("100")
  })

  test("Combination of Special Characters", () => {
    expect(
      regexReplacer({
        pattern: "[aeiou]+",
        replacementValue: "[X]",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("h[X]ll[X] w[X]rld")
  })
  test("incomplete input", () => {
    expect(
      regexReplacer({
        pattern: "[",
        replacementValue: "",
        matchReplace: "replace",
        testString: "hello world",
      })
    ).toBe("hello world")
  })
})

describe("Match string", () => {
  test("Basic match", () => {
    expect(
      regexReplacer({
        pattern: "world",
        matchReplace: "match",
        testString: "hello world",
      })
    ).toBe("world")
  })

  test("Match Money Test ", () => {
    expect(
      regexReplacer({
        pattern: "\\$",
        matchReplace: "match",
        testString: "$2,000",
      })
    ).toBe("$")
  })

  test("Match an array of characters", () => {
    expect(
      regexReplacer({
        pattern: "[aeiou]",
        matchReplace: "match",
        testString: "hello world",
      })
    ).toBe('["e", "o", "o"]')
  })
  test("match incomplete regex input", () => {
    expect(
      regexReplacer({
        pattern: "$[",
        matchReplace: "match",
        testString: "hello $[ world",
      })
    ).toBe("$[")
  })
})
