import CrudService from "@/services/base/CrudService";
import { AuthPayloadDTO } from "@/utils/DTOs/AuthPayload.dto";
import { SignUpDTO } from "@/utils/DTOs/SignUp.dto";

class Login extends CrudService<AuthPayloadDTO> {
  constructor() {
    super("user/signIn");
  }
}

class SignUp extends CrudService<SignUpDTO> {
  constructor() {
    super("user/signUp");
  }
}

export const LoginService = new Login();
export const SignUpService = new SignUp();
