import { Button, Card, CopyButton, SimpleGrid } from "@mantine/core"
import React from "react"

type Props = {}

export default function CopyGroupCard({}: Props) {
  const arrayOfWords = ["this is", "an array", "of words"]
  return (
    <Card shadow="sm" padding="md" radius="md">
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        <CopyGroup>
          <CopyButtons label={"Words[]"} text={JSON.stringify(arrayOfWords)} />
          <CopyButtons
            label={"1 Sentence"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
          />
        </CopyGroup>
        <CopyGroup>
          <CopyButtons
            label={"1 Paragraph"}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          />
          <CopyButtons label={"Many Paragraphs"} text={manyParagraphs} />
        </CopyGroup>
      </SimpleGrid>
    </Card>
  )
}

const CopyGroup = ({ children }: { children: React.ReactElement[] }) => {
  return <Button.Group orientation="vertical">{children}</Button.Group>
}
const CopyButtons = ({ label, text }: { label: string; text: string }) => {
  return (
    <CopyButton value={text}>
      {({ copied, copy }) => (
        <Button
          size={"md"}
          variant={copied ? "light" : "outline"}
          color={"cyan"}
          onClick={copy}
        >
          {copied ? `Copied ${label}` : label}
        </Button>
      )}
    </CopyButton>
  )
}

const manyParagraphs = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In fermentum et sollicitudin ac orci phasellus. Feugiat in ante metus dictum. Arcu felis bibendum ut tristique et. Ut enim blandit volutpat maecenas volutpat blandit. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Libero justo laoreet sit amet cursus sit. Cursus turpis massa tincidunt dui ut ornare. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Arcu cursus vitae congue mauris. Dolor sit amet consectetur adipiscing elit ut aliquam. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Sollicitudin tempor id eu nisl nunc mi ipsum. Leo duis ut diam quam nulla. Congue nisi vitae suscipit tellus. Feugiat scelerisque varius morbi enim nunc faucibus a. Integer malesuada nunc vel risus commodo viverra. Diam vulputate ut pharetra sit amet aliquam. Scelerisque eu ultrices vitae auctor eu. Interdum velit laoreet id donec ultrices tincidunt.
    
    Varius vel pharetra vel turpis nunc eget lorem. Egestas quis ipsum suspendisse ultrices gravida dictum. Volutpat sed cras ornare arcu dui vivamus. Leo urna molestie at elementum eu. Amet nisl purus in mollis nunc sed id semper. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Proin nibh nisl condimentum id. Euismod nisi porta lorem mollis aliquam ut. Blandit massa enim nec dui nunc mattis. Ac turpis egestas integer eget. Morbi enim nunc faucibus a pellentesque sit amet. Tellus pellentesque eu tincidunt tortor aliquam nulla. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Neque viverra justo nec ultrices dui sapien eget mi. Vitae elementum curabitur vitae nunc sed velit. Egestas maecenas pharetra convallis posuere morbi. Arcu non odio euismod lacinia at quis risus sed vulputate. Et tortor consequat id porta nibh venenatis. Tincidunt praesent semper feugiat nibh. Duis at consectetur lorem donec.
    
    Arcu cursus vitae congue mauris. Tempus egestas sed sed risus pretium quam. Augue interdum velit euismod in pellentesque massa placerat duis. Placerat orci nulla pellentesque dignissim enim sit amet venenatis urna. Enim sit amet venenatis urna cursus eget. Congue nisi vitae suscipit tellus mauris a diam maecenas sed. Id diam maecenas ultricies mi eget. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Id volutpat lacus laoreet non curabitur gravida arcu ac. Nulla aliquet enim tortor at auctor urna. Posuere ac ut consequat semper viverra nam libero. Purus sit amet luctus venenatis. Malesuada fames ac turpis egestas integer eget aliquet nibh. Elit pellentesque habitant morbi tristique senectus et netus et. Sed lectus vestibulum mattis ullamcorper velit. Adipiscing elit pellentesque habitant morbi tristique. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Porttitor eget dolor morbi non arcu risus quis.
    
    In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Sed enim ut sem viverra. Lacus sed turpis tincidunt id. Et tortor at risus viverra adipiscing. Lacus sed viverra tellus in. Enim facilisis gravida neque convallis a cras semper auctor. Nisi lacus sed viverra tellus. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Sit amet risus nullam eget felis eget nunc. At tellus at urna condimentum mattis pellentesque id. Id aliquet risus feugiat in ante metus dictum at. Arcu bibendum at varius vel pharetra. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Congue mauris rhoncus aenean vel elit scelerisque mauris. Tristique nulla aliquet enim tortor at auctor urna nunc id. Nunc lobortis mattis aliquam faucibus. Neque aliquam vestibulum morbi blandit cursus risus at.
    
    Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit. Leo duis ut diam quam nulla porttitor massa id. Sit amet mauris commodo quis imperdiet. Massa eget egestas purus viverra accumsan. Ultrices sagittis orci a scelerisque purus semper eget. Risus nec feugiat in fermentum posuere urna nec. Proin gravida hendrerit lectus a. Duis at tellus at urna condimentum mattis pellentesque id nibh. Nunc id cursus metus aliquam eleifend mi. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Mi proin sed libero enim sed faucibus turpis in eu. Convallis a cras semper auctor neque vitae tempus quam.`
