import AliasEmail from "./aliasEmail"

describe("EmailAlias", () => {
  describe("Constructor", () => {
    const emailAddress = "test@example.com"
    const emailAlias = new AliasEmail(emailAddress)
    const workEmailAlias = new AliasEmail(emailAddress, "work")
    const emptyEmailAlias = new AliasEmail(emailAddress, "")
    const timestamp = emailAlias.getTimestamp()

    it("should create instance with email and alias", () => {
      expect(emailAlias.getEmail()).toBe(emailAddress)
    })

    it("should create instance with email only and generate default alias", () => {
      expect(workEmailAlias.getAliasedEmail(false)).toBe(
        "test+work@example.com"
      )
    })

    it("should handle empty string alias", () => {
      expect(emptyEmailAlias.getAliasedEmail(false)).toBe(emailAddress)
    })

    it("It includes a timestamp when it should for simple aliases", () => {
      expect(emailAlias.getAliasedEmail(true)).toContain(timestamp)
    })

    it("It includes a timestamp when it should for added aliases", () => {
      const timestampedEmail = workEmailAlias.getAliasedEmail(true)
      expect(timestampedEmail).toContain(timestamp)
      expect(timestampedEmail).not.toMatch(/test\+-.+@example.com/)
    })

    it("It includes a timestamp when it should when alias provided is empty", () => {
      const timestampedEmail = emptyEmailAlias.getAliasedEmail(true)
      expect(timestampedEmail).toContain(timestamp)
      expect(timestampedEmail).not.toMatch(/test\+-.+@example.com/)
    })
  })

  describe("Email Validation", () => {
    it("should validate correct email formats", () => {
      const validEmails = ["user@example.com", "user.name@domain.co.uk"]
      for (const email of validEmails) {
        expect(new AliasEmail(email).validateEmail()).toBe(true)
      }
    })

    it("should reject invalid email formats", () => {
      const invalidEmails = [
        "invalid-email",
        "user@",
        "@domain.com",
        "user.domain.com",
        "user@domain",
        "user space@domain.com",
      ]
      for (const email of invalidEmails) {
        expect(new AliasEmail(email).validateEmail()).toBe(false)
      }
    })

    it("should return empty string when email is invalid", () => {
      const invalidEmail = "invalid-email@"

      expect(new AliasEmail(invalidEmail).getAliasedEmail(true)).toBeFalsy()
    })

    it("should reject emails that already have aliases", () => {
      const aliasedEmails = [
        "user+alias@example.com",
        "user+tag+another@domain.org",
        "name+123@test.co.uk",
      ]
      for (const email of aliasedEmails) {
        expect(new AliasEmail(email).validateEmail()).toBe(false)
      }
    })
  })

  describe("Alias Generation", () => {
    it("should sanitize alias by replacing spaces with dots", () => {
      const emailAlias = new AliasEmail("user@example.com", "work space")
      expect(emailAlias.getAliasedEmail(false)).toBe(
        "user+work.space@example.com"
      )
    })

    it("should handle multiple spaces in alias", () => {
      const emailAlias = new AliasEmail("user@example.com", "work  space   tag")
      expect(emailAlias.getAliasedEmail(false)).toBe(
        "user+work.space.tag@example.com"
      )
    })

    it("should trim whitespace from alias", () => {
      const emailAlias = new AliasEmail("user@example.com", "  work  ")
      expect(emailAlias.getAliasedEmail(false)).toBe("user+work@example.com")
    })
  })

  describe("Dynamic Alias Changes", () => {
    it("should allow updating alias", () => {
      const emailAlias = new AliasEmail("user@example.com", "initial")

      expect(emailAlias.getAliasedEmail(false)).toBe("user+initial@example.com")

      emailAlias.setAlias("updated")

      expect(emailAlias.getAliasedEmail(false)).toBe("user+updated@example.com")
    })

    it("should handle empty alias update", () => {
      const emailAlias = new AliasEmail("user@example.com", "initial")
      emailAlias.setAlias("")
      expect(emailAlias.getAliasedEmail(false)).toBe("user@example.com")
    })
  })

  describe("Edge Cases", () => {
    it("should handle special characters in alias", () => {
      const emailAlias = new AliasEmail("user@example.com", "work@#$%^&*()")
      expect(emailAlias.getAliasedEmail(false)).toBe(
        "user+work@#$%^&*()@example.com"
      )
    })

    it("should handle very long aliases", () => {
      const longAlias = "a".repeat(100)
      const emailAlias = new AliasEmail("user@example.com", longAlias)
      expect(emailAlias.getAliasedEmail(false)).toBe(
        `user+${longAlias}@example.com`
      )
    })

    it("should handle unicode characters in email", () => {
      const emailAlias = new AliasEmail("user.name@example.com", "work")
      expect(emailAlias.getAliasedEmail(false)).toBe(
        "user.name+work@example.com"
      )
    })

    it("should preserve email case", () => {
      const emailAlias = new AliasEmail("User@Example.COM", "work")
      expect(emailAlias.getAliasedEmail(false)).toBe("User+work@Example.COM")
    })
  })

  it("should generate unique timestamps for multiple instances of the same email", async () => {
    const emailAddress = "test@example.com"

    // Create first instance
    const firstAlias = new AliasEmail(emailAddress, "first")
    const firstTimestamp = firstAlias.getTimestamp()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create second instance with same email
    const secondAlias = new AliasEmail(emailAddress, "second")
    const secondTimestamp = secondAlias.getTimestamp()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create third instance with same email
    const thirdAlias = new AliasEmail(emailAddress, "third")
    const thirdTimestamp = thirdAlias.getTimestamp()

    // All timestamps should be different
    expect(firstTimestamp).not.toBe(secondTimestamp)
    expect(secondTimestamp).not.toBe(thirdTimestamp)
    expect(firstTimestamp).not.toBe(thirdTimestamp)
  })
})
