import { notFound } from "next/navigation";
import { BrandMark, type BrandVariant } from "@/components/BrandMark";

const VARIANTS: { id: BrandVariant; name: string; note: string }[] = [
  { id: "tile", name: "A · tessera", note: "_R scuro su tessera ambra. È quello usato ora." },
  { id: "plain", name: "B · senza sfondo", note: "_R con la R del colore del testo e l'underscore ambra." },
  { id: "cursor", name: "C · cursore dopo", note: "R_ con il cursore che lampeggia dopo la lettera." },
];

/** Anteprima del marchio `_R`: solo in sviluppo, serve a scegliere la variante. */
export default function BrandPreview() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <article className="doc">
      <header className="doc__head">
        <p className="eyebrow">anteprima</p>
        <h1 className="doc__title" id="panel-title" tabIndex={-1}>
          Marchio _R
        </h1>
        <p className="doc__lead">Tre varianti dello stesso monogramma, a tre dimensioni.</p>
      </header>
      <div className="cards">
        {VARIANTS.map((v) => (
          <section key={v.id} className="card">
            <p className="card__meta">{v.name}</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 24, margin: "12px 0" }}>
              {[96, 48, 24].map((size) => (
                <BrandMark key={size} variant={v.id} size={size} blink />
              ))}
              <div style={{ background: "#0b0e14", color: "#e8eaf0", padding: 12, borderRadius: 12 }}>
                <BrandMark variant={v.id} size={48} blink />
              </div>
            </div>
            <p className="card__text">{v.note}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
