import {
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
  rem,
} from "@mantine/core"
import { IconAlertCircle, IconCopy, IconMail } from "@tabler/icons-react"
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

  return (
    <Card>
      <Container>
        <Grid>
          <Grid.Col span={1} my={"auto"}></Grid.Col>
          <Grid.Col span={10} my={"auto"}>
            <Text> Aliased Emails</Text>
          </Grid.Col>
          <Grid.Col span={1} my={"auto"}></Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={1} my={"auto"}></Grid.Col>
          <Grid.Col span={7} my={"auto"}>
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
          <Grid.Col span={3} my={"auto"}>
            <Select
              clearable
              allowDeselect
              placeholder="Timestamp"
              data={aliases}
              label={"Customize Alias"}
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
          </Grid.Col>
          <Grid.Col span={1} my={"auto"}></Grid.Col>
          <CopyButton value={aliasedEmail}>
            {({ copied, copy }) => (
              <>
                <Button
                  variant="outline"
                  h={100}
                  w={"100%"}
                  mt={rem(10)}
                  sx={{ float: "right" }}
                  onClick={copy}
                  rightIcon={<IconCopy />}
                  disabled={!validateEmail(email) || email.length === 0}
                >
                  {copied ? `Copied ${aliasedEmail}` : `${aliasedEmail}`}
                </Button>
              </>
            )}
          </CopyButton>
        </Grid>
      </Container>
    </Card>
  )
}
