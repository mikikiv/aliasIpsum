// a react component that renders a select with a scrollable list
// A user can use their mouse scroll wheel to scroll through the
// options. The right side of the select should have horizontal
// lines that almost look like the top of a mouse wheel

import { Box, Select } from "@mantine/core"

interface Props {
  options: string[]
  value: string
  setValue: (value: string) => void
  onChange: (value: string) => void
}

export function SelectScroll({ options, value, setValue, onChange }: Props) {
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.blur()
    const index = options.indexOf(value)
    const direction = e.deltaY > 0 ? 1 : -1
    // increase the distance between the options in terms of scroll amount
    const scrollAmount = e.deltaY * 0.5
    e.currentTarget.scrollBy({ top: scrollAmount })

    // scroll like a carousel so that the first option is
    // the next option after the last option
    const newIndex = (index + direction + options.length) % options.length
    onChange(options[newIndex])
  }
  return (
    <Box>
      <Select
        value={value}
        onChange={setValue}
        // when the user's mouse is over the top of the select,
        // scrolling to changethe select value
        onWheel={(e) => {
          handleScroll(e)
        }}
        // a designed stack of horizontal lines on the right side
        // with thicker lines in the middle and thinner lines along the top and bottom
        rightSectionWidth={40}
        data={options.flatMap((option) => [option])}
      />
    </Box>
  )
}
