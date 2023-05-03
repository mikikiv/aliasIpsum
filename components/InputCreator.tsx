import {
  Box,
  Card,
  Container,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
  rem,
} from "@mantine/core"
import { IconAlertCircle, IconMail } from "@tabler/icons-react"
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
    //on page load, check if there is a saved email in local storage
    setEmail(localEmail || "")
    //if there is, set the email state to that value and add the timestamp alias to it
    setAliasedEmail(
      addAliasToEmail(localEmail || "", selectedAlias || Date.now().toString())
    )
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
  }

  return (
    <>
      <Container>
        <Grid>
          <Grid.Col span={8} my={"auto"}>
            <Input.Wrapper
              label={"Aliased email"}
              description={
                "Aliased emails are a way to create additional email addresses that forward incoming messages to your primary email account. "
              }
            >
              <Input
                icon={<IconMail size="1rem" />}
                radius={"xl"}
                placeholder="Use your real email, we cannot see anything you input here"
                onChange={handleChangeEmail}
                value={email}
                error={email.length > 0 && !validateEmail(email)}
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
            <Text>{aliasedEmail}</Text>
          </Grid.Col>
          <Grid.Col span={4} my={"auto"}>
            <Select
              clearable
              allowDeselect
              placeholder="Timestamp"
              data={aliases}
              label={"Custom Alias"}
              searchable
              creatable
              onChange={(value) => {
                setSelectedAlias(value as string)
              }}
              getCreateLabel={(query) =>
                `Use "${query.trim().replaceAll(" ", "")}" as alias`
              }
              onCreate={(query) => {
                handleCreateAlias(query)
                return query.trim().replaceAll(" ", "")
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
