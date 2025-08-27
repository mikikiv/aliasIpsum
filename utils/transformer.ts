// Import all themes dynamically
import * as loremData from "./data/lorem"

// Define the valid theme names as a type based on the actual constants
export type ValidTheme = keyof typeof loremData

// Single source of truth for all themes - dynamically created from imports
const THEMES = loremData as Record<ValidTheme, string>


interface Composition {
  textElement: string
  count: number
  depth?: number
  theme?: ValidTheme
}

interface RepeatingJson {
  [key: string]: string | RepeatingJson
}

export class TextTransformer {
  private themes: Record<ValidTheme, string>

  constructor() {
    this.themes = THEMES
  }

  // Static method to get available theme names
  static getAvailableThemes(): ValidTheme[] {
    return Object.keys(THEMES) as ValidTheme[]
  }

  // Get theme display names for UI
  static getThemeDisplayNames(): { value: ValidTheme; label: string }[] {
    // Generate display names dynamically from theme names
    const generateDisplayName = (theme: string): string => {
      // Convert camelCase to Title Case with spaces
      return theme
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .replace(/Lorem$/, ' Ipsum') // Replace "Lorem" with " Ipsum" at the end
        .trim()
    }
    
    return Object.keys(THEMES).map(theme => ({
      value: theme as ValidTheme,
      label: generateDisplayName(theme)
    }))
  }

  placeText({ textElement, count, depth, theme }: Composition): string {
    const selectedTheme =
      theme && this.themes[theme] ? this.themes[theme] : loremData.lorem

    return this.handleText(textElement, count, depth, selectedTheme)
  }

  private handleText(
    textElement: string,
    count: number,
    depth: number | undefined,
    inputText: string
  ): string {
    switch (textElement) {
      case "words":
        return this.makeWords(count, inputText)
      case "sentences":
        return this.makeSentences(count, inputText)
      case "paragraphs":
        return this.makeParagraphs(count, inputText)
      case "array":
        return this.makeArray(count, inputText)
      case "list":
        return this.makeList(count, inputText)
      case "json":
        if (depth !== undefined) {
          return this.makeJson(count, depth, inputText)
        }
        throw new Error("Need to define json depth")
      default:
        return "I'm not sure what you want me to do"
    }
  }

  private makeWords(count: number, inputText: string) {
    return inputText.split(" ", count).join(" ")
  }

  private makeSentences(count: number, inputText: string) {
    return inputText.split(/(?<=[.!?])\s+/, count).join(" ")
  }

  private makeParagraphs(count: number, inputText: string) {
    return inputText.split("\n\n", count).join("\n\n")
  }

  private makeArray(count: number, inputText: string) {
    const text = inputText.split(/\W+/, count)
    return JSON.stringify(text).replaceAll(".", " ")
  }

  private makeList(count: number, inputText: string) {
    return inputText.split(/\W+/, count).join(", ").replaceAll(".", "")
  }

  private makeJson(count: number, depth: number, inputText: string) {
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
}
