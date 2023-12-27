import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons-react"

import React from "react"

export default function ColorSwitcher() {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      variant="outline"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      <IconMoonStars />
    </ActionIcon>
  )
}
