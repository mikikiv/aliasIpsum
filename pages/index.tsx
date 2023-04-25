import Head from "next/head"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import CopyGroupCard from "./components/CopyGroupCard"
import { Container, SimpleGrid } from "@mantine/core"
import HomepageHero from "./components/HomepageHero"

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
            <CopyGroupCard />
          </SimpleGrid>
        </Container>
      </main>
    </>
  )
}
