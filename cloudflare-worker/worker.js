
const SOURCE_URL = 'https://buenosaires.gob.ar/gcaba_historico/subte';
const LINE_ORDER = ['A','B','C','D','E','H','P'];

function decodeEntities(s){
  return s
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&quot;/gi,'"')
    .replace(/&#39;/gi,"'")
    .replace(/&aacute;/gi,'á').replace(/&eacute;/gi,'é')
    .replace(/&iacute;/gi,'í').replace(/&oacute;/gi,'ó')
    .replace(/&uacute;/gi,'ú').replace(/&ntilde;/gi,'ñ')
    .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n)));
}

function htmlToText(html){
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
      .replace(/<(br|p|div|section|article|li|h[1-6])\b[^>]*>/gi,'\n')
      .replace(/<\/(p|div|section|article|li|h[1-6])>/gi,'\n')
      .replace(/<[^>]+>/g,' ')
  )
  .replace(/\r/g,'')
  .replace(/[ \t]+/g,' ')
  .replace(/\n[ \t]+/g,'\n')
  .replace(/\n{2,}/g,'\n')
  .trim();
}

function classify(message){
  const m = message.toLowerCase();

  if(/servicio\\s+interrumpido|servicio\\s+suspendido|sin\\s+servicio/i.test(m)){
    return 'interrupted';
  }

  if(/servicio\\s+con\\s+demora|servicio\\s+demorado|con\\s+demora|servicio\\s+limitado/i.test(m)){
    return 'delay';
  }

  return 'normal';
}

function cleanMessage(block, line){
  const text = htmlToText(block);
  let rows = text.split('\n').map(x=>x.trim()).filter(Boolean);
  rows = rows.filter(r =>
    !new RegExp(`^L[ií]nea\\s+${line}$`, 'i').test(r) &&
    !/^Image:/i.test(r)
  );
  rows = rows.filter(r => !/\s-\s/.test(r));
  return rows[0] || 'Servicio normal';
}

function parseLines(html){
  const stateStart = html.search(/Estado del Subte/i);
  if(stateStart < 0) throw new Error('No se encontró "Estado del Subte"');
  const tail = html.slice(stateStart);
  const stateEnd = tail.search(/Destacados/i);
  const section = stateEnd >= 0 ? tail.slice(0,stateEnd) : tail;

  const markers = [];
  for(const line of LINE_ORDER){
    const re = new RegExp(`L[ií]nea\\s+${line}`, 'i');
    const m = re.exec(section);
    if(m) markers.push({line,index:m.index});
  }
  markers.sort((a,b)=>a.index-b.index);

  const result = {};
  for(let i=0;i<markers.length;i++){
    const {line,index} = markers[i];
    const end = i+1 < markers.length ? markers[i+1].index : section.length;
    const block = section.slice(index,end);
    const message = cleanMessage(block,line);
    result[line] = {line,status:classify(message),message};
  }

  for(const line of LINE_ORDER){
    if(!result[line]){
      result[line] = {line,status:'alert',message:'Información no disponible'};
    }
  }
  return result;
}

function corsHeaders(){
  return {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type',
    'Content-Type':'application/json; charset=UTF-8',
    'Cache-Control':'public, max-age=30, s-maxage=60'
  };
}

export default {
  async fetch(request, env, ctx){
    if(request.method === 'OPTIONS'){
      return new Response(null,{status:204,headers:corsHeaders()});
    }

    const url = new URL(request.url);
    if(url.pathname !== '/' && url.pathname !== '/status'){
      return new Response(JSON.stringify({error:'Not found'}),{
        status:404,headers:corsHeaders()
      });
    }

    try{
      const source = await fetch(SOURCE_URL,{
        headers:{
          'User-Agent':'SubteStatusPrototype/1.0 (+GitHub Pages demo)',
          'Accept':'text/html,application/xhtml+xml'
        },
        cf:{cacheTtl:60,cacheEverything:true}
      });

      if(!source.ok) throw new Error(`GCBA HTTP ${source.status}`);
      const html = await source.text();
      const lines = parseLines(html);

      return new Response(JSON.stringify({
        source:SOURCE_URL,
        fetchedAt:new Date().toISOString(),
        lines
      }),{headers:corsHeaders()});
    }catch(err){
      return new Response(JSON.stringify({
        error:'No se pudo obtener el estado del Subte',
        detail:String(err && err.message || err),
        fetchedAt:new Date().toISOString()
      }),{status:502,headers:corsHeaders()});
    }
  }
};
