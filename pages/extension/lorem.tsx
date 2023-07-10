import React, { useEffect, useState } from "react"
import { Box } from "@mantine/core"
import { options } from "@/utils/options"
import TextGeneration from "@/components/TextGeneration"

type Props = {}

type CopyHistory = {
  id: string
  value: string
}

export default function Aext({}: Props) {
  const [copyHistory, setCopyHistory] = useState<CopyHistory[] | null>([])

  useEffect(() => {
    const copyHistory = localStorage.getItem("copyHistory")
    if (copyHistory !== null) {
      setCopyHistory(JSON.parse(copyHistory))
    }
  }, [])

  return (
    <>
      <TextGeneration defaultOptions={options} />
    </>
  )
}
