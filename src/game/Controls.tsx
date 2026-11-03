"use client";

import { IconMoon, IconSun } from "@/components/icons";
import { otherLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { setTheme, useTheme } from "./theme";

/** Pulsante della lingua: mostra quella a cui si passa (IT <-> EN). */
export function LangButton({ onSwitch }: { onSwitch: () => void }) {
  const { locale, t } = useI18n();
  const next = otherLocale(locale).toUpperCase();
  return (
    <button type="button" className="lang-btn" onClick={onSwitch} aria-label={`${t("ui.language")}: ${next}`} title={t("ui.language")}>
      {next}
    </button>
  );
}

/** Pulsante giorno/notte. */
export function ThemeButton() {
  const { t } = useI18n();
  const theme = useTheme();
  const label = theme === "dark" ? t("ui.themeToLight") : t("ui.themeToDark");
  return (
    <button type="button" className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={label} title={label}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
