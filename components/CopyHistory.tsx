import React, { useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import { RESET, atomWithStorage } from "jotai/utils"
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Flex,
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
  timestamp?: number
}

interface GroupedCopyHistory {
  [dateKey: number]: CopyHistory[]
}

export const localCopyHistoryAtom = atomWithStorage(
  "copyHistory",
  [] as CopyHistory[]
)

export default function CopyHistory({ type, tooltip, scrollThreshold }: Props) {
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
      <CopyButton value={historyItem.value} timeout={5000}>
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

  const parseDate = (date: Date, weekday?: boolean) => {
    if (weekday !== false) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    } else {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    }
  }

  const groupedData: { [key: string]: CopyHistory[] } = copyHistory.reduce(
    (acc: { [key: string]: CopyHistory[] }, item) => {
      let itemTimestamp = item.timestamp
      if (itemTimestamp == undefined || itemTimestamp == null) {
        itemTimestamp = new Date(946800000000).getTime()
      }
      const date = parseDate(new Date(itemTimestamp))

      const groupedData = acc
      if (groupedData[date]) {
        groupedData[date].push(item)
      } else {
        groupedData[date] = [item]
      }
      return groupedData
    },
    {} as { [key: string]: CopyHistory[] }
  )

  const dateKeys = Object.keys(groupedData)
  const [deleting, setDeleting] = useState(false)

  const [history, setHistory] = useAtom(localCopyHistoryAtom)

  const handleDeleteHistoryGroup = (date: number) => {
    setHistory((history) =>
      history.filter((item) => {
        let itemTimestamp = item.timestamp
        if (itemTimestamp == undefined || itemTimestamp == null) {
          itemTimestamp = new Date(946800000000).getTime()
        }
        parseDate(new Date(itemTimestamp)) !== parseDate(new Date(date))
      })
    )
  }

  return (
    <>
      {dateKeys
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((dates) => {
          console.log(dates)
          return (
            <Box key={"info-" + dates}>
              <Flex justify={"space-between"} pt={8} pb={4}>
                {!deleting ? (
                  <>
                    <Badge
                      // style={{ cursor: "pointer" }}
                      // onClick={() => setDeleting(true)}
                      variant={
                        parseDate(new Date(dates)) === parseDate(new Date())
                          ? "dot"
                          : "outline"
                      }
                      color="green"
                      size="sm"
                    >
                      {groupedData[dates].length}
                    </Badge>
                    <Text key={dates} size="xs" weight={700}>
                      {dates === parseDate(new Date())
                        ? "Today, " + parseDate(new Date(dates), false)
                        : parseDate(new Date(dates), true)}
                    </Text>
                  </>
                ) : (
                  <Button.Group>
                    <Button onClick={() => setDeleting(false)}>Cancel</Button>
                    <Button
                      fullWidth
                      color="red"
                      onClick={() => {
                        handleDeleteHistoryGroup(parseInt(dates))
                      }}
                    >
                      Clear
                    </Button>
                  </Button.Group>
                )}
              </Flex>
              <SimpleGrid verticalSpacing="xs" key={"button-" + dates}>
                {groupedData[dates]
                  .sort()
                  .reverse()
                  .map((historyItem: CopyHistory) => (
                    <CopyHistoryItem
                      historyItem={historyItem}
                      key={historyItem.id}
                    />
                  ))}
              </SimpleGrid>
            </Box>
          )
        })}
    </>
  )
}

