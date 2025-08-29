import { localCopyHistoryAtom } from "@/components/global/CopyHistory"
import type { CopyHistoryType } from "@/components/types"
import { Box, Button, CopyButton, Tooltip } from "@mantine/core"
import { useAtom } from "jotai"
import { colorSelector } from "../../utils/colorSelector"
import { useState } from "react"

type Props = {
  value?: string
  type: string
  label?: string
  fullWidth?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  id?: string
  h?: number | string
  maw?: number | string
  rightIcon?: React.ReactNode
  disabled?: boolean
}

export const CopyComponent = ({ value, type, label, ...rest }: Props) => {
  const [copyHistory, setCopyHistory] = useAtom(localCopyHistoryAtom)

  const [displayedCopiedValue, setDisplayedCopiedValue] = useState("")

  const handleCopy = (value: string, type: string) => {
    setDisplayedCopiedValue(value)

    if (copyHistory[copyHistory.length - 1]?.value === value) {
      return
    }
    setCopyHistory((history) => [
      ...history,
      {
        id: history.length,
        type: type,
        value,
        timestamp: Date.now(),
      },
    ])
  }
  return (
    <Box>
      <CopyButton value={value ? value : ""}>
        {({ copied, copy }) => (
          <Tooltip
            label={value}
            withinPortal
            multiline
            maw={400}
            transitionProps={{ transition: "fade", duration: 500 }}
            openDelay={100}
            events={{ hover: true, focus: true, touch: false }}
            style={{ lineBreak: "anywhere" }}
          >
            <Button
              {...rest}
              size={"md"}
              color={colorSelector(type)}
              variant={copied ? "light" : "outline"}
              onClick={() => {
                copy()
                handleCopy(value ? value : "", type)
              }}
            >
              {copied ? `Copied ${displayedCopiedValue}` : label}
            </Button>
          </Tooltip>
        )}
      </CopyButton>
    </Box>
  )
}
