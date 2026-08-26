
(() => {
  const API = (window.SUBTE_STATUS_API || '').trim();
  const OFFICIAL_FALLBACK = {"source":"https://buenosaires.gob.ar/gcaba_historico/subte","fetchedAt":"2026-08-26T16:20:00.000Z","lines":{"A":{"line":"A","status":"delay","message":"Servicio limitado entre Pza de Mayo y Loria. No se detiene en la estación Congreso."},"B":{"line":"B","status":"normal","message":"Servicio normal"},"C":{"line":"C","status":"normal","message":"Servicio normal"},"D":{"line":"D","status":"normal","message":"Servicio normal"},"E":{"line":"E","status":"normal","message":"Servicio normal"},"H":{"line":"H","status":"normal","message":"Servicio normal"},"P":{"line":"P","status":"normal","message":"Servicio normal"}}};
  const LINES = ['A','B','C','D','E','H','P'];

  function statusClass(status){
    if(status === 'delay') return 'status-delay';
    if(status === 'interrupted') return 'status-interrupted';
    return 'status-normal';
  }

  function reasonOnly(status, message){
    if(status !== 'delay' && status !== 'interrupted') return '';
    const original = (message || '').trim();

    if(/^servicio\\s+con\\s+demora/i.test(original)){
      return original.replace(/^servicio\\s+con\\s+demora\\s*/i,'').replace(/^por\\s+/i,'').replace(/[.]$/,'').trim();
    }
    if(/^servicio\\s+interrumpido/i.test(original)){
      return original.replace(/^servicio\\s+interrumpido\\s*/i,'').replace(/^por\\s+/i,'').replace(/[.]$/,'').trim();
    }

    return original.replace(/[.]$/,'').trim();
  }

  function shortLabel(status){
    if(status === 'delay') return 'Servicio con demora';
    if(status === 'interrupted') return 'Servicio interrumpido';
    if(status === 'alert') return 'Servicio con aviso';
    return 'Servicio normal';
  }

  function desktopLabel(status){
    if(status === 'delay') return 'Servicio<br>con demora';
    if(status === 'interrupted') return 'Servicio<br>interrumpido';
    if(status === 'alert') return 'Servicio<br>con aviso';
    return 'Servicio<br>normal';
  }

  function updateDesktop(line, data){
    const item = document.querySelector(`.desktop-status-item[data-live-line="${line}"]`);
    if(!item) return;

    const bar = item.querySelector('.desktop-status-bar');
    const label = item.querySelector('.desktop-status-label');
    if(bar){
      bar.className = 'desktop-status-bar ' + statusClass(data.status);
    }
    if(label) label.innerHTML = desktopLabel(data.status);

    const why = reasonOnly(data.status, data.message);
    const detail = why ? `${shortLabel(data.status)} por ${why}` : shortLabel(data.status);
    item.title = detail;
    item.setAttribute('aria-label', `Línea ${line}: ${detail}`);

    let reasonEl = item.querySelector('.desktop-status-reason');
    if(why){
      if(!reasonEl){
        reasonEl = document.createElement('span');
        reasonEl.className = 'desktop-status-reason';
        item.appendChild(reasonEl);
      }
      reasonEl.textContent = `por ${why}`;
    } else if(reasonEl){
      reasonEl.remove();
    }
  }

  function updateMobile(line, data){
    const row = document.querySelector(`.mobile-service-row[data-live-line="${line}"]`);
    if(!row) return;

    const pill = row.querySelector('.mobile-status-pill');
    if(pill){
      pill.className = 'mobile-status-pill ' + statusClass(data.status);
      pill.textContent = shortLabel(data.status);
    }

    let reason = row.querySelector('.mobile-service-reason');
    const why = reasonOnly(data.status, data.message);
    if(why){
      if(!reason){
        reason = document.createElement('span');
        reason.className = 'mobile-service-reason';
        row.appendChild(reason);
      }
      reason.textContent = `Por ${why}.`;
    } else if(reason){
      reason.remove();
    }
  }

  function render(payload){
    if(!payload || !payload.lines) return;

    LINES.forEach(line => {
      const data = payload.lines[line];
      if(!data) return;
      updateDesktop(line, data);
      updateMobile(line, data);
    });

    const notices = LINES
      .map(line => payload.lines[line])
      .filter(Boolean)
      .filter(d => d.status === 'delay' || d.status === 'interrupted')
      .map(d => {
        const why = reasonOnly(d.status, d.message);
        return `Línea ${d.line}: ${shortLabel(d.status)}${why ? ` por ${why}` : ''}.`;
      });

    document.querySelectorAll('[data-live-alert]').forEach(el => {
      el.textContent = notices.length
        ? notices.join(' / ')
        : 'Todas las líneas prestan servicio normal.';
    });

    const when = payload.fetchedAt ? new Date(payload.fetchedAt) : null;
    const meta = when && !Number.isNaN(when.getTime())
      ? `Actualizado ${when.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}`
      : '';

    document.querySelectorAll('[data-live-meta]').forEach(el => {
      el.textContent = meta;
    });
  }

  async function refresh(){
    if(!API) return; // Keep the designed fallback if Worker URL has not been configured yet.
    try{
      const res = await fetch(API, {cache:'no-store'});
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      render(payload);
    }catch(err){
      console.warn('No se pudo actualizar el estado del Subte:', err);
      // Deliberately keep the last/fallback visual state.
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    render(OFFICIAL_FALLBACK);

    if(API){
      refresh();
      window.setInterval(refresh, 60000);
    }
  });
})();

// V73: the beige general network notice strip was intentionally removed.
// Per-line colors, labels and reasons remain active.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '#status-alert, #service-alert, #network-alert, .status-alert, .service-alert, .network-alert, .alert-strip, .status-ticker, .service-ticker'
  ).forEach(el => el.remove());
});
