# felix-kempf.de

## Stack
Statisch · HTML / CSS / Vanilla JS · kein Build-Tool · GitHub Pages

## Dateistruktur
```
index.html          Hauptseite
impressum.html      Impressum (§5 TMG)
datenschutz.html    Datenschutzerklärung (DSGVO)
404.html            Error-Page (automatisch von GitHub Pages geserved)
style.css           Globales Stylesheet
obf-util.js         Kontakt- und Adress-Obfuskation (alle Seiten)
favicon.svg         Favicon (SVG)
og-image.png        Open Graph Preview-Bild (1200 × 630 px)
portrait.jpg        Profilfoto (Hero, loading="eager")
robots.txt          Crawler-Direktiven
```

## Script-Load-Reihenfolge
1. `fonts/fonts.css` – im `<head>` (lokal, keine Google-Server-Verbindung)
2. `style.css` – im `<head>`
3. Inline `<script>` vor `</body>` – Nav-Toggle + Scroll-Header (nur index.html)
4. `<script src="obf-util.js">` vor `</body>` – alle Seiten

## Obfuskation

### Kontaktfelder (data-Attribute, befüllt von obf-util.js `_v()`)
| Attribut | Bedeutung |
|---|---|
| `data-user` + `data-domain` | E-Mail: user@domain |
| `data-tel` | Telefon (E.164), `data-tel-display` für Anzeige |
| `data-url` | Externer Link, `data-display` für Anzeige |

### Adress-Span (befüllt von obf-util.js `_b()`)
| Element-ID | Seiten | Inhalt |
|---|---|---|
| `obf-addr-street` | impressum.html, datenschutz.html | Menckestraße 6A / 04155 Leipzig / Deutschland |

`_b()` assembles text from string fragments; `\xdf` = ß; `|` = Zeilenumbruch-Marker.

### E-Mail in Datenschutz
Inline-E-Mail im Betroffenenrechte-Absatz: `class="obf-email"` mit `data-user`/`data-domain`; kein mailto-Literal im HTML.

### noscript-Fallbacks
Alle Kontakt-Links und Adress-Spans haben benachbarte `<noscript>`-Elemente mit Klartext-Alternativen (HTML-Entity-kodiert, kein Literal-ß).

## Cookie-Consent
Kein Banner nötig. Keine Analytics, kein Tracking, keine Third-Party-Cookies. Einziger externer Dienst: Google Fonts. Wenn zukünftig Tracking hinzukommt: consent.js mit CFG.version-Muster implementieren.

## Constraints
- Kein `innerHTML` mit externen/nutzergesteuerten Daten
- `target="_blank"` immer mit `rel="noopener noreferrer"`
- `mailto:` nie als Literal – immer via `obf-util.js` (`'mail'+'to:'`)
- Telefon nie im Klartext-HTML – nur `data-tel`-Attribut
- Legal-Pages: `<meta name="robots" content="noindex, follow">`
- index.html: kein `noindex`
- Canonical und OG-URLs: `https://` (nicht `http://`)

## Wenn Heilpraktikererlaubnis erteilt wird
In `impressum.html`: auskommentierten Block über Berufsrechtliche Angaben einkommentieren und ausfüllen.
