import { Box, Button, CopyButton, Input, Text } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import React, { useEffect, useState } from "react"
import { regexReplacer } from "@/utils/regexReplacer"

type Props = {}

const RegexReplacer = (props: Props) => {
  const [regexInput, setRegexInput] = useInputState("")
  const [replaceValue, setReplaceValue] = useInputState("")
  const [testText, setTestText] = useInputState("")
  const [preview, setPreview] = useInputState("")

  //convert the regexInput to regex

  useEffect(() => {
    setPreview(regexReplacer(regexInput, replaceValue, testText))
  }, [regexInput, replaceValue, testText])

  return (
    <Box>
      <Input.Wrapper label="Test text">
        <Input
          value={testText}
          onChange={setTestText}
          placeholder="test text"
        />
      </Input.Wrapper>
      <Input.Wrapper label="Regex">
        <Input
          value={regexInput}
          onChange={setRegexInput}
          placeholder="regex"
        />
      </Input.Wrapper>
      <Input.Wrapper label="replacement text">
        <Input
          value={replaceValue}
          onChange={setReplaceValue}
          placeholder="replacement text"
        />
      </Input.Wrapper>

      <CopyButton value={regexInput}>
        {({ copied, copy }) => <Button>{preview}</Button>}
      </CopyButton>
    </Box>
  )
}

export default RegexReplacer
