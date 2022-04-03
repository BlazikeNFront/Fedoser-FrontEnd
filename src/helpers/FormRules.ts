import { EMAIL_REGEXP } from "@/constants/regexp";
import { i18nInstance } from "@/i18n/i18n";
const { t } = i18nInstance.global;
export class FormRules {
  static required = (v: string) => !!v || t("rules.fieldRequired");
  static maxLength = (number: number) => (v: string) =>
    v.length < number || t("rules.tooMachCharacters", { maxLength: number });
  static isEmail = (v: string) =>
    EMAIL_REGEXP.test(v) || t("rules.invalidEmail");
}
