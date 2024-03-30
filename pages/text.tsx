import React from "react"
import { PlaceText } from "../utils/transformer"
import { Box, Text } from "@mantine/core"
import RegexReplacer from "@/components/RegexReplacer"

type Props = {}

export default function text({}: Props) {
  return (
    <Box>
      <RegexReplacer />
    </Box>
  )
}
