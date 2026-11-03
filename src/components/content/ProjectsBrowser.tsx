"use client";

import { useState } from "react";
import type { Card, ProjectCategory } from "@/content/types";
import { useI18n } from "@/i18n/I18nProvider";
import { CardView } from "./CardView";

const FILTERS: ("all" | ProjectCategory)[] = ["all", "web", "mobile", "backend", "games"];

/** Elenco di progetti con filtri per categoria. */
export function ProjectsBrowser({ items }: { items: Card[] }) {
  const { locale, t } = useI18n();
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const visible = items.filter((card) => filter === "all" || card.categories?.includes(filter));

  return (
    <div className="projects">
      <div className="filters" role="group" aria-label={t("projects.filterLabel")}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {t(`projects.${f}`)}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="note">{t("projects.none")}</p>
      ) : (
        <div className="cards">
          {visible.map((card) => (
            <CardView key={card.title} card={card} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
