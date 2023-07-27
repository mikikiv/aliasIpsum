import Head from "next/head"
import TextGeneration from "../components/TextGeneration"
import { Container, SimpleGrid } from "@mantine/core"
import { options } from "@/utils/options"
import AliasedEmails from "@/components/AliasedEmails"

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Get lorem faster" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SimpleGrid>
          <AliasedEmails />
          <TextGeneration defaultOptions={options} />
        </SimpleGrid>
      </Container>
    </>
  )
}
