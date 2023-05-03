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

  useEffect(() => {
    const localEmail = localStorage.getItem("email")
    setEmail(localEmail || "")
    const localAliases = localStorage.getItem("aliases")
    setAliases(
      localAliases && localAliases.length > 2
        ? JSON.parse(localAliases)
        : [
            { label: "timestamp", value: Date.now().toString() },
            { label: "timestamp2", value: "moretext" },
          ]
    )
  }, [])

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    localStorage.setItem("email", e.target.value)
  }

  const [selectedAlias, setSelectedAlias] = useState("timestamp")
  const aliasedEmail = email.split("@").join(`+${selectedAlias}@`)
  const handleCreateAlias = (query: string) => {
    const newAlias = {
      label: query,
      value: query.trim().replaceAll(" ", ""),
    }
    setAliases((current) => [...current, newAlias])
  }

  useEffect(() => {
    localStorage.setItem("aliases", JSON.stringify(aliases))
  }, [aliases])

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
              defaultValue={selectedAlias}
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
