import type { LearningPath } from '../types';

// Curso de un día para abogados: Prueba Digital (Universidad Libre, 7 de noviembre de 2026, 7:00 a 20:00).
// Hilo conductor: el caso ficticio de la Ferretería El Roble. Cada grupo (A a F) cuida una evidencia
// durante todo el día y la defiende en la audiencia simulada del Bloque 7.
// Las entregas, estrellas y badges deben coincidir con milestones.ts y con
// supabase/migrations/2026-11-08_curso_prueba_digital.sql.

const MAT = '/materiales/prueba-digital';
const WORKBOOK = {
  label: 'Expediente del caso — cuaderno del estudiante (.docx)',
  href: `${MAT}/expediente-caso-ferreteria-el-roble.docx`,
  note: 'El caso completo, la evidencia de cada grupo y las hojas de trabajo de las 6 actividades del día.',
};

// Las mismas 6 evidencias acompañan a cada grupo todo el día.
const EVIDENCE_GROUPS = [
  { name: 'Grupo A — El chat de WhatsApp', items: ['Celular de Marta', 'Mensajes de extorsión'] },
  { name: 'Grupo B — El correo del falso proveedor', items: ['Correo con el «cambio de cuenta»', 'Encabezados del mensaje'] },
  { name: 'Grupo C — La transferencia bancaria', items: ['Comprobante de pago', 'Extracto y cuenta destino'] },
  { name: 'Grupo D — El computador de la caja', items: ['Registros de inicio de sesión', 'Usuario del exempleado'] },
  { name: 'Grupo E — El correo en la nube', items: ['Cuenta alojada en EE. UU.', 'Cooperación internacional'] },
  { name: 'Grupo F — La publicación en redes', items: ['Perfil falso', 'Datos de clientes publicados'] },
];

export const PRUEBA_DIGITAL: LearningPath = {
  title: 'Prueba Digital para Abogados: del Pantallazo a la Audiencia',
  description: 'Curso intensivo de un día (7:00 a 20:00) para abogados: qué es la prueba digital, cómo se obtiene, se preserva y se presenta en Colombia y en el mundo. Un mismo caso de principio a fin, retos interactivos, trabajo en grupo y una audiencia simulada.',
  lastUpdated: 'Noviembre 2026',
  modules: [
    // ───────────────────────────── BLOQUE 1 ─────────────────────────────
    {
      id: 'pd_b1',
      title: 'Bloque 1 · 7:00 — El caso: una ferretería, un correo y $48 millones',
      content: [
        { type: 'text', icon: 'CalendarIcon', text: 'Bienvenidos. Hoy tenemos 8 bloques, de 7:00 a 20:00. No se necesita saber de tecnología: vamos del ABC hasta una audiencia simulada. Cada bloque tiene retos que suman XP, y en los bloques 1 a 7 su grupo sube un entregable que le da estrellas y un badge. Al aprobar la evaluación final recibe su certificado.' },
        { type: 'text', icon: 'AlarmIcon', text: 'El caso que nos acompañará todo el día (ficticio): Marta Rojas es dueña de la Ferretería El Roble, en Bogotá. El lunes 2 de noviembre recibe un correo de «Aceros del Norte», su proveedor de siempre, que le informa una nueva cuenta bancaria. Marta paga $48.500.000. Dos días después el proveedor la llama: nunca recibió el dinero.' },
        { type: 'text', icon: 'SpyIcon', text: 'Lo peor llega el jueves: un número desconocido le escribe por WhatsApp. «Si denuncias, publicamos los datos de tus clientes». Adjunta una foto de la base de clientes de la ferretería. Esa noche aparece un perfil falso de la ferretería en redes sociales con datos de algunos clientes. Marta sospecha de Julián, un empleado que despidió en septiembre.' },
        { type: 'text', icon: 'HappyUsersIcon', text: 'Ustedes son el equipo de abogados de Marta. Su misión: convertir lo que pasó en pruebas que un juez pueda creer. Al final del día deberán sostenerlas en una audiencia. Cada grupo será responsable de UNA evidencia durante toda la jornada.' },
        {
          type: 'activity',
          title: 'Formen su equipo y reciban su evidencia',
          duration: '15 min',
          groupSize: '6 grupos de 4–6 personas',
          goal: 'Conformar los 6 equipos de abogados y que cada uno conozca la evidencia que va a cuidar todo el día. La elegirán una sola vez: la usarán en todas las actividades, hasta la audiencia final.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Formen el grupo', minutes: '3 min', detail: 'El facilitador asigna una letra (A a F). Cada integrante elige la letra de su grupo en la caja de entrega de abajo. Se elige una sola vez para todo el día.' },
            { title: 'Lean su evidencia', minutes: '5 min', detail: 'En el Expediente del caso, busquen la ficha de su evidencia. Léanla en voz alta.' },
            { title: 'Primera intuición', minutes: '5 min', detail: 'Respondan en grupo: ¿qué creen que podría probar su evidencia? ¿Qué podría salir mal con ella?' },
            { title: 'Un vocero', minutes: '2 min', detail: 'Elijan un vocero para las plenarias del día.' },
          ],
          groupsTitle: 'Cada grupo y su evidencia',
          groups: EVIDENCE_GROUPS,
          closing: 'Guarden su intuición inicial: al final del día la compararemos con lo que aprendieron.',
          deliverable: { label: 'Suban su Primera intuición', hint: 'Una foto o archivo con los nombres del grupo, su evidencia y sus respuestas: qué podría probar y qué podría salir mal.' },
        },
        {
          type: 'flashcards',
          title: 'Las 6 palabras del día (gire cada tarjeta)',
          cards: [
            { front: 'Prueba digital (o electrónica)', back: 'Cualquier información con valor probatorio que se guarda o se transmite en forma digital: un chat, un correo, una foto, un registro de un servidor.' },
            { front: 'Mensaje de datos', back: 'El término legal colombiano (Ley 527 de 1999, art. 2): información generada, enviada, recibida o archivada por medios electrónicos.' },
            { front: 'Metadato', back: '«Datos sobre los datos»: fecha de creación, autor, ubicación GPS, dispositivo. Es lo que no se ve en el pantallazo y suele probar más.' },
            { front: 'Hash', back: 'La «huella digital» de un archivo: un código único que cambia por completo si se altera un solo carácter. Sirve para demostrar integridad.' },
            { front: 'Cadena de custodia', back: 'El registro de quién tuvo la evidencia, cuándo, dónde y qué hizo con ella, desde que se encuentra hasta que llega al juez.' },
            { front: 'Perito informático', back: 'El experto que extrae, analiza y explica la evidencia digital ante el juez, con métodos que otro experto puede repetir.' },
          ],
        },
        {
          type: 'quiz',
          quizData: {
            question: 'Marta le dice: «Tranquilo, abogado, ya tengo los pantallazos del chat». ¿Qué le responde?',
            options: [
              'Que los guarde, pero que no borre nada del celular: el pantallazo solo es la foto de la prueba; la prueba está en el dispositivo.',
              'Que con los pantallazos es suficiente y ya puede borrar el chat.',
              'Que los pantallazos no sirven para nada en un proceso.',
            ],
            correctOptionIndex: 0,
            feedback: {
              correct: 'Correcto. El pantallazo ayuda, pero es fácil de alterar. El original (el chat en el celular, con sus metadatos) es lo que da fuerza a la prueba.',
              incorrect: 'No del todo. El pantallazo sí puede valorarse, pero es una prueba débil por sí sola. Lo clave es conservar el original en el celular.',
            },
          },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 2 ─────────────────────────────
    {
      id: 'pd_b2',
      title: 'Bloque 2 · 8:00 — ABC técnico: dónde vive la evidencia',
      content: [
        { type: 'text', icon: 'ServerIcon', text: 'Objetivo: entender, sin tecnicismos, dónde está la evidencia digital, por qué es frágil y cómo se demuestra que no fue alterada.' },
        { type: 'text', icon: 'BrainCircuitIcon', text: 'Regla de oro: la evidencia digital casi nunca está en un solo lugar. Un WhatsApp está en el celular de Marta, en el del remitente y, en parte, en los registros del proveedor. Un correo está en el buzón, en los servidores que lo transportaron y en sus encabezados. Por eso el abogado pregunta siempre: ¿dónde más está?' },
        { type: 'text', icon: 'LockIcon', text: 'La evidencia digital tiene 3 características: es volátil (se borra o se sobrescribe), es fácil de copiar sin que se note y es fácil de alterar. La buena noticia: el hash permite demostrar que una copia es idéntica al original. Si cambia una coma, el hash cambia por completo.' },
        {
          type: 'memory',
          title: 'Memoria: ¿dónde vive cada evidencia?',
          pairs: [
            { term: 'Chat de WhatsApp', definition: 'Celulares de los participantes y copias de seguridad en la nube' },
            { term: 'Correo electrónico', definition: 'Buzón, servidores de correo y encabezados del mensaje' },
            { term: 'Transferencia bancaria', definition: 'Registros del banco de origen y del banco de destino' },
            { term: 'Inicio de sesión en un PC', definition: 'Registros (logs) del sistema operativo' },
            { term: 'Publicación en redes', definition: 'Servidores de la plataforma y la URL pública' },
            { term: 'Foto tomada con celular', definition: 'El archivo y sus metadatos EXIF (fecha, equipo, GPS)' },
          ],
        },
        {
          type: 'challenge',
          title: 'Reto: ¿cuál archivo fue alterado?',
          brief: 'El viernes en la mañana, el sobrino de Marta copió tres archivos a una memoria USB y calculó su hash (SHA-256). Hoy, el perito volvió a calcularlo. Compare las dos listas y responda. Todo es ficticio.',
          artifacts: [
            {
              name: 'hash_viernes_6_nov.txt',
              content: `Hash SHA-256 calculado el viernes 6 de noviembre, 08:40
chat_whatsapp_marta.txt        da797343d4f03c4397b51f2e9a8c553f51c3d3a593ef25a72627484bcf937181
comprobante_transferencia.pdf  acdc34470216b21cbe305d303dd4a1cbcc239f5a5dba5d0aa027aff4dfb634a9
captura_03.png                 bbd59f43c703d838656ee96699e9da7364f2423414ee663af5a59fbd058066d9`,
            },
            {
              name: 'hash_perito_hoy.txt',
              content: `Hash SHA-256 calculado por el perito hoy, 09:15
chat_whatsapp_marta.txt        da797343d4f03c4397b51f2e9a8c553f51c3d3a593ef25a72627484bcf937181
comprobante_transferencia.pdf  acdc34470216b21cbe305d303dd4a1cbcc239f5a5dba5d0aa027aff4dfb634a9
captura_03.png                 115ee338a1fb572c58dc23c297cd5f14714bd35c1b0ed3cb46b284f2b30fc532`,
            },
            {
              name: 'metadatos_foto_extorsion.txt',
              content: `Metadatos EXIF de la foto que envió el extorsionista (foto_clientes.jpg)
Marca de la cámara ........ Xiaomi
Modelo .................... Redmi Note 12
Fecha original ............ 2026:10:30 22:47:13
Software .................. MIUI Camera
GPS ....................... 4.6097 N, 74.0817 W`,
            },
          ],
          questions: [
            { prompt: '¿Cuál archivo cambió entre el viernes y hoy? (escriba el nombre exacto)', answers: ['captura_03.png', 'captura_03'], hint: 'Compare los códigos línea por línea: basta con que cambie uno.', explanation: 'El hash de captura_03.png no coincide: el archivo fue modificado después de copiarse. Los otros dos son idénticos al original.' },
            { prompt: '¿Cuántos caracteres tiene un hash SHA-256 escrito así? (número)', answers: ['64'], hint: 'Cuente los caracteres de una de las líneas.', explanation: 'Un SHA-256 tiene 64 caracteres hexadecimales (256 bits). Siempre tiene el mismo largo, sin importar el tamaño del archivo.' },
            { prompt: 'Según los metadatos, ¿en qué fecha se tomó la foto de la base de clientes? (AAAA-MM-DD)', answers: ['2026-10-30', '30/10/2026', '2026:10:30'], hint: 'Busque «Fecha original».', explanation: 'La foto se tomó el 30 de octubre a las 22:47, antes del fraude. Es un indicio de que alguien accedió a la base de clientes días antes.' },
          ],
        },
        {
          type: 'activity',
          title: 'Ficha de mi evidencia',
          duration: '30 min',
          groupSize: 'Su grupo del Bloque 1',
          goal: 'Cada grupo hace la «hoja de vida» de su evidencia: qué es, dónde está (todas las copias posibles), quién la tiene hoy, qué riesgo corre de perderse y qué haría en las próximas 24 horas para conservarla.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Dónde vive', minutes: '12 min', detail: 'Listen todos los lugares donde existe su evidencia: dispositivos, servidores, terceros (banco, plataforma, proveedor de correo).' },
            { title: 'Riesgos', minutes: '8 min', detail: 'Para cada lugar: ¿se puede borrar? ¿quién la controla? ¿cuánto tiempo la guardan?' },
            { title: 'Plan de 24 horas', minutes: '7 min', detail: 'Escriban 3 acciones concretas para conservarla hoy mismo. Ejemplo: «pedir al banco que conserve los registros de la cuenta destino».' },
            { title: 'Suban la ficha', minutes: '3 min', detail: 'Una persona del grupo sube la ficha. Basta con una entrega por grupo.' },
          ],
          groupsTitle: 'Cada grupo y su evidencia',
          groups: EVIDENCE_GROUPS,
          closing: 'Pregunta para la plenaria: ¿cuál de las 6 evidencias es la más frágil? ¿Por qué?',
          deliverable: { label: 'Suban la Ficha de su evidencia', hint: 'La hoja «Ficha de mi evidencia» del Expediente, completa (Word, PDF o foto legible).' },
        },
        {
          type: 'quiz',
          quizData: {
            question: '¿Para qué sirve calcular el hash de un archivo apenas se obtiene?',
            options: [
              'Para poder demostrar después que el archivo no ha cambiado.',
              'Para cifrarlo y que nadie pueda leerlo.',
              'Para reducir su tamaño.',
            ],
            correctOptionIndex: 0,
            feedback: {
              correct: 'Exacto. El hash no oculta nada: es una huella. Si mañana da el mismo código, el archivo es idéntico.',
              incorrect: 'No. El hash no cifra ni comprime: es una huella que permite comprobar la integridad.',
            },
          },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 3 ─────────────────────────────
    {
      id: 'pd_b3',
      title: 'Bloque 3 · 9:45 — El mundo: cómo se prueba lo digital fuera de Colombia',
      content: [
        { type: 'text', icon: 'ShieldCheckIcon', text: 'Objetivo: conocer los acuerdos y estándares internacionales que usan jueces, fiscales y peritos en todo el mundo, y ver que Colombia hace parte de esa red.' },
        { type: 'text', icon: 'AlarmIcon', text: 'Hilo del caso: el correo del falso proveedor se envió desde una cuenta de un servicio de correo con servidores en Estados Unidos (evidencia del Grupo E). Los datos de quién creó esa cuenta no están en Colombia. ¿Cómo se piden?' },
        { type: 'text', icon: 'DocumentTextIcon', text: 'El Convenio de Budapest sobre Ciberdelincuencia (Consejo de Europa, 2001) es el tratado clave. Colombia lo aprobó con la Ley 1928 de 2018. Obliga a los países a tipificar delitos informáticos, a permitir la conservación rápida de datos (art. 16 y 29) y a cooperar entre sí, con una red de contacto 24/7 (art. 35). El Segundo Protocolo (2022) agrega pedidos directos a proveedores de otros países y cooperación de emergencia.' },
        {
          type: 'interactive',
          title: 'Glosario internacional (toque cada término)',
          items: [
            { term: 'Convenio de Budapest (2001)', definition: 'Tratado del Consejo de Europa sobre ciberdelincuencia y prueba electrónica. Más de 75 países lo aplican; Colombia lo aprobó con la Ley 1928 de 2018.' },
            { term: 'Ley Modelo de la CNUDMI/UNCITRAL sobre Comercio Electrónico (1996)', definition: 'Modelo de la ONU que creó la «equivalencia funcional»: un mensaje electrónico vale como un escrito. Es la base de la Ley 527 de 1999 de Colombia.' },
            { term: 'ISO/IEC 27037', definition: 'Norma internacional para identificar, recolectar, adquirir y preservar evidencia digital. Pide que el proceso sea auditable, repetible, reproducible y justificable.' },
            { term: 'RFC 3227', definition: 'Guía técnica que fija el «orden de volatilidad»: primero se recoge lo que desaparece más rápido (memoria RAM, conexiones), después el disco.' },
            { term: 'Reglas Federales de Evidencia de EE. UU. (901 y 902)', definition: 'Exigen autenticar la prueba: demostrar que es lo que se dice que es. Desde 2017, la regla 902(14) acepta copias de datos verificadas con hash, con certificación de un experto.' },
            { term: 'Reglamento eIDAS (UE 910/2014 y 2024/1183)', definition: 'Marco europeo de firmas electrónicas, sellos de tiempo y servicios de confianza. Una firma electrónica cualificada equivale a la firma manuscrita.' },
            { term: 'Reglamento (UE) 2023/1543 sobre prueba electrónica', definition: 'Desde agosto de 2026, un juez o fiscal de un país de la UE puede ordenar directamente a un proveedor de otro país que entregue o conserve datos.' },
            { term: 'Asistencia judicial recíproca (MLAT)', definition: 'La vía tradicional: un país pide formalmente a otro una prueba. Es segura pero lenta (meses). Por eso primero se pide conservar los datos.' },
          ],
        },
        { type: 'text', icon: 'UserSearchIcon', text: 'Dos casos para recordar. En Estados Unidos, Lorraine v. Markel (2007) fijó una guía para autenticar correos, chats y páginas web: el juez rechazó correos impresos presentados sin ninguna prueba de su autenticidad. En España, el Tribunal Supremo (STS 300/2015) dijo que, si se impugna la autenticidad de un chat, quien lo aporta debe probarla, normalmente con un peritaje.' },
        {
          type: 'activity',
          title: 'Vuelta al mundo de la prueba digital',
          duration: '35 min',
          groupSize: 'Su grupo',
          goal: 'Cada grupo investiga cómo trataría un país su evidencia del caso. ¿La aceptaría un juez de ese país? ¿Qué le pediría para creerle? Al final comparamos con Colombia.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Busquen su país', minutes: '15 min', detail: 'Con la guía del Expediente y fuentes oficiales, identifiquen: (a) la norma principal sobre documentos o prueba electrónica, (b) quién debe probar la autenticidad y (c) un caso o regla destacada.' },
            { title: 'Apliquen a su evidencia', minutes: '8 min', detail: '¿Qué tendría que hacer el abogado de Marta para que su evidencia valga en ese país?' },
            { title: 'Una frase', minutes: '2 min', detail: 'Resuman en una frase lo que Colombia podría aprender de ese país.' },
            { title: 'Plenaria', minutes: '10 min', detail: 'Cada vocero comparte su frase en 1 minuto.' },
          ],
          groupsTitle: 'Grupos y país asignado',
          groups: [
            { name: 'Grupo A — España', items: ['Ley de Enjuiciamiento Civil y Criminal', 'STS 300/2015 (chat de Tuenti)'] },
            { name: 'Grupo B — Estados Unidos', items: ['Reglas Federales de Evidencia 901 y 902', 'Lorraine v. Markel (2007)'] },
            { name: 'Grupo C — Unión Europea', items: ['Reglamento eIDAS', 'Reglamento 2023/1543 de prueba electrónica'] },
            { name: 'Grupo D — México', items: ['Código de Comercio: mensajes de datos', 'Basado en la Ley Modelo UNCITRAL'] },
            { name: 'Grupo E — Cooperación internacional', items: ['Convenio de Budapest (arts. 16, 29, 31, 35)', 'Segundo Protocolo (2022)'] },
            { name: 'Grupo F — Chile y Argentina', items: ['Chile: Ley 19.799', 'Argentina: Ley 25.506'] },
          ],
          closing: 'Lo que verán en todos los países: el formato digital no impide que algo sea prueba. Lo que se discute es si es auténtico e íntegro.',
          deliverable: { label: 'Suban la Ficha país', hint: 'La hoja «Vuelta al mundo» del Expediente, con la norma, la carga de la prueba, el caso destacado y su frase final.' },
        },
        {
          type: 'h5p_check',
          title: 'Reto relámpago: ¿qué herramienta internacional usaría?',
          description: 'Elija la herramienta correcta para cada situación del caso.',
          questions: [
            {
              question: 'Hay que evitar que el proveedor de correo de EE. UU. borre los datos de la cuenta mientras se tramita la solicitud formal. ¿Qué se pide primero?',
              options: [
                { id: 'pd3_1a', text: 'La conservación rápida de los datos (Convenio de Budapest, arts. 16 y 29).', isCorrect: true, score: 10 },
                { id: 'pd3_1b', text: 'Una sentencia definitiva.', isCorrect: false, score: 0 },
                { id: 'pd3_1c', text: 'Nada: los proveedores guardan los datos para siempre.', isCorrect: false, score: 0 },
              ],
              feedback: 'Primero se conserva y después se pide la entrega por la vía formal. Los proveedores borran registros después de un tiempo.',
            },
            {
              question: '¿Qué instrumento inspiró la Ley 527 de 1999 de Colombia?',
              options: [
                { id: 'pd3_2a', text: 'La Ley Modelo de la CNUDMI/UNCITRAL sobre Comercio Electrónico (1996).', isCorrect: true, score: 10 },
                { id: 'pd3_2b', text: 'El Reglamento europeo de protección de datos (RGPD).', isCorrect: false, score: 0 },
                { id: 'pd3_2c', text: 'La Constitución de EE. UU.', isCorrect: false, score: 0 },
              ],
              feedback: 'La Ley 527 sigue de cerca la Ley Modelo de 1996, con su principio de equivalencia funcional.',
            },
            {
              question: 'El perito quiere demostrar que su método es confiable en cualquier país. ¿Qué norma técnica cita?',
              options: [
                { id: 'pd3_3a', text: 'ISO/IEC 27037.', isCorrect: true, score: 10 },
                { id: 'pd3_3b', text: 'ISO 9001.', isCorrect: false, score: 0 },
                { id: 'pd3_3c', text: 'ISO 14001.', isCorrect: false, score: 0 },
              ],
              feedback: 'ISO/IEC 27037 es la referencia internacional para recolectar y preservar evidencia digital. ISO 9001 (calidad) e ISO 14001 (ambiente) no aplican.',
            },
          ],
        },
      ],
    },

    // ───────────────────────────── BLOQUE 4 ─────────────────────────────
    {
      id: 'pd_b4',
      title: 'Bloque 4 · 11:15 — Colombia: las normas que hacen valer un mensaje de datos',
      content: [
        { type: 'text', icon: 'DocumentTextIcon', text: 'Objetivo: ubicar la prueba digital en el derecho colombiano, en lo civil y en lo penal, y saber qué norma citar en cada caso.' },
        { type: 'text', icon: 'ShieldCheckIcon', text: 'La Ley 527 de 1999 es el punto de partida. Dice que no se le puede negar valor a una información por el solo hecho de ser un mensaje de datos (art. 5), que es admisible como prueba (art. 10) y que el juez la valora según su confiabilidad: cómo se generó, se archivó o se comunicó, cómo se conservó su integridad y cómo se identifica a quien la envió (art. 11). La Corte Constitucional la declaró ajustada a la Constitución en la Sentencia C-662 de 2000.' },
        { type: 'text', icon: 'DocumentTextIcon', text: 'En lo civil, el Código General del Proceso (Ley 1564 de 2012) trata los mensajes de datos como documentos (art. 243). El art. 247 es clave: se valoran como mensajes de datos si se aportan en el formato original o en uno que los reproduzca con exactitud; la simple impresión en papel se valora como un documento común. La Ley 2213 de 2022 hizo permanente la justicia digital: notificaciones por correo, audiencias virtuales y expedientes electrónicos.' },
        { type: 'text', icon: 'LockIcon', text: 'En lo penal, la Ley 906 de 2004 incluye el mensaje de datos entre los elementos materiales probatorios (art. 275), regula la cadena de custodia (arts. 254 a 266) y exige que quien presenta la evidencia demuestre su autenticidad (art. 277). Los delitos del caso están en la Ley 1273 de 2009 (acceso abusivo, art. 269A; violación de datos personales, art. 269F; transferencia no consentida de activos, art. 269J) y en el Código Penal (extorsión, art. 244). La Ley 1581 de 2012 protege los datos de los clientes de Marta.' },
        {
          type: 'memory',
          title: 'Memoria: la norma y lo que dice',
          pairs: [
            { term: 'Ley 527 de 1999', definition: 'Mensajes de datos, firma digital y su valor probatorio' },
            { term: 'CGP, art. 247', definition: 'Valoración de mensajes de datos aportados en su formato original' },
            { term: 'Ley 906, art. 277', definition: 'Quien presenta la evidencia debe demostrar su autenticidad' },
            { term: 'Ley 1273 de 2009', definition: 'Delitos informáticos (arts. 269A a 269J)' },
            { term: 'Ley 2213 de 2022', definition: 'Justicia digital: notificaciones y audiencias virtuales' },
            { term: 'Ley 1928 de 2018', definition: 'Aprueba el Convenio de Budapest' },
          ],
        },
        { type: 'text', icon: 'UserSearchIcon', text: 'Y sobre los pantallazos: la Corte Constitucional (Sentencia T-043 de 2020) explicó que las capturas de pantalla de WhatsApp tienen un valor probatorio atenuado, porque son fáciles de modificar. El juez no las descarta, pero las valora junto con otras pruebas. Conclusión práctica: un pantallazo nunca debe ir solo.' },
        {
          type: 'activity',
          title: 'La ruta procesal de mi evidencia',
          duration: '35 min',
          groupSize: 'Su grupo',
          goal: 'Marta quiere dos cosas: recuperar su dinero (vía civil) y que se castigue a los responsables (vía penal). Cada grupo traza la ruta de su evidencia en las dos vías: qué norma la hace valer, quién puede recogerla, cómo entra al proceso y qué la podría debilitar.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Vía penal', minutes: '12 min', detail: '¿Qué delito ayuda a probar su evidencia? ¿Quién la recoge (víctima, Fiscalía, policía judicial, perito)? ¿Cómo se demuestra su autenticidad (Ley 906, art. 277)?' },
            { title: 'Vía civil', minutes: '10 min', detail: '¿Cómo la aporta el abogado en una demanda? ¿En qué formato (CGP, art. 247)? ¿Conviene una prueba extraprocesal, como una inspección o un dictamen pericial anticipado (CGP, arts. 183 a 189)?' },
            { title: 'Punto débil', minutes: '8 min', detail: 'Escriban el argumento con el que la contraparte atacaría su evidencia y cómo lo responderían.' },
            { title: 'Suban la ruta', minutes: '5 min', detail: 'Una persona del grupo sube la hoja.' },
          ],
          groupsTitle: 'Cada grupo y su evidencia',
          groups: EVIDENCE_GROUPS,
          closing: 'Recuerden: la misma evidencia puede servir en las dos vías, pero cada una tiene sus propias reglas.',
          deliverable: { label: 'Suban la Ruta procesal', hint: 'La hoja «Ruta procesal» del Expediente con la vía penal, la vía civil y el punto débil de su evidencia.' },
        },
        {
          type: 'quiz',
          quizData: {
            question: 'En un proceso civil, el abogado imprime el correo del falso proveedor y lo aporta en papel. ¿Cómo lo valora el juez según el CGP?',
            options: [
              'Como un documento común, según las reglas generales; pierde el valor propio del mensaje de datos (art. 247).',
              'Como una prueba plena e indiscutible.',
              'No lo puede valorar: está prohibido imprimir correos.',
            ],
            correctOptionIndex: 0,
            feedback: {
              correct: 'Correcto. Para aprovechar la fuerza del mensaje de datos hay que aportarlo en su formato original (por ejemplo, el archivo .eml con sus encabezados).',
              incorrect: 'No. El art. 247 del CGP dice que la simple impresión se valora como un documento común. Lo ideal es aportar el archivo original.',
            },
          },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 5 ─────────────────────────────
    {
      id: 'pd_b5',
      title: 'Bloque 5 · 14:00 — Recolección y cadena de custodia',
      content: [
        { type: 'text', icon: 'LockIcon', text: 'Objetivo: saber qué hacer (y qué NO hacer) en las primeras horas, y cómo documentar la cadena de custodia para que la evidencia llegue intacta al juez.' },
        { type: 'text', icon: 'ShieldCheckIcon', text: 'La norma ISO/IEC 27037 pide 3 cosas de toda evidencia: que sea pertinente, confiable y suficiente. Y del proceso, que sea auditable (queda registro), repetible (el mismo perito obtiene lo mismo), reproducible (otro perito también) y justificable (se puede explicar por qué se hizo así).' },
        { type: 'text', icon: 'AlarmIcon', text: 'Qué hacer con un celular: no apagarlo si está encendido, aislarlo de la red (modo avión o una bolsa que bloquee la señal) para evitar un borrado remoto, mantenerlo cargado y entregarlo a un perito. Qué NO hacer: reenviar los mensajes, responderle al extorsionista, «limpiar» el chat o revisarlo sin dejar registro.' },
        {
          type: 'scenario',
          title: 'Laboratorio: la noche del celular',
          intro: 'Son las 9 de la noche del jueves. Marta lo llama angustiada: acaba de recibir otro mensaje de extorsión. Usted llega a la ferretería. Sus decisiones suman puntos; necesita 60 de 80 para aprobar.',
          start: 'n1',
          maxPoints: 80,
          passPoints: 60,
          steps: {
            n1: {
              text: 'Marta le entrega el celular, que está encendido. ¿Qué hace primero?',
              choices: [
                { text: 'Lo dejo encendido, lo pongo en modo avión y anoto la hora, el estado de la batería y quién me lo entregó.', next: 'n2', points: 20, feedback: 'Correcto. Aislarlo evita borrados remotos y el acta inicia la cadena de custodia.' },
                { text: 'Lo apago para que no lleguen más mensajes.', next: 'n2', points: 0, feedback: 'Apagarlo puede activar bloqueos o cifrado y perder información en memoria. Mejor aislarlo de la red.' },
                { text: 'Le respondo al extorsionista desde ese celular para ganar tiempo.', next: 'n2', points: -10, feedback: 'No. Interactuar contamina la evidencia y puede poner en riesgo a Marta. Eso lo coordina la autoridad.' },
              ],
            },
            n2: {
              text: 'El sobrino de Marta ofrece «sacar todo» con una aplicación que bajó de internet. ¿Qué responde?',
              evidence: 'Mensaje recibido 21:02 · +57 3xx xxx xx47\n«Tienes hasta el viernes. 20 millones o publicamos todo.»',
              choices: [
                { text: 'Le agradezco, pero la extracción la hará un perito con herramientas reconocidas, calculando el hash y dejando registro.', next: 'n3', points: 20, feedback: 'Bien. Una extracción sin método ni registro puede alterar el equipo y debilitar la prueba.' },
                { text: 'Acepto: entre más rápido, mejor.', next: 'n3', points: 0, feedback: 'La rapidez importa, pero una herramienta desconocida puede modificar datos y no deja un procedimiento verificable.' },
                { text: 'Le pido que reenvíe todos los mensajes a mi correo.', next: 'n3', points: 5, feedback: 'Reenviar pierde metadatos. Si hace falta algo urgente, mejor capturas completas con fecha y hora, más el acta, sin tocar el original.' },
              ],
            },
            n3: {
              text: 'El sobrino confiesa que esa misma tarde entró al correo de Julián, el exempleado, con una contraseña que adivinó, y encontró «pruebas». ¿Qué hace con eso?',
              choices: [
                { text: 'No las uso: se obtuvieron con un acceso abusivo (Ley 1273, art. 269A) y serían prueba ilícita (Constitución, art. 29). Le aconsejo no volver a hacerlo.', next: 'n4', points: 20, feedback: 'Exacto. Una prueba obtenida violando derechos fundamentales es nula de pleno derecho y puede contaminar el caso.' },
                { text: 'Las uso: lo importante es la verdad.', next: 'n4', points: -20, feedback: 'Grave. La prueba sería excluida y el sobrino podría ser investigado por acceso abusivo.' },
                { text: 'Las guardo, pero no digo de dónde salieron.', next: 'n4', points: -10, feedback: 'Ocultar el origen no cura la ilicitud y compromete su ética profesional.' },
              ],
            },
            n4: {
              text: 'Para cerrar la noche, ¿cuál es el siguiente paso?',
              choices: [
                { text: 'Acompañar a Marta a denunciar (Fiscalía o CAI Virtual de la Policía), entregar el celular con el acta y pedir que se solicite al banco y a las plataformas conservar sus registros.', next: 'fin', points: 20, feedback: 'Excelente. Denuncia, entrega documentada y conservación de datos en terceros.' },
                { text: 'Esperar al lunes para ver si el extorsionista vuelve a escribir.', next: 'fin', points: -10, feedback: 'No. Los registros de terceros se pierden y la amenaza tiene un plazo.' },
              ],
            },
            fin: { text: 'Fin del laboratorio. Revise su puntaje y la retroalimentación de cada decisión.' },
          },
        },
        {
          type: 'activity',
          title: 'Cadena de custodia en vivo: encuentren el eslabón roto',
          duration: '40 min',
          groupSize: 'Su grupo + un grupo auditor',
          goal: 'Cada grupo diligencia el formato de cadena de custodia de su evidencia, desde que se encontró hasta que llega al laboratorio. Luego lo intercambia con otro grupo, que actúa como defensa y busca el «eslabón roto».',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Diligencien el formato', minutes: '15 min', detail: 'Usen el Formato de cadena de custodia del Expediente: qué es la evidencia, quién la encontró, fecha y hora de cada traspaso, hash, embalaje y firmas.' },
            { title: 'Intercambien', minutes: '10 min', detail: 'Pasen su formato al grupo siguiente (A→B, B→C… F→A). Ese grupo busca vacíos: horas sin registro, firmas que faltan, hash ausente.' },
            { title: 'Defiendan', minutes: '10 min', detail: 'El grupo auditor presenta el eslabón roto que encontró. El grupo dueño responde cómo lo corregiría o cómo lo explicaría ante el juez.' },
            { title: 'Suban el formato', minutes: '5 min', detail: 'Suban su formato y la nota del grupo auditor.' },
          ],
          groupsTitle: 'Quién audita a quién',
          groups: [
            { name: 'Grupo A', items: ['Audita al Grupo B'] },
            { name: 'Grupo B', items: ['Audita al Grupo C'] },
            { name: 'Grupo C', items: ['Audita al Grupo D'] },
            { name: 'Grupo D', items: ['Audita al Grupo E'] },
            { name: 'Grupo E', items: ['Audita al Grupo F'] },
            { name: 'Grupo F', items: ['Audita al Grupo A'] },
          ],
          closing: 'Una falla en la cadena de custodia no siempre elimina la prueba, pero le resta credibilidad: la autenticidad tendrá que demostrarse por otros medios. Mejor no tener que explicarlo.',
          deliverable: { label: 'Suban el Formato de cadena de custodia', hint: 'Su formato diligenciado y la nota del grupo que lo auditó (pueden ser dos archivos o fotos legibles).' },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 6 ─────────────────────────────
    {
      id: 'pd_b6',
      title: 'Bloque 6 · 15:45 — ¿Vale o no vale? Admisibilidad y valoración',
      content: [
        { type: 'text', icon: 'CheckCircleIcon', text: 'Objetivo: aprender a revisar una prueba digital con 4 preguntas antes de llevarla al juez, y saber cómo reforzarla.' },
        {
          type: 'flashcards',
          title: 'El semáforo probatorio: 4 preguntas',
          cards: [
            { front: '1. ¿Es auténtica?', back: '¿Es lo que digo que es y viene de quien digo? Se refuerza con metadatos, peritaje, certificación del proveedor o testimonio de quien la recibió.' },
            { front: '2. ¿Está íntegra?', back: '¿Llegó sin cambios? Se demuestra con el hash y con la cadena de custodia.' },
            { front: '3. ¿Es lícita?', back: '¿Se obtuvo respetando derechos (intimidad, debido proceso)? Si no, es nula de pleno derecho (Constitución, art. 29).' },
            { front: '4. ¿Es pertinente y conducente?', back: '¿Se relaciona con los hechos y es un medio idóneo para probarlos? Si no, el juez puede rechazarla.' },
          ],
        },
        { type: 'text', icon: 'ClosedEnvelopeIcon', text: 'Hilo del caso: el Grupo B tiene el correo del falso proveedor. Los encabezados son el «sobre» del correo: muestran por qué servidores pasó, desde dónde salió y si superó los controles que verifican al remitente (SPF, DKIM y DMARC). Un «fail» es una señal fuerte de suplantación.' },
        {
          type: 'challenge',
          title: 'Reto: lea el «sobre» del correo',
          brief: 'Estos son los encabezados del correo que recibió Marta. No hace falta ser ingeniero: busque las palabras clave. Todo es ficticio.',
          artifacts: [
            {
              name: 'correo_cambio_de_cuenta.eml',
              content: `Return-Path: <pagos@acer0sdelnorte.example>
Received: from mail.acer0sdelnorte.example (unknown [203.0.113.77])
        by mx.ferreteriaelroble.example; Mon, 2 Nov 2026 10:14:09 -0500
Authentication-Results: mx.ferreteriaelroble.example;
        spf=pass smtp.mailfrom=acer0sdelnorte.example;
        dmarc=fail header.from=acerosdelnorte.example
From: "Aceros del Norte - Cartera" <cartera@acerosdelnorte.example>
Reply-To: <cartera.acerosnorte@correo-rapido.example>
To: marta@ferreteriaelroble.example
Subject: Actualización de datos bancarios - URGENTE
Date: Mon, 2 Nov 2026 10:14:02 -0500`,
            },
          ],
          questions: [
            { prompt: 'Mire el Return-Path. ¿Qué carácter cambió el estafador en el dominio «acerosdelnorte»? (escriba el carácter que usó)', answers: ['0', 'cero'], hint: 'Compare letra por letra acer0sdelnorte con acerosdelnorte.', explanation: 'Cambió la letra «o» por el número «0». Es un dominio parecido, registrado para engañar.' },
            { prompt: '¿Qué resultado obtuvo el control DMARC? (una palabra)', answers: ['fail'], explanation: 'DMARC = fail: el dominio que se muestra en «From» no coincide con el que realmente envió el correo.' },
            { prompt: '¿A qué dirección llegarían las respuestas de Marta?', answers: ['cartera.acerosnorte@correo-rapido.example'], hint: 'Busque «Reply-To».', explanation: 'Las respuestas iban a un buzón del estafador en otro servicio. Esa cuenta es la del Grupo E: hay que pedir datos a un proveedor extranjero.' },
          ],
        },
        {
          type: 'h5p_check',
          title: 'Prueba rápida: ¿la admite el juez?',
          description: 'Cinco situaciones del caso. Decida si la prueba está bien obtenida.',
          questions: [
            {
              question: 'Marta graba con su celular la pantalla mientras recorre el chat, mostrando el número del remitente, las fechas y la información del contacto.',
              options: [
                { id: 'pd6_1a', text: 'Es útil: muestra el contexto. Igual conviene conservar el celular para un peritaje.', isCorrect: true, score: 10 },
                { id: 'pd6_1b', text: 'Es ilícita porque grabó su propio celular.', isCorrect: false, score: 0 },
              ],
              feedback: 'Grabar su propio dispositivo no viola derechos de nadie. Da más contexto que un pantallazo, pero sigue sin reemplazar el original.',
            },
            {
              question: 'Un amigo de Marta instaló a escondidas una aplicación espía en el celular de Julián para leer sus chats.',
              options: [
                { id: 'pd6_2a', text: 'Prueba ilícita: viola la intimidad y la inviolabilidad de las comunicaciones (Constitución, art. 15) y puede ser delito.', isCorrect: true, score: 10 },
                { id: 'pd6_2b', text: 'Es válida si confirma la sospecha.', isCorrect: false, score: 0 },
              ],
              feedback: 'El fin no justifica el medio. Interceptar comunicaciones requiere orden judicial.',
            },
            {
              question: 'La Fiscalía obtiene del banco, con los requisitos legales, los datos del titular de la cuenta que recibió el dinero.',
              options: [
                { id: 'pd6_3a', text: 'Es lícita y pertinente.', isCorrect: true, score: 10 },
                { id: 'pd6_3b', text: 'Es ilícita: los datos bancarios nunca se pueden pedir.', isCorrect: false, score: 0 },
              ],
              feedback: 'Los datos financieros están protegidos, pero la autoridad puede obtenerlos siguiendo el procedimiento legal (con control judicial cuando la ley lo exige).',
            },
            {
              question: 'El abogado aporta un PDF del extracto bancario que descargó Marta del portal del banco, con su hash calculado ese día.',
              options: [
                { id: 'pd6_4a', text: 'Buena práctica: formato original, hash e identificación de la fuente. Se puede reforzar con certificación del banco.', isCorrect: true, score: 10 },
                { id: 'pd6_4b', text: 'No sirve: solo vale si el banco lo envía por correo certificado.', isCorrect: false, score: 0 },
              ],
              feedback: 'El documento descargado del portal oficial, con hash, es una prueba sólida. La certificación del banco la hace aún más fuerte.',
            },
            {
              question: 'Una publicación del perfil falso fue borrada. Solo queda un pantallazo sin fecha ni URL.',
              options: [
                { id: 'pd6_5a', text: 'Es una prueba débil: hay que reforzarla con testimonios, archivos web o con una solicitud a la plataforma.', isCorrect: true, score: 10 },
                { id: 'pd6_5b', text: 'Es prueba plena porque la publicación ya no existe.', isCorrect: false, score: 0 },
              ],
              feedback: 'Lección del Grupo F: cuando vea algo en línea, documéntelo de inmediato con URL, fecha y hora, y pida su conservación.',
            },
          ],
        },
        {
          type: 'activity',
          title: 'Semáforo probatorio',
          duration: '30 min',
          groupSize: 'Su grupo',
          goal: 'Cada grupo pone su evidencia en el semáforo: verde, amarillo o rojo en cada una de las 4 preguntas (autenticidad, integridad, licitud y pertinencia). Por cada amarillo o rojo proponen cómo reforzarla: peritaje, certificación del proveedor, testimonio o prueba extraprocesal.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Califiquen', minutes: '10 min', detail: 'Pongan un color a cada pregunta y escriban una frase que lo justifique.' },
            { title: 'Refuercen', minutes: '10 min', detail: 'Para cada amarillo o rojo, escriban qué prueba adicional pedirían y a quién.' },
            { title: 'Preparen la audiencia', minutes: '7 min', detail: 'Escriban la pregunta más difícil que le harían al perito de la otra parte sobre su evidencia.' },
            { title: 'Suban el semáforo', minutes: '3 min', detail: 'Una persona del grupo sube la hoja.' },
          ],
          groupsTitle: 'Cada grupo y su evidencia',
          groups: EVIDENCE_GROUPS,
          closing: 'Este semáforo es su guion para la audiencia del Bloque 7. Llévenlo.',
          deliverable: { label: 'Suban el Semáforo probatorio', hint: 'La hoja «Semáforo probatorio» del Expediente con los 4 colores, los refuerzos y la pregunta para el perito.' },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 7 ─────────────────────────────
    {
      id: 'pd_b7',
      title: 'Bloque 7 · 17:15 — Audiencia simulada: ¡Objeción, su señoría!',
      content: [
        { type: 'text', icon: 'HappyUsersIcon', text: 'Objetivo: poner a prueba todo lo aprendido. Cada grupo presenta su evidencia en una audiencia y otro grupo la ataca como defensa. Un juez decide si la admite y cuánto pesa.' },
        { type: 'text', icon: 'AlarmIcon', text: 'Hilo del caso: la Fiscalía imputó a Julián Pardo por acceso abusivo a un sistema informático, violación de datos personales y extorsión. La defensa dice que todo es un montaje: «los pantallazos se editan en un minuto», «el computador lo usaba todo el mundo», «el correo pudo enviarlo cualquiera».' },
        {
          type: 'activity',
          title: 'La audiencia del caso Ferretería El Roble',
          duration: '70 min',
          groupSize: '3 audiencias de 2 grupos, más jueces',
          goal: 'En cada audiencia, un grupo presenta su evidencia (como apoderado de la víctima o fiscal) y el otro la ataca (como defensa). Luego cambian los papeles con la evidencia del otro grupo. Dos personas de cada audiencia actúan como jueces y deciden.',
          downloads: [WORKBOOK],
          steps: [
            { title: 'Preparen', minutes: '10 min', detail: 'Con su Semáforo probatorio, preparen 3 minutos de presentación: qué es la evidencia, cómo se obtuvo, cómo se preservó y qué prueba. Elijan quién hace de perito.' },
            { title: 'Primera ronda', minutes: '20 min', detail: 'Presenta el primer grupo (3 min), la defensa objeta e interroga al perito (4 min), réplica (2 min) y los jueces deciden (1 min).' },
            { title: 'Segunda ronda', minutes: '20 min', detail: 'Se invierten los papeles con la evidencia del segundo grupo.' },
            { title: 'Acta', minutes: '10 min', detail: 'Cada grupo escribe el acta: qué se admitió, qué objeción fue la más fuerte y qué faltó.' },
            { title: 'Plenaria', minutes: '10 min', detail: 'Los jueces de cada audiencia cuentan qué decidieron y por qué.' },
          ],
          groupsTitle: 'Audiencias',
          groups: [
            { name: 'Sala 1 — Grupos A y B', items: ['Chat de WhatsApp', 'Correo del falso proveedor'] },
            { name: 'Sala 2 — Grupos C y D', items: ['Transferencia bancaria', 'Computador de la caja'] },
            { name: 'Sala 3 — Grupos E y F', items: ['Correo en la nube', 'Publicación en redes'] },
          ],
          closing: 'Lo que gana una audiencia no es la evidencia más llamativa, sino la mejor preservada y mejor explicada.',
          deliverable: { label: 'Suban el Acta de su audiencia', hint: 'El acta del Expediente con lo que se admitió, la objeción más fuerte y lo que faltó (Word, PDF o foto legible).' },
        },
        {
          type: 'scenario',
          title: 'Laboratorio: responda a la objeción',
          intro: 'Usted es el apoderado de Marta y presenta el chat de extorsión. La defensa de Julián se levanta. Elija la mejor respuesta en cada momento; necesita 45 de 60 para aprobar.',
          start: 'o1',
          maxPoints: 60,
          passPoints: 45,
          steps: {
            o1: {
              text: 'Defensa: «Objeción, su señoría. Son pantallazos. Cualquiera los fabrica en un minuto.»',
              choices: [
                { text: 'Los pantallazos solo ilustran: la prueba es la extracción forense del celular, con su hash y su cadena de custodia, y el perito está aquí para explicarla.', next: 'o2', points: 20, feedback: 'Excelente. Usted no defiende el pantallazo: muestra la prueba original y su respaldo técnico.' },
                { text: 'Mi clienta jura que son reales.', next: 'o2', points: 0, feedback: 'El testimonio ayuda, pero frente a una objeción técnica necesita respaldo técnico.' },
                { text: 'Los pantallazos son prueba plena según la ley.', next: 'o2', points: -10, feedback: 'No es así: la jurisprudencia les da un valor atenuado. Afirmarlo debilita su credibilidad.' },
              ],
            },
            o2: {
              text: 'Defensa al perito: «¿Cómo sabe que el archivo que analizó es el mismo que se sacó del celular?»',
              evidence: 'Acta de extracción · 6 nov 2026 · 10:32\nHash SHA-256 de la extracción: 7c1e…a94f\nHash verificado en el laboratorio · 6 nov 2026 · 16:10: 7c1e…a94f',
              choices: [
                { text: 'Perito: «Calculé el hash al extraerlo y lo verifiqué en el laboratorio: es idéntico. Está en el acta y en la cadena de custodia.»', next: 'o3', points: 20, feedback: 'Respuesta perfecta: integridad demostrada con el hash y documentada.' },
                { text: 'Perito: «Porque lo guardé en una carpeta segura.»', next: 'o3', points: 0, feedback: 'La carpeta no prueba nada. El hash sí.' },
              ],
            },
            o3: {
              text: 'Defensa: «Aunque el chat sea real, no prueba que lo escribió mi cliente.»',
              choices: [
                { text: 'Tiene razón en que hay que probar la autoría: por eso aportamos también la información del titular de la línea obtenida legalmente, la foto con metadatos y el acceso con el usuario de Julián en el computador.', next: 'fin', points: 20, feedback: 'Muy bien. Autenticidad no es autoría: la autoría se prueba sumando indicios de varias fuentes. Ese es el hilo de todo el día.' },
                { text: 'Si no fue él, ¿entonces quién?', next: 'fin', points: -10, feedback: 'Invertir la carga de la prueba no funciona: en lo penal, la carga es de quien acusa.' },
              ],
            },
            fin: { text: 'Fin de la audiencia. La lección: una prueba digital fuerte es la que se sostiene con otras.' },
          },
        },
      ],
    },

    // ───────────────────────────── BLOQUE 8 ─────────────────────────────
    {
      id: 'pd_b8',
      title: 'Bloque 8 · 18:45 — Cierre: el decálogo y la evaluación final',
      content: [
        { type: 'text', icon: 'CheckCircleIcon', text: 'Cierre del caso: gracias al trabajo de los 6 grupos, la evidencia de la Ferretería El Roble llegó completa a la audiencia. Volvamos a la intuición del Bloque 1: ¿qué cambió en su forma de ver un pantallazo?' },
        {
          type: 'flashcards',
          title: 'Decálogo del abogado frente a la prueba digital',
          cards: [
            { front: '1. Pregunte dónde más está', back: 'La evidencia digital casi siempre tiene copias en terceros: banco, plataforma, proveedor de correo.' },
            { front: '2. Conserve antes de analizar', back: 'Pida la conservación de datos a los terceros de inmediato. Se borran.' },
            { front: '3. No toque el original', back: 'No reenvíe, no responda, no «limpie». Trabaje sobre copias verificadas con hash.' },
            { front: '4. Hash desde el primer minuto', back: 'Es su seguro de integridad.' },
            { front: '5. Todo se documenta', back: 'Quién, cuándo, dónde y qué hizo. Eso es la cadena de custodia.' },
            { front: '6. El pantallazo nunca va solo', back: 'Acompáñelo con el original, el peritaje, la certificación del proveedor o testimonios.' },
            { front: '7. La licitud no se negocia', back: 'Una prueba obtenida violando derechos es nula y puede arrastrar el caso.' },
            { front: '8. Aporte el formato original', back: 'El archivo .eml, el PDF descargado, la extracción forense. El papel vale menos (CGP, art. 247).' },
            { front: '9. Autenticidad no es autoría', back: 'Que el mensaje sea real no prueba quién lo escribió: sume indicios.' },
            { front: '10. Piense en el mundo', back: 'Si los datos están fuera del país, use la cooperación internacional (Convenio de Budapest) y pida conservación primero.' },
          ],
        },
        {
          type: 'resource',
          title: '📊 Presentación del curso',
          description: 'Las diapositivas de la jornada, con el caso, las normas colombianas e internacionales y el decálogo. Úsela para repasar.',
          href: `${MAT}/presentacion-prueba-digital-unilibre.pptx`,
          cta: 'Descargar presentación',
        },
        { type: 'text', icon: 'CheckCircleIcon', text: 'Evaluación final: 12 preguntas al azar de un banco de 20. Se aprueba con 70% y puede reintentar con otras preguntas. Al aprobar, termina el curso y puede reclamar su certificado.' },
        {
          type: 'exam',
          title: 'Evaluación final: Prueba Digital para Abogados',
          description: 'Repasa el ABC técnico, el marco internacional, el marco colombiano, la cadena de custodia y la valoración de la prueba.',
          passPercent: 70,
          questionsPerAttempt: 12,
          questions: [
            { question: '¿Qué es un mensaje de datos según la Ley 527 de 1999?', options: [{ id: 'pdx1a', text: 'Información generada, enviada, recibida o archivada por medios electrónicos.', isCorrect: true, score: 10 }, { id: 'pdx1b', text: 'Solo los correos electrónicos firmados digitalmente.', isCorrect: false, score: 0 }, { id: 'pdx1c', text: 'Únicamente los mensajes de texto (SMS).', isCorrect: false, score: 0 }], feedback: 'La definición es amplia: chats, correos, archivos, registros.' },
            { question: '¿Qué principio de la Ley 527 dice que un mensaje electrónico puede cumplir la función de un escrito?', options: [{ id: 'pdx2a', text: 'La equivalencia funcional.', isCorrect: true, score: 10 }, { id: 'pdx2b', text: 'La cosa juzgada.', isCorrect: false, score: 0 }, { id: 'pdx2c', text: 'La favorabilidad.', isCorrect: false, score: 0 }], feedback: 'Viene de la Ley Modelo UNCITRAL de 1996.' },
            { question: '¿Para qué sirve el hash de un archivo?', options: [{ id: 'pdx3a', text: 'Para demostrar que el archivo no ha cambiado desde que se calculó.', isCorrect: true, score: 10 }, { id: 'pdx3b', text: 'Para cifrar el archivo.', isCorrect: false, score: 0 }, { id: 'pdx3c', text: 'Para saber quién creó el archivo.', isCorrect: false, score: 0 }], feedback: 'Es una huella: si cambia un carácter, cambia el hash.' },
            { question: 'Según el art. 247 del CGP, la simple impresión en papel de un mensaje de datos…', options: [{ id: 'pdx4a', text: 'Se valora según las reglas generales de los documentos.', isCorrect: true, score: 10 }, { id: 'pdx4b', text: 'Es prueba plena.', isCorrect: false, score: 0 }, { id: 'pdx4c', text: 'Está prohibida.', isCorrect: false, score: 0 }], feedback: 'Para aprovechar su valor como mensaje de datos, apórtelo en formato original.' },
            { question: 'En el proceso penal (Ley 906, art. 277), ¿quién debe demostrar la autenticidad de la evidencia?', options: [{ id: 'pdx5a', text: 'La parte que la presenta.', isCorrect: true, score: 10 }, { id: 'pdx5b', text: 'El juez, de oficio.', isCorrect: false, score: 0 }, { id: 'pdx5c', text: 'La parte contraria.', isCorrect: false, score: 0 }], feedback: 'La carga de la autenticidad es de quien aporta la evidencia.' },
            { question: '¿Qué valor dio la Corte Constitucional (T-043 de 2020) a los pantallazos de WhatsApp?', options: [{ id: 'pdx6a', text: 'Un valor probatorio atenuado: se valoran junto con otras pruebas.', isCorrect: true, score: 10 }, { id: 'pdx6b', text: 'Ningún valor: siempre se rechazan.', isCorrect: false, score: 0 }, { id: 'pdx6c', text: 'Plena prueba en todos los casos.', isCorrect: false, score: 0 }], feedback: 'Por su facilidad de edición, no deben ir solos.' },
            { question: 'Un pariente de la víctima entra al correo del sospechoso adivinando la contraseña. Lo que encuentre es…', options: [{ id: 'pdx7a', text: 'Prueba ilícita, y el acceso puede ser delito (art. 269A, Ley 1273).', isCorrect: true, score: 10 }, { id: 'pdx7b', text: 'Prueba válida si es útil.', isCorrect: false, score: 0 }, { id: 'pdx7c', text: 'Válida si se presenta impresa.', isCorrect: false, score: 0 }], feedback: 'Es nula de pleno derecho (Constitución, art. 29).' },
            { question: 'Un celular con mensajes de extorsión está encendido. ¿Qué es lo recomendable?', options: [{ id: 'pdx8a', text: 'Dejarlo encendido, aislarlo de la red, mantenerlo cargado y documentar la entrega.', isCorrect: true, score: 10 }, { id: 'pdx8b', text: 'Apagarlo y guardarlo en un cajón.', isCorrect: false, score: 0 }, { id: 'pdx8c', text: 'Reenviar los mensajes a un correo.', isCorrect: false, score: 0 }], feedback: 'Aislarlo evita borrados remotos; el acta inicia la cadena de custodia.' },
            { question: '¿Qué registra la cadena de custodia?', options: [{ id: 'pdx9a', text: 'Quién tuvo la evidencia, cuándo, dónde y qué hizo con ella.', isCorrect: true, score: 10 }, { id: 'pdx9b', text: 'El valor económico de la evidencia.', isCorrect: false, score: 0 }, { id: 'pdx9c', text: 'Solo el nombre del juez del caso.', isCorrect: false, score: 0 }], feedback: 'Es la historia completa de la evidencia.' },
            { question: '¿Con qué ley aprobó Colombia el Convenio de Budapest?', options: [{ id: 'pdx10a', text: 'Ley 1928 de 2018.', isCorrect: true, score: 10 }, { id: 'pdx10b', text: 'Ley 1581 de 2012.', isCorrect: false, score: 0 }, { id: 'pdx10c', text: 'Ley 2213 de 2022.', isCorrect: false, score: 0 }], feedback: 'La Ley 1581 es de datos personales y la 2213 de justicia digital.' },
            { question: 'Los datos de una cuenta de correo están en un servidor de otro país. ¿Qué se pide primero?', options: [{ id: 'pdx11a', text: 'La conservación rápida de los datos, mientras se tramita la solicitud formal.', isCorrect: true, score: 10 }, { id: 'pdx11b', text: 'Nada: no se puede obtener prueba en el exterior.', isCorrect: false, score: 0 }, { id: 'pdx11c', text: 'Escribirle al dueño de la cuenta.', isCorrect: false, score: 0 }], feedback: 'Convenio de Budapest, arts. 16 y 29: conservar primero, luego pedir.' },
            { question: '¿Qué norma internacional guía la recolección y preservación de evidencia digital?', options: [{ id: 'pdx12a', text: 'ISO/IEC 27037.', isCorrect: true, score: 10 }, { id: 'pdx12b', text: 'ISO 9001.', isCorrect: false, score: 0 }, { id: 'pdx12c', text: 'ISO 45001.', isCorrect: false, score: 0 }], feedback: 'ISO/IEC 27037 es la referencia para los primeros respondientes y especialistas.' },
            { question: 'Según el «orden de volatilidad» (RFC 3227), ¿qué se recoge primero?', options: [{ id: 'pdx13a', text: 'Lo que desaparece más rápido, como la memoria RAM.', isCorrect: true, score: 10 }, { id: 'pdx13b', text: 'Las copias de seguridad antiguas.', isCorrect: false, score: 0 }, { id: 'pdx13c', text: 'Los documentos impresos.', isCorrect: false, score: 0 }], feedback: 'Primero lo más volátil, después lo más estable.' },
            { question: 'En un correo, «dmarc=fail» indica…', options: [{ id: 'pdx14a', text: 'Que el dominio que se muestra como remitente no es el que realmente lo envió: posible suplantación.', isCorrect: true, score: 10 }, { id: 'pdx14b', text: 'Que el correo tiene virus.', isCorrect: false, score: 0 }, { id: 'pdx14c', text: 'Que el correo llegó tarde.', isCorrect: false, score: 0 }], feedback: 'Es una señal fuerte de suplantación del remitente.' },
            { question: '¿Qué son los metadatos de una foto?', options: [{ id: 'pdx15a', text: 'Datos ocultos como la fecha, el equipo y la ubicación donde se tomó.', isCorrect: true, score: 10 }, { id: 'pdx15b', text: 'Los colores de la imagen.', isCorrect: false, score: 0 }, { id: 'pdx15c', text: 'El nombre que le puso el usuario.', isCorrect: false, score: 0 }], feedback: 'Los metadatos EXIF suelen probar más que la imagen misma.' },
            { question: 'Que un mensaje sea auténtico, ¿prueba quién lo escribió?', options: [{ id: 'pdx16a', text: 'No: la autoría se prueba sumando indicios de varias fuentes.', isCorrect: true, score: 10 }, { id: 'pdx16b', text: 'Sí, siempre.', isCorrect: false, score: 0 }, { id: 'pdx16c', text: 'Solo si está escrito en mayúsculas.', isCorrect: false, score: 0 }], feedback: 'Autenticidad no es autoría.' },
            { question: 'En España, según el Tribunal Supremo (STS 300/2015), si se impugna un chat…', options: [{ id: 'pdx17a', text: 'Quien lo aporta debe probar su autenticidad, normalmente con un peritaje.', isCorrect: true, score: 10 }, { id: 'pdx17b', text: 'Se excluye automáticamente.', isCorrect: false, score: 0 }, { id: 'pdx17c', text: 'El juez debe creerle a quien lo aporta.', isCorrect: false, score: 0 }], feedback: 'La impugnación traslada la carga a quien aporta la conversación.' },
            { question: 'Antes de una demanda civil, ¿qué figura del CGP permite asegurar una prueba digital?', options: [{ id: 'pdx18a', text: 'Las pruebas extraprocesales, como la inspección o el dictamen pericial anticipado.', isCorrect: true, score: 10 }, { id: 'pdx18b', text: 'La casación.', isCorrect: false, score: 0 }, { id: 'pdx18c', text: 'El recurso de reposición.', isCorrect: false, score: 0 }], feedback: 'CGP, arts. 183 a 189.' },
            { question: '¿Qué ley colombiana tipifica los delitos informáticos?', options: [{ id: 'pdx19a', text: 'Ley 1273 de 2009.', isCorrect: true, score: 10 }, { id: 'pdx19b', text: 'Ley 527 de 1999.', isCorrect: false, score: 0 }, { id: 'pdx19c', text: 'Ley 1564 de 2012.', isCorrect: false, score: 0 }], feedback: 'Arts. 269A a 269J del Código Penal.' },
            { question: 'Una falla en la cadena de custodia…', options: [{ id: 'pdx20a', text: 'Le resta credibilidad a la evidencia; su autenticidad tendrá que demostrarse por otros medios.', isCorrect: true, score: 10 }, { id: 'pdx20b', text: 'No tiene ninguna consecuencia.', isCorrect: false, score: 0 }, { id: 'pdx20c', text: 'Convierte la prueba en ilícita automáticamente.', isCorrect: false, score: 0 }], feedback: 'Afecta su peso y obliga a explicar y respaldar la autenticidad.' },
          ],
        },
      ],
    },
  ],
};
