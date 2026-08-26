# Cloudflare Worker — estado del Subte

Este Worker consulta la página oficial:

https://buenosaires.gob.ar/gcaba_historico/subte

y devuelve un JSON simplificado para A, B, C, D, E, H y P.

## Publicación
1. Crear una cuenta gratuita en Cloudflare.
2. Workers & Pages → Create → Worker.
3. Reemplazar el código del Worker por `worker.js`.
4. Deploy.
5. Copiar la URL `https://...workers.dev`.
6. En la web, editar `status-config.js` y pegar esa URL en:
   `window.SUBTE_STATUS_API = "https://...workers.dev";`

La web consulta el Worker cada 60 segundos.
Si la consulta falla, mantiene el último estado visual y no rompe la página.
