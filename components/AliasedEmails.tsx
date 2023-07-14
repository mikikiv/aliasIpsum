import {
  Box,
  Button,
  Card,
  CopyButton,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
  rem,
} from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"

import {
  IconAlertCircle,
  IconCopy,
  IconMail,
  IconSettings,
  IconSettingsCancel,
  IconX,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

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
  const [aliasedEmail, setAliasedEmail] = useState("")
  const [realtimeTimestamp, setRealtimeTimestamp] = useState("")
  const [copiedEmail, setCopiedEmail] = useState("")

  const timestamp = new Date(Date.now())
    .toISOString()
    .split(".")[0]
    .replaceAll(/[-:]/g, "")
    .replace("T", "-")

  const updateTimestamp = () => {
    const updatingTimestamp = new Date(Date.now())
      .toISOString()
      .split(".")[0]
      .replaceAll(/[-:]/g, "")
      .replace("T", "-")
    setRealtimeTimestamp(updatingTimestamp)
  }

  useEffect(() => {
    updateTimestamp()
    const interval = setInterval(updateTimestamp, 1000)
    return () => clearInterval(interval)
  }, [])

  const addAliasToEmail = (email: string, alias: string) => {
    if (!email) return ""
    return email.split("@").join(`+${alias}@`)
  }

  useEffect(() => {
    //every time the selected alias changes, update the aliased email
    setAliasedEmail(
      addAliasToEmail(
        email,
        selectedAlias
          ? `${selectedAlias}-${realtimeTimestamp}`
          : realtimeTimestamp
      )
    )
  }, [email, selectedAlias, realtimeTimestamp])

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setAliasedEmail(addAliasToEmail(e.target.value, selectedAlias || timestamp))
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

  const handleCopyEmail = () => {
    setCopiedEmail(aliasedEmail)
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
        <Grid.Col span={extension ? 12 : 8}>
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
                  <div>
                    <IconAlertCircle
                      size="1rem"
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </div>
                </Tooltip>
              }
            />
          </Input.Wrapper>
        </Grid.Col>

        <Grid.Col span={extension ? 12 : 4}>
          <Box p={rem(10)}>
            Customize Aliases
            {aliases.length > 0 ? (
              !editingAliases ? (
                <IconSettings
                  size="1rem"
                  style={{
                    opacity: 0.5,
                    float: "right",
                    marginRight: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditingAliases(!editingAliases)
                  }}
                />
              ) : (
                <IconSettingsCancel
                  size="1rem"
                  style={{
                    opacity: 0.5,
                    float: "right",
                    marginRight: 6,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditingAliases(!editingAliases)
                  }}
                />
              )
            ) : null}
            {editingAliases ? (
              <SimpleGrid cols={1} spacing={5}>
                {aliases.map((alias) => (
                  <Button
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
              </SimpleGrid>
            ) : (
              <Select
                clearable
                allowDeselect
                placeholder="Timestamp"
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
            )}
          </Box>
        </Grid.Col>

        <Grid.Col span={12} onClick={handleCopyEmail}>
          <CopyButton value={aliasedEmail}>
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
                >
                  {copied ? `Copied ${copiedEmail}` : `${aliasedEmail}`}
                </Button>
              </>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
