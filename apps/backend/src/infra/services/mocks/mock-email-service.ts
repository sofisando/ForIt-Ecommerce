import type { EmailService } from "@forit/domain/src/services/email-service.js";

export class MockedEmailService implements EmailService {
  sent: { to: string; subject: string; body: string }[] = [];

  async sendEmail(to: string, subject: string, body: string) {
    this.sent.push({ to, subject, body });
  }
}