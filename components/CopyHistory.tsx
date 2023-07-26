import React from "react"
import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Box, List } from "@mantine/core"
import { CopyHistory } from "./AliasedEmails"

type Props = {}

const localCopyHistoryAtom = atomWithStorage("copyHistory", [] as CopyHistory[])

export default function CopyHistory({}: Props) {
  const History = () => {
    const copyHistory = useAtomValue(localCopyHistoryAtom)

    return (
      <List>
        {copyHistory.map((item) => {
          return <List.Item key={item.id}>{item.value}</List.Item>
        })}
      </List>
    )
  }

  return <History />
}
