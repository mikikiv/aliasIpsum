import Head from "next/head"
import AliasedEmails from "@/components/AliasedEmails"

export default function Home() {
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
