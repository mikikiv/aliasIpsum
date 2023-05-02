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
  theme?: string
}

export const PlaceText = ({ textElement, count, theme }: Composition) => {
  theme === undefined && (theme = "lorem")

  switch (theme) {
    case "lorem":
      return handleText(textElement, count, lorem)
      break
    case "pirateLorem":
      return handleText(textElement, count, pirateLorem)
      break
    case "dogLorem":
      return handleText(textElement, count, dogLorem)
      break
    case "catLorem":
      return handleText(textElement, count, catLorem)
      break
    case "hungryLorem":
      return handleText(textElement, count, hungryLorem)
      break
    case "videoGameLorem":
      return handleText(textElement, count, videoGameLorem)
      break
    default:
      return handleText(textElement, count, "lorem")
      break
  }
}

function handleText(textElement: string, count: number, inputText: string) {
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

    default:
      return "I'm not sure what you want me to do"
  }
}

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
