import { Box, Container, Text, Title } from "@mantine/core"
import React from "react"

export function HomepageHero() {
  return (
    <Box top={0} mt={0} pb={50}>
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
