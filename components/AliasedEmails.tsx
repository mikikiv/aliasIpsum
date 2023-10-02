import {
  Box,
  Button,
  Card,
  Chip,
  CopyButton,
  Flex,
  Grid,
  Input,
  Paper,
  Select,
  Text,
  Tooltip,
  rem,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { faker } from "@faker-js/faker"
import {
  IconAlertCircle,
  IconCopy,
  IconMail,
  IconSettings,
  IconSettingsCancel,
  IconX,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { colorSelector } from "@/utils/colorSelector"
import { localCopyHistoryAtom } from "./global/CopyHistory"

type Props = { extension?: boolean }
type Alias = {
  label: string
  value: string
}

export default function InputCreator({ extension }: Props) {
  const [email, setEmail] = useLocalStorage({ key: "email", defaultValue: "" })
  const [aliases, setAliases] = useLocalStorage({
    key: "aliases",
    defaultValue: [] as Alias[],
  })
  const [selectedAlias, setSelectedAlias] = useLocalStorage({
    key: "selectedAlias",
    defaultValue: "",
  })
  const [finalEmail, setFinalEmail] = useState("")
  const [realtimeTimestamp, setRealtimeTimestamp] = useState("")
  const [copiedEmail, setCopiedEmail] = useState("")
  const [timestampEnabled, setTimestampEnabled] = useState(true)

  const timestamp = new Date().getTime()

  const updateTimestamp = () => {
    const updatingTimestamp = new Date(Date.now())
      .toLocaleString("en-US", {
        hour12: false,
      })
      .replaceAll(/[:\,]/g, "")
      .replaceAll(/[\/]/g, "_")
      .replace(/\s/g, "-")
    setRealtimeTimestamp(updatingTimestamp)
  }

  useEffect(() => {
    updateTimestamp()
    const interval = setInterval(updateTimestamp, 1000)
    return () => clearInterval(interval)
  }, [])

  const addAliasToEmail = (email: string, alias: string) => {
    if (!email) return ""
    return email.split("@").join(alias ? "+" + alias + "@" : "" + "@")
  }

  useEffect(() => {
    //every time the selected alias changes, update the aliased email
    setFinalEmail(
      timestampEnabled
        ? addAliasToEmail(
            email,
            selectedAlias
              ? `${selectedAlias}-${realtimeTimestamp}`
              : realtimeTimestamp
          )
        : addAliasToEmail(email, selectedAlias)
    )
  }, [email, selectedAlias, realtimeTimestamp])

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setFinalEmail(
      addAliasToEmail(
        e.target.value,
        selectedAlias || new Date(timestamp).getTime().toString()
      )
    )
  }

  const handleCreateAlias = (query: string) => {
    query = query.trim().replaceAll(/\W/g, "")
    if (aliases.find((a) => a.value === query)) return
    if (query.length === 0) return
    setAliases([
      ...aliases,
      { label: query, value: query.trim().replaceAll(/\W/g, "") },
    ])
  }
  const [editingAliases, setEditingAliases] = useState(false)

  const handleDeleteAlias = (alias: string) => {
    const newAliases = aliases.filter((a) => a.value !== alias)
    setAliases(newAliases)
    if (aliases.length === 1) {
      setEditingAliases(false)
      setSelectedAlias("")
    }
  }

  const [copyHistory, setCopyHistory] = useAtom(localCopyHistoryAtom)

  const handleCopyEmail = () => {
    setCopiedEmail(finalEmail)

    if (copyHistory.find((item) => item.value === finalEmail)) return
    setCopyHistory((history) => [
      ...history,
      {
        id: history.length,
        type: "email",
        value: finalEmail,
        timestamp: new Date().getTime(),
      },
    ])
  }

  const generateRandomAlias = () => {
    const generatedWord = faker.word.sample({
      length: { min: 7, max: 13 },
      strategy: "closest",
    })

    handleCreateAlias(generatedWord)
    setSelectedAlias(generatedWord)
  }

  return (
    <Card
      shadow="sm"
      padding={extension ? "xs" : "md"}
      radius="md"
      maw={extension ? "380px" : "100%"}
    >
      <Grid gutter={extension ? 0 : "md"}>
        <Grid.Col span={12}>
          <Text> Aliased Emails</Text>
        </Grid.Col>
        <Grid.Col span={12} data-name={"emailInput"}>
          <Input.Wrapper
            description={
              "Aliased emails are a way to create additional email addresses that forward incoming messages to your primary email account. "
            }
            descriptionProps={
              extension ? { display: "none" } : { display: "block" }
            }
          >
            <Input
              icon={<IconMail size="1rem" />}
              radius={"xl"}
              placeholder="email@example.com"
              onChange={handleChangeEmail}
              value={email}
              // error={email.length > 0 && !validateEmail(email)}
              rightSection={
                <Tooltip
                  label="Your email is only saved to your current browser for your convenience."
                  position="left"
                >
                  <Box>
                    <IconAlertCircle
                      size="1rem"
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </Box>
                </Tooltip>
              }
            />
          </Input.Wrapper>
        </Grid.Col>
        <Grid.Col span={5} my={"xs"}>
          <Button
            fullWidth
            size={extension ? "xs" : "sm"}
            variant="gradient"
            gradient={{ from: "grape", to: "cyan", deg: 145 }}
            onClick={() => generateRandomAlias()}
          >
            Random Alias
          </Button>
        </Grid.Col>
        <Grid.Col span={2}></Grid.Col>
        <Grid.Col span={5} my={"xs"}>
          <Button
            fullWidth
            size={extension ? "xs" : "sm"}
            onClick={() => {
              setEditingAliases(!editingAliases)
            }}
            rightIcon={
              editingAliases ? (
                <IconSettings size="1rem" />
              ) : (
                <IconSettingsCancel size="1rem" />
              )
            }
            disabled={aliases.length === 0}
          >
            {editingAliases ? "Exit Editing" : "Edit Aliases"}
          </Button>
        </Grid.Col>
        {editingAliases ? (
          <>
            <Grid.Col span={12}>
              {aliases.map((alias) => (
                <Button
                  size={extension ? "xs" : "sm"}
                  style={{
                    float: "right",
                  }}
                  fullWidth
                  color={"red"}
                  rightIcon={
                    <IconX
                      size="1rem"
                      style={{ right: 6, position: "absolute" }}
                      onClick={() => handleDeleteAlias(alias.value)}
                    />
                  }
                  key={alias.value}
                >
                  {alias.value}
                </Button>
              ))}
            </Grid.Col>
          </>
        ) : (
          <>
            <Grid.Col span={12} className={"emailEditor"} pb={4}>
              <Paper radius={"xl"}>
                <Flex
                  py={rem(8)}
                  align={"center"}
                  justify={"center"}
                  wrap={"nowrap"}
                >
                  <Box>
                    <Text lineClamp={1} size={extension ? "xs" : "sm"}>
                      {email.indexOf("@") === -1
                        ? email.slice(0, email.length)
                        : email.slice(0, email.indexOf("@")) + "+"}
                    </Text>
                  </Box>
                  <Box px={rem(4)}>
                    <Select
                      size={extension ? "xs" : "sm"}
                      w={extension ? rem(100) : rem(160)}
                      clearable
                      allowDeselect
                      withinPortal
                      placeholder="none"
                      value={selectedAlias}
                      data={aliases}
                      searchable
                      creatable
                      onChange={(value) => {
                        setSelectedAlias(value as string)
                      }}
                      getCreateLabel={(query) =>
                        `Use "${query.trim().replaceAll(/\W/g, "")}" as alias`
                      }
                      onCreate={(query) => {
                        handleCreateAlias(query)
                        return query.trim().replaceAll(/\W/g, "")
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleCreateAlias(e.currentTarget.value)
                          setSelectedAlias(
                            e.currentTarget.value.trim().replaceAll(/\W/g, "")
                          )
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                  </Box>
                  {selectedAlias && timestampEnabled && "-"}
                  <Box px={extension ? rem(1) : rem(6)}>
                    <Chip
                      variant="light"
                      checked={timestampEnabled}
                      size={extension ? "xs" : "sm"}
                      onClick={() => setTimestampEnabled(!timestampEnabled)}
                      color="green"
                      radius={"sm"}
                    >
                      {timestampEnabled ? (
                        "Time"
                      ) : (
                        <Text td="line-through"> Time</Text>
                      )}
                    </Chip>
                  </Box>
                  <Box>
                    <Text
                      ta={"right"}
                      size={extension ? "xs" : "sm"}
                      lineClamp={1}
                    >
                      {email.indexOf("@") > -1 &&
                        email.slice(email.indexOf("@"))}
                    </Text>
                  </Box>
                </Flex>
              </Paper>
            </Grid.Col>
          </>
        )}

        <Grid.Col span={12} onClick={handleCopyEmail}>
          <CopyButton value={finalEmail}>
            {({ copied, copy }) => (
              <>
                <Button
                  size={extension ? "xs" : "md"}
                  h={100}
                  fullWidth
                  variant={copied ? "light" : "outline"}
                  onClick={copy}
                  rightIcon={<IconCopy />}
                  disabled={!validateEmail(email) || email.length === 0}
                  color={colorSelector("email")}
                >
                  {copied ? `Copied ${copiedEmail}` : `${finalEmail}`}
                </Button>
              </>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
