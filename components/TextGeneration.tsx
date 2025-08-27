import { Button, Card, Grid, Select, SimpleGrid, Title } from "@mantine/core"
import React, { useState } from "react"
import { useAtom } from "jotai"
import { localCopyHistoryAtom } from "./global/CopyHistory"
import { colorSelector } from "@/utils/colorSelector"
import { CopyComponent } from "@/components/global/CopyComponent"
import { TextTransformer, ValidTheme } from "@/utils/transformer"

interface Props {
  extension?: boolean
  defaultOptions: {
    label: string
    textElement: string
    count: number
    depth?: number
  }[]
}

export default function CopyGroupCard({ defaultOptions }: Props) {
  const [theme, setTheme] = useState<ValidTheme>("lorem")
  const themeOptions = TextTransformer.getThemeDisplayNames()
  const groupedOptions = defaultOptions.reduce((acc, option) => {
    const textTransformer = new TextTransformer()
    const key = option.textElement
    const copyButton = (
      <CopyComponent
        key={option.label}
        label={option.label}
        type={option.textElement}
        value={textTransformer.placeText({
          textElement: option.textElement,
          count: option.count,
          depth: option.depth,
          theme: theme,
        })}
        fullWidth
        h={80}
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
            data={themeOptions}
            defaultValue={theme}
            onChange={(value) => setTheme(value as ValidTheme)}
            pb={16}
            withinPortal
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
