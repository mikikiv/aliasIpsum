class AliasEmail {
  private emailPattern: RegExp
  private aliasedEmailPattern: RegExp
  private email: string
  private alias: string
  private formattedTimestamp: string
  rawTimestamp: Date

  constructor(email: string, alias?: string) {
    this.emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.aliasedEmailPattern =
      /^[a-zA-Z0-9._%-]\+[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.email = email
    this.alias = alias || ""

    const timestamp = new Date()
    this.rawTimestamp = timestamp

    this.formattedTimestamp = timestamp
      .toLocaleString("en-US", { hourCycle: "h24" })
      .replace(/[:/]+/g, ".")
      .replace(/,/g, "-")
      .replace(/\s+/g, "")
  }

  validateEmail() {
    return (
      this.emailPattern.test(this.email) ||
      this.aliasedEmailPattern.test(this.email)
    )
  }

  private sanitizeText(text: string) {
    if (text.trim() === "") {
      return ""
    }
    return text.trim().replace(/\s+/g, ".")
  }

  private generateAlias(withTimestamp: boolean): string {
    const sanitizedAlias = this.sanitizeText(this.alias)
    const combinedAlias = `${sanitizedAlias}-${this.formattedTimestamp}`

    const finalAlias = withTimestamp
      ? sanitizedAlias
        ? combinedAlias
        : this.formattedTimestamp
      : sanitizedAlias

    return finalAlias
  }

  private formatAliasedEmail(alias: string): string {
    if (!alias) return this.email
    return this.email.replace(/@/, `+${alias}@`)
  }

  setAlias(newAlias: string) {
    this.alias = newAlias
  }

  getTimestamp() {
    return this.formattedTimestamp
  }

  getRawTimestamp() {
    return this.formattedTimestamp
  }

  public getAliasedEmail(withTimestamp: boolean): string {
    if (!this.validateEmail()) {
      return ""
    }
    const alias = this.generateAlias(withTimestamp)
    return this.formatAliasedEmail(alias)
  }

  getEmail(): string {
    return this.email
  }
}

export default AliasEmail
