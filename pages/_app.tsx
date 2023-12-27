import "@mantine/core/styles.css"
import { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"
import {
  AppShell,
  Button,
  ColorSchemeScript,
  Group,
  MantineProvider,
  ScrollArea,
  Title,
  useComputedColorScheme,
} from "@mantine/core"
import Logo from "../components/global/logo"
import ColorSwitcher from "../components/global/ColorSwitcher"
import Link from "next/link"
import { IconBrandGithub } from "@tabler/icons-react"
import HomepageHero from "../components/HomepageHero"
import { useRouter } from "next/router"
import { Provider as JotaiProvider, useAtom } from "jotai"
import CopyHistory, {
  localCopyHistoryAtom,
} from "@/components/global/CopyHistory"
import ConfirmationPopup from "@/components/global/ConfirmationPopup"
import { RESET } from "jotai/utils"
import { theme } from "@/theme"

export default function App({ Component, pageProps }: AppProps) {
  // if the route contains 'extension' then use the extension layout
  // otherwise use the default layout
  const router = useRouter()
  const isExtension = router.pathname.includes("/extension")
  
  const Layout = isExtension ? ExtentionLayout : DefaultLayout

  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={theme} defaultColorScheme="dark" >
        <Head>
          <title>QuickLorem.dev</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
            />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </Head>
        <JotaiProvider>
          <Layout >
            <Analytics />
            <Component {...pageProps} />
          </Layout>
        </JotaiProvider>
      </MantineProvider>
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
      buttonText="Clear History"
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
  children,
  ...rest
}: {
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
      footer={{ height: 100 }}
    >
      <AppShell.Footer
        w={extensionWidth}
        // height={"100px"}
        px={"xs"}
        withBorder={false}
      >
        <ScrollArea h={76} type="auto" offsetScrollbars>
          <CopyHistory
            type="email"
            // spacing={1}
            tooltip={false}
            scrollThreshold={38}
          />
        </ScrollArea>
        <ClearHistoryButton />
      </AppShell.Footer>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

function DefaultLayout({
  children,
  ...rest
}: {
  children: React.ReactNode
  [x: string]: any
  }) {
  
  const computedColorScheme = useComputedColorScheme('dark')
  
  return (
    <AppShell
      padding="md"
      header={{ height: 100 }}
      footer={{ height: 100 }}
      aside={{ breakpoint: "500px", width: 250 }}
    >
      <AppShell.Header p="sm">
        <Group
          maw={"960px"}
          h={"100%"}
          px={"md"}
          align={"center"}
          m={"auto"}
          justify={"space-between"}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Group>
              <Logo fill={computedColorScheme === "dark" ? "#C1C2C5" : "inherit"} />
              <HomepageHero display={{ base: "none", xs: "block" }} />
              <Title display={{ base: "block", xs: "none" }} size={"sm"}>
                QuickLorem.dev
              </Title>
            </Group>
          </Link>
          <ColorSwitcher />
        </Group>
      </AppShell.Header>

      <AppShell.Aside p="xs">
        <AppShell.Section pb={16}>
          <ClearHistoryButton />
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          <CopyHistory scrollThreshold={29} />
        </AppShell.Section>
      </AppShell.Aside>

      <AppShell.Footer>
        <Group
          maw={"960px"}
          h={"100%"}
          p={"md"}
          // position={"apart"}
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
            <Button leftSection={<IconBrandGithub size={24} />}>
              Open Source
            </Button>
          </Link>
        </Group>
      </AppShell.Footer>
      <AppShell.Main {...rest}>{children}</AppShell.Main>
    </AppShell>
  )
}
