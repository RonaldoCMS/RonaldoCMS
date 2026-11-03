"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { useVisited } from "./progress";
import { COUNTED_PLACES, type Place } from "./world";

/**
 * Barra dei luoghi per i telefoni: un tocco e si è arrivati, senza camminare per tutta la mappa.
 * Scorre in orizzontale; i luoghi già visitati hanno un punto.
 */
export function PlaceDock({ onTravel }: { onTravel: (place: Place) => void }) {
  const { t } = useI18n();
  const visited = useVisited();

  return (
    <nav className="dock" aria-label={t("hud.fastTravelTitle")}>
      <ul className="dock__list">
        {COUNTED_PLACES.map((place) => (
          <li key={place.id}>
            <button
              type="button"
              className={visited.includes(place.id) ? "dock__item is-visited" : "dock__item"}
              onClick={() => onTravel(place)}
              aria-label={t(`places.${place.id}.name`)}
            >
              {t(`places.${place.id}.short`)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
