import type { EmailService } from "../email-service.js";

export class MockedEmailService implements EmailService {
  sent: { to: string; subject: string; body: string }[] = [];

  async sendEmail(to: string, subject: string, body: string) {
    this.sent.push({ to, subject, body });
  }
}