export interface EmailService {
  sendEmail: (to: string, subject: string, body: string) => Promise<void>;
  notifyUserRegistration: (userEmail: string) => Promise<void>;
  notifyNewOrder: (userEmail: string, orderId: string) => Promise<void>;
  notifyDropOrder: (userEmail: string, orderId: string) => Promise<void>;
  notifyUpdateStateOrder: (userEmail: string, orderId: string, newState: string) => Promise<void>; //poner interfaz de order
}

