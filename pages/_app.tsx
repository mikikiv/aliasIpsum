import { AppProps } from "next/app"
import Head from "next/head"
import {
  AppShell,
  Box,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Footer,
  Group,
  Header,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import Logo from "./components/logo"
import ColorSwitcher from "./components/ColorSwitcher"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"
import HomepageHero from "./components/HomepageHero"
import Script from "next/script"

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  useHotkeys([["mod+J", () => toggleColorScheme()]])
  return (
    <>
      <Head>
        <title>QuickLorem.dev</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Script
        id={"google-analytics"}
        src={`https://www.googletagmanager.com/gtag/js?id=G-MN76PBXXQQ`}
        strategy={"afterInteractive"}
      />
      <Script id={"google-analytics-init"}>
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', 'G-MN76PBXXQQ');
                `}
      </Script>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <Layout colorScheme={colorScheme} p={"xl"}>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

function Layout({
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
