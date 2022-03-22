import { AuthPayload } from "@/types/AuthPayload";

export class AuthPayloadDTO implements AuthPayload {
  email: string;
  password: string;

  constructor(authPayload: AuthPayload) {
    const { email, password } = authPayload;
    this.email = email;
    this.password = password;
  }
}
