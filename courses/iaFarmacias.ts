import type { LearningPath } from '../types';

// Taller presencial de 3 horas para droguistas y personal de establecimientos farmacéuticos:
// IA aplicada (con mucha práctica de prompting, nivel básico) y ciberseguridad esencial.
// Cada módulo es un momento del taller; el participante trabaja desde su celular o computador.
// Los datos de clientes, ventas y proveedores de los ejercicios son ficticios.
// El número de módulos debe coincidir con course_module_counts() en
// supabase/migrations/2026-11-23_curso_ia_farmacias.sql.

export const IA_FARMACIAS: LearningPath = {
  title: 'IA y Ciberseguridad para Droguerías',
  description: 'Taller práctico de 3 horas para droguistas, farmacéuticos y personal de establecimientos farmacéuticos: qué es la inteligencia artificial, cómo escribir buenas instrucciones (prompts) desde cero, usos reales en el mostrador y la trastienda, y cómo proteger la droguería y los datos de los clientes. Practique con ejercicios guiados y obtenga su certificado.',
  lastUpdated: 'Noviembre 2026',
  modules: [
    // ───────────────────────────── MÓDULO 1 · 30 min ─────────────────────────────
    {
      id: 'fa_m1',
      title: '1. La droguería en la era de la IA (30 min)',
      content: [
        { type: 'text', icon: 'HappyUsersIcon', text: 'Bienvenido. Este taller es para hacer, no solo para escuchar: en cada módulo va a practicar desde su celular. No necesita saber de tecnología. Al final, con la evaluación aprobada, recibe su certificado.' },
        { type: 'text', icon: 'PointerIcon', text: 'El cliente cambió: compara precios en el celular, pregunta por WhatsApp antes de ir, espera domicilio y quiere respuesta rápida, también a las 9 de la noche. Las cadenas grandes ya usan tecnología para atender, vender y controlar el inventario. La buena noticia: hoy una droguería de barrio puede usar las mismas herramientas de inteligencia artificial, muchas de ellas gratis, desde un celular.' },
        { type: 'text', icon: 'BrainCircuitIcon', text: 'La inteligencia artificial (IA) es tecnología que aprende de muchos ejemplos para hacer tareas que antes solo hacía una persona: entender un texto, responder una pregunta, resumir, redactar, reconocer una imagen o encontrar patrones en las ventas. La IA generativa, como ChatGPT, Gemini o Copilot, además CREA contenido nuevo: textos, imágenes, tablas, ideas.' },
        {
          type: 'interactive',
          title: '📖 Las palabras clave, sin enredos',
          items: [
            { term: 'Inteligencia artificial', definition: 'Programas que aprenden de ejemplos para hacer tareas como entender, resumir, redactar o predecir.' },
            { term: 'IA generativa', definition: 'La IA que crea contenido nuevo: un mensaje para clientes, una imagen para redes, una tabla, una lista de ideas.' },
            { term: 'Machine learning (aprendizaje automático)', definition: 'La forma en que la IA aprende: mira miles de ejemplos y encuentra patrones. Por ejemplo, qué productos se venden más en temporada de lluvias.' },
            { term: 'Chatbot', definition: 'Un asistente que conversa por escrito. Puede responder preguntas frecuentes por WhatsApp o en la página web, a cualquier hora.' },
            { term: 'Automatización inteligente', definition: 'Dejar que la tecnología haga lo repetitivo: respuestas a preguntas frecuentes, recordatorios, reportes semanales.' },
            { term: 'Prompt', definition: 'La instrucción que usted le escribe a la IA. De lo bien que la escriba depende lo útil de la respuesta. Es el tema central de este taller.' },
            { term: 'Alucinación', definition: 'Cuando la IA inventa un dato con total seguridad: una cifra, una norma o una dosis que no existen. Por eso siempre se verifica.' },
          ],
        },
        { type: 'text', icon: 'CheckCircleIcon', text: 'Lo que la IA SÍ hace bien en una droguería: redactar mensajes y publicaciones, responder preguntas frecuentes, ordenar información, resumir documentos largos, armar tablas e indicadores y proponer ideas. Lo que NO debe hacer: diagnosticar, recetar ni reemplazar la fórmula médica o el criterio del químico farmacéutico o del director técnico. La IA es un asistente, la responsabilidad sigue siendo suya.' },
        {
          type: 'memory',
          title: '🧩 Dinámica: una palabra, un ejemplo de la droguería',
          pairs: [
            { term: 'IA generativa', definition: 'Redacta en segundos la publicación de la promoción de protector solar.' },
            { term: 'Chatbot', definition: 'Contesta por WhatsApp el horario y si hay domicilio, a las 10 p. m.' },
            { term: 'Machine learning', definition: 'Nota que en abril suben las ventas de antigripales y sugiere pedir más.' },
            { term: 'Automatización', definition: 'Envía cada lunes el reporte de productos próximos a vencer.' },
            { term: 'Prompt', definition: '«Actúa como asesor de ventas de una droguería y escribe…»' },
            { term: 'Alucinación', definition: 'La IA cita un decreto con un número que no existe.' },
          ],
        },
        {
          type: 'h5p_check',
          title: '🎯 Dinámica: ¿le pido esto a la IA o no?',
          description: 'Responda en su celular. Para cada caso, decida si es una buena tarea para la IA.',
          questions: [
            {
              question: 'Redactar un mensaje amable para avisar a los clientes el horario de diciembre.',
              options: [
                { id: 'fa1q1a', text: 'Sí: es una tarea ideal para la IA.', isCorrect: true, score: 10 },
                { id: 'fa1q1b', text: 'No: la IA no sirve para eso.', isCorrect: false, score: 0 },
              ],
              feedback: 'Correcto. Redactar textos es lo que mejor hace la IA generativa. Usted solo revisa y ajusta.',
            },
            {
              question: 'Un cliente describe sus síntomas y pide que la IA le diga qué antibiótico tomar.',
              options: [
                { id: 'fa1q2a', text: 'Sí: la IA sabe mucho de medicamentos.', isCorrect: false, score: 0 },
                { id: 'fa1q2b', text: 'No: diagnosticar y recetar no es tarea de la IA ni del mostrador; los antibióticos requieren fórmula médica.', isCorrect: true, score: 10 },
              ],
              feedback: 'La IA puede equivocarse con total seguridad y no conoce al paciente. Los antibióticos se venden con fórmula médica. Ante síntomas, se orienta al cliente a consultar.',
            },
            {
              question: 'Ordenar en una tabla las ventas del mes y decir cuáles productos rotan menos.',
              options: [
                { id: 'fa1q3a', text: 'Sí: organizar datos y encontrar patrones es una buena tarea.', isCorrect: true, score: 10 },
                { id: 'fa1q3b', text: 'No: eso solo se puede hacer a mano.', isCorrect: false, score: 0 },
              ],
              feedback: 'Correcto. Eso sí: comparta las cifras de ventas, nunca datos personales de clientes.',
            },
            {
              question: 'Pegar en ChatGPT la lista de clientes con su cédula, teléfono y medicamentos para «organizarla».',
              options: [
                { id: 'fa1q4a', text: 'Sí: así ahorro tiempo.', isCorrect: false, score: 0 },
                { id: 'fa1q4b', text: 'No: son datos personales y de salud; no se suben a herramientas públicas de IA.', isCorrect: true, score: 10 },
              ],
              feedback: 'Los datos de salud son datos sensibles según la Ley 1581 de 2012. Nunca se pegan en una IA pública. Lo veremos en el módulo 5.',
            },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 2 · 40 min ─────────────────────────────
    {
      id: 'fa_m2',
      title: '2. El ABC del prompt: hablarle bien a la IA (40 min)',
      content: [
        { type: 'text', icon: 'PointerIcon', text: 'Un prompt es la instrucción que le da a la IA. Si le habla como a un desconocido, le responde como un desconocido. Si le explica quién debe ser, qué necesita, para quién y cómo lo quiere, le responde como un buen asistente. La fórmula de hoy tiene 4 partes y una regla de oro.' },
        {
          type: 'interactive',
          title: '🧪 La fórmula R-T-C-F (y una regla de oro)',
          items: [
            { term: 'R · Rol', definition: '¿Quién quiere que sea la IA? «Actúa como asesor de servicio al cliente de una droguería de barrio en Bucaramanga».' },
            { term: 'T · Tarea', definition: '¿Qué debe hacer, con un verbo claro? «Escribe», «resume», «organiza», «propón 5 ideas», «compara».' },
            { term: 'C · Contexto', definition: '¿Para quién y con qué datos? «Para clientes adultos mayores; tenemos domicilio gratis por compras desde $30.000».' },
            { term: 'F · Formato', definition: '¿Cómo lo quiere? «Un mensaje de WhatsApp de máximo 4 líneas, tono cálido, con 2 emojis».' },
            { term: '★ Regla de oro · Límites', definition: 'Lo que NO debe hacer: «No recomiendes medicamentos ni dosis; no inventes precios; si no sabes, dilo». Y nunca le dé datos personales de clientes.' },
          ],
        },
        {
          type: 'flashcards',
          title: '🔁 Antes y después: de prompt débil a prompt fuerte',
          cards: [
            { front: 'Débil: «Escribe algo para Facebook».', back: 'Fuerte: «Actúa como community manager de una droguería de barrio. Escribe una publicación para Facebook sobre nuestro horario extendido en diciembre (8 a. m. a 10 p. m.). Público: familias del sector. Máximo 60 palabras, tono cercano, 2 emojis y una invitación a escribirnos por WhatsApp».' },
            { front: 'Débil: «Ayúdame con el inventario».', back: 'Fuerte: «Actúa como asesor de inventarios. Con esta tabla de ventas de octubre (producto, unidades, existencias), dime cuáles 5 productos rotan menos y propón una acción para cada uno. Responde en una tabla de 3 columnas».' },
            { front: 'Débil: «Responde a un cliente bravo».', back: 'Fuerte: «Actúa como administrador de una droguería. Un cliente se queja porque su domicilio llegó 1 hora tarde. Escribe una respuesta de disculpa, sin excusas largas, que ofrezca un 10 % de descuento en su próxima compra. Máximo 5 líneas».' },
            { front: 'Débil: «Hazme una capacitación».', back: 'Fuerte: «Actúa como capacitador de personal de droguería. Prepara una guía de 1 página para un auxiliar nuevo sobre cómo atender al cliente en el mostrador: saludo, escucha, cuándo remitir al médico y despedida. Usa viñetas y lenguaje sencillo».' },
            { front: '¿Y si la respuesta no me gusta?', back: 'Converse: «Hazlo más corto», «más formal», «dame 3 versiones», «explícalo como para un adulto mayor». El primer resultado es un borrador, no la última palabra.' },
          ],
        },
        {
          type: 'prompt_lab',
          title: '🛠️ Laboratorio 1: su primer prompt completo',
          description: 'Arme su prompt con las 4 partes. Puede tocar las sugerencias para llenar cada campo y luego editarlas. Cuando el semáforo esté en verde, cópielo o ábralo en la IA que prefiera y mire el resultado.',
          scenario: 'Situación: su droguería tendrá horario extendido en diciembre y domicilio gratis por compras desde $30.000. Necesita avisarles a los clientes por WhatsApp.',
          suggestions: {
            rol: ['Actúa como asesor de servicio al cliente de una droguería de barrio.', 'Actúa como experto en mensajes de WhatsApp para pequeños negocios.'],
            tarea: ['Escribe un mensaje de WhatsApp para avisar el horario de diciembre.', 'Escribe 3 versiones de un mensaje para anunciar el domicilio gratis.'],
            contexto: ['Horario de diciembre: lunes a domingo de 8 a. m. a 10 p. m. Domicilio gratis por compras desde $30.000. Clientes: familias y adultos mayores del barrio.'],
            formato: ['Máximo 4 líneas, tono cálido y cercano, 2 emojis, termina invitando a responder el mensaje.'],
            limites: ['No menciones nombres de medicamentos ni precios que no te di.'],
          },
        },
        {
          type: 'prompt_lab',
          title: '🔧 Laboratorio 2: rescate este prompt débil',
          description: 'Este prompt da respuestas genéricas. Reescríbalo con la fórmula R-T-C-F y compare los dos resultados en la IA: verá la diferencia.',
          scenario: 'Situación: un cliente escribió por WhatsApp molesto porque su domicilio llegó una hora tarde y quiere una respuesta.',
          weakPrompt: 'Responde a un cliente bravo.',
          suggestions: {
            rol: ['Actúa como administrador de una droguería que cuida mucho a sus clientes.'],
            tarea: ['Escribe una respuesta de disculpa para un cliente cuyo domicilio llegó una hora tarde.'],
            contexto: ['El retraso fue por un aguacero que paralizó el tráfico. Queremos ofrecer 10 % de descuento en su próxima compra.'],
            formato: ['Máximo 5 líneas, tono respetuoso y empático, sin excusas largas.'],
            limites: ['No culpes al domiciliario ni al cliente. No prometas cosas que no te dije.'],
          },
        },
        {
          type: 'h5p_check',
          title: '🎯 Dinámica: ¿qué le falta a este prompt?',
          description: 'Identifique la parte de la fórmula que falta en cada caso.',
          questions: [
            {
              question: '«Escribe una publicación sobre la jornada de toma de presión del sábado, de 8 a 12, para Instagram, máximo 50 palabras.»',
              options: [
                { id: 'fa2q1a', text: 'Falta el Rol.', isCorrect: true, score: 10 },
                { id: 'fa2q1b', text: 'Falta la Tarea.', isCorrect: false, score: 0 },
                { id: 'fa2q1c', text: 'No le falta nada.', isCorrect: false, score: 0 },
              ],
              feedback: 'Tiene tarea, contexto y formato, pero no dice quién debe ser la IA. Con «Actúa como community manager de una droguería» la respuesta suena más a su negocio.',
            },
            {
              question: '«Actúa como capacitador de droguería. Prepara una guía para un auxiliar nuevo.»',
              options: [
                { id: 'fa2q2a', text: 'Faltan el Contexto y el Formato.', isCorrect: true, score: 10 },
                { id: 'fa2q2b', text: 'Falta el Rol.', isCorrect: false, score: 0 },
                { id: 'fa2q2c', text: 'Está completo.', isCorrect: false, score: 0 },
              ],
              feedback: '¿Guía de qué tema, para quién y de qué largo? «Sobre atención en el mostrador, 1 página, con viñetas» cambia todo.',
            },
            {
              question: '¿Cuál es la mejor forma de pedir un cambio cuando la respuesta no le sirve?',
              options: [
                { id: 'fa2q3a', text: 'Borrar todo y empezar en otra herramienta.', isCorrect: false, score: 0 },
                { id: 'fa2q3b', text: 'Seguir la conversación: «hazlo más corto», «más formal», «dame 3 versiones».', isCorrect: true, score: 10 },
                { id: 'fa2q3c', text: 'Aceptar la primera respuesta tal cual.', isCorrect: false, score: 0 },
              ],
              feedback: 'La IA recuerda la conversación. Pedir ajustes es la forma más rápida de llegar a lo que necesita.',
            },
          ],
        },
        {
          type: 'activity',
          title: '👥 Ejercicio en parejas: el reto del mostrador',
          duration: '10 minutos',
          groupSize: 'Parejas',
          goal: 'Escribir, probar y mejorar un prompt para una situación real de su droguería.',
          downloads: [],
          steps: [
            { title: 'Elijan una situación', minutes: '1 min', detail: 'Por ejemplo: aviso de cambio de horario, mensaje de cumpleaños para clientes frecuentes, respuesta a una queja o promoción de la temporada.' },
            { title: 'Escriban el prompt con R-T-C-F', minutes: '3 min', detail: 'Usen el laboratorio de arriba. No incluyan nombres, cédulas ni teléfonos reales.' },
            { title: 'Pruébenlo en la IA', minutes: '3 min', detail: 'Ábranlo en ChatGPT, Copilot o Gemini. Pidan al menos un ajuste: «más corto», «más formal» o «dame otra versión».' },
            { title: 'Compartan', minutes: '3 min', detail: 'Dos parejas leen su prompt y el resultado. El grupo dice qué parte de la fórmula hizo la diferencia.' },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 3 · 35 min ─────────────────────────────
    {
      id: 'fa_m3',
      title: '3. La IA en el mostrador y en la trastienda (35 min)',
      content: [
        { type: 'text', icon: 'HappyUsersIcon', text: 'Ahora, a lo práctico: cinco frentes donde la IA ahorra tiempo en una droguería. En el mostrador, atención al cliente y redes sociales. En la trastienda, inventario, indicadores y capacitación del equipo.' },
        {
          type: 'interactive',
          title: '🏪 Cinco usos reales en la droguería',
          items: [
            { term: 'Atención al cliente', definition: 'Respuestas listas para las preguntas frecuentes (horarios, domicilios, medios de pago), mensajes de disculpa, recordatorios para recoger pedidos. Un chatbot puede atender en WhatsApp fuera del horario.' },
            { term: 'Promociones y redes sociales', definition: 'Publicaciones para Facebook e Instagram, ideas de contenido para el mes, textos para volantes. Con Canva IA, además, el diseño. Ojo: solo los medicamentos de venta libre se pueden anunciar al público.' },
            { term: 'Inventario y demanda', definition: 'Ordenar las ventas, detectar lo que no rota, lo que está próximo a vencer y lo que sube por temporada (lluvias, vacaciones, diciembre) para pedir mejor.' },
            { term: 'Indicadores y decisiones', definition: 'Armar una tabla con ventas por semana, ticket promedio, productos estrella y margen; pedirle a la IA que explique qué cambió y por qué.' },
            { term: 'Capacitación e informes', definition: 'Guías de 1 página para el personal nuevo, resúmenes de una norma o circular, actas de reunión y el informe mensual para el dueño o la cooperativa.' },
          ],
        },
        {
          type: 'interactive',
          title: '🧰 La caja de herramientas (versiones gratuitas)',
          items: [
            { term: 'ChatGPT (OpenAI)', definition: 'Conversación general: redactar, resumir, tablas, ideas. chatgpt.com' },
            { term: 'Microsoft Copilot', definition: 'Similar a ChatGPT, integrado con Windows, Edge y Office (Word, Excel, Outlook). copilot.microsoft.com' },
            { term: 'Gemini (Google)', definition: 'Asistente de Google, conectado con Gmail, Drive y Docs en cuentas de Google. gemini.google.com' },
            { term: 'Perplexity', definition: 'Buscador con IA que muestra las fuentes de donde sacó cada dato: útil para verificar. perplexity.ai' },
            { term: 'Canva IA', definition: 'Diseño de piezas para redes, volantes y avisos con plantillas y texto generado. canva.com' },
            { term: 'NotebookLM (Google)', definition: 'Le sube SUS documentos (un manual, una circular, un catálogo) y responde solo con base en ellos, citando la página. notebooklm.google.com' },
          ],
        },
        {
          type: 'prompt_lab',
          title: '📣 Laboratorio 3: la promoción del mes para redes',
          description: 'Cree la publicación de una promoción. Añada el límite de no anunciar medicamentos con fórmula: la IA no conoce esa regla si usted no se la dice.',
          scenario: 'Situación: en diciembre tiene 20 % de descuento en protectores solares y bloqueadores para las vacaciones, y quiere publicarlo en Facebook e Instagram.',
          suggestions: {
            rol: ['Actúa como community manager de una droguería de barrio.'],
            tarea: ['Escribe una publicación para Facebook e Instagram que anuncie la promoción.', 'Propón 3 ideas de imagen para acompañar la publicación.'],
            contexto: ['20 % de descuento en protectores solares del 1 al 24 de diciembre. Público: familias que salen de vacaciones a tierra caliente.'],
            formato: ['Máximo 70 palabras, tono alegre, 3 emojis, 3 hashtags y un llamado a la acción.'],
            limites: ['No anuncies medicamentos de venta con fórmula médica. No prometas beneficios para la salud que no sean comprobados.'],
          },
        },
        {
          type: 'prompt_lab',
          title: '📊 Laboratorio 4: que la IA le lea las ventas',
          description: 'Pegue la tabla (datos ficticios) en su prompt y pida un análisis. Fíjese: son cifras del negocio, no datos de personas.',
          scenario: 'Ventas de noviembre (ficticias). Producto | unidades vendidas | existencias | vence: Antigripal X | 180 | 40 | 2027-05 · Suero oral | 95 | 60 | 2026-12 · Protector solar 50 | 30 | 120 | 2027-08 · Vitamina C | 15 | 90 | 2026-12 · Pañales etapa 3 | 210 | 25 | 2028-01 · Alcohol antiséptico | 60 | 150 | 2027-10',
          suggestions: {
            rol: ['Actúa como asesor de inventarios de una droguería.'],
            tarea: ['Analiza esta tabla y dime qué productos debo pedir pronto, cuáles rotan poco y cuáles vencen en los próximos 2 meses.'],
            contexto: ['Pego la tabla de ventas de noviembre: producto, unidades vendidas, existencias y fecha de vencimiento. Diciembre trae vacaciones y temporada de lluvias en algunas zonas.'],
            formato: ['Responde en una tabla con 3 columnas: producto, situación y acción recomendada. Al final, 3 conclusiones en viñetas.'],
            limites: ['Usa solo los datos de la tabla. Si te falta información, dímelo en lugar de suponer.'],
          },
        },
        {
          type: 'h5p_check',
          title: '🎯 Dinámica: ¿qué herramienta usaría?',
          description: 'Escoja la herramienta que mejor encaja con cada necesidad.',
          questions: [
            {
              question: 'Quiere preguntarle a la circular del Invima de 30 páginas qué cambia para su droguería, con la página exacta.',
              options: [
                { id: 'fa3q1a', text: 'NotebookLM: responde solo con el documento que usted subió y cita dónde lo dice.', isCorrect: true, score: 10 },
                { id: 'fa3q1b', text: 'Canva IA.', isCorrect: false, score: 0 },
                { id: 'fa3q1c', text: 'Ninguna: hay que leerla toda.', isCorrect: false, score: 0 },
              ],
              feedback: 'NotebookLM trabaja sobre sus propios documentos y muestra la cita. Igual, lo importante se verifica en el texto original.',
            },
            {
              question: 'Necesita el volante de la promoción, con diseño, listo para imprimir.',
              options: [
                { id: 'fa3q2a', text: 'Perplexity.', isCorrect: false, score: 0 },
                { id: 'fa3q2b', text: 'Canva IA.', isCorrect: true, score: 10 },
                { id: 'fa3q2c', text: 'Una calculadora.', isCorrect: false, score: 0 },
              ],
              feedback: 'Canva combina plantillas de diseño con texto e imágenes generadas por IA.',
            },
            {
              question: 'Quiere saber si es cierta una noticia sobre un medicamento retirado del mercado y ver las fuentes.',
              options: [
                { id: 'fa3q3a', text: 'Perplexity, y luego confirmar en la página oficial del Invima.', isCorrect: true, score: 10 },
                { id: 'fa3q3b', text: 'Preguntarle a ChatGPT y creerle sin más.', isCorrect: false, score: 0 },
                { id: 'fa3q3c', text: 'Reenviarla al grupo de clientes por si acaso.', isCorrect: false, score: 0 },
              ],
              feedback: 'Perplexity muestra las fuentes, pero la palabra final la tiene la fuente oficial: las alertas sanitarias se consultan en invima.gov.co.',
            },
            {
              question: 'Hay que preparar el informe mensual de ventas en Word y Excel de la oficina.',
              options: [
                { id: 'fa3q4a', text: 'Microsoft Copilot, integrado con Word y Excel.', isCorrect: true, score: 10 },
                { id: 'fa3q4b', text: 'Canva IA.', isCorrect: false, score: 0 },
                { id: 'fa3q4c', text: 'NotebookLM.', isCorrect: false, score: 0 },
              ],
              feedback: 'Copilot trabaja dentro de las herramientas de Office. ChatGPT o Gemini también sirven si copia y pega los datos.',
            },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 4 · 35 min ─────────────────────────────
    {
      id: 'fa_m4',
      title: '4. Ciberseguridad: proteger la droguería (35 min)',
      content: [
        { type: 'text', icon: 'LockIcon', text: 'Una droguería maneja información valiosa: ventas, cuentas bancarias, proveedores, la facturación electrónica y datos de clientes, incluidos datos de salud. Para un delincuente, eso vale dinero. Un ataque puede dejarla sin sistema de facturación varios días, vaciar una cuenta con un pago falso o exponer a sus clientes. Y la mayoría de ataques no entran por la tecnología: entran por una persona apurada.' },
        {
          type: 'interactive',
          title: '🚨 Las amenazas más frecuentes',
          items: [
            { term: 'Phishing', definition: 'Correo, mensaje o enlace que imita a un banco, a la DIAN, a un proveedor o a una transportadora para robar contraseñas o datos de pago.' },
            { term: 'Ingeniería social', definition: 'Engañar a una persona con urgencia, autoridad o miedo: «soy del banco», «soy el gerente», «su cuenta será bloqueada hoy».' },
            { term: 'Malware', definition: 'Programa malicioso que llega en un adjunto, una USB o una descarga «gratis» y espía, roba o daña el equipo.' },
            { term: 'Ransomware', definition: 'Secuestra los archivos del computador (facturación, inventario) y pide rescate para devolverlos.' },
            { term: 'Robo de identidad', definition: 'Usar los datos de la droguería o de su dueño para pedir créditos, facturar o estafar a nombre de otros.' },
            { term: 'Fraude electrónico', definition: 'Comprobantes de pago falsos, transferencias que «se reversan», cobros por domicilios que nunca se pagaron.' },
            { term: 'Suplantación de proveedores', definition: 'Un correo «del laboratorio» o «del distribuidor» informa una cuenta bancaria nueva para pagar las facturas. El dinero va a la cuenta del delincuente.' },
          ],
        },
        {
          type: 'scenario',
          title: '🕵️ Laboratorio: el correo del proveedor',
          intro: 'Usted administra la droguería. Es viernes a las 5:40 p. m. y tiene pendiente pagar la factura del distribuidor. Tome las decisiones (caso ficticio).',
          start: 's1',
          maxPoints: 30,
          passPoints: 20,
          steps: {
            s1: {
              text: 'Llega este correo. ¿Qué hace?',
              evidence: 'De: Cartera Distribuidora Andina <cartera@distribuidora-andina-pagos.com>\nAsunto: URGENTE - Actualización de cuenta para pagos\n\nApreciado cliente:\nPor auditoría interna, a partir de hoy los pagos deben hacerse a la nueva cuenta de ahorros 4580-XXXX-12 del Banco Ejemplo, a nombre de J. Pérez (representante de cartera).\nSi no paga hoy antes de las 6 p. m., su pedido de diciembre quedará suspendido.\nAdjunto: certificado_bancario.pdf.exe',
              choices: [
                { text: 'Pagar ya a la cuenta nueva para no perder el pedido de diciembre.', next: 's_pago', points: 0, feedback: 'Es exactamente lo que el delincuente busca: urgencia + cuenta nueva a nombre de una persona.' },
                { text: 'No pagar todavía y revisar las señales del correo.', next: 's2', points: 10, feedback: 'Bien: frenar es la mejor defensa contra la urgencia.' },
                { text: 'Abrir el adjunto para ver el certificado bancario.', next: 's_adjunto', points: 0, feedback: 'El archivo termina en .exe: es un programa, no un PDF. Abrirlo puede infectar el equipo.' },
              ],
            },
            s2: {
              text: 'Usted encuentra varias señales: un dominio raro, urgencia, una cuenta a nombre de una persona y un adjunto .exe. ¿Cómo lo verifica?',
              choices: [
                { text: 'Responder el mismo correo preguntando si es real.', next: 's3b', points: 0, feedback: 'Le contestará el mismo delincuente: «sí, es real».' },
                { text: 'Llamar al asesor del distribuidor al número que ya tenía registrado (no al del correo).', next: 's3', points: 10, feedback: 'Correcto: se verifica por un canal que usted ya conocía.' },
              ],
            },
            s3b: {
              text: 'Le responden en 2 minutos: «Sí, es real, pague ya o se cae el pedido». ¿Ahora qué?',
              choices: [
                { text: 'Llamar al asesor al número que tenía registrado antes.', next: 's3', points: 5, feedback: 'Bien rectificado. El correo de respuesta no prueba nada.' },
                { text: 'Pagar: ya confirmaron.', next: 's_pago', points: 0, feedback: 'La confirmación vino del mismo canal sospechoso.' },
              ],
            },
            s3: {
              text: 'El asesor confirma que NO han cambiado la cuenta y que otros clientes recibieron el mismo correo. ¿Qué más hace?',
              choices: [
                { text: 'Borrar el correo y olvidarse del tema.', next: 'f_regular', points: 0, feedback: 'Se salvó usted, pero no avisó a nadie.' },
                { text: 'Avisar a su equipo, reportarlo al distribuidor y denunciarlo en el CAI Virtual de la Policía; dejar como regla que todo cambio de cuenta se confirma por teléfono.', next: 'f_bien', points: 10, feedback: 'Excelente: protegió a su equipo y a otros comerciantes.' },
              ],
            },
            s_pago: { text: 'El dinero llegó a la cuenta del delincuente y el distribuidor no lo recibió. Recuperarlo es difícil: avise de inmediato a su banco y denuncie. Regla para siempre: todo cambio de cuenta bancaria se confirma por un canal conocido antes de pagar.' },
            s_adjunto: { text: 'El «PDF» era un programa malicioso. Desconecte el equipo de internet, avise a su técnico y cambie desde otro equipo las contraseñas del banco y del correo. Regla: los adjuntos .exe, .zip o .html inesperados no se abren.' },
            f_regular: { text: 'Evitó el fraude, pero otros compañeros y comerciantes siguen expuestos. Reportar es parte de protegerse.' },
            f_bien: { text: '¡Muy bien! Detectó el engaño, lo verificó por un canal conocido y protegió a su equipo y a otros comerciantes.' },
          },
        },
        {
          type: 'flashcards',
          title: '✅ Las 8 buenas prácticas de la droguería',
          cards: [
            { front: 'Contraseñas', back: 'Una distinta para cada servicio (banco, correo, facturación), larga: una frase de 4 palabras. Nunca pegada en un papelito en el monitor.' },
            { front: 'Doble factor (MFA)', back: 'Active el código por SMS o app en el banco, el correo y WhatsApp. Aunque roben la contraseña, no pueden entrar.' },
            { front: 'Copias de seguridad', back: 'Copia semanal de la facturación y el inventario en un disco externo desconectado y en la nube. Pruebe que se pueda recuperar.' },
            { front: 'Actualizaciones', back: 'Windows, el antivirus, el navegador y el software de facturación al día. Las actualizaciones cierran puertas que los atacantes ya conocen.' },
            { front: 'Correo seguro', back: 'Desconfíe de la urgencia, revise el remitente real, no abra adjuntos inesperados y nunca cambie una cuenta de pago por correo.' },
            { front: 'Celular del negocio', back: 'Con bloqueo de pantalla, sin aplicaciones de origen desconocido y con la verificación en dos pasos de WhatsApp activa.' },
            { front: 'Navegación segura', back: 'Escriba usted la dirección del banco; no entre por enlaces de mensajes. Wi-Fi de clientes separado del de la caja.' },
            { front: 'IA con responsabilidad', back: 'Nunca pegue datos de clientes, fórmulas, contraseñas ni cuentas en una IA pública. Verifique lo que responde.' },
          ],
        },
        {
          type: 'memory',
          title: '🧩 Dinámica: la señal y la amenaza',
          pairs: [
            { term: 'Phishing', definition: 'SMS: «Su cuenta será bloqueada, ingrese aquí» con un enlace raro.' },
            { term: 'Suplantación de proveedor', definition: 'Correo con una cuenta bancaria nueva para pagar la factura.' },
            { term: 'Ransomware', definition: 'Los archivos de facturación aparecen cifrados y piden un pago.' },
            { term: 'Fraude electrónico', definition: 'Pantallazo de una transferencia que nunca llegó a la cuenta.' },
            { term: 'Ingeniería social', definition: 'Llamada: «soy el técnico del software, deme la clave para actualizar».' },
            { term: 'Malware', definition: 'Adjunto «factura.pdf.exe» de un remitente desconocido.' },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 5 · 25 min ─────────────────────────────
    {
      id: 'fa_m5',
      title: '5. IA segura, ética y evaluación final (25 min)',
      content: [
        { type: 'text', icon: 'ShieldCheckIcon', text: 'Usar IA también tiene riesgos: lo que usted escribe en una herramienta pública puede quedar guardado y usarse para entrenarla; la IA puede inventar datos con total seguridad; y los delincuentes también la usan para clonar voces, escribir correos sin errores y crear perfiles falsos. La regla: la IA ayuda, usted decide y verifica.' },
        { type: 'text', icon: 'LockIcon', text: 'En Colombia, la Ley 1581 de 2012 protege los datos personales, y los datos de salud son datos sensibles: requieren autorización y cuidado especial. Una droguería que pega en una IA pública la lista de clientes con sus medicamentos está exponiendo datos sensibles. La solución es fácil: anonimizar. Cambie «María Gómez, cédula 52…, toma losartán» por «Cliente A, adulta mayor, tratamiento crónico».' },
        {
          type: 'interactive',
          title: '🚫 Lo que nunca va en un prompt',
          items: [
            { term: 'Datos de clientes', definition: 'Nombres, cédulas, teléfonos, direcciones o correos. Use «Cliente A», «adulto mayor», «barrio X».' },
            { term: 'Información de salud', definition: 'Diagnósticos, fórmulas médicas con nombre del paciente, historias clínicas.' },
            { term: 'Claves y accesos', definition: 'Contraseñas, códigos de verificación, usuarios del banco o del software de facturación.' },
            { term: 'Datos financieros', definition: 'Números de cuenta, tarjetas, extractos con datos completos.' },
            { term: 'Lo que la IA no debe decidir', definition: 'Diagnósticos, dosis o qué medicamento con fórmula vender. Eso es del médico y del químico farmacéutico o director técnico.' },
          ],
        },
        {
          type: 'flashcards',
          title: '🔍 Cinco preguntas antes de usar lo que dijo la IA',
          cards: [
            { front: '1. ¿Es cierto?', back: 'Cifras, normas, precios y nombres de medicamentos se verifican en la fuente oficial (Invima, Ministerio de Salud, el proveedor).' },
            { front: '2. ¿Es seguro?', back: '¿Podría confundir a un paciente o sonar a recomendación médica? Si sí, no se publica.' },
            { front: '3. ¿Es legal?', back: 'Solo los medicamentos de venta libre se anuncian al público. No se prometen curas ni beneficios no comprobados.' },
            { front: '4. ¿Suena a nosotros?', back: 'Ajuste el tono a su droguería y a sus clientes. La IA da el borrador, usted la versión final.' },
            { front: '5. ¿Expuse algo que no debía?', back: 'Revise que el prompt no tenga datos de clientes, claves ni cuentas. Si los tenía, bórrelos del historial de la herramienta.' },
          ],
        },
        {
          type: 'prompt_lab',
          title: '🛡️ Laboratorio 5: el prompt seguro',
          description: 'Escriba un prompt que use la IA sin exponer a nadie. El laboratorio le avisa si detecta algo que parezca un dato personal (números largos, correos, palabras como «cédula»).',
          scenario: 'Situación: quiere un mensaje para recordarles a sus clientes con tratamientos crónicos que pueden pedir su domicilio mensual. Escríbalo SIN nombres, cédulas ni medicamentos de personas reales.',
          suggestions: {
            rol: ['Actúa como asesor de servicio al cliente de una droguería.'],
            tarea: ['Escribe un mensaje de WhatsApp para recordar el servicio de domicilio mensual.'],
            contexto: ['Para clientes con tratamientos crónicos (sin datos personales). El domicilio es gratis y se programa respondiendo el mensaje.'],
            formato: ['Máximo 4 líneas, tono respetuoso y cercano, sin nombres de medicamentos.'],
            limites: ['No menciones enfermedades ni medicamentos específicos. No incluyas datos personales.'],
          },
        },
        { type: 'text', icon: 'CalendarIcon', text: 'Su plan para los próximos 30 días: 1) active el doble factor en el banco, el correo y WhatsApp; 2) haga una copia de seguridad de la facturación; 3) cree 5 prompts para las tareas que más repite y guárdelos; 4) acuerde con su equipo que todo cambio de cuenta de un proveedor se confirma por teléfono; 5) pegue en la caja la lista de lo que nunca va en un prompt.' },
        {
          type: 'exam',
          title: '📝 Evaluación final',
          description: '8 preguntas tomadas al azar de un banco de 14. Se aprueba con 70 % y puede reintentarla con preguntas distintas. Al aprobarla recibe su certificado.',
          passPercent: 70,
          questionsPerAttempt: 8,
          questions: [
            {
              question: '¿Qué es un prompt?',
              options: [
                { id: 'fae1a', text: 'La instrucción que le escribimos a la IA.', isCorrect: true, score: 10 },
                { id: 'fae1b', text: 'Un virus informático.', isCorrect: false, score: 0 },
                { id: 'fae1c', text: 'Un tipo de medicamento genérico.', isCorrect: false, score: 0 },
              ],
              feedback: 'El prompt es la instrucción. Mientras más clara, mejor la respuesta.',
            },
            {
              question: '¿Qué significan las letras de la fórmula R-T-C-F?',
              options: [
                { id: 'fae2a', text: 'Rol, Tarea, Contexto y Formato.', isCorrect: true, score: 10 },
                { id: 'fae2b', text: 'Rápido, Técnico, Corto y Formal.', isCorrect: false, score: 0 },
                { id: 'fae2c', text: 'Revisar, Teclear, Copiar y Firmar.', isCorrect: false, score: 0 },
              ],
              feedback: 'Rol (quién es la IA), Tarea (qué hace), Contexto (para quién y con qué datos) y Formato (cómo lo entrega).',
            },
            {
              question: '¿Cuál de estos prompts está mejor escrito?',
              options: [
                { id: 'fae3a', text: '«Haz una publicación».', isCorrect: false, score: 0 },
                { id: 'fae3b', text: '«Actúa como community manager de una droguería. Escribe una publicación sobre nuestro domicilio gratis desde $30.000, para familias del barrio, máximo 60 palabras y 2 emojis».', isCorrect: true, score: 10 },
                { id: 'fae3c', text: '«Publicación droguería ya».', isCorrect: false, score: 0 },
              ],
              feedback: 'Tiene rol, tarea, contexto y formato.',
            },
            {
              question: '¿Qué es una «alucinación» de la IA?',
              options: [
                { id: 'fae4a', text: 'Cuando la IA inventa un dato con total seguridad.', isCorrect: true, score: 10 },
                { id: 'fae4b', text: 'Cuando la IA se apaga.', isCorrect: false, score: 0 },
                { id: 'fae4c', text: 'Una imagen generada por la IA.', isCorrect: false, score: 0 },
              ],
              feedback: 'Por eso cifras, normas, precios y nombres de medicamentos se verifican en la fuente oficial.',
            },
            {
              question: 'Un cliente pide que la IA le diga qué medicamento tomar para sus síntomas. ¿Qué es lo correcto?',
              options: [
                { id: 'fae5a', text: 'Usar la respuesta de la IA y vender el medicamento.', isCorrect: false, score: 0 },
                { id: 'fae5b', text: 'No usar la IA para diagnosticar ni recetar; orientar al cliente a consultar al médico.', isCorrect: true, score: 10 },
                { id: 'fae5c', text: 'Buscar en dos IA y quedarse con la que coincida.', isCorrect: false, score: 0 },
              ],
              feedback: 'Diagnosticar y prescribir no es tarea de la IA. La responsabilidad sanitaria es de los profesionales.',
            },
            {
              question: '¿Cuál de estos datos SÍ se puede pegar en una IA pública?',
              options: [
                { id: 'fae6a', text: 'La lista de clientes con cédula y teléfono.', isCorrect: false, score: 0 },
                { id: 'fae6b', text: 'Las ventas por producto del mes, sin datos de personas.', isCorrect: true, score: 10 },
                { id: 'fae6c', text: 'La clave del portal del banco.', isCorrect: false, score: 0 },
              ],
              feedback: 'Las cifras del negocio sin datos personales se pueden analizar con IA. Lo personal, lo de salud y las claves, nunca.',
            },
            {
              question: 'Según la Ley 1581 de 2012, los datos de salud de una persona son:',
              options: [
                { id: 'fae7a', text: 'Datos públicos.', isCorrect: false, score: 0 },
                { id: 'fae7b', text: 'Datos sensibles, que exigen protección especial.', isCorrect: true, score: 10 },
                { id: 'fae7c', text: 'Datos sin ninguna protección.', isCorrect: false, score: 0 },
              ],
              feedback: 'Los datos de salud son sensibles: requieren autorización y cuidado especial.',
            },
            {
              question: 'Llega un correo «del distribuidor» con una cuenta bancaria nueva para pagar hoy mismo. ¿Qué hace?',
              options: [
                { id: 'fae8a', text: 'Paga para no perder el pedido.', isCorrect: false, score: 0 },
                { id: 'fae8b', text: 'Responde el correo preguntando si es real.', isCorrect: false, score: 0 },
                { id: 'fae8c', text: 'No paga y confirma llamando al número del proveedor que ya tenía registrado.', isCorrect: true, score: 10 },
              ],
              feedback: 'Todo cambio de cuenta se confirma por un canal conocido. Responder el mismo correo le contesta el delincuente.',
            },
            {
              question: '¿Qué es el ransomware?',
              options: [
                { id: 'fae9a', text: 'Un programa que secuestra los archivos y pide rescate.', isCorrect: true, score: 10 },
                { id: 'fae9b', text: 'Un antivirus gratuito.', isCorrect: false, score: 0 },
                { id: 'fae9c', text: 'Una aplicación de domicilios.', isCorrect: false, score: 0 },
              ],
              feedback: 'Contra el ransomware, la mejor defensa es una copia de seguridad reciente y desconectada.',
            },
            {
              question: '¿Para qué sirve el doble factor de autenticación?',
              options: [
                { id: 'fae10a', text: 'Para que, aunque roben la contraseña, no puedan entrar sin el segundo código.', isCorrect: true, score: 10 },
                { id: 'fae10b', text: 'Para no tener que usar contraseña.', isCorrect: false, score: 0 },
                { id: 'fae10c', text: 'Para que el internet sea más rápido.', isCorrect: false, score: 0 },
              ],
              feedback: 'Actívelo en el banco, el correo y WhatsApp.',
            },
            {
              question: 'Quiere que la IA analice una circular de 30 páginas y le cite la página exacta. ¿Qué herramienta encaja mejor?',
              options: [
                { id: 'fae11a', text: 'NotebookLM.', isCorrect: true, score: 10 },
                { id: 'fae11b', text: 'Canva IA.', isCorrect: false, score: 0 },
                { id: 'fae11c', text: 'Ninguna.', isCorrect: false, score: 0 },
              ],
              feedback: 'NotebookLM responde con base en los documentos que usted sube y muestra la cita.',
            },
            {
              question: 'La IA escribió una publicación que anuncia un antibiótico con descuento. ¿Qué hace?',
              options: [
                { id: 'fae12a', text: 'La publica: la escribió la IA.', isCorrect: false, score: 0 },
                { id: 'fae12b', text: 'No la publica: los medicamentos con fórmula médica no se anuncian al público. Corrige el prompt con ese límite.', isCorrect: true, score: 10 },
                { id: 'fae12c', text: 'La publica solo en Instagram.', isCorrect: false, score: 0 },
              ],
              feedback: 'Usted responde por lo que publica. Por eso los límites van dentro del prompt.',
            },
            {
              question: 'La primera respuesta de la IA es muy larga. ¿Qué es lo más práctico?',
              options: [
                { id: 'fae13a', text: 'Pedir en la misma conversación: «hazlo en máximo 4 líneas».', isCorrect: true, score: 10 },
                { id: 'fae13b', text: 'Cambiar de herramienta.', isCorrect: false, score: 0 },
                { id: 'fae13c', text: 'Cortarla a mano por la mitad.', isCorrect: false, score: 0 },
              ],
              feedback: 'Conversar y pedir ajustes es la forma más rápida de llegar a lo que necesita.',
            },
            {
              question: '¿Cómo se escribe de forma segura un prompt sobre un cliente?',
              options: [
                { id: 'fae14a', text: 'Con su nombre completo para que la IA lo entienda mejor.', isCorrect: false, score: 0 },
                { id: 'fae14b', text: 'Anonimizado: «Cliente A, adulto mayor, tratamiento crónico».', isCorrect: true, score: 10 },
                { id: 'fae14c', text: 'Con la foto de su fórmula médica.', isCorrect: false, score: 0 },
              ],
              feedback: 'Anonimizar conserva lo útil para la tarea y protege a la persona.',
            },
          ],
        },
      ],
    },
  ],
};
