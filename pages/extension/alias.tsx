import React, { useEffect, useState } from "react"
import AliasedEmails from "../../components/AliasedEmails"

type Props = {}

type CopyHistory = {
  id: string
  value: string
}

export default function text({}: Props) {
  const [copyHistory, setCopyHistory] = useState<CopyHistory[] | null>([])

  useEffect(() => {
    const copyHistory = localStorage.getItem("copyHistory")
    if (copyHistory !== null) {
      setCopyHistory(JSON.parse(copyHistory))
    }
  }, [])

  return (
    <>
      <AliasedEmails extension />
    </>
  )
}
