import { Box, Card, Grid, Input, Text, Tooltip } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import React, { useEffect, useState } from "react"
import { regexReplacer } from "@/utils/regexReplacer"
import { stringToRegex } from "@/utils/transformStringToRegex"
import { CopyComponent } from "@/components/global/CopyComponent"
import { IconAlertCircle, IconRegex } from "@tabler/icons-react"

type Props = {
  extension?: boolean
}

const RegexReplacer = ({ extension }: Props) => {
  const [regexInput, setRegexInput] = useInputState("")
  const [replaceValue, setReplaceValue] = useInputState("")
  const [testText, setTestText] = useInputState("")
  const [preview, setPreview] = useInputState("")
  const [regex, setRegex] = useState<RegExp | null>(null)

  useEffect(() => {
    setRegex(stringToRegex(regexInput))
    setPreview(regexReplacer(regexInput, replaceValue, testText))
  }, [regexInput, replaceValue, testText, setPreview])

  return (
    <Card
      shadow="sm"
      padding={extension ? "xs" : "lg"}
      radius="md"
      maw={extension ? "380px" : "100%"}
    >
      <Grid gutter={extension ? 0 : "xs"}>
        <Grid.Col span={12}>
          <Text mx={8}> Regex Replace Tester</Text>
        </Grid.Col>
        <Grid.Col span={12} data-name={"regexInput"}>
          <Input.Wrapper
            description={
              "Enter a regex pattern to match text. Use the test text input to see the preview. This is still a work in progress."
            }
            descriptionProps={
              extension ? { display: "none" } : { display: "block" }
            }
          >
            <Input
              value={regexInput}
              onChange={setRegexInput}
              placeholder="regex"
              type="text"
              icon={<IconRegex size="1rem" />}
              radius={"xl"}
              autoComplete="off"
              autoSave="off"
              rightSection={
                <Tooltip
                  label="Remember to use \ to escape special characters"
                  position="left"
                >
                  <Box>
                    <IconAlertCircle
                      size="1rem"
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </Box>
                </Tooltip>
              }
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6} data-name={"Text Text"}>
          <Input.Wrapper label="Test text">
            <Input
              value={testText}
              onChange={setTestText}
              placeholder="test text"
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6} data-name={"Replacement Text"}>
          <Input.Wrapper label="replacement text">
            <Input
              value={replaceValue}
              onChange={setReplaceValue}
              placeholder="replacement text"
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6} data-name={"Copy Regex"}>
          <CopyComponent
            label={regex?.toString()}
            type="regex"
            value={regex?.toString()}
            fullWidth
            h={60}
            disabled={
              regex && regexInput.length > 0 && regex.toString() !== "/(?:)/"
                ? false
                : true
            }
          />
        </Grid.Col>
        <Grid.Col span={6} data-name={"Copy Preview"}>
          <CopyComponent
            label={preview}
            type="string"
            value={preview}
            fullWidth
            h={60}
            disabled={preview.length > 0 ? false : true}
          />
        </Grid.Col>
        <Grid.Col span={12} data-name={"replaceFunction"}>
          <CopyComponent
            label={`.replace(${regex}, "${replaceValue}")`}
            value={`.replace(${regex}, "${replaceValue}")`}
            type="function"
            fullWidth
          />
        </Grid.Col>
      </Grid>
    </Card>
  )
}

export default RegexReplacer
