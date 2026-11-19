import type { LearningPath } from '../types';

// Conferencia-taller para el gremio asegurador, en alianza con INIF: antisuplantación de identidad.
// Cada módulo acompaña un momento de la charla: el participante responde en su celular mientras
// el conferencista avanza. Las cifras citan su fuente; las de prensa se presentan como tales.
// El número de módulos debe coincidir con course_module_counts() en
// supabase/migrations/2026-11-19_curso_antisuplantacion_seguros.sql.

// Presentación de la conferencia en HTML (se abre en el navegador, también en el celular).
const PRESENTATION = {
  type: 'resource' as const,
  title: '📊 Presentación de la conferencia',
  description: 'Las diapositivas de la charla, parte por parte: cifras, tipologías, deepfakes, datos de póliza, documentos digitales y protocolo. Ábrala para seguir la conferencia o para repasar.',
  href: '/materiales/antisuplantacion-seguros/presentacion-antisuplantacion-seguros.html',
  cta: 'Abrir presentación',
};

export const ANTISUPLANTACION_SEGUROS: LearningPath = {
  title: 'Antisuplantación de Identidad en el Sector Asegurador',
  description: 'Conferencia-taller con INIF para el gremio asegurador: cifras de fraude en Colombia, tipologías de suplantación, detección de deepfakes, protección de los datos de póliza y validación de la integridad de documentos digitales. Participe desde su celular en cada momento de la charla y obtenga su certificado.',
  lastUpdated: 'Noviembre 2026',
  modules: [
    // ───────────────────────────── MÓDULO 1 ─────────────────────────────
    {
      id: 'as_m1',
      title: '1. El fraude por suplantación en cifras',
      content: [
        { type: 'text', icon: 'ShieldCheckIcon', text: 'Bienvenido. Esta conferencia es participativa: cada módulo acompaña un momento de la charla. Cuando el conferencista lo indique, responda desde su celular. Al final, con la evaluación aprobada, recibe su certificado.' },
        PRESENTATION,
        { type: 'text', icon: 'AlarmIcon', text: 'Fasecolda reportó que en 2025 la industria aseguradora identificó 49.645 casos de fraude, por más de $256.000 millones, con datos de compañías que suman el 78 % de las primas del mercado. En 2024 había reportado 30.739 casos por más de $272.000 millones. Las ramas más expuestas: SOAT, automóviles y riesgos laborales.' },
        { type: 'text', icon: 'UserSearchIcon', text: 'INIF atendió 32.136 solicitudes de investigación en 2025. El 19,1 % (6.137 casos) tenía fraude o indicios de fraude, y el ahorro estimado para sus clientes en autos y SOAT superó los $10.056 millones. Uno de cada cinco casos investigados tenía algo que ocultar.' },
        { type: 'text', icon: 'SpyIcon', text: 'La suplantación no es solo del sector asegurador. La Superintendencia de Industria y Comercio suma 40.316 denuncias por suplantación de identidad desde 2020. Asobancaria reportó más de 765.000 reclamaciones por fraude en la banca durante 2025, por más de $967.000 millones. El mismo delincuente que abre un crédito con una cédula ajena reclama un siniestro con ella.' },
        { type: 'text', icon: 'ShieldCheckIcon', text: 'Las autoridades: el Centro Cibernético Policial registró 64.628 denuncias por delitos informáticos en 2025, frente a 69.867 en 2024 (boletín con corte al 28 de noviembre de 2025, sujeto a consolidación con la Fiscalía). Cerca del 88 % se concentra en tres conductas: hurto por medios informáticos, acceso abusivo a un sistema informático y violación de datos personales. Entre 2023 y 2024, las denuncias por suplantación de sitios web pasaron de 4.716 a 6.209, y las de hurto por medios informáticos, de 31.095 a 37.409.' },
        { type: 'text', icon: 'DocumentTextIcon', text: 'En la Fiscalía, la Dirección Especializada contra los Delitos Informáticos lleva estos casos. Ya en 2023 reportaba cerca de 79.000 noticias criminales activas por delitos informáticos, y en 2026 desarticuló con la Policía una red que habría defraudado a empresas de telecomunicaciones por más de $6.500 millones. Denunciar no es un trámite: es lo que permite conectar los casos y capturar a las redes.' },
        {
          type: 'interactive',
          title: '🗓️ Antecedentes: los ataques que alimentan el fraude',
          items: [
            { term: 'Nov. 2022 · Keralty / EPS Sanitas', definition: 'Ransomware atribuido a RansomHouse: unos 5,5 millones de usuarios sin acceso a los servicios digitales de su EPS. Datos de salud: el insumo de reclamaciones e incapacidades falsas.' },
            { term: 'Dic. 2022 · EPM', definition: 'Ransomware atribuido a BlackCat (ALPHV) contra la empresa de servicios públicos de Medellín. Facturas y datos de clientes: material para suplantar a la empresa y a sus usuarios.' },
            { term: 'Sep. 2023 · IFX Networks', definition: 'Ransomware contra un proveedor de nube: cayeron servicios de ministerios, superintendencias, EPS y la Rama Judicial. Un solo proveedor comprometido afecta a cientos de clientes.' },
            { term: 'Ene. 2024 · Arup (Hong Kong)', definition: 'Un empleado transfirió unos USD 25 millones en 15 operaciones tras una videollamada en la que el director financiero y sus colegas eran deepfakes.' },
            { term: 'Feb. 2024 · Change Healthcare (EE. UU.)', definition: 'Ransomware a través de un portal sin doble factor y con credenciales filtradas: unos 192,7 millones de personas afectadas y los pagos de reclamaciones del sector salud paralizados.' },
            { term: '2024 · Clientes de Snowflake', definition: 'Credenciales robadas por programas espía (infostealers), sin doble factor: unas 165 organizaciones expuestas y bases de clientes en venta.' },
            { term: 'Nov. 2026 · Biometría en venta', definition: 'En un foro clandestino se anunció la venta de supuestos datos, fotos y huellas de 41,4 millones de colombianos, con una herramienta de consulta por cédula. No está verificado, pero muestra el insumo perfecto para suplantar: la biometría no se cambia como una contraseña.' },
          ],
        },
        { type: 'text', icon: 'SpyIcon', text: 'Los insumos del fraude: el suplantador no inventa los datos, los compra. Bases filtradas, «combolists» (listas de correos y contraseñas), registros de infostealers con sesiones activas, fotos de cédula, selfies y huellas se venden en foros y canales de Telegram, con intermediarios de pago (escrow) y hasta servicios de consulta por número de documento. Flashpoint estimó 1.800 millones de credenciales robadas por infostealers solo en el primer semestre de 2025, y el informe DBIR 2025 de Verizon encontró que el 54 % de las víctimas de ransomware tenía credenciales de su dominio en esos registros. Cada filtración de hoy es el siniestro falso de mañana.' },
        {
          type: 'h5p_check',
          title: '🎯 Dinámica: ¿cuánto cree que es?',
          description: 'Antes de que el conferencista muestre cada cifra, responda. Gana quien más se acerque: compare su intuición con los datos.',
          questions: [
            {
              question: 'Según Fasecolda, ¿cuántos casos de fraude identificó la industria aseguradora en 2025?',
              options: [
                { id: 'as1q1a', text: 'Cerca de 5.000.', isCorrect: false, score: 0 },
                { id: 'as1q1b', text: 'Cerca de 50.000 (49.645).', isCorrect: true, score: 10 },
                { id: 'as1q1c', text: 'Más de 500.000.', isCorrect: false, score: 0 },
              ],
              feedback: 'Fueron 49.645 casos por más de $256.000 millones, con datos de compañías que suman el 78 % de las primas: la cifra real del mercado es mayor.',
            },
            {
              question: 'De las solicitudes que investigó INIF en 2025, ¿qué proporción tenía fraude o indicios de fraude?',
              options: [
                { id: 'as1q2a', text: 'Una de cada cien.', isCorrect: false, score: 0 },
                { id: 'as1q2b', text: 'Una de cada cinco (19,1 %).', isCorrect: true, score: 10 },
                { id: 'as1q2c', text: 'Nueve de cada diez.', isCorrect: false, score: 0 },
              ],
              feedback: 'El 19,1 % de 32.136 solicitudes: 6.137 casos. Por eso la verificación no es desconfianza, es método.',
            },
            {
              question: '¿Cuáles son las ramas de seguros más expuestas al fraude en Colombia?',
              options: [
                { id: 'as1q3a', text: 'SOAT, automóviles y riesgos laborales.', isCorrect: true, score: 10 },
                { id: 'as1q3b', text: 'Hogar, mascotas y viajes.', isCorrect: false, score: 0 },
                { id: 'as1q3c', text: 'Ninguna: el fraude es parejo en todas.', isCorrect: false, score: 0 },
              ],
              feedback: 'SOAT, automóviles y riesgos laborales concentran el fraude: mucho volumen, pagos rápidos y documentos fáciles de falsificar.',
            },
            {
              question: 'Según la SIC, ¿cuántas denuncias por suplantación de identidad se han registrado desde 2020?',
              options: [
                { id: 'as1q4a', text: 'Unas 400.', isCorrect: false, score: 0 },
                { id: 'as1q4b', text: 'Más de 40.000 (40.316).', isCorrect: true, score: 10 },
                { id: 'as1q4c', text: 'Unos 4 millones.', isCorrect: false, score: 0 },
              ],
              feedback: '40.316 denuncias ante la Delegatura de Protección de Datos Personales. Y son solo las que se denuncian.',
            },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 2 ─────────────────────────────
    {
      id: 'as_m2',
      title: '2. Anatomía de la suplantación en seguros',
      content: [
        { type: 'text', icon: 'UserSearchIcon', text: 'Suplantar es hacerse pasar por otro para obtener un provecho. En seguros, el suplantador puede ser el falso asegurado, el falso beneficiario, el falso intermediario o incluso una falsa aseguradora. El daño cae sobre tres víctimas: la persona suplantada, la compañía y los asegurados honestos que pagan el costo en sus primas.' },
        {
          type: 'interactive',
          title: 'Las 8 tipologías que más vemos',
          items: [
            { term: 'Siniestro ficticio', definition: 'Un evento que nunca ocurrió, montado con fotos, testigos y documentos para cobrar la indemnización.' },
            { term: 'Suplantación del asegurado o beneficiario', definition: 'Alguien reclama con la cédula, la firma o la voz de otra persona, a menudo con datos filtrados o comprados.' },
            { term: 'Cambio de cuenta de pago', definition: 'Justo antes de pagar una indemnización, «el asegurado» pide consignar a una cuenta nueva. Es el fraude más rentable y el más fácil de prevenir.' },
            { term: 'Toma de la cuenta digital', definition: 'El delincuente entra al portal o a la app del asegurado (contraseña filtrada, SIM duplicada) y cambia correo, celular o beneficiarios.' },
            { term: 'Póliza o SOAT falso', definition: 'Venta de seguros inexistentes por redes sociales o páginas clonadas. La Superfinanciera reportó 2.870 casos de fraude en la compra virtual del SOAT entre 2022 y 2025.' },
            { term: 'Falso intermediario', definition: 'Un supuesto asesor o agencia usa el nombre de una aseguradora real para cobrar primas que nunca llegan a la compañía.' },
            { term: 'Documento alterado', definition: 'Facturas, historias clínicas, incapacidades o denuncios modificados en cifras, fechas o diagnósticos.' },
            { term: 'Identidad sintética', definition: 'Una persona que no existe, armada con datos reales de varias víctimas y una foto generada con inteligencia artificial.' },
          ],
        },
        {
          type: 'memory',
          title: '🧩 Dinámica: una señal para cada tipología',
          pairs: [
            { term: 'Cambio de cuenta de pago', definition: 'Llamada urgente pidiendo consignar a una cuenta nueva a nombre de un tercero.' },
            { term: 'Toma de la cuenta digital', definition: 'Cambio de celular y correo del portal minutos antes de una solicitud.' },
            { term: 'Siniestro ficticio', definition: 'Póliza recién emitida, reclamación al poco tiempo y fotos sin metadatos.' },
            { term: 'Póliza falsa', definition: 'Precio muy por debajo del mercado y pago a una cuenta personal.' },
            { term: 'Identidad sintética', definition: 'Cédula válida pero historial inexistente y rostro «demasiado perfecto».' },
            { term: 'Documento alterado', definition: 'PDF editado después de su fecha de emisión, con otro programa.' },
          ],
        },
        {
          type: 'quiz',
          quizData: {
            question: 'Un asegurado llama para pedir que la indemnización de su siniestro de autos se consigne a una cuenta distinta de la registrada, porque «la suya está embargada». ¿Qué hace primero?',
            options: [
              'Hace el cambio: el asegurado dio su número de cédula y su placa.',
              'No cambia nada por esa llamada: verifica por un canal registrado previamente y valida que la cuenta nueva sea del titular.',
              'Le pide que envíe una foto de la cédula por WhatsApp y hace el cambio.',
            ],
            correctOptionIndex: 1,
            feedback: {
              correct: 'Correcto. La cédula y la placa se consiguen fácilmente. Un cambio de cuenta se confirma por un canal que ya conocía (no por el que llamó) y la cuenta debe estar a nombre del titular.',
              incorrect: 'Cuidado: la cédula, la placa y una foto del documento se consiguen o se falsifican. El cambio se confirma por un canal registrado antes, nunca por el mismo que hace la solicitud.',
            },
          },
        },
      ],
    },

    // ───────────────────────────── MÓDULO 3 ─────────────────────────────
    {
      id: 'as_m3',
      title: '3. Deepfakes: cuando ver ya no es creer',
      content: [
        { type: 'text', icon: 'BrainCircuitIcon', text: 'Un deepfake es un video, una imagen o un audio generado o alterado con inteligencia artificial para que una persona parezca decir o hacer algo que nunca hizo. Hoy basta con una foto de perfil y unos segundos de audio de una nota de voz para clonar una cara o una voz. Un estudio de la industria de verificación de identidad (Signicat, 2025) reportó que los intentos de fraude con deepfakes crecieron más de 2.000 % en tres años.' },
        { type: 'text', icon: 'SpyIcon', text: 'En seguros, el deepfake aparece en cuatro momentos: en la vinculación (abrir una póliza con un rostro falso que pasa la prueba de vida), en la reclamación (fotos de daños o lesiones generadas con IA), en la llamada (voz clonada del asegurado o de un directivo que ordena un pago) y en la evidencia (videos de un accidente que nunca ocurrió).' },
        {
          type: 'flashcards',
          title: '🔍 Señales para detectar un deepfake',
          cards: [
            { front: 'Ojos y parpadeo', back: 'Parpadeo escaso o mecánico, mirada que no sigue a la cámara, reflejos distintos en cada ojo.' },
            { front: 'Bordes del rostro', back: 'Contornos borrosos en la línea del pelo, las orejas o la mandíbula, sobre todo al girar la cabeza.' },
            { front: 'Boca y voz', back: 'Los labios no coinciden con lo que se oye; dientes que se ven como un bloque; voz sin respiración ni pausas naturales.' },
            { front: 'Luz y sombras', back: 'La luz de la cara no coincide con la del fondo; sombras que no cambian cuando la persona se mueve.' },
            { front: 'Pida un movimiento', back: 'Que gire la cabeza de perfil, pase la mano frente a la cara o acerque un objeto. Los deepfakes en vivo se deforman con lo inesperado.' },
            { front: 'Prueba de vida', back: 'La activa pide gestos al azar; la pasiva analiza textura, profundidad y reflejos de la piel. Lo ideal es combinarlas, porque una sola se puede engañar.' },
            { front: 'La regla de oro', back: 'Ninguna imagen ni voz basta sola para autorizar un pago o un cambio de datos. Confirme por un segundo canal que usted ya tenía registrado.' },
          ],
        },
        {
          type: 'scenario',
          title: '🎬 Dinámica: la videollamada del asegurado',
          intro: 'Usted trabaja en indemnizaciones de una aseguradora. Un siniestro de pérdida total de un vehículo está aprobado por $86.000.000. Decida en cada paso. Es un caso ficticio.',
          start: 'p1',
          maxPoints: 30,
          passPoints: 20,
          steps: {
            p1: {
              text: 'A las 5:40 p. m. del viernes entra una videollamada por WhatsApp desde un número nuevo. En pantalla aparece el asegurado, Andrés Ríos: «Me robaron el celular, por eso le escribo de este número. Necesito que la indemnización me llegue hoy a otra cuenta, la mía está bloqueada». La imagen se ve un poco pixelada y él casi no mueve la cabeza.',
              evidence: 'Número: +57 3XX XXX 4417 (no registrado en la póliza)\nCuenta registrada: Bancolombia ahorros ****2201 (Andrés Ríos)\nCuenta nueva solicitada: Nequi 31X XXX 9086 (titular: «Ríos A.»)',
              choices: [
                { text: 'Como lo estoy viendo en video, hago el cambio de cuenta.', next: 'f_mal', points: 0, feedback: 'El video no prueba identidad: un deepfake en vivo puede verse así, pixelado y con poco movimiento.' },
                { text: 'Le pido que gire la cabeza, se tape la cara con la mano y diga una frase que yo elija.', next: 'p2', points: 10, feedback: 'Bien: el desafío inesperado ayuda a delatar un deepfake en vivo. Pero no basta por sí solo.' },
                { text: 'Cuelgo y lo llamo al número registrado en la póliza.', next: 'p3', points: 15, feedback: 'Excelente: el canal registrado es la verificación más fuerte.' },
              ],
            },
            p2: {
              text: 'Cuando gira la cabeza, el borde de la mandíbula se desdibuja un instante y la mano «atraviesa» parte de la mejilla. La voz sigue fluida. Él insiste: «Hágalo ya, que es viernes y necesito la plata».',
              choices: [
                { text: 'La urgencia me convence: hago el cambio y lo dejo anotado.', next: 'f_mal', points: 0, feedback: 'La urgencia es la herramienta favorita del suplantador. Las señales visuales ya eran una alerta.' },
                { text: 'Suspendo la solicitud, llamo al número registrado y escalo a la unidad antifraude.', next: 'p3', points: 5, feedback: 'Correcto: ante señales de deepfake, se suspende, se verifica y se escala.' },
              ],
            },
            p3: {
              text: 'Al llamar al número registrado contesta el verdadero Andrés Ríos: tiene su celular, no pidió ningún cambio y la cuenta no está bloqueada. Alguien conocía su siniestro: el número del caso aparece en una conversación filtrada con un taller.',
              choices: [
                { text: 'Mantengo la cuenta registrada, documento todo, reporto a antifraude y aviso al asegurado de la filtración.', next: 'f_bien', points: 15, feedback: 'Así se cierra bien: se protege el pago, se conserva la evidencia y se corta la fuga de información.' },
                { text: 'Solo bloqueo el número nuevo; no hace falta más.', next: 'f_medio', points: 5, feedback: 'Se evitó el pago, pero sin reporte ni investigación de la filtración el delincuente volverá con otro número.' },
              ],
            },
            f_bien: { text: '✅ Pago protegido y fuga identificada. Usted aplicó la regla de oro: ninguna imagen ni voz autoriza sola un cambio de cuenta.' },
            f_medio: { text: '⚠️ Se evitó este pago, pero la filtración sigue abierta. Documentar, reportar y avisar es parte de la respuesta.' },
            f_mal: { text: '❌ La indemnización de $86.000.000 se pagó a la cuenta del suplantador. Ningún video ni voz basta: verifique siempre por el canal registrado.' },
          },
        },
        {
          type: 'h5p_check',
          title: 'Repaso rápido: deepfakes',
          description: 'Tres preguntas para cerrar este momento de la charla.',
          questions: [
            {
              question: '¿Qué hace más difícil que un deepfake en vivo engañe al verificador?',
              options: [
                { id: 'as3q1a', text: 'Pedir movimientos o acciones inesperadas y confirmar por un canal registrado.', isCorrect: true, score: 10 },
                { id: 'as3q1b', text: 'Que la videollamada dure más tiempo.', isCorrect: false, score: 0 },
                { id: 'as3q1c', text: 'Que la persona muestre su cédula a la cámara.', isCorrect: false, score: 0 },
              ],
              feedback: 'Los gestos inesperados deforman el deepfake, y el canal registrado no depende de la imagen. Una cédula a cámara también se puede falsificar.',
            },
            {
              question: 'Una reclamación trae fotos de daños perfectas, sin metadatos y con la misma iluminación en todas. ¿Qué hace?',
              options: [
                { id: 'as3q2a', text: 'Paga: las fotos se ven muy claras.', isCorrect: false, score: 0 },
                { id: 'as3q2b', text: 'Pide inspección o fotos tomadas en la app con ubicación y hora, y analiza si son generadas o reutilizadas.', isCorrect: true, score: 10 },
                { id: 'as3q2c', text: 'Rechaza la reclamación de inmediato por fraude.', isCorrect: false, score: 0 },
              ],
              feedback: 'Una señal no es una prueba de fraude: es un motivo para verificar más. Se piden evidencias con origen controlado y se analizan antes de decidir.',
            },
            {
              question: '¿Cuál es la «regla de oro» frente a deepfakes?',
              options: [
                { id: 'as3q3a', text: 'Ninguna imagen ni voz autoriza sola un pago o un cambio de datos.', isCorrect: true, score: 10 },
                { id: 'as3q3b', text: 'Si se ve en video, es real.', isCorrect: false, score: 0 },
                { id: 'as3q3c', text: 'Los deepfakes solo afectan a famosos.', isCorrect: false, score: 0 },
              ],
              feedback: 'Exacto. Las decisiones de dinero y de datos se confirman por un segundo canal.',
            },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 4 ─────────────────────────────
    {
      id: 'as_m4',
      title: '4. Datos de póliza: el blanco crítico',
      content: [
        { type: 'text', icon: 'LockIcon', text: 'Los datos de una póliza valen oro para el suplantador: nombre, cédula, placa, número de póliza, beneficiarios, cuenta de pago, diagnósticos. Con ellos se hace creíble una llamada, se reclama un siniestro ajeno o se cambia el beneficiario. Por eso el cambio de datos sensibles es el momento de mayor riesgo del ciclo de la póliza.' },
        { type: 'text', icon: 'ServerIcon', text: 'Los cambios críticos son cinco: el correo o el celular de contacto, la cuenta de pago, los beneficiarios, la dirección de notificación y la contraseña del portal. Una regla práctica: si el celular o el correo cambiaron hace poco, toda solicitud de dinero o de cambio de beneficiario se verifica dos veces y se avisa al canal anterior.' },
        {
          type: 'challenge',
          title: '🕵️ Dinámica: ¿quién entró a la póliza?',
          brief: 'La asegurada Luz Marina Pérez llama indignada: el lunes le notificaron el pago de un seguro de vida de su madre a una cuenta que ella no conoce. Analice los registros del portal de clientes y responda. Caso ficticio.',
          artifacts: [
            {
              name: 'portal_clientes.log',
              content: `2026-11-06 21:14:03  login OK         usuario=lmperez  ip=181.52.10.44  (Bogotá, habitual)
2026-11-09 02:47:51  login FALLIDO    usuario=lmperez  ip=45.150.108.7  (Países Bajos, VPN)
2026-11-09 02:48:09  login FALLIDO    usuario=lmperez  ip=45.150.108.7
2026-11-09 02:48:40  reset_password   canal=SMS        celular=***4521 (registrado)
2026-11-09 02:49:12  login OK         usuario=lmperez  ip=45.150.108.7
2026-11-09 02:51:30  cambio_celular   de=***4521 a=***9930
2026-11-09 02:52:02  cambio_correo    de=lm.perez@… a=lmperez.pagos@…
2026-11-09 02:55:47  cambio_cuenta    poliza=VID-77812 nueva=****5530 (titular: L. Pérez)
2026-11-09 03:01:15  solicitud_pago   poliza=VID-77812 valor=$64.000.000`,
            },
            {
              name: 'operador_movil.txt',
              content: `Consulta a la línea ***4521 (Luz Marina Pérez):
2026-11-08 18:20  Reposición de SIM (duplicado) solicitada en punto de venta de un tercero.
Tras la reposición, la SIM anterior de la asegurada quedó sin señal.`,
            },
          ],
          questions: [
            { prompt: '¿Desde qué dirección IP entró el atacante al portal?', answers: ['45.150.108.7'], hint: 'Busque el inicio de sesión exitoso que no viene de Bogotá.', explanation: '45.150.108.7, una VPN en Países Bajos: no es la IP habitual de la asegurada.' },
            { prompt: '¿Cómo recibió el atacante el código para cambiar la contraseña? (una palabra: el canal)', answers: ['sms'], hint: 'Mire el evento reset_password.', explanation: 'Por SMS: el día anterior se hizo una reposición de SIM (SIM swapping), así que los mensajes del celular registrado le llegaron al atacante.' },
            { prompt: '¿Qué dato cambió PRIMERO después de entrar? (celular, correo o cuenta)', answers: ['celular'], explanation: 'El celular, a las 02:51: así se asegura de que los avisos siguientes no le lleguen a la víctima. Luego cambió el correo y la cuenta de pago.' },
            { prompt: '¿Cuántos minutos pasaron entre el cambio de cuenta y la solicitud de pago?', answers: ['6', 'seis', '5', 'cinco'], explanation: 'Unos 6 minutos (02:55:47 → 03:01:15). Un pago pedido minutos después de cambiar los datos es una alerta roja que un sistema debería retener.' },
            { prompt: 'Nombre el control que habría frenado el pago (dos palabras: «periodo de ...»).', answers: ['periodo de enfriamiento', 'enfriamiento', 'periodo de espera', 'espera', 'periodo de retencion', 'retencion'], hint: 'Un tiempo mínimo entre el cambio de datos y el pago.', explanation: 'Un periodo de enfriamiento (por ejemplo 24 a 72 horas) tras cambiar datos críticos, con aviso al canal anterior, habría frenado el pago y alertado a la asegurada.' },
          ],
        },
        {
          type: 'interactive',
          title: 'Controles que protegen los datos de póliza',
          items: [
            { term: 'Aviso al canal anterior', definition: 'Todo cambio de celular, correo o cuenta se notifica al dato viejo: la víctima se entera a tiempo.' },
            { term: 'Periodo de enfriamiento', definition: 'Ningún pago a una cuenta nueva durante 24 a 72 horas tras un cambio de datos críticos.' },
            { term: 'Doble factor robusto', definition: 'Una app autenticadora o una llave de seguridad resisten la reposición de SIM; el SMS no.' },
            { term: 'Titularidad de la cuenta', definition: 'La cuenta de pago debe estar a nombre del asegurado o beneficiario, verificado con el banco.' },
            { term: 'Mínimo privilegio', definition: 'Talleres, proveedores y aliados ven solo los datos que necesitan, y cada consulta queda registrada.' },
            { term: 'Alertas por comportamiento', definition: 'Ingresos de madrugada, IP extranjera o VPN, y varios cambios seguidos disparan una revisión manual.' },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 5 ─────────────────────────────
    {
      id: 'as_m5',
      title: '5. Integridad de documentos digitales',
      content: [
        { type: 'text', icon: 'DocumentTextIcon', text: 'Facturas, historias clínicas, incapacidades, denuncios, peritajes y SOAT llegan hoy como PDF o como foto. Editar un PDF toma dos minutos. Validar su integridad es responder tres preguntas: ¿quién lo emitió?, ¿cambió desde que se emitió?, y ¿coincide con lo que dice la fuente?' },
        { type: 'text', icon: 'LockIcon', text: 'La huella digital (hash, por ejemplo SHA-256) es un código que resume un archivo. Si cambia una sola letra o un solo píxel, la huella cambia por completo. Por eso, si la fuente publica o firma la huella del documento original, cualquiera puede comprobar que no fue alterado. Pruébelo usted mismo en el laboratorio de abajo.' },
        {
          type: 'hash_lab',
          title: '🧪 Laboratorio: la huella digital de un documento',
          description: 'Escriba un texto o elija un archivo de su celular o computador. La huella se calcula aquí mismo, en su dispositivo: el archivo no se sube a ningún lado. Cambie una sola letra y compare.',
          sample: 'Factura N.° FE-10234 · Taller Autos del Norte · Reparación vehículo placa KLM-482 · Total: $4.850.000',
        },
        { type: 'text', icon: 'ShieldCheckIcon', text: 'En Colombia, la Ley 527 de 1999 da valor a los mensajes de datos y a la firma digital: una firma digital garantiza quién firmó y que el contenido no cambió (arts. 7, 9 y 28). La factura electrónica de la DIAN se valida con su código CUFE en el portal de la DIAN, y el SOAT, con la placa en el RUNT. Siempre que exista una fuente oficial, se consulta la fuente.' },
        {
          type: 'challenge',
          title: '🔎 Dinámica: ¿cuál factura fue alterada?',
          brief: 'Para un siniestro de autos llegan dos copias de la misma factura del taller: una enviada por el taller al sistema de la aseguradora y otra adjuntada por el reclamante. Revise los metadatos y responda. Caso ficticio.',
          artifacts: [
            {
              name: 'factura_taller.pdf (enviada por el taller)',
              content: `Título:            Factura electrónica FE-10234
Productor:         Sistema de facturación del taller v5.2
Fecha de creación: 2026-11-03 10:12:44
Fecha de modif.:   2026-11-03 10:12:44
Firmado digitalmente: Sí (certificado del taller, válido)
Total facturado:   $4.850.000
SHA-256: 3f9a1c…e07b`,
            },
            {
              name: 'factura_reclamante.pdf (adjuntada por el reclamante)',
              content: `Título:            Factura electrónica FE-10234
Productor:         Editor de PDF en línea (gratuito)
Fecha de creación: 2026-11-03 10:12:44
Fecha de modif.:   2026-11-12 23:41:09
Firmado digitalmente: Firma inválida (el documento cambió después de firmado)
Total facturado:   $14.850.000
SHA-256: b72d40…1c95`,
            },
            {
              name: 'consulta_DIAN.txt',
              content: `Consulta por CUFE de la factura FE-10234 en el portal de la DIAN:
Emisor: Taller Autos del Norte · Valor total: $4.850.000 · Estado: válida`,
            },
          ],
          questions: [
            { prompt: '¿Qué copia fue alterada? (taller o reclamante)', answers: ['reclamante', 'la del reclamante'], explanation: 'La del reclamante: su huella es distinta, se modificó 9 días después y su firma digital quedó inválida.' },
            { prompt: '¿Cuánto dinero se agregó al total? (escriba solo el número, sin puntos)', answers: ['10000000', '10 millones', 'diez millones'], explanation: '$10.000.000: el total pasó de $4.850.000 a $14.850.000. Bastó con anteponer un «1».' },
            { prompt: '¿Qué metadato delata la edición posterior? (fecha de ...)', answers: ['fecha de modificacion', 'modificacion', 'fecha de modif', 'fecha de modif.'], explanation: 'La fecha de modificación (12 de noviembre) es posterior a la de creación, y el productor cambió a un editor en línea.' },
            { prompt: '¿Con qué código se valida una factura electrónica en la DIAN? (sigla)', answers: ['cufe'], explanation: 'El CUFE (Código Único de Factura Electrónica). La consulta en la DIAN confirma el valor real: $4.850.000.' },
          ],
        },
        {
          type: 'flashcards',
          title: 'Cómo validar cada documento en la fuente',
          cards: [
            { front: 'SOAT', back: 'Consulta por placa en el RUNT: vigencia, aseguradora y número de póliza.' },
            { front: 'Factura electrónica', back: 'Consulta del CUFE en el portal de la DIAN: emisor, valor y estado.' },
            { front: 'Cédula de ciudadanía', back: 'Validación con la Registraduría (servicios de consulta autorizados) y, si aplica, cotejo biométrico.' },
            { front: 'Historia clínica o incapacidad', back: 'Confirmación directa con la IPS o la EPS que la expide, por su canal oficial.' },
            { front: 'Denuncia penal', back: 'Verificación del número de noticia criminal con la Fiscalía.' },
            { front: 'Documento con firma digital', back: 'Abrir la firma y comprobar que el certificado es válido y que el documento no cambió después de firmado.' },
          ],
        },
      ],
    },

    // ───────────────────────────── MÓDULO 6 ─────────────────────────────
    {
      id: 'as_m6',
      title: '6. Protocolo antisuplantación: verificar, contener, reportar',
      content: [
        { type: 'text', icon: 'ShieldCheckIcon', text: 'Novedad: la Ley Estatutaria 2573 de 2026 sobre suplantación de identidad rige desde el 20 de noviembre de 2026, seis meses después de su promulgación. Exige a quienes ofrecen productos y servicios adoptar medidas suficientes para verificar la identidad de sus clientes, ordena suspender de inmediato el cobro y el reporte negativo cuando la persona alega suplantación, fija diez días hábiles para responder y entregar los soportes con que se aprobó el producto, y crea la carga dinámica de la prueba en los procesos no penales.' },
        { type: 'text', icon: 'DocumentTextIcon', text: 'El resto del marco: el Código Penal castiga la falsedad personal, que incluye suplantar a otra persona (art. 296), la estafa (art. 246) y la falsedad en documento privado (art. 289). La Ley 1273 de 2009 castiga el acceso abusivo a un sistema informático (art. 269A), la violación de datos personales (art. 269F) y la suplantación de sitios web (art. 269G). La Ley 1581 de 2012 obliga a proteger los datos personales. Y en el contrato de seguro, la mala fe en la reclamación hace perder el derecho a la indemnización (art. 1078 del Código de Comercio).' },
        {
          type: 'memory',
          title: '⚖️ Dinámica: cada norma con lo que protege',
          pairs: [
            { term: 'Ley 2573 de 2026', definition: 'Suplantación de identidad: verificación, suspensión del cobro y respuesta en 10 días hábiles.' },
            { term: 'Ley 1581 de 2012', definition: 'Protección de datos personales: los datos de póliza se tratan con seguridad y finalidad.' },
            { term: 'Ley 1273 de 2009', definition: 'Delitos informáticos: acceso abusivo, violación de datos, suplantación de sitios web.' },
            { term: 'Ley 527 de 1999', definition: 'Mensajes de datos y firma digital: autenticidad e integridad del documento electrónico.' },
            { term: 'Art. 296 del Código Penal', definition: 'Falsedad personal: suplantar a una persona para obtener provecho.' },
            { term: 'Art. 1078 del Código de Comercio', definition: 'La mala fe en la reclamación hace perder el derecho al pago del siniestro.' },
          ],
        },
        { type: 'text', icon: 'CalendarIcon', text: 'Alerta de temporada: diciembre. Llegan la prima de servicios (a más tardar el 20 de diciembre), las compras de fin de año, los viajes y las renovaciones de pólizas y SOAT. El sector reporta que los trámites, pagos y compras en línea suben hasta 30 % al cierre del año, y con ellos los documentos falsos y las páginas clonadas. Además, los equipos trabajan con turnos reducidos: el suplantador lo sabe y ataca en festivos, de noche y los fines de semana.' },
        {
          type: 'flashcards',
          title: '🎄 Prevención en diciembre: compañía y cliente',
          cards: [
            { front: 'Compañía · Turnos', back: 'Mantenga la verificación de cambios de cuenta y de beneficiario también en festivos. Sin el equipo antifraude de turno, el pago a una cuenta nueva espera.' },
            { front: 'Compañía · Pagos de fin de año', back: 'Ningún «pago urgente antes de vacaciones» se aprueba por un audio, un correo o una videollamada: confirmación por el canal registrado.' },
            { front: 'Compañía · Marca', back: 'Busque páginas y perfiles que usen su marca para vender SOAT y pólizas «con descuento navideño» y pida su baja de inmediato.' },
            { front: 'Compañía · Avisos al cliente', back: 'Recuerde a sus asegurados que la compañía nunca pide claves ni códigos, ni pagos a cuentas personales.' },
            { front: 'Cliente · Compre en el sitio oficial', back: 'Escriba usted la dirección o use la app oficial. Los anuncios y resultados patrocinados pueden llevar a páginas falsas.' },
            { front: 'Cliente · Verifique el SOAT', back: 'Después de comprarlo, consulte la placa en el RUNT. Si no aparece, no está asegurado.' },
            { front: 'Cliente · Voces y videos', back: 'Las estafas con voces clonadas crecen en diciembre. Si un familiar o «el asesor» pide dinero, cuelgue y llame usted al número que conoce.' },
            { front: 'Cliente · Si cae', back: 'Llame de inmediato a su banco y a su aseguradora, denuncie en el CAI Virtual de la Policía o en la línea 123, y pida la suspensión del cobro por suplantación (Ley 2573).' },
          ],
        },
        {
          type: 'activity',
          title: '🤝 Taller en mesas: el protocolo de mi compañía',
          duration: '15 min',
          groupSize: 'Mesas de 4 a 6 personas',
          goal: 'Cada mesa recibe un caso y diseña, en 10 minutos, el protocolo de cinco pasos que su compañía aplicaría: cómo verificar la identidad, qué contener, qué evidencia preservar, a quién reportar y cómo avisar al cliente. Un vocero lo presenta en 1 minuto.',
          downloads: [],
          steps: [
            { title: 'Elijan rol y caso', minutes: '1 min', detail: 'Un vocero, un relator y el resto aporta. El conferencista asigna el caso de cada mesa.' },
            { title: 'Verificar', minutes: '3 min', detail: '¿Con qué canal registrado, prueba de vida o fuente oficial confirman que es quien dice ser?' },
            { title: 'Contener y preservar', minutes: '3 min', detail: '¿Qué pago o cambio se retiene? ¿Qué evidencia se guarda (registros, grabaciones, archivos originales con su huella)?' },
            { title: 'Reportar y avisar', minutes: '3 min', detail: '¿A quién se escala (antifraude, INIF, autoridades) y cómo se informa al cliente, dentro de los plazos de la Ley 2573?' },
            { title: 'Plenaria', minutes: '5 min', detail: 'Cada vocero presenta su protocolo en 1 minuto. Publiquen la idea más útil en el 💬 Muro del curso.' },
          ],
          groupsTitle: 'Los casos de las mesas',
          groups: [
            { name: 'Mesa 1 · Voz clonada', items: ['Un «gerente» ordena por audio un pago urgente a un proveedor nuevo'] },
            { name: 'Mesa 2 · Deepfake en vinculación', items: ['Una póliza de vida emitida con una selfie que pasó la prueba de vida'] },
            { name: 'Mesa 3 · Toma de cuenta', items: ['Cambio de beneficiario en el portal tras una reposición de SIM'] },
            { name: 'Mesa 4 · Documento alterado', items: ['Historia clínica con diagnóstico cambiado para un seguro de salud'] },
            { name: 'Mesa 5 · SOAT falso', items: ['Un cliente compró su SOAT en una página clonada y tuvo un accidente'] },
            { name: 'Mesa 6 · Falso intermediario', items: ['Un «asesor» cobra primas en efectivo a nombre de la compañía'] },
          ],
          closing: 'Mensaje clave: verificar no es desconfiar del cliente, es protegerlo. El mejor protocolo es el que se aplica igual a todos, deja rastro y se revisa con cada caso nuevo.',
        },
      ],
    },

    // ───────────────────────────── MÓDULO 7 ─────────────────────────────
    {
      id: 'as_m7',
      title: '7. Evaluación final y certificado',
      content: [
        { type: 'text', icon: 'CheckCircleIcon', text: 'Cierre: el fraude por suplantación se gana o se pierde antes de pagar. Tres ideas para llevarse: ninguna imagen ni voz autoriza sola un pago; todo cambio de datos críticos se verifica por un canal registrado y se enfría antes de pagar; y todo documento se valida en su fuente. Ahora, la evaluación: 8 preguntas, se aprueba con 70 % y puede reintentarla con preguntas distintas.' },
        {
          type: 'exam',
          title: 'Evaluación final: Antisuplantación de identidad en seguros',
          description: '8 preguntas al azar de un banco de 16. Se aprueba con 70 %. Al aprobar, se completa el curso y se emite su certificado.',
          passPercent: 70,
          questionsPerAttempt: 8,
          questions: [
            {
              question: 'Según Fasecolda, ¿cuántos casos de fraude identificó la industria aseguradora en 2025?',
              options: [
                { id: 'asx1a', text: 'Unos 4.900.', isCorrect: false, score: 0 },
                { id: 'asx1b', text: '49.645, por más de $256.000 millones.', isCorrect: true, score: 10 },
                { id: 'asx1c', text: 'Más de 1 millón.', isCorrect: false, score: 0 },
              ],
              feedback: '49.645 casos por más de $256.000 millones, con datos de compañías que suman el 78 % de las primas.',
            },
            {
              question: 'Un asegurado pide por videollamada cambiar la cuenta de pago de su indemnización. ¿Qué es lo correcto?',
              options: [
                { id: 'asx2a', text: 'Hacer el cambio si se le ve la cara.', isCorrect: false, score: 0 },
                { id: 'asx2b', text: 'Confirmar por un canal registrado previamente y verificar que la cuenta sea del titular.', isCorrect: true, score: 10 },
                { id: 'asx2c', text: 'Pedirle una foto de la cédula por chat.', isCorrect: false, score: 0 },
              ],
              feedback: 'Ninguna imagen ni voz autoriza sola un cambio: se confirma por el canal registrado.',
            },
            {
              question: '¿Qué es un deepfake?',
              options: [
                { id: 'asx3a', text: 'Un video, imagen o audio generado o alterado con IA para que alguien parezca decir o hacer algo que no hizo.', isCorrect: true, score: 10 },
                { id: 'asx3b', text: 'Un virus que borra archivos.', isCorrect: false, score: 0 },
                { id: 'asx3c', text: 'Una contraseña débil.', isCorrect: false, score: 0 },
              ],
              feedback: 'Correcto: contenido sintético que imita a una persona real.',
            },
            {
              question: '¿Cuál de estas señales sugiere un deepfake en una videollamada?',
              options: [
                { id: 'asx4a', text: 'El borde de la cara se desdibuja cuando la persona gira la cabeza o pasa la mano.', isCorrect: true, score: 10 },
                { id: 'asx4b', text: 'La persona usa gafas.', isCorrect: false, score: 0 },
                { id: 'asx4c', text: 'La llamada es por la tarde.', isCorrect: false, score: 0 },
              ],
              feedback: 'Los gestos inesperados deforman los bordes del rostro sintético.',
            },
            {
              question: '¿Qué técnica le permitió al atacante recibir los códigos SMS de la asegurada?',
              options: [
                { id: 'asx5a', text: 'La reposición fraudulenta de la SIM (SIM swapping).', isCorrect: true, score: 10 },
                { id: 'asx5b', text: 'Un antivirus desactualizado.', isCorrect: false, score: 0 },
                { id: 'asx5c', text: 'Un correo con mayúsculas.', isCorrect: false, score: 0 },
              ],
              feedback: 'Con un duplicado de la SIM, los SMS de la víctima le llegan al delincuente. Por eso el SMS es un factor débil.',
            },
            {
              question: '¿Qué control frena un pago pedido minutos después de cambiar los datos de la póliza?',
              options: [
                { id: 'asx6a', text: 'Un periodo de enfriamiento con aviso al canal anterior.', isCorrect: true, score: 10 },
                { id: 'asx6b', text: 'Pagar más rápido.', isCorrect: false, score: 0 },
                { id: 'asx6c', text: 'Pedir la contraseña por teléfono.', isCorrect: false, score: 0 },
              ],
              feedback: 'Un tiempo mínimo entre el cambio y el pago, más el aviso al dato anterior, le da a la víctima la oportunidad de reaccionar.',
            },
            {
              question: '¿Qué indica que dos archivos tengan huellas SHA-256 distintas?',
              options: [
                { id: 'asx7a', text: 'Que su contenido no es idéntico: al menos uno fue cambiado.', isCorrect: true, score: 10 },
                { id: 'asx7b', text: 'Que ambos son falsos.', isCorrect: false, score: 0 },
                { id: 'asx7c', text: 'Nada: la huella cambia cada vez que se abre el archivo.', isCorrect: false, score: 0 },
              ],
              feedback: 'Una sola letra distinta cambia la huella. La huella no cambia por abrir o copiar el archivo.',
            },
            {
              question: 'Un PDF tiene fecha de modificación 9 días posterior a la de creación y un «productor» distinto. ¿Qué significa?',
              options: [
                { id: 'asx8a', text: 'Que fue editado después de emitido: hay que validarlo con la fuente.', isCorrect: true, score: 10 },
                { id: 'asx8b', text: 'Que es auténtico.', isCorrect: false, score: 0 },
                { id: 'asx8c', text: 'Que el computador tiene la hora mal.', isCorrect: false, score: 0 },
              ],
              feedback: 'Es una señal de edición posterior. No prueba fraude por sí sola, pero obliga a validar con quien lo emitió.',
            },
            {
              question: '¿Con qué se valida una factura electrónica en la DIAN?',
              options: [
                { id: 'asx9a', text: 'Con su código CUFE.', isCorrect: true, score: 10 },
                { id: 'asx9b', text: 'Con la placa del vehículo.', isCorrect: false, score: 0 },
                { id: 'asx9c', text: 'Con el número de celular del taller.', isCorrect: false, score: 0 },
              ],
              feedback: 'El CUFE identifica la factura electrónica y permite consultar emisor, valor y estado.',
            },
            {
              question: '¿Dónde se verifica la vigencia de un SOAT?',
              options: [
                { id: 'asx10a', text: 'En el RUNT, consultando por la placa.', isCorrect: true, score: 10 },
                { id: 'asx10b', text: 'En una página de redes sociales que lo vende más barato.', isCorrect: false, score: 0 },
                { id: 'asx10c', text: 'Preguntándole al vendedor.', isCorrect: false, score: 0 },
              ],
              feedback: 'El RUNT muestra la vigencia, la aseguradora y el número de póliza del SOAT.',
            },
            {
              question: '¿Qué exige la Ley 2573 de 2026 cuando una persona alega que fue suplantada?',
              options: [
                { id: 'asx11a', text: 'Suspender de inmediato el cobro y el reporte negativo y responder en máximo diez días hábiles.', isCorrect: true, score: 10 },
                { id: 'asx11b', text: 'Que la persona pague primero y reclame después.', isCorrect: false, score: 0 },
                { id: 'asx11c', text: 'Nada: la ley aún no existe.', isCorrect: false, score: 0 },
              ],
              feedback: 'La ley protege a la persona suplantada y exige a las entidades medidas suficientes para verificar la identidad de sus clientes.',
            },
            {
              question: '¿Qué consecuencia tiene la mala fe del asegurado o beneficiario en la reclamación?',
              options: [
                { id: 'asx12a', text: 'Pierde el derecho al pago de ese siniestro (art. 1078 del Código de Comercio).', isCorrect: true, score: 10 },
                { id: 'asx12b', text: 'Ninguna.', isCorrect: false, score: 0 },
                { id: 'asx12c', text: 'Recibe el doble.', isCorrect: false, score: 0 },
              ],
              feedback: 'La mala fe en la reclamación o comprobación del derecho causa la pérdida de ese derecho.',
            },
            {
              question: '¿Por qué una «identidad sintética» es difícil de detectar?',
              options: [
                { id: 'asx13a', text: 'Porque combina datos reales de varias víctimas con una foto generada por IA: los datos validan, pero la persona no existe.', isCorrect: true, score: 10 },
                { id: 'asx13b', text: 'Porque siempre usa la cédula de un famoso.', isCorrect: false, score: 0 },
                { id: 'asx13c', text: 'Porque no usa documentos.', isCorrect: false, score: 0 },
              ],
              feedback: 'Cada dato por separado parece válido; la alerta está en la falta de historia y en el rostro sintético.',
            },
            {
              question: '¿Qué tienen en común los ataques a IFX Networks, Change Healthcare y los clientes de Snowflake?',
              options: [
                { id: 'asx15a', text: 'Un tercero o un acceso sin doble factor abrió la puerta, y los datos robados terminan como insumo de fraude.', isCorrect: true, score: 10 },
                { id: 'asx15b', text: 'Ocurrieron solo en Colombia.', isCorrect: false, score: 0 },
                { id: 'asx15c', text: 'No afectaron datos de personas.', isCorrect: false, score: 0 },
              ],
              feedback: 'Proveedores comprometidos y credenciales sin doble factor: los datos que salen de ahí alimentan suplantaciones y reclamaciones falsas.',
            },
            {
              question: 'Es 22 de diciembre y llega un audio del «gerente» pidiendo un pago urgente antes de vacaciones. ¿Qué hace?',
              options: [
                { id: 'asx16a', text: 'Confirma por el canal registrado antes de pagar, aunque sea festivo.', isCorrect: true, score: 10 },
                { id: 'asx16b', text: 'Paga, porque en diciembre todo es urgente.', isCorrect: false, score: 0 },
                { id: 'asx16c', text: 'Responde el audio pidiendo los datos de la cuenta.', isCorrect: false, score: 0 },
              ],
              feedback: 'En diciembre los turnos se reducen y las voces clonadas aumentan: la verificación por canal registrado no se toma vacaciones.',
            },
            {
              question: 'En el taller de protocolo, ¿cuál es el orden de la respuesta?',
              options: [
                { id: 'asx14a', text: 'Verificar, contener y preservar evidencia, reportar y avisar al cliente.', isCorrect: true, score: 10 },
                { id: 'asx14b', text: 'Pagar, investigar y luego verificar.', isCorrect: false, score: 0 },
                { id: 'asx14c', text: 'Borrar los registros para proteger los datos.', isCorrect: false, score: 0 },
              ],
              feedback: 'Se verifica antes de pagar, se retiene y se preserva la evidencia, se escala y se informa.',
            },
          ],
        },
      ],
    },
  ],
};
