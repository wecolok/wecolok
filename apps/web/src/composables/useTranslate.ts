import { useI18n } from "vue-i18n";

export function useTranslate() {
  const { t } = useI18n();
  const translate = (key: string, params = {}) => t(key, params);
  return { translate };
}
