V11
- Header SVG más alto para que el logo circular de Subte no quede recortado.
- Todas las opciones del menú superior tienen áreas clickeables.
- Accesibilidad, Mapas, Tarifas y Horarios llevan a sus respectivas secciones.
- NOSOTROS abre un menú real con Autoridades, Nuestra historia, Tienda Subte y Contacto.
- Se enmascaró el dropdown estático que estaba dibujado dentro del Illustrator.
- Se ajustó la tipografía del listado de estaciones hacia Frutiger LT Std.
- Texto de las estaciones de Línea H en negro.
- Bochitas de combinación/predictivo mantienen borde blanco.

V12
- Áreas clickeables del menú superior ajustadas exactamente sobre cada palabra.
- Estaciones reorganizadas en dos columnas independientes para que cerrar Línea A no deje un hueco generado por la altura de Línea B.
- Al hacer click/foco en Origen o Destino sin escribir, aparecen todas las estaciones disponibles; al tipear, se filtran predictivamente.

V13
- Instagram, X, Facebook y LinkedIn del encabezado ahora son clickeables.
- Los cuatro abren sus perfiles oficiales en una pestaña nueva.
- No se agregaron enlaces a YouTube o TikTok porque no pude verificar con suficiente certeza una cuenta propia y oficial de BA Subte/SBASE para esas dos redes; se dejan sin enlace antes que dirigir a una cuenta incorrecta.

V14
- Clickables del menú superior ampliados para cubrir toda la palabra visible.
- Hero convertido en carrusel real de 5 slides: el primero conserva Planificá tu viaje y los otros cuatro muestran novedades.
- Los 5 círculos ahora son controles reales del carrusel.
- El carrusel avanza automáticamente cada 6,5 segundos y también permite navegar haciendo click en cada círculo.
- Se eliminó la duplicación visual de los círculos/imagen del hero.

V15
- Reemplazados los cuatro slides provisionales por los cuatro diseños enviados por el usuario:
  Plan de Desasbestizado, Nueva Línea F, Traslado de bicicletas y Plan de Renovación Integral.
- Se preserva como primer slide el planificador funcional Origen/Destino.
- El carrusel mantiene avance automático y navegación manual.

V16
- Carousel corregido: los 5 círculos cambian realmente entre los 5 slides.
- Los cuatro diseños enviados por el usuario son slides reales del carrusel.
- Avance automático cada 10 segundos.
- Cuando el usuario hace click en un círculo, el temporizador vuelve a contar 10 segundos desde ese slide.

V17
- El carrusel ahora usa un archivo carousel.js independiente.
- Cada uno de los 5 círculos tiene un event listener real y cambia al slide correspondiente.
- Cambio automático cada 10 segundos.
- Al hacer click manual, el contador vuelve a empezar desde 10 segundos.
- Se verificó sintácticamente carousel.js con Node.

V18
- Eliminada la repetición del hero original debajo del carrusel.
- Una sola fila visible de círculos por slide.
- En los slides enviados por el usuario se usan los círculos ya incluidos en las imágenes; los hitboxes invisibles quedan encima para que sigan siendo clickeables.
- Cambio automático cada 5 segundos.
- Click manual en cualquier círculo cambia de imagen y reinicia los 5 segundos.

V19
- Los cinco puntitos son clickeables y cambian inmediatamente al slide correspondiente.
- Se amplió el área clickeable de cada puntito sin agrandar visualmente los círculos.
- Al hacer click, foco o escribir en Origen/Destino, el carrusel se pausa y permanece en Planificá tu viaje.
- Al salir de ambos campos, el carrusel vuelve a arrancar y cambia cada 5 segundos.

V20
- Recalculadas las áreas clickeables del menú superior tomando como referencia directa la captura enviada.
- TARIFAS y MAPAS ahora cubren toda la palabra visible.
- También se reajustaron Accesibilidad, Nosotros y Subtefan con el mismo criterio.
- Horarios se mantuvo prácticamente en su posición correcta.

V22
- Reubicado específicamente el área clickeable de TARIFAS sobre la palabra completa.
- Separado el hitbox de MAPAS para evitar superposición.
- Corregido el destino #tarifas dentro de lower.svg para que el scroll llegue al banner de TARIFAS y no a la zona del mapa.

V23
- TARIFAS: área clickeable agrandada y centrada sobre toda la palabra.
- TARIFAS y MAPAS tienen áreas totalmente separadas.
- El destino de TARIFAS ahora está en top:0 de lower.svg, porque lower.svg comienza exactamente con el banner de Tarifas.

V24
- ACCESIBILIDAD -> lleva al mapa.
- MAPAS -> lleva al mismo mapa.
- TARIFAS -> lleva exclusivamente a la sección Tarifas.
- Se eliminaron anclas duplicadas que podían hacer que el navegador aterrizara en la sección equivocada.

V25
- Se eliminó el sistema de hitboxes transparentes para el menú principal.
- ACCESIBILIDAD, TARIFAS, MAPAS y HORARIOS ahora son texto HTML real y la palabra completa es el enlace.
- ACCESIBILIDAD y MAPAS llevan a #mapas.
- TARIFAS lleva a #tarifas.
- HORARIOS lleva a #horarios.
- El scroll se ejecuta por JavaScript con scrollIntoView, evitando anclas ambiguas.
- NOSOTROS sigue siendo desplegable.

GITHUB PAGES OPTIMIZED
- header.svg, mid.svg y lower.svg fueron reemplazados por WebP optimizados.
- Esto evita que GitHub rechace la carga por tamaño.
- La apariencia y las interacciones HTML/JS se mantienen.
- Subir el CONTENIDO de esta carpeta al repositorio, con index.html en la raíz.

WHITEFIX
- Fondo blanco forzado en header, estaciones, mapa, lower-wrap y paneles.
- Se eliminaron huecos visuales de imágenes inline que podían aparecer al publicar en GitHub Pages.

V28 GITHUB CORREGIDA
- Los slices del Illustrator ahora se aplanan sobre fondo blanco, no negro.
- Se eliminan las grandes áreas negras que aparecían sólo en GitHub Pages.
- Se conserva el logo central.
- Se tapa únicamente el desplegable viejo dibujado en el mockup de NOSOTROS.

V29 CACHEFIX
- header/mid/lower renombrados con sufijo _v29 para impedir que GitHub Pages o Chrome reutilicen los WebP negros de una versión anterior.
- styles.css y carousel.js también versionados.
- index.html incluye meta no-cache.
- lower_v29.webp fue verificado localmente con fondo blanco/gris correcto.
