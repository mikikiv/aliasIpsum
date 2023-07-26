import React from "react"
import { useAtomValue } from "jotai"
import {
  Button,
  CopyButton,
  MantineNumberSize,
  SimpleGrid,
  Tooltip,
} from "@mantine/core"
import { CopyHistory, localCopyHistoryAtom } from "./AliasedEmails"
import { IconCopy } from "@tabler/icons-react"

type Props = {
  type?: "email" | "text"
  spacing?: MantineNumberSize
}

export default function CopyHistory({ type, spacing }: Props) {
  let copyHistory = useAtomValue(localCopyHistoryAtom)

  type == "email" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  type == "text" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  return (
    <SimpleGrid cols={1} spacing={spacing}>
      {copyHistory
        .sort((a, b) => b.id - a.id)
        .map((item) => {
          return (
            <CopyButton value={item.value} timeout={5000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={item.value}
                  events={{ hover: true, focus: true, touch: true }}
                  withinPortal
                  position={"bottom"}
                >
                  <Button
                    leftIcon={<IconCopy />}
                    compact
                    color="violet"
                    variant={copied ? "white" : "outline"}
                    onClick={copy}
                    key={item.id}
                  >
                    {copied
                      ? `Copied ${item.value}`
                      : `${item.id}: ${item.value}`}
                  </Button>
                </Tooltip>
              )}
            </CopyButton>
          )
        })}
    </SimpleGrid>
  )
}




