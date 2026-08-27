V77
- Conecta Estado de la red al Cloudflare Worker público:
  https://subte-status.flugaresisbase7.workers.dev/
- Actualiza al cargar y cada 60 segundos.
- Mantiene el fallback visual si el endpoint falla.
- Se actualizarán color, texto y motivo según los datos devueltos por el Worker.
