import { Box, Card, Grid, Input, Switch, Text, Tooltip } from "@mantine/core"
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
  const [replacementValue, setReplacementValue] = useInputState("")
  const [testString, setTestString] = useInputState("")
  const [preview, setPreview] = useInputState("")
  const [replace, setReplace] = useInputState(true)
  const [regex, setRegex] = useState<RegExp | string | null>(null)

  useEffect(() => {
    setRegex(stringToRegex(regexInput))
    setPreview(
      regexReplacer({
        pattern: regexInput ? regexInput : "",
        testString,
        matchReplace: replace ? "replace" : "match",
        replacementValue,
      })
    )
  }, [regexInput, replacementValue, testString, setPreview, replace])

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
        <Grid.Col span={12}>
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
              data-test="regex-input"
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
              value={testString}
              onChange={setTestString}
              placeholder="test text"
              data-test="regex-test-text"
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={6} data-name={"Replacement Text"}>
          <Input.Wrapper label="replacement text">
            <Input
              value={replacementValue}
              onChange={setReplacementValue}
              placeholder="replacement text"
              data-test="regex-replacement-text"
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={12} data-name={"Target Replace"}>
          <Input.Wrapper label="Target Replace">
            <Switch
              checked={replace}
              onChange={() => setReplace(!replace)}
              placeholder="target replace"
              data-test="regex-target-replace"
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
              regex && regexInput?.length > 0 && regex.toString() !== "/(?:)/"
                ? false
                : true
            }
            data-test="regex-copy"
          />
        </Grid.Col>
        <Grid.Col span={6} data-name={"Copy Preview"}>
          <CopyComponent
            label={preview ? preview : "No matches"}
            type="string"
            value={preview}
            fullWidth
            h={60}
            disabled={preview?.length > 0 ? false : true}
            data-test="regex-preview"
          />
        </Grid.Col>
        {replace ? (
          <Grid.Col span={12} data-name={"replaceFunction"}>
            <CopyComponent
              label={
                regex instanceof RegExp
                  ? `.replace(${regex}, "${replacementValue}")`
                  : `.replace("${regex}", "${replacementValue}")`
              }
              value={
                regex instanceof RegExp
                  ? `.replace(${regex}, "${replacementValue}")`
                  : `.replace("${regex}", "${replacementValue}")`
              }
              type="function"
              fullWidth
              data-test="regex-replace-function"
            />
          </Grid.Col>
        ) : (
          <Grid.Col span={12} data-name={"matchFunction"}>
            <CopyComponent
              label={
                regex instanceof RegExp
                  ? `.match(${regex})`
                  : `.match("${regex}")`
              }
              value={
                regex instanceof RegExp
                  ? `.match(${regex})`
                  : `.match("${regex}")`
              }
              type="function"
              fullWidth
              data-test="regex-match-function"
            />
          </Grid.Col>
        )}
      </Grid>
    </Card>
  )
}

export default RegexReplacer
