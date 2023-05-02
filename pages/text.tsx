import React from "react"
import { PlaceText } from "../utils/transformer"
import { Box, Text } from "@mantine/core"

type Props = {}

export default function text({}: Props) {
  return (
    <Box>
      <Text>
        {PlaceText({ textElement: "array", count: 10, theme: "lorem" })}
      </Text>
    </Box>
  )
}
