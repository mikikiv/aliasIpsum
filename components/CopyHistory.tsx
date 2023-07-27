import React, { useState } from "react"
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
  tooltip?: boolean
  threshold?: number
}

export default function CopyHistory({
  type,
  spacing,
  tooltip,
  threshold,
}: Props) {
  let copyHistory = useAtomValue(localCopyHistoryAtom)

  type == "email" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  type == "text" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  const ScrollingText = ({
    children,
    threshold,
    ...rest
  }: {
    children: String
    threshold?: number
  }) => {
    const [hovered, setHovered] = useState(false)

    const scalingFactor = 0.9
    threshold == undefined && (threshold = 39)
    const scrollSpeed = (threshold: number) => {
      const speed = threshold * 0.02
      if (speed > 0.8) {
        return 0.8
      } else {
        return speed
      }
    }

    const scrollAmount = (threshold: number) => {
      if (children.length <= threshold) {
        return 0
      } else {
        return (threshold - children.length) * scalingFactor + "ch"
      }
    }

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...rest}
      >
        <div
          style={{
            transform: hovered
              ? `translateX(${scrollAmount(threshold)})`
              : "translateX(0)",
            transition: `transform ${scrollSpeed(threshold)}s ease-out`,
          }}
        >
          {children}
        </div>
      </div>
    )
  }

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
                  events={
                    tooltip === true || tooltip === undefined
                      ? { hover: true, focus: true, touch: true }
                      : { hover: false, focus: false, touch: false }
                  }
                  openDelay={1000}
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
                    <ScrollingText threshold={threshold}>
                      {copied
                        ? `Copied ${item.value}`
                        : `${item.id}: ${item.value}`}
                    </ScrollingText>
                  </Button>
                </Tooltip>
              )}
            </CopyButton>
          )
        })}
    </SimpleGrid>
  )
}
