interface EmailAliasResult {
  aliasedEmail: string;
  email: string;
  alias: string;
  createdAt: Date;
  error: string | false;
  isValid: boolean;
}

class EmailAlias {
  private emailPattern: RegExp;
  private aliasedEmailPattern: RegExp;
  private email: string;
  private alias: string;
  private timestamp: Date;

  constructor(email: string, alias?: string) {
    this.emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.aliasedEmailPattern = /^[a-zA-Z0-9._%-]\+[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.email = email;
    this.alias = alias || '';
    this.timestamp = new Date();
  }

  private validateEmail(email: string): string | false {
    if (!this.emailPattern.test(email)) {
      return "Invalid email address format";
    }
    if (this.aliasedEmailPattern.test(email)) {
      return "Email already contains an alias";
    }
    return false;
  }

  private generateDefaultAlias(): string {
    return this.timestamp.toISOString().slice(0, -5).replace(/:/g, ".");
  }

  private sanitizeAlias(alias: string): string {
    if (!alias || alias.trim() === "") {
      return this.generateDefaultAlias();
    }
    return alias.trim().replace(/\s+/g, ".");
  }

  private addAliasToEmail(alias: string): string {
    const sanitizedAlias = this.sanitizeAlias(alias);
    this.alias = sanitizedAlias;
    return this.email.replace(/@/, `+${sanitizedAlias}@`);
  }

  /**
   * Returns just the aliased email string
   */
  getAliasedEmail(): string {
    const validationError = this.validateEmail(this.email);
    if (validationError) {
      return "";
    }
    return this.addAliasToEmail(this.alias);
  }

  /**
   * Returns a comprehensive object with all email alias information
   */
  getAliasedEmailObject(): EmailAliasResult {
    const validationError = this.validateEmail(this.email);
    const sanitizedAlias = this.sanitizeAlias(this.alias);
    
    return {
      aliasedEmail: validationError ? "" : this.addAliasToEmail(sanitizedAlias),
      email: this.email,
      alias: sanitizedAlias,
      createdAt: this.timestamp,
      error: validationError,
      isValid: !validationError
    };
  }

  /**
   * Updates the alias for the email
   */
  setAlias(alias: string): void {
    this.alias = alias;
  }

  /**
   * Gets the current alias
   */
  getAlias(): string {
    return this.alias;
  }

  /**
   * Gets the original email
   */
  getEmail(): string {
    return this.email;
  }

  /**
   * Gets the creation timestamp
   */
  getCreatedAt(): Date {
    return this.timestamp;
  }

  /**
   * Checks if the email is valid
   */
  isValid(): boolean {
    return !this.validateEmail(this.email);
  }
}

// Utility functions for backward compatibility
const aliasedEmail = (email: string, alias?: string): string => {
  return new EmailAlias(email, alias).getAliasedEmail();
};

const aliasedEmailObject = (email: string, alias?: string): EmailAliasResult => {
  return new EmailAlias(email, alias).getAliasedEmailObject();
};

export { EmailAlias, aliasedEmail, aliasedEmailObject };
export type { EmailAliasResult };
export default EmailAlias;