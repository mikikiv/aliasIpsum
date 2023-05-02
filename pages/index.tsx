import Head from "next/head"
import { Inter } from "next/font/google"
import CopyGroupCard from "../components/CopyGroupCard"
import { Container, Select, SimpleGrid } from "@mantine/core"
import { options } from "@/utils/options"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [theme, setTheme] = useState("lorem")

  return (
    <>
      <Head>
        <meta name="description" content="Get lorem faster" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <SimpleGrid>
            <Select
              label="Theme"
              placeholder="Select theme"
              data={[
                { value: "lorem", label: "Lorem Ipsum" },
                { value: "pirateLorem", label: "Pirate Ipsum" },
                { value: "dogLorem", label: "Doge Ipsum" },
                { value: "catLorem", label: "Cat Ipsum" },
                { value: "hungryLorem", label: "Cupcake Ipsum" },
                // { value: "hipsterLorem", label: "Hipster Ipsum" },
                { value: "videoGameLorem", label: "Video Game Ipsum" },
              ]}
              defaultValue={theme}
              onChange={(value) => setTheme(value as string)}
            />
            <CopyGroupCard defaultOptions={options} theme={theme} />
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}
