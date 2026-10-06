# Hinweise für Claude

- Änderungen immer direkt auf `main` pushen (zusätzlich zum Arbeitsbranch). Keine Pull Requests, ausser ausdrücklich gewünscht.

## Zweisprachigkeit (DE/EN)

- Die ganze Website muss auf Deutsch komplett deutsch und auf Englisch komplett englisch sein.
- Texte mit Schlüssel: `data-i18n="..."` im HTML, Übersetzungen in `js/lang.js` (`SJ_LANG.de` / `SJ_LANG.en`).
- Feste Texte ohne Schlüssel (Skills, Navigation, Portfolio-Unterseiten, Seitentitel): Paar `[Deutsch, Englisch]` in `SJ_PAIRS` in `js/lang.js` eintragen. Der Text im HTML muss exakt einer der beiden Seiten entsprechen.
- Die gewählte Sprache liegt in `localStorage` unter `sj_lang`; die Arbeitsproben-Seiten und `js/pw-protect.js` lesen sie ebenfalls.
- Nach Änderungen an `js/lang.js` die Versionsnummer `lang.js?v=…` in allen HTML-Dateien erhöhen.
