import Head from "next/head"
import { Inter } from "next/font/google"
import TextGeneration from "../components/TextGeneration"
import { Card, Container, Select, SimpleGrid } from "@mantine/core"
import { options } from "@/utils/options"
import { useState } from "react"
import AliasedEmails from "@/components/AliasedEmails"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
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
            <TextGeneration defaultOptions={options} />
            <AliasedEmails />
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}
