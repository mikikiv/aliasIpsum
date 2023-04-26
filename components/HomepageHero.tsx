import { Box, Container, Text, Title } from "@mantine/core"
import React from "react"

export default function HomepageHero({ ...rest }) {
  return (
    <Box top={0} mt={0} {...rest}>
      <Container>
        <Title order={1}>
          Get{" "}
          <Text
            span
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 45 }}
            inherit
          >
            Lorem Ipsum
          </Text>{" "}
          faster
        </Title>
        <Text color="dimmed">
          Copy the content you need to your clipboard with one click
        </Text>
      </Container>
    </Box>
  )
}
