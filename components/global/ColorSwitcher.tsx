import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import { IconMoonStars, IconSun } from "@tabler/icons-react"

import React from "react"

export default function ColorSwitcher({}) {
  const computedColorScheme = useComputedColorScheme("dark")
  const { setColorScheme } = useMantineColorScheme()
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light")
  }

  useHotkeys([["mod+J", () => toggleColorScheme()]])

  return (
    <ActionIcon
      variant="outline"
      color={computedColorScheme === "dark" ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
    </ActionIcon>
  )
}
