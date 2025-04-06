import { Notyf } from "notyf";

class Notification {
  private static instance: Notification;
  private notyf: Notyf;

  private constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      position: { x: "right", y: "bottom" },
      dismissible: true,
    });
  }

  public static getInstance(): Notification {
    if (!Notification.instance) {
      Notification.instance = new Notification();
    }
    return Notification.instance;
  }

  error(message: string) {
    this.notyf.error(message);
  }

  success(message: string) {
    this.notyf.success(message);
  }
}

export default Notification.getInstance();
