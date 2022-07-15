import { EMAIL_REGEXP } from "@/constants/regexp";
import { i18nInstance } from "@/i18n/i18n";
const { t } = i18nInstance.global;
export const FormRules = Object.freeze({
  required: (value: string) => !!value || t("rules.fieldRequired"),
  maxLength: (number: number) => (value: string) =>
    value.length < number ||
    t("rules.tooMuchCharacters", { maxLength: number }),
  minLength: (number: number) => (value: string) =>
    value.length > number ||
    t("rules.notEnoughCharacters", { minLength: number }),
  isEmail: (value: string) =>
    EMAIL_REGEXP.test(value) || t("rules.invalidEmail"),
  numberLowerThan: (number: number) => (value: number) =>
    value < number ||
    typeof value !== "number" ||
    t("rules.numberLowerThan", { number }),
  numberHigherThan: (number: number) => (value: number) =>
    value > number ||
    typeof value !== "number" ||
    t("rules.numberHigherThan", { number }),
});
