import CrudService from "@/services/base/CrudService";
import { AuthPayloadDto } from "@/types/AuthPayload";
import { SignUpDto } from "@/types/AuthPayload";

class Login extends CrudService<AuthPayloadDto> {
  constructor() {
    super("user/signIn");
  }
}

class SignUp extends CrudService<SignUpDto> {
  constructor() {
    super("user/signUp");
  }
}

export const LoginService = new Login();
export const SignUpService = new SignUp();
