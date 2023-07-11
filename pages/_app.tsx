import { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"
import {
  AppShell,
  Button,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Footer,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import Logo from "../components/logo"
import ColorSwitcher from "../components/ColorSwitcher"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"
import HomepageHero from "../components/HomepageHero"
import { useRouter } from "next/router"
import { Loader } from "@mantine/core"
import { useEffect, useState } from "react"

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  // if the route contains 'extension' then use the extension layout
  // otherwise use the default layout
  const router = useRouter()
  const isExtension = !!router.query?.extension == true
  const [isLoading, setIsLoading] = useState(true)

  // use LoadingLayout while loading, then use ExtenstionLayout unless isExtension is false
  const Layout = isLoading
    ? LoadingLayout
    : isExtension
    ? ExtentionLayout
    : DefaultLayout

  useHotkeys([["mod+J", () => toggleColorScheme()]])

  // prevent DefaultLayout from loading before finished loading
  // wait an extra half second before loading the expected layout to prevent flickering
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [])

  return (
    <>
      <Head>
        <title>QuickLorem.dev</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            loader: "bars",
          }}
        >
          <Layout colorScheme={colorScheme}>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

function ExtentionLayout({
  colorScheme,
  children,
  ...rest
}: {
  colorScheme: string

  children: React.ReactNode
  [x: string]: any
}) {
  return (
    <AppShell w={"380px"} {...rest}>
      {children}
    </AppShell>
  )
}

function DefaultLayout({
  colorScheme,
  children,
  ...rest
}: {
  colorScheme: string
  children: React.ReactNode
  [x: string]: any
}) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={100} p="sm">
          <Group
            maw={"960px"}
            h={"100%"}
            px={"md"}
            position={"apart"}
            align={"center"}
            m={"auto"}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Group>
                <Logo fill={colorScheme === "dark" ? "#C1C2C5" : "inherit"} />
                <HomepageHero display={{ base: "none", xs: "block" }} />
                <Title display={{ base: "block", xs: "none" }} size={"sm"}>
                  QuickLorem.dev
                </Title>
              </Group>
            </Link>
            <ColorSwitcher />
          </Group>
        </Header>
      }
      footer={
        <Footer height={100} fixed={false}>
          <Group
            maw={"960px"}
            h={"100%"}
            p={"md"}
            position={"apart"}
            align={"center"}
            m={"auto"}
          >
            <Link
              href="https://github.com/mikikiv/quicklorem"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button leftIcon={<IconBrandGithub size={24} />}>
                Open Source
              </Button>
            </Link>
          </Group>
        </Footer>
      }
      {...rest}
    >
      {children}
    </AppShell>
  )
}

function LoadingLayout() {
  return (
    <Center miw={"380px"} h={"300px"}>
      <Loader size={120} />
    </Center>
  )
}
