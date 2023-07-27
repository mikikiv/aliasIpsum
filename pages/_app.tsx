import { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"
import {
  AppShell,
  Aside,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Footer,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  ScrollArea,
  Title,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import Logo from "../components/logo"
import ColorSwitcher from "../components/ColorSwitcher"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"
import HomepageHero from "../components/HomepageHero"
import { useRouter } from "next/router"
import { Provider as JotaiProvider, useAtom } from "jotai"
import CopyHistory from "@/components/CopyHistory"
import ConfirmationPopup from "@/components/ConfirmationPopup"
import { localCopyHistoryAtom } from "@/components/AliasedEmails"
import { RESET } from "jotai/utils"

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
  const isExtension = router.pathname.includes("/extension")

  const Layout = isExtension ? ExtentionLayout : DefaultLayout

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
          <JotaiProvider>
            <Layout colorScheme={colorScheme}>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </JotaiProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

const ClearHistoryButton = () => {
  const [history, setHistory] = useAtom(localCopyHistoryAtom)
  const handleDeleteHistory = () => {
    setHistory(RESET)
  }

  if (history.length === 0) return null
  return (
    <ConfirmationPopup
      description="Are you sure you want to clear your copy history?"
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={() => handleDeleteHistory()}
      confirmColor="red"
      cancelColor="gray"
      position="center"
    />
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
  const extensionWidth = "380px"
  const extensionHeight = "400px"

  return (
    <AppShell
      w={extensionWidth}
      h={extensionHeight}
      {...rest}
      footer={
        <Footer
          w={extensionWidth}
          height={"100px"}
          px={"xs"}
          withBorder={false}
        >
          <ScrollArea h={76} type="auto" offsetScrollbars>
            <CopyHistory
              type="email"
              spacing={1}
              tooltip={false}
              scrollThreshold={38}
            />
          </ScrollArea>
          <ClearHistoryButton />
        </Footer>
      }
    >
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
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="sm" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Aside.Section pb={16}>
              <ClearHistoryButton />
            </Aside.Section>
            <Aside.Section grow component={ScrollArea}>
              <CopyHistory scrollThreshold={29} />
            </Aside.Section>
          </Aside>
        </MediaQuery>
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

