import {
  lorem,
  pirateLorem,
  dogLorem,
  catLorem,
  hungryLorem,
  videoGameLorem,
} from "./data/lorem"

interface Composition {
  textElement: string
  count: number
  depth?: number
  theme?: string
}

interface RepeatingJson {
  [key: string]: string | RepeatingJson
}

/**
 * This function returns the themed version of the data type requested
 * @param textElement - the type of text to be generated
 * @param count - the number of text elements to be generated
 * @param depth - optional - used for the json type
 * @param theme - the theme of the text to be generated
 * @returns string of requested type in selected theme
 */

export const PlaceText = ({
  textElement,
  count,
  depth,
  theme,
}: Composition) => {
  theme === undefined && (theme = "lorem")

  switch (theme) {
    case "lorem":
      return handleText(textElement, count, depth, lorem)

    case "pirateLorem":
      return handleText(textElement, count, depth, pirateLorem)

    case "dogLorem":
      return handleText(textElement, count, depth, dogLorem)

    case "catLorem":
      return handleText(textElement, count, depth, catLorem)

    case "hungryLorem":
      return handleText(textElement, count, depth, hungryLorem)

    case "videoGameLorem":
      return handleText(textElement, count, depth, videoGameLorem)

    default:
      return handleText(textElement, count, depth, "lorem")
  }
}

/**
 * This function transforms a paragraph of text into the requested type
 * @param textElement - the type of text to be generated
 * @param count - the number of text elements to be generated
 * @param depth - optional - used for the json type
 * @param inputText - the text to be transformed
 * @returns string of requested type
 */

function handleText(
  textElement: string,
  count: number,
  depth: number | undefined,
  inputText: string
) {
  switch (textElement) {
    case "words":
      return makeWords(count, inputText)

    case "sentences":
      return makeSentences(count, inputText)

    case "paragraphs":
      return makeParagraphs(count, inputText)

    case "array":
      return makeArray(count, inputText)

    case "list":
      return makeList(count, inputText)

    case "json":
      if (depth !== undefined) {
        return makeJson(count, depth, inputText)
      } else {
        console.error("Depth is undefined in json type")
        return "Depth is undefined in json type"
      }

    default:
      return "I'm not sure what you want me to do"
  }
}

// These functions split each word in the text to transform it into the requested type

function makeWords(count: number, inputText: string) {
  return inputText.split(" ", count).join(" ")
}

function makeSentences(count: number, inputText: string) {
  return inputText.split(/(?<=[.!?])\s+/, count).join(" ")
}

function makeParagraphs(count: number, inputText: string) {
  return inputText.split("\n\n", count).join("\n\n")
}

function makeArray(count: number, inputText: string) {
  const text = inputText.split(/\W+/, count)
  return JSON.stringify(text).replaceAll(".", " ")
}

function makeList(count: number, inputText: string) {
  return inputText.split(/\W+/, count).join(", ").replaceAll(".", "")
}

/**
 * This function transforms a bunch of single words into a json object.
 * Each word is a key and the value is another json object with the next word as the key
 * until the depth is reached at which point just a string should be returned
 * @param count - number of objects within the json arry
 * @param depth - the number of layers deep each count should go
 * @param inputText - the text of the json object
 * @returns - string in the shape of a json object
 */
function makeJson(count: number, depth: number, inputText: string) {
  const text = inputText.split(/\W+/, count * depth * 2)
  const json: RepeatingJson = {}
  let position = 0

  for (let i = 0; i < count; i++) {
    let current = json
    for (let j = 0; j < depth; j++) {
      if (j === depth - 1) {
        current[text[position]] = text[position + 1]
        position++
      } else {
        current[text[position]] = {}
        current = current[text[position]] as RepeatingJson
        position++
      }
    }
    position++
  }

  return JSON.stringify(json)
}
