import { createI18n } from "vue-i18n";
import { nextTick } from "vue";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
export const SUPPORT_LOCALES = ["en", "pl"];
const FALLBACK_LOCALE = "en";

function getUserLanguage() {
  const userSavedLanguage = localStorage.getItem(
    LocalStorageKeys.USER_LANGUAGE
  );
  if (userSavedLanguage) return userSavedLanguage;
  return navigator.language ? navigator.language : FALLBACK_LOCALE;
}
export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/i18n/locales/${locale}.json`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }

  document.querySelector("html")?.setAttribute("lang", locale);
}
export function setupI18n() {
  const initialLanguage = getUserLanguage();
  const i18n = createI18n({
    legacy: false,
    mode: "composition",
    locale: initialLanguage,
    globalInjection: true,
    fallbackLocale: FALLBACK_LOCALE,
    messages: import(`@/i18n/locales/${initialLanguage}`),
  });

  return i18n;
}

export const i18n = setupI18n();
