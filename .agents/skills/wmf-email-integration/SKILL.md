---
name: wmf-email-integration
description: Use when changing email confirmation, password reset, SMTP configuration, MailerService, Handlebars templates, MJML sources, verification tokens, or email-related tests in the Winnipeg Music Festival NestJS backend.
license: UNLICENSED
metadata:
  author: wmf-nest
  version: '1.0.0'
---

# Winnipeg Music Festival Email Integration

Use the existing global email architecture and keep email delivery separate from domain services where possible.

## Configuration

The mailer uses `@nestjs-modules/mailer` through the global email module. Configure SMTP through environment-backed `ConfigService` values:

- `EMAIL_SERVER`
- `SENDING_SMTP_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`

The established default is secure SMTP on port 465. Never hard-code credentials or include them in logs, exceptions, tests, or templates.

## Services and templates

Use the existing `EmailService` wrapper and its `sendMail(options)` method. Templates are Handlebars files under `src/email/templates/`; MJML sources are compiled to Handlebars for production use. Keep CSS compatible with email clients and preserve WMF branding and responsive layout when editing templates.

Known template context:

- `confirmation-email.hbs`: `name`, `confirmationLink`
- `password-reset-template.hbs`: `email`, `resetLink`

When adding a template, edit the `.mjml` source file under `src/email/templates/` and regenerate the matching `.hbs` file with the `mjml` CLI (e.g. `npx mjml src/email/templates/<name>.mjml -o src/email/templates/<name>.hbs`); never hand-edit the compiled `.hbs` file.

## Token flows

Email confirmation and password reset share the same JWT secret and expiration setting, but deliver different links:

- `JWT_VERIFICATION_TOKEN_SECRET`
- `JWT_VERIFICATION_TOKEN_EXPIRATION_TIME`
- `EMAIL_CONFIRMATION_URL`
- `PASSWORD_RESET_URL`

Sign only the minimum required payload and use the configured expiration. Confirmation should be one-time. Password reset must verify that the user has a pending reset request (`user.passwordResetPending === true`) before updating the password, and clear that flag afterwards.

The confirmation controller exposes the established REST endpoints for confirming email, resending confirmation links, and resending password links. Preserve its `BadRequestException` behavior for invalid, expired, or already-completed flows.

Example verification token setup:

```typescript
const token = this.jwtService.sign(
  { email },
  {
    secret: this.configService.getOrThrow('JWT_VERIFICATION_TOKEN_SECRET'),
    expiresIn: `${this.configService.getOrThrow('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
  },
)

await this.emailService.sendMail({
  to: email,
  template: 'confirmation-email',
  context: { name, confirmationLink: `${confirmationUrl}?token=${token}` },
})
```

Keep token creation and delivery behind the email-confirmation service; controllers should validate the request and delegate.

## Verification checklist

- Email sending is mocked in tests; no real SMTP delivery occurs.
- Secrets, tokens, and passwords never appear in logs or response messages.
- Both success and failure paths are covered.
- Template variables match the service context exactly.
- Configuration is read from environment-backed services.
- Build or focused tests verify TypeScript, template paths, and controller behavior.
