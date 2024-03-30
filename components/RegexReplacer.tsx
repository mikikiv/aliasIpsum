import { Box, Button, CopyButton, Input, SimpleGrid } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import React, { useEffect, useState } from "react"
import { regexReplacer } from "@/utils/regexReplacer"
import { useAtom } from "jotai"

import { localCopyHistoryAtom } from "./global/CopyHistory"
import { stringToRegex } from "@/utils/transformStringToRegex"

type Props = {}

const RegexReplacer = (props: Props) => {
  const [regexInput, setRegexInput] = useInputState("")
  const [replaceValue, setReplaceValue] = useInputState("")
  const [testText, setTestText] = useInputState("")
  const [preview, setPreview] = useInputState("")
  const [regex, setRegex] = useState<RegExp | null>(null)

  const [copyHistory, setCopyHistory] = useAtom(localCopyHistoryAtom)
  const uniqueCopyHistory = new Set(copyHistory.map((item) => item.value))

  const handleCopy = (value: string, type: string) => {
    if (uniqueCopyHistory.has(value)) return
    setCopyHistory((history) => [
      ...history,
      {
        id: history.length,
        type: type,
        value,
        timestamp: new Date().getTime(),
      },
    ])
  }

  useEffect(() => {
    setRegex(stringToRegex(regexInput))
    setPreview(regexReplacer(regexInput, replaceValue, testText))
  }, [regexInput, replaceValue, testText])

  return (
    <Box>
      <Input.Wrapper label="Regex">
        <SimpleGrid cols={2}>
          <Input
            value={regexInput}
            onChange={setRegexInput}
            placeholder="regex"
          />
          {regex && regexInput.length > 0 && regex.toString() !== "/(?:)/" && (
            <Box
              onClick={() => {
                handleCopy(regex.toString(), 'regex')
              }}
            >
              <CopyButton value={regex ? regex.toString() : ""}>
                {({ copied, copy }) => (
                  <Button fullWidth>{regex.toString()}</Button>
                )}
              </CopyButton>
            </Box>
          )}
        </SimpleGrid>
      </Input.Wrapper>
      <Input.Wrapper label="Test text">
        <Input
          value={testText}
          onChange={setTestText}
          placeholder="test text"
        />
      </Input.Wrapper>
      <Input.Wrapper label="replacement text">
        <SimpleGrid cols={2}>
          <Input
            value={replaceValue}
            onChange={setReplaceValue}
            placeholder="replacement text"
          />
          {preview && preview.length > 0 && (
            <Box
              onClick={() => {
                handleCopy(preview, 'string')
              }}
            >
              <CopyButton value={preview}>
                {({ copied, copy }) => <Button fullWidth>{preview}</Button>}
              </CopyButton>
            </Box>
          )}
        </SimpleGrid>
      </Input.Wrapper>
    </Box>
  )
}

export default RegexReplacer
