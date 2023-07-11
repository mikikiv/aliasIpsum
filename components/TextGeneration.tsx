import {
  Box,
  Button,
  Card,
  CopyButton,
  Grid,
  Select,
  SimpleGrid,
  Title,
  Tooltip,
} from "@mantine/core"
import React, { useState } from "react"
import { PlaceText } from "../utils/transformer"

interface Props {
  extension?: boolean,
  defaultOptions: {
    label: string
    textElement: string
    count: number
    depth?: number
  }[]
}

export default function CopyGroupCard({ defaultOptions }: Props) {
  const [theme, setTheme] = useState("lorem")
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
          depth: option.depth,
          theme: theme,
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
      <Grid>
        <Grid.Col span={7}>
          <Title size={"xs"} p={"sm"}>
            Text Generation
          </Title>
        </Grid.Col>

        <Grid.Col span={5}>
          <Select
            width={"10%"}
            label="Theme"
            placeholder="Select theme"
            data={[
              { value: "lorem", label: "Lorem Ipsum" },
              { value: "pirateLorem", label: "Pirate Ipsum" },
              { value: "dogLorem", label: "Doge Ipsum" },
              { value: "catLorem", label: "Cat Ipsum" },
              { value: "hungryLorem", label: "Cupcake Ipsum" },
              { value: "videoGameLorem", label: "Video Game Ipsum" },
            ]}
            defaultValue={theme}
            onChange={(value) => setTheme(value as string)}
            pb={16}
          />
        </Grid.Col>
      </Grid>
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
      case "paragraphs":
        return "indigo"
      case "words":
        return "red"
      case "json":
        return "orange"
      case "array":
        return "yellow"
      default:
        return "black"
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
          style={{ lineBreak: "anywhere" }}
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
