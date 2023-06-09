/**
 * Options for the text generator
 * Stored in an array of objects to make the options easier to iterate over and change
 */

export const options = [
  {
    label: "1 Sentence",
    textElement: "sentences",
    count: 1,
  },
  {
    label: "2 Sentences",
    textElement: "sentences",
    count: 2,
  },
  {
    label: "1 Paragraph",
    textElement: "paragraphs",
    count: 1,
  },
  {
    label: "2 Paragraphs",
    textElement: "paragraphs",
    count: 2,
  },
  {
    label: "Simple JSON",
    textElement: "json",
    count: 5,
    depth: 1,
  },
  {
    label: "Deep JSON",
    textElement: "json",
    count: 5,
    depth: 3,
  },
  {
    label: "Array",
    textElement: "array",
    count: 8,
  },
  {
    label: "List",
    textElement: "list",
    count: 8,
  },
]
