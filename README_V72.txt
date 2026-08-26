V72 — Preview local con estado oficial

Al abrir index.html directamente desde el disco, antes se veía el estado fijo antiguo
porque todavía no había una URL de Cloudflare Worker configurada.

Ahora la preview local carga inmediatamente un snapshot de la página oficial del GCBA:
- A: servicio limitado -> naranja, con el motivo oficial.
- B, C, D, E, H y P: servicio normal -> verde.

Cuando se publique/configure el Worker, esos valores de prueba se reemplazan por datos en vivo.
