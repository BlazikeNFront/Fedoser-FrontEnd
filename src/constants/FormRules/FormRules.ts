import { EMAIL_REGEXP } from "@/constants/regexp";
export class FormRules {
  static required = (v: string) => !!v || "Empty field";
  static maxLength = (number: number) => (v: string) =>
    v.length < number || "Too much chars";
  static isEmail = (v: string) => EMAIL_REGEXP.test(v) || "Invalid email";
}
