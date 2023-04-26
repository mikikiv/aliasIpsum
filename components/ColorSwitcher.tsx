import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons-react"

import React from "react"

export default function ColorSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  )
}
