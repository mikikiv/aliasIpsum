import React, { useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import { RESET, atomWithStorage } from "jotai/utils"
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Flex,
  type MantineNumberSize,
  SimpleGrid,
  Text,
  Tooltip,
} from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"
import { colorSelector } from "@/utils/colorSelector"
import { useRouter } from "next/router"
import type { CopyHistoryType } from "@/components/types"

type Props = {
  type?: "email" | "text" | "regex" | "string"
  spacing?: MantineNumberSize
  tooltip?: boolean
  scrollThreshold: number
}

export const localCopyHistoryAtom = atomWithStorage(
  "copyHistory",
  [] as CopyHistoryType[]
)

export default function CopyHistory({ type, tooltip, scrollThreshold }: Props) {
  const copyHistory = useAtomValue(localCopyHistoryAtom)

  const router = useRouter()
  const extension = router.pathname.includes("/extension")

  const ScrollingText = ({
    children,
    scrollThreshold,
    scrolling,
    ...rest
  }: {
    children: string
    scrollThreshold: number
    scrolling: boolean
  }) => {
    const [hovered, setHovered] = useState(false)

    const scalingFactor = 1

    const scrollSpeed = (scrollThreshold: number) => {
      const speed = scrollThreshold * 0.02
      if (speed > 0.8) {
        return 0.8
      }
      return speed
    }

    const scrollAmount = (scrollThreshold: number) => {
      if (children.length <= scrollThreshold) {
        return 0
      }
      return `${(scrollThreshold - children.length) * scalingFactor}ch`
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
                  transition: "transform 0.1s ease-out",
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
    historyItem: CopyHistoryType
  }) => {
    return (
      <CopyButton value={historyItem.value as string} timeout={5000}>
        {({ copied, copy }) => (
          <Tooltip
            label={historyItem.value as string}
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
              data-test={historyItem.value}
              leftIcon={<IconCopy />}
              color={colorSelector(historyItem.type)}
              variant={copied ? "filled" : "outline"}
              onClick={copy}
              size={extension ? "xs" : "sm"}
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
    }
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  }

  const groupedData: { [key: string]: CopyHistoryType[] } = copyHistory.reduce(
    (acc: { [key: string]: CopyHistoryType[] }, item) => {
      let itemTimestamp = item.timestamp
      if (itemTimestamp === undefined || itemTimestamp == null) {
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
    {} as { [key: string]: CopyHistoryType[] }
  )

  const dateKeys = Object.keys(groupedData)
  const [deleting, setDeleting] = useState(false)

  const [history, setHistory] = useAtom(localCopyHistoryAtom)

  const handleDeleteHistoryGroup = (date: number) => {
    setHistory((history) =>
      history.filter((item) => {
        let itemTimestamp = item.timestamp
        if (itemTimestamp === undefined || itemTimestamp == null) {
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
          return (
            <Box key={`info-${dates}`}>
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
                        ? `Today, ${parseDate(new Date(dates), false)}`
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
                        handleDeleteHistoryGroup(Number.parseInt(dates))
                      }}
                    >
                      Clear
                    </Button>
                  </Button.Group>
                )}
              </Flex>
              <SimpleGrid
                verticalSpacing="xs"
                key={`button-${dates}`}
                data-test="copyHistoryItems"
              >
                {groupedData[dates]
                  .sort()
                  .reverse()
                  .map((historyItem: CopyHistoryType) => {
                    // exclude all but the last non-duplicate item
                    if (
                      historyItem.id !==
                      groupedData[dates].find(
                        (item) =>
                          item.type === historyItem.type &&
                          item.value === historyItem.value
                      )?.id
                    ) {
                      return null
                    }

                    return (
                      <CopyHistoryItem
                        historyItem={historyItem}
                        key={historyItem.id}
                      />
                    )
                  })}
              </SimpleGrid>
            </Box>
          )
        })}
    </>
  )
}
