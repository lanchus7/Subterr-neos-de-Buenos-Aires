V68 — Estado del Subte en vivo

Base: V67.

Se agregó:
- Cloudflare Worker listo para publicar.
- Fuente: página oficial de Subte del Gobierno de la Ciudad.
- JSON normalizado para líneas A/B/C/D/E/H/P.
- Actualización frontend cada 60 segundos.
- Desktop: bloque de estado reconstruido en HTML para poder cambiar colores y mensajes.
- Mobile: el menú/acordeón de estado ahora se actualiza con la misma información.
- Si la fuente falla, la web conserva el estado visual local y sigue funcionando.

Para activarlo falta únicamente:
1) publicar /cloudflare-worker/worker.js en Cloudflare Workers;
2) copiar la URL del Worker;
3) pegarla en status-config.js.
