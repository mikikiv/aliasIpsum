import {
  Badge,
  Button,
  Group,
  type MantineColor,
  Popover,
  Stack,
  Text,
} from "@mantine/core"
import { useHover } from "@mantine/hooks"
import React, { useState } from "react"

type Props = {
  title?: string
  buttonText: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  confirmColor?: MantineColor
  cancelColor?: MantineColor
  [x: string]: string | boolean | (() => void) | undefined
}
export default function ConfirmationPopup({
  title,
  buttonText,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmColor,
  cancelColor,
  children,
  ...rest
}: Props) {
  const [opened, setOpened] = useState(false)

  const handleCancel = () => {
    onCancel?.()
    setOpened(false)
  }

  const handleConfirm = () => {
    onConfirm()
    setOpened(false)
  }

  const { hovered, ref } = useHover()

  return (
    <Group {...rest}>
      <Popover opened={opened} width={"target"}>
        <Popover.Target>
          <Badge
            ref={ref}
            sx={{ cursor: "pointer" }}
            color={hovered || opened ? "red" : "gray"}
            w={"100%"}
            onClick={() => {
              setOpened(true)
            }}
          >
            {buttonText}
          </Badge>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack>
            {title && <Text>{title}</Text>}
            {description && <Text color="dimmed">{description}</Text>}
            <Button.Group>
              <Button
                w={"100%"}
                color={confirmColor || "green"}
                onClick={handleConfirm}
              >
                {confirmLabel || "ok"}
              </Button>
              <Button
                w={"100%"}
                color={cancelColor || "grey"}
                onClick={() => handleCancel()}
              >
                {cancelLabel || "cancel"}
              </Button>
            </Button.Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  )
}
