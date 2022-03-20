import { AuthPayload } from "@/types/AuthPayload";

export class AuthPayloadDTO implements AuthPayload {
  username: string;
  password: string;

  constructor(authPayload: AuthPayload) {
    const { username, password } = authPayload;
    this.username = username;
    this.password = password;
  }
}
