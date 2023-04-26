import { Button, Card, CopyButton, SimpleGrid } from '@mantine/core'
import React from 'react'
import { PlaceText } from '../../utils/data/lorem'

type Props = {
  options: { label: string; textElement: string; count: number }[]
}

export default function CopyGroupCard({ options }: Props) {
  return (
    <Card shadow="sm" padding="md" radius="md">
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {options.map((option) => (
          <CopyButtons
            key={option.label}
            label={option.label}
            textElement={option.textElement}
            text={PlaceText({
              textElement: option.textElement,
              count: option.count,
              type: 'lorem',
            })}
          />
        ))}
      </SimpleGrid>
    </Card>
  )
}

export const CopyButtons = ({
  label,
  textElement,
  text,
}: {
  label: string
  textElement: string
  text: string
}) => {
  const colorScheme: string = (() => {
    switch (textElement) {
      case 'sentences':
        return 'teal'
        break
      case 'paragraphs':
        return 'indigo'
        break
      case 'words':
        return 'red'
        break
      case 'array':
        return 'yellow'
        break
      default:
        return 'black'
        break
    }
  })()

  return (
    <CopyButton value={text}>
      {({ copied, copy }) => (
        <Button
          size={'md'}
          color={colorScheme}
          variant={copied ? 'light' : 'outline'}
          onClick={copy}
        >
          {copied ? `Copied ${label}` : label}
        </Button>
      )}
    </CopyButton>
  )
}
