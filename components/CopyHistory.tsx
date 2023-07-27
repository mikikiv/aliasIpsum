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
  scrollThreshold: number
}

export default function CopyHistory({ type, spacing, tooltip, scrollThreshold }: Props) {
  let copyHistory = useAtomValue(localCopyHistoryAtom)

  type == "email" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  type == "text" &&
    (copyHistory = copyHistory.filter((item) => item.type === type))

  const ScrollingText = ({
    children,
    scrollThreshold,
    scrolling,
    ...rest
  }: {
    children: String
    scrollThreshold: number
    scrolling: boolean
  }) => {
    const [hovered, setHovered] = useState(false)

    const scalingFactor = 1.01

    const scrollSpeed = (scrollThreshold: number) => {
      const speed = scrollThreshold * 0.02
      if (speed > 0.8) {
        return 0.8
      } else {
        return speed
      }
    }

    const scrollAmount = (scrollThreshold: number) => {
      if (children.length <= scrollThreshold) {
        return 0
      } else {
        return (scrollThreshold - children.length) * scalingFactor + "ch"
      }
    }

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...rest}
      >
        <div
          style={
            scrolling
              ? {
                  transform: hovered
                    ? `translateX(${scrollAmount(scrollThreshold)})`
                    : "translateX(0)",
                  transition: `transform ${scrollSpeed(
                    scrollThreshold
                  )}s ease-out`,
                }
              : {
                  transform: `translateX(${scrollAmount(scrollThreshold)})`,
                  transition: `transform 0.1s ease-out`,
                }
          }
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
                    color="violet"
                    variant={copied ? "white" : "default"}
                    onClick={copy}
                    key={item.id}
                  >
                    <ScrollingText
                      scrollThreshold={scrollThreshold}
                      scrolling={copied ? false : true}
                    >
                      {copied
                        ? `${item.value} copied!`
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
