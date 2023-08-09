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

  const CopyHistoryItem = ({
    historyItem,
    ...rest
  }: {
    historyItem: CopyHistory
  }) => {
    return (
      <CopyButton key={historyItem.id} value={historyItem.value} timeout={5000}>
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
  }

  const groupedData: { [key: number]: CopyHistory[] } = copyHistory.reduce(
    (acc, item) => {
      const date = (item.timestamp - (item.timestamp % 86400000)) as number
      const groupedData = acc
      if (groupedData[date]) {
        groupedData[date].push(item)
      } else {
        groupedData[date] = [item]
      }
      return groupedData
    },
    {} as { [key: number]: CopyHistory[] }
  )

  const dateKeys = Object.keys(groupedData)

  return (
    <SimpleGrid cols={1} spacing={spacing}>
      {dateKeys
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((dates) => {
          return (
            <>
              <Text key={dates} size="xs" weight={700}>
                {
                  // display as the date
                  new Date(parseInt(dates)).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                }
              </Text>
              {groupedData[parseInt(dates)]
                .sort()
                .reverse()
                .map((historyItem: CopyHistory) => (
                  <CopyHistoryItem historyItem={historyItem} />
                ))}
            </>
          )
        })}
    </SimpleGrid>
  )
}

