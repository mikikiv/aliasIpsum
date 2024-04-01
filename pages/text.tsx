import React from "react"
import { PlaceText } from "../utils/transformer"
import { Box, Text } from "@mantine/core"
import RegexReplacer from "@/components/RegexReplacer"

export default function text() {
  return (
    <Box>
      <RegexReplacer />
    </Box>
  )
}
