export type AliasType = {
  label: string
  value: string
}

export type CopyHistoryType = {
  id: number
  type: string
  value: string
  timestamp?: number
}

export type TotalLocalStorage = [
  { name: "selectedAlias"; value: string },
  { name: "email"; value: string },
  { name: "copyHistory"; value: CopyHistoryType[] },
  { name: "aliases"; value: AliasType[] },
  { name: "timestampEnabled"; value: boolean | "true" | "false" }
]
