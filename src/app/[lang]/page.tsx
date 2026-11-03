import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { COUNTED_PLACES } from "@/game/world";

type Props = { params: Promise<{ lang: string }> };

/** Pagina iniziale: la scheda di benvenuto sopra al mondo, con i collegamenti a tutti i luoghi. */
export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="intro__card" aria-labelledby="home-title">
      <h1 className="intro__title" id="home-title">
        {dict.home.title}
        <span className="accent">{dict.home.tagline}</span>
      </h1>
      <p className="intro__lead">{dict.home.lead}</p>
      <p className="status">
        <span className="status__dot" aria-hidden="true" />
        {dict.home.status}
      </p>
      <ul className="intro__places" aria-label={dict.ui.worldLabel}>
        {COUNTED_PLACES.map((place) => (
          <li key={place.id}>
            <Link href={localizedPath(lang, place.route ?? "/")}>{dict.places[place.id].name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
