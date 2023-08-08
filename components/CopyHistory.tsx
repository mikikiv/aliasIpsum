import React, { useState } from "react"
import { useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import {
  Button,
  CopyButton,
  MantineNumberSize,
  SimpleGrid,
  Text,
  Tooltip,
} from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"
import { colorSelector } from "@/utils/colorSelector"

type Props = {
  type?: "email" | "text"
  spacing?: MantineNumberSize
  tooltip?: boolean
  scrollThreshold: number
}

export type CopyHistory = {
  id: number
  type: string
  value: string
  timestamp: number
}

type GroupedCopyHistory = {
  (dateKey: number): CopyHistory[]
}

export const localCopyHistoryAtom = atomWithStorage(
  "copyHistory",
  [] as CopyHistory[]
)

export default function CopyHistory({
  type,
  spacing,
  tooltip,
  scrollThreshold,
}: Props) {
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

    const scalingFactor = 1

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

  const groupedData = copyHistory.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString()
    return {
      ...acc,
      [date]: [item, ...(acc[date] || [])],
    }
  }, {} as GroupedCopyHistory)

  const dates = Object.keys(groupedData)

  return (
    <SimpleGrid cols={1} spacing={spacing}>
      {dates
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((dateKey) => {
          return (
            <>
              <Text key={dateKey} size="xs" weight={700}>
                {dateKey}
              </Text>
              {groupedData[dateKey]?.map((historyItem) => {
                return (
                  <CopyButton
                    key={historyItem.id}
                    value={historyItem.value}
                    timeout={5000}
                  >
                    {({ copied, copy }) => (
                      <Tooltip
                        label={historyItem.value}
                        events={
                          tooltip === true || tooltip === undefined
                            ? { hover: true, focus: true, touch: true }
                            : { hover: false, focus: false, touch: false }
                        }
                        openDelay={800}
                        withinPortal
                        position={"bottom"}
                      >
                        <Button
                          leftIcon={<IconCopy />}
                          color={colorSelector(historyItem.type)}
                          variant={copied ? "filled" : "outline"}
                          onClick={copy}
                        >
                          <ScrollingText
                            scrollThreshold={scrollThreshold}
                            scrolling={copied ? false : true}
                          >
                            {copied
                              ? `${
                                  historyItem.type === "email"
                                    ? historyItem.value
                                    : historyItem.type.charAt(0).toUpperCase() +
                                      historyItem.type.slice(1)
                                }  Copied!`
                              : `${historyItem.id}: ${historyItem.value}`}
                          </ScrollingText>
                        </Button>
                      </Tooltip>
                    )}
                  </CopyButton>
                )
              })}
            </>
          )
        })}
    </SimpleGrid>
  )
}

