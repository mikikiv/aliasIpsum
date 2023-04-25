import { AppProps } from "next/app"
import Head from "next/head"
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import Logo from "./components/logo"
import ColorSwitcher from "./components/ColorSwitcher"
import Link from "next/link"

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
        <title>FastLorem.dev</title>
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
          }}
        >
          <Layout colorScheme={colorScheme}>
            <Component
              style={{
                padding: 20,
                paddingBottom: 50,
                margin: "auto",
              }}
              {...pageProps}
            />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

function Layout({
  colorScheme,
  children,
}: {
  colorScheme: string
  children: React.ReactNode
}) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={"60"} p="sm">
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
                <Logo fill={colorScheme === "dark" ? "#eee" : "inherit"} />
                <Title order={3}>quicklorem.dev</Title>
              </Group>
            </Link>
            <ColorSwitcher />
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
