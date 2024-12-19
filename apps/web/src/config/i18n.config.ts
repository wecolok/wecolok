import { createI18n } from "vue-i18n";
import * as i18nEn from "../assets/i18n/en.json";
import * as i18nFr from "../assets/i18n/fr.json";
import * as i18nJp from "../assets/i18n/jp.json";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: i18nEn,
    fr: i18nFr,
    jp: i18nJp,
  },
});
