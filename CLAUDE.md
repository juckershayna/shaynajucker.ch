# Hinweise für Claude

- Änderungen immer direkt auf `main` pushen (zusätzlich zum Arbeitsbranch). Keine Pull Requests, ausser ausdrücklich gewünscht.

## Zweisprachigkeit (DE/EN)

- Die ganze Website muss auf Deutsch komplett deutsch und auf Englisch komplett englisch sein.
- Texte mit Schlüssel: `data-i18n="..."` im HTML, Übersetzungen in `js/lang.js` (`SJ_LANG.de` / `SJ_LANG.en`).
- Feste Texte ohne Schlüssel (Skills, Navigation, Portfolio-Unterseiten, Seitentitel): Paar `[Deutsch, Englisch]` in `SJ_PAIRS` in `js/lang.js` eintragen. Der Text im HTML muss exakt einer der beiden Seiten entsprechen.
- Die gewählte Sprache liegt in `localStorage` unter `sj_lang`; die Arbeitsproben-Seiten und `js/pw-protect.js` lesen sie ebenfalls.
- Nach Änderungen an `js/lang.js` die Versionsnummer `lang.js?v=…` in allen HTML-Dateien erhöhen.

## Bewerbungsplan

- Shaynas Bewerbungsplan ist das Artifact https://claude.ai/artifact/1WzTSmdLH5GXn8BjjMYxpP (auch unter `/plan`).
- Jede neue, umbenannte oder gelöschte Bewerbungsseite im selben Arbeitsschritt dort nachführen, über die Datenbank des Artifacts (`ArtifactData`), Sammlung `seiten`. Das Artifact dafür nicht neu veröffentlichen.
- Dokument pro Firma: `doc_id` = Firmen-id im Plan (z. B. `ubs`, `migros`, `on-partnerships`; vorher mit `list` nachsehen), Felder `firm`, `page` (Pfad ohne `.html`, z. B. `ubs`).
- Neue Firma, die noch nicht im Plan steht: neue `doc_id` wählen und zusätzlich `title` (Stelle) und kurz `hint` setzen. Sie erscheint dann unter «Stellen › Jobs bereit» im Abschnitt «Neue Bewerbungsseiten». (Gruppen A/B/C gibt es nicht mehr; `group` wird ignoriert.)
- Der Plan hat den Menüpunkt «Stellen» mit «Jobs bereit» (Bewerbungsseite fertig, noch nicht beworben) und «In Bearbeitung» (Seite fehlt noch).
- Screenshots: Shayna lädt sie unten im Plan hoch, Claude liest sie direkt im Plan und legt den Eintrag in `funde` an. Kann der Plan Claude nicht fragen, landen sie in der Sammlung `uploads` (`shots` = Asset-ids, `state: 'offen'`). Auf «Screenshots im Plan eintragen» hin: offene `uploads` ansehen (Asset unter `/_blob/<id>`), daraus Einträge in `funde` erstellen (`decision: 'ja'`, bei verschickter Bewerbung `status: 'beworben'`, `sent: true`, `sentAt`) und `state` auf `'erledigt'` setzen.
- Seite gelöscht: das Dokument in `seiten` löschen. Firma soll ganz aus dem Plan: auch den Eintrag im Artifact entfernen (Artifact lesen, ändern, neu veröffentlichen).
