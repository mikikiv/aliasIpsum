import { Button, Card, CopyButton, SimpleGrid, Tooltip } from "@mantine/core"
import React from "react"
import { PlaceText } from "../utils/data/lorem"

interface Props {
  defaultOptions: {
    label: string
    textElement: string
    count: number
  }[]
}

export default function CopyGroupCard({ defaultOptions }: Props) {
  const groupedOptions = defaultOptions.reduce((acc, option) => {
    const key = option.textElement
    const copyButton = (
      <CopyButtons
        key={option.label}
        label={option.label}
        textElement={option.textElement}
        text={PlaceText({
          textElement: option.textElement,
          count: option.count,
          type: "lorem",
        })}
      />
    )
    if (acc[key]) {
      acc[key].push(copyButton)
    } else {
      acc[key] = [copyButton]
    }
    return acc
  }, {} as { [key: string]: JSX.Element[] })

  return (
    <Card shadow="sm" padding="md" radius="md">
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {Object.keys(groupedOptions).map((textElement) => (
          <Button.Group orientation="vertical" key={textElement}>
            {groupedOptions[textElement]}
          </Button.Group>
        ))}
      </SimpleGrid>
    </Card>
  )
}

export const CopyButtons = ({
  label,
  textElement,
  text,
}: {
  label: string
  textElement: string
  text: string
}) => {
  const colorScheme: string = (() => {
    switch (textElement) {
      case "sentences":
        return "teal"
        break
      case "paragraphs":
        return "indigo"
        break
      case "words":
        return "red"
        break
      case "array":
        return "yellow"
        break
      default:
        return "black"
        break
    }
  })()

  return (
    <CopyButton value={text}>
      {({ copied, copy }) => (
        <Tooltip
          label={text}
          withinPortal
          multiline
          maw={400}
          transitionProps={{ transition: "fade", duration: 500 }}
          openDelay={100}
          events={{ hover: true, focus: true, touch: false }}
        >
          <Button
            size={"md"}
            h={100}
            color={colorScheme}
            variant={copied ? "light" : "outline"}
            onClick={copy}
          >
            {copied ? `Copied ${label}` : label}
          </Button>
        </Tooltip>
      )}
    </CopyButton>
  )
}
