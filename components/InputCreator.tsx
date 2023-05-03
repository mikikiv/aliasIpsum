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

import {
  IconAlertCircle,
  IconCopy,
  IconMail,
  IconSettings,
  IconSettingsCancel,
  IconX,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

type Props = {}
type Alias = {
  label: string
  value: string
}

export default function InputCreator({}: Props) {
  const [email, setEmail] = useState("")
  const [aliases, setAliases] = useState([] as Alias[])
  const [selectedAlias, setSelectedAlias] = useState("")
  const [aliasedEmail, setAliasedEmail] = useState("")

  const addAliasToEmail = (email: string, alias: string) => {
    return email.split("@").join(`+${alias}@`)
  }

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    setEmail(localEmail || "")
    // check for aliases in local storage
    const localAliases = localStorage.getItem("aliases")
    if (localAliases) {
      setAliases(JSON.parse(localAliases))
    }
  }, [])

  useEffect(() => {
    //every time the selected alias changes, update the aliased email
    setAliasedEmail(
      addAliasToEmail(email, selectedAlias || Date.now().toString())
    )
  }, [email, selectedAlias])

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setAliasedEmail(
      addAliasToEmail(e.target.value, selectedAlias || Date.now().toString())
    )
    localStorage.setItem("email", e.target.value)
  }

  const handleCreateAlias = (query: string) => {
    const newAlias = {
      label: query,
      value: query.trim().replaceAll(" ", ""),
    }
    setAliases((current) => [...current, newAlias])
    localStorage.setItem("aliases", JSON.stringify([...aliases, newAlias]))
  }
  const [editingAliases, setEditingAliases] = useState(false)

  const handleDeleteAlias = (alias: string) => {
    const newAliases = aliases.filter((a) => a.value !== alias)
    setAliases(newAliases)
    localStorage.setItem("aliases", JSON.stringify(newAliases))
    if (aliases.length === 1) {
      setEditingAliases(false)
    }
  }

  return (
    <Card shadow="sm" padding="md" radius="md">
      <Grid>
        <Grid.Col span={12}>
          <Text> Aliased Emails</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Input.Wrapper
            description={
              "Aliased emails are a way to create additional email addresses that forward incoming messages to your primary email account. "
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
        <Grid.Col span={4}>
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
              />
            )}
          </Box>
        </Grid.Col>
        <Grid.Col span={12}>
          <CopyButton value={aliasedEmail}>
            {({ copied, copy }) => (
              <>
                <Button
                  size={"md"}
                  h={100}
                  fullWidth
                  variant={copied ? "light" : "outline"}
                  onClick={copy}
                  rightIcon={<IconCopy />}
                  disabled={!validateEmail(email) || email.length === 0}
                >
                  {copied ? `Copied ${aliasedEmail}` : `${aliasedEmail}`}
                </Button>
              </>
            )}
          </CopyButton>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
