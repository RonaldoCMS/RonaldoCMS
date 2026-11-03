# Sviluppo del sito

Il sito [danubbio.it](https://danubbio.it) è in questo repository. Questa pagina spiega come è fatto e come si lavora.

## Come è fatto

- **Next.js 16** (App Router) con React 19 e TypeScript, pagine prerenderizzate.
- **Il mondo non usa un motore di gioco**: è SVG e DOM con un ciclo `requestAnimationFrame`. Così i colori seguono il tema, gli edifici sono veri collegamenti e tutto resta accessibile.
- **Logica di gioco pura e testata** in `src/game/engine/`: movimento con collisioni, ricerca del percorso (A\*), camera e prossimità.
- **Internazionalizzazione** con `proxy.ts` e il segmento `[lang]`, senza librerie esterne. Interfaccia in `src/messages/`, testi delle pagine in `src/content/`.
- **Modulo di contatto** con Server Action, validazione `zod`, trappola per bot e invio con [Resend](https://resend.com).

```
src/
  app/[lang]/       pagine, layout, immagine di anteprima
  actions/          Server Action (invio del modulo)
  components/       marchio _R, contenuti, finestre
  content/          testi di ogni luogo (it, en)
  game/             mondo, personaggio, interfaccia, terminale
    engine/         movimento, percorsi, camera (con test)
    art/            edifici, alberi, terreno in SVG
  i18n/             lingue, percorsi, traduzioni
  messages/         testi dell'interfaccia (it, en)
cv/                 curriculum in PDF (italiano e inglese) e relativo generatore
docs/               questa documentazione e le immagini del README
e2e/                test end-to-end (Playwright)
```

## Comandi

Serve Node 20.9 o successivo.

```bash
npm install
cp .env.example .env.local   # poi compila le variabili
npm run dev                  # http://localhost:3000
```

| Comando | Cosa fa |
|---|---|
| `npm run dev` | server di sviluppo |
| `npm run build` e `npm start` | versione di produzione |
| `npm run lint` | ESLint |
| `npm run typecheck` | controllo dei tipi |
| `npm test` | test unitari (Vitest): motore, traduzioni, contenuti, curriculum |
| `npm run test:e2e` | test end-to-end e di accessibilità (Playwright, avvia da solo il sito) |
| `npm run cv` | rigenera i PDF del curriculum in `cv/` |

Al primo uso dei test end-to-end e del curriculum: `npx playwright install chromium`.

## Variabili d'ambiente

Vedi [`.env.example`](../.env.example). Senza `RESEND_API_KEY` il modulo di contatto risponde che non è ancora attivo; tutto il resto funziona.

## Pubblicazione

Il sito è pensato per [Vercel](https://vercel.com); `vercel.json` fissa il preset su Next.js (un progetto Vercel nato per il vecchio sito statico altrimenti cerca una cartella `public`). Il dominio principale è `danubbio.it` (senza `www`, lo stesso di `SITE_URL`). I redirect degli altri indirizzi (`www.danubbio.it`, `ronaldocms.it`, `www.ronaldocms.it`) si configurano su Vercel e nel DNS, non nel codice: due redirect in direzioni opposte mandano il sito in un ciclo infinito. Per far partire gli invii serve un dominio verificato su Resend.

La versione precedente del sito, statica, è nel tag `legacy-static`.

## Regole sui contenuti

I testi in `src/content/` e nel curriculum seguono regole concordate (nessun nome di cliente, nessuna affermazione che non si possa dimostrare). I test controllano le parole vietate: se ne aggiungi di nuove, esegui `npm test`.
