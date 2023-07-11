import Head from "next/head"
import { Inter } from "next/font/google"
import TextGeneration from "../components/TextGeneration"
import { Container, SimpleGrid } from "@mantine/core"
import { options } from "@/utils/options"
import AliasedEmails from "@/components/AliasedEmails"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const isExtension = router.query.extension === "true"
  const Page = !isExtension ? Homepage : Extension
  return (
    <>
      <Page />
    </>
  )
}

const Homepage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Get lorem faster" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SimpleGrid>
          <TextGeneration defaultOptions={options} />
          <AliasedEmails />
        </SimpleGrid>
      </Container>
    </>
  )
}

const Extension = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Get lorem faster" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AliasedEmails extension />
    </>
  )
}
