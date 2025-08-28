class AliasEmail {
  private emailPattern: RegExp
  private aliasedEmailPattern: RegExp
  private email: string
  private alias: string
  private timestamp: string

  constructor(email: string, alias?: string) {
    this.emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.aliasedEmailPattern =
      /^[a-zA-Z0-9._%-]\+[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.email = email
    this.alias = alias || ""
    this.timestamp = new Date()
      .toLocaleString("en-US", { hourCycle: "h24" })
      .replace(/[:\/]+/g, ".")
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

  private addAliasToEmail() {
    this.alias = this.sanitizeText(this.alias)

    const addAliasText = this.alias.length > 0 ? `+${this.alias}` : ""

    return this.email.replace(/@/, `${addAliasText}@`)
  }

  setAlias(newAlias: string) {
    this.alias = newAlias
  }

  getTimestamp() {
    return this.timestamp
  }

  getAliasedEmail(withTimestamp?: boolean): string {
    if (!this.validateEmail) {
      return "Email is invalid"
    }
    this.alias = withTimestamp ? `${this.alias}-${this.timestamp}` : this.alias
    return this.addAliasToEmail()
  }

  getEmail(): string {
    return this.email
  }
}

export default AliasEmail
