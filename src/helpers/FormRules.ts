import { EMAIL_REGEXP } from "@/constants/regexp";
import { i18nInstance } from "@/i18n/i18n";
const { t } = i18nInstance.global;
export class FormRules {
  static required = (value: string) => !!value || t("rules.fieldRequired");
  static maxLength = (number: number) => (value: string) =>
    value.length < number ||
    t("rules.tooMachCharacters", { maxLength: number });
  static isEmail = (value: string) =>
    EMAIL_REGEXP.test(value) || t("rules.invalidEmail");
  static numberLowerThan = (number: number) => (value: number) =>
    value < number || t("rules.numberLowerThan", { number });
  static numberHigherThan = (number: number) => (value: number) =>
    value > number || t("rules.numberHigherThan", { number });
}
