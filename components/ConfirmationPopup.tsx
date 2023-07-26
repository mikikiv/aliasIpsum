import {
  Button,
  Group,
  HoverCard,
  MantineColor,
  Stack,
  Text,
} from "@mantine/core"
import React from "react"

type Props = {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  children: React.ReactNode
  confirmColor?: MantineColor
  cancelColor?: MantineColor
  [x: string]: any
}
export default function ConfirmationPopup({
  title,
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
  return (
    <Group {...rest}>
      <HoverCard closeDelay={400}>
        <HoverCard.Target>{children}</HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            {title && <Text>{title}</Text>}
            {description && <Text color="dimmed">{description}</Text>}
            <Button.Group>
              <Button color={confirmColor || "green"} onClick={onConfirm}>
                {confirmLabel || "ok"}
              </Button>
              <Button color={cancelColor || "grey"} onClick={onCancel}>
                {cancelLabel || "cancel"}
              </Button>
            </Button.Group>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  )
}
