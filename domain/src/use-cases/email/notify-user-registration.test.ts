import { describe, test, expect } from "vitest";
import { MockedEmailService } from "../../services/mocks/mock-email-service";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { notifyUserRegistration } from "./notify-user-registration";

describe("notifyUserRegistration", () => {
  const emailService = new MockedEmailService();

  test("should send email when succes registration", async () => {
    const userService = new MockedUserService([userMock({ email: "prueba@gmail.com"})])

    const result = await notifyUserRegistration(
      {
        emailService,
        userService,
      },
      { email: "prueba@gmail.com" }
    );

    expect(result).toBeUndefined(); //porque es void
    expect(emailService.sent.length).toBe(1);
    expect(emailService.sent[0]).toMatchObject({
      to: "prueba@gmail.com",
      subject: "¡Bienvenido!",
    });
  });

  test("should return error when user not found", async () => {
    const userService = new MockedUserService([]) ;
    const result = await notifyUserRegistration(
      {
        emailService,
        userService,
      },
      { email: "prueba@gmail.com" }
    );

    expect(result).toStrictEqual(Error("User not found"));
  });
});
