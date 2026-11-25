import type { LearningPath } from '../types';

// Ruta «Analista de Inteligencia de Amenazas (CTI)» del mapa de expertise: Intermedio y Avanzado.
// El Básico es cti_basico. Cada nivel exige entregables escritos (level_deliverables) y un examen;
// los ids de módulos, exámenes y entregables deben coincidir con course_module_counts(),
// course_requirements() y course_prerequisite() en supabase/migrations/2026-11-25_campana_black_friday.sql.
// Todos los datos de los laboratorios son ficticios: direcciones de documentación (RFC 5737) y dominios .example.

export const CTI_INTERMEDIO: LearningPath = {
  title: 'Analista de Inteligencia de Amenazas · Nivel Intermedio',
  description: 'Del dato a la decisión: requisitos de inteligencia, pivoteo de infraestructura, mapeo a MITRE ATT&CK, análisis de hipótesis competidoras e informes con niveles de confianza. Tres entregables y examen con nota mínima del 70 %.',
  lastUpdated: 'Noviembre 2026',
  modules: [
    {
      id: 'ctii_intro',
      title: '1. 🧭 Bienvenida: del dato a la decisión',
      content: [
        { type: 'text', icon: 'SpyIcon', text: 'En el Nivel Básico aprendió el ciclo de inteligencia y los modelos de análisis. Aquí los va a usar como lo hace un analista: empezando por la pregunta que alguien necesita responder, siguiendo la pista de una infraestructura, traduciendo lo que hizo el atacante al lenguaje de ATT&CK y escribiendo una conclusión que diga cuánta certeza tiene.' },
        { type: 'text', icon: 'CheckCircleIcon', text: 'Este nivel pide más esfuerzo: tiene tres entregables escritos obligatorios (sus requisitos de inteligencia, una matriz de hipótesis competidoras y un informe) y un examen que se aprueba con 70 %. El badge se emite cuando el servidor verifica los tres entregables y el examen. Cuente con unas 6 a 8 horas.' },
        {
          type: 'interactive',
          title: 'Vocabulario del analista',
          items: [
            { term: 'PIR (requisito prioritario de inteligencia)', definition: 'La pregunta que la dirección necesita responder para decidir, p. ej. «¿Qué grupos de ransomware atacan hoy a entidades de salud en la región y por dónde entran?». Todo el trabajo de inteligencia empieza aquí.' },
            { term: 'Inteligencia estratégica, operacional, táctica y técnica', definition: 'Estratégica: tendencias y riesgo para la junta. Operacional: campañas y actores para la gerencia de seguridad. Táctica: TTP para defensores. Técnica: indicadores para las herramientas.' },
            { term: 'Pivoteo', definition: 'Partir de un dato conocido (un dominio, una IP, un correo de registro) para encontrar otros relacionados que comparten algo: la misma IP, el mismo certificado, el mismo registrante.' },
            { term: 'TTP', definition: 'Tácticas, técnicas y procedimientos: el «cómo» del atacante. Cambiar un TTP le cuesta mucho más que cambiar una IP (Pirámide del Dolor).' },
            { term: 'Lenguaje estimativo', definition: 'Palabras con una probabilidad acordada: «probable» (55–80 %), «muy probable» (80–95 %), «casi seguro» (95–99 %). Evita que cada lector interprete «posiblemente» a su manera.' },
            { term: 'ACH (análisis de hipótesis competidoras)', definition: 'Técnica que obliga a evaluar todas las explicaciones posibles contra la evidencia y a quedarse con la que tiene menos evidencia en contra, no con la primera que se nos ocurrió.' },
          ],
        },
      ],
    },
    {
      id: 'ctii_pir',
      title: '2. ❓ Requisitos de inteligencia: empezar por la pregunta correcta',
      content: [
        { type: 'text', icon: 'QuestionMarkCircleIcon', text: 'Un equipo de CTI sin requisitos termina publicando resúmenes de noticias que nadie lee. Los requisitos prioritarios (PIR) se definen con quien toma decisiones: la junta, el CISO, el jefe del SOC, el área de fraude. De cada PIR se desprenden requisitos específicos (SIR) y elementos esenciales de información (EEI): los datos concretos que hay que recolectar.' },
        { type: 'text', icon: 'PointerIcon', text: 'Un buen PIR cumple cuatro condiciones: responde a una decisión real, se puede responder con fuentes a su alcance, tiene un horizonte de tiempo y se revisa periódicamente (por ejemplo, cada trimestre). «Saber todo sobre las amenazas» no es un requisito: es un deseo.' },
        {
          type: 'flashcards',
          title: 'Requisito débil → requisito útil',
          cards: [
            { front: 'Débil: «Monitorear la dark web».', back: 'Útil: «¿Se están vendiendo credenciales o accesos de nuestra entidad en foros criminales? Revisión semanal; decisión: forzar cambio de contraseñas y revisar accesos remotos».' },
            { front: 'Débil: «Saber qué hacen los hackers».', back: 'Útil: «¿Qué técnicas de acceso inicial usan los grupos de ransomware que atacaron a nuestro sector en los últimos 6 meses? Decisión: priorizar controles y detecciones».' },
            { front: 'Débil: «Informe mensual de amenazas».', back: 'Útil: «¿Qué vulnerabilidades explotadas activamente afectan tecnologías de nuestro inventario? Decisión: orden de parcheo esta semana».' },
            { front: '¿Quién valida un PIR?', back: 'Quien toma la decisión que el PIR apoya. Si nadie decide nada con la respuesta, el PIR sobra.' },
          ],
        },
        {
          type: 'deliverable',
          id: 'ctii_d1',
          title: 'Entregable 1 · Los tres requisitos de inteligencia de su organización',
          description: 'Defina los PIR de una organización real (anonimizada) o ficticia. Es la base de los otros dos entregables.',
          context: 'Si no quiere usar su organización, elija una ficticia: «Cooperativa financiera de 120.000 asociados, 40 oficinas, banca en línea y app móvil, en Colombia».',
          fields: [
            { key: 'org', label: 'Organización y lo que más le importa proteger', hint: 'Sector, tamaño, servicios críticos, datos sensibles, dependencia de terceros. Sin nombres reales si no tiene autorización.', min: 150 },
            { key: 'stakeholders', label: 'Quiénes consumen la inteligencia y qué deciden', hint: 'Al menos dos públicos (junta, CISO, SOC, fraude, TI) y qué decisión toma cada uno.', min: 150 },
            { key: 'pirs', label: 'Sus tres PIR', hint: 'Escriba cada PIR como pregunta, con su horizonte de tiempo y la decisión que apoya.', min: 300, rows: 6, example: 'PIR 1: ¿Qué grupos de ransomware atacan entidades financieras de la región y por qué vector entran? (trimestral). Decisión: priorizar controles de acceso remoto.' },
            { key: 'eei', label: 'Datos que va a recolectar y fuentes', hint: 'Para cada PIR, 2 o 3 datos concretos (EEI) y de dónde saldrán: telemetría propia, CSIRT sectorial, ColCERT, informes de proveedores, OSINT.', min: 250, rows: 5 },
            { key: 'entrega', label: 'Cómo y cada cuánto entregará la respuesta', hint: 'Formato (alerta, boletín, informe), frecuencia, TLP habitual y cómo sabrá si fue útil.', min: 120 },
          ],
          rubric: [
            'Cada PIR es una pregunta que apoya una decisión concreta de alguien identificado.',
            'Los PIR se pueden responder con las fuentes que listé.',
            'Cada PIR tiene horizonte de tiempo o frecuencia de revisión.',
            'No incluí datos reales sensibles ni nombres sin autorización.',
          ],
        },
      ],
    },
    {
      id: 'ctii_pivot',
      title: '3. 🚩 Laboratorio: pivoteo de infraestructura',
      content: [
        { type: 'text', icon: 'UserSearchIcon', text: 'Pivotear es seguir los hilos que el atacante deja al montar su infraestructura: registra dominios con el mismo correo, los aloja en la misma IP, reutiliza certificados TLS o sigue un patrón de nombres. Fuentes típicas: WHOIS histórico, DNS pasivo, registros de transparencia de certificados (CT) y servicios de escaneo de Internet. Ojo con las IP compartidas: un servidor de alojamiento masivo aloja miles de dominios legítimos.' },
        {
          type: 'challenge',
          title: 'Del correo de phishing a la campaña',
          brief: 'El SOC le envía un phishing dirigido a tesorería. Pivotee desde el dominio del enlace y responda. Todo es ficticio.',
          artifacts: [
            { name: 'correo.txt', content: `From: "Tesorería Banco Andino" <notificaciones@bancoandino-seguro.example>
Subject: Confirmación de transferencia pendiente
Enlace: https://portal.bancoandino-seguro.example/validar?id=88412` },
            { name: 'dns_pasivo.txt', content: `dominio                              IP               primera vez   última vez
portal.bancoandino-seguro.example    203.0.113.45     2026-11-02    2026-11-24
pagos-cooperativa-sur.example        203.0.113.45     2026-11-05    2026-11-24
verifica-tucuenta-co.example         203.0.113.45     2026-11-09    2026-11-23
cdn-fotos-gratis.example             198.51.100.10    2025-01-14    2026-11-24
cdn-fotos-gratis.example             203.0.113.45     2026-11-20    2026-11-20` },
            { name: 'whois.txt', content: `bancoandino-seguro.example     creado 2026-11-01  registrante: ops.paneles@correo-temporal.example  registrador: Registrador X
pagos-cooperativa-sur.example  creado 2026-11-04  registrante: ops.paneles@correo-temporal.example  registrador: Registrador X
verifica-tucuenta-co.example   creado 2026-11-08  registrante: privacidad protegida                registrador: Registrador X
cdn-fotos-gratis.example       creado 2019-06-30  registrante: privacidad protegida                registrador: Registrador Y` },
            { name: 'certificados_ct.txt', content: `huella SHA-1 del certificado   nombres en el certificado (SAN)
3F:9A:…:C2                    portal.bancoandino-seguro.example, verifica-tucuenta-co.example
7B:11:…:0E                    pagos-cooperativa-sur.example
A0:44:…:9D                    www.cdn-fotos-gratis.example` },
          ],
          questions: [
            { prompt: '¿Qué IP comparten los dominios de la campaña? (escríbala completa)', answers: ['203.0.113.45'], explanation: 'Los tres dominios de suplantación resuelven a 203.0.113.45 desde noviembre: es la infraestructura de la campaña.' },
            { prompt: '¿Qué correo de registrante conecta dos de los dominios? (escríbalo completo)', answers: ['ops.paneles@correo-temporal.example'], explanation: 'bancoandino-seguro y pagos-cooperativa-sur comparten registrante: reutilizar el correo de registro es un error frecuente del atacante.' },
            { prompt: 'El dominio verifica-tucuenta-co tiene el WHOIS protegido. ¿Con qué fuente se vincula a la campaña? (dns, whois o certificado)', answers: ['certificado', 'certificados', 'ct', 'certificado tls'], explanation: 'Aparece en el mismo certificado (SAN) que el portal de phishing: el atacante lo usó para ambos. Además comparte la IP.' },
            { prompt: '¿Qué dominio NO debe incluirse en la campaña aunque haya apuntado una vez a la misma IP? (escríbalo)', answers: ['cdn-fotos-gratis.example'], explanation: 'Existe desde 2019, apuntó a otra IP durante años y solo coincidió un día: probablemente es alojamiento compartido. Incluirlo generaría un falso positivo. Pivotear sin criterio contamina la inteligencia.' },
          ],
        },
      ],
    },
    {
      id: 'ctii_attack',
      title: '4. 🗺️ Laboratorio: del relato a MITRE ATT&CK',
      content: [
        { type: 'text', icon: 'DocumentTextIcon', text: 'Mapear a ATT&CK convierte un relato en un lenguaje común: permite comparar campañas, medir qué técnicas detecta su organización y priorizar defensas. La regla es mapear lo que la evidencia muestra (no lo que «suele hacer» el actor) y usar la subtécnica cuando el detalle lo permite.' },
        {
          type: 'challenge',
          title: 'Mapee el informe del incidente',
          brief: 'Lea el resumen del incidente (ficticio) y escriba el ID de ATT&CK de cada comportamiento. Acepta la técnica o la subtécnica exacta.',
          artifacts: [
            { name: 'resumen_incidente.txt', content: `1. Llega un correo a tesorería con un adjunto «Factura_Noviembre.xlsm».
2. La funcionaria abre el adjunto y habilita macros.
3. La macro ejecuta: powershell.exe -nop -w hidden -enc SQBFAFgAIAAoAE4AZQB3AC0A...
4. Se crea la tarea programada «ActualizadorOffice» que se ejecuta cada hora.
5. El equipo se comunica por HTTPS con api.actualiza-office.example cada 60 segundos.
6. Con una herramienta de volcado, el atacante lee la memoria del proceso lsass.exe.
7. Tres días después, los servidores de archivos aparecen cifrados con extensión .andes` },
          ],
          questions: [
            { prompt: 'Paso 1: correo con adjunto malicioso dirigido. (ID, p. ej. T1234.001)', answers: ['T1566.001', 'T1566'], explanation: 'T1566.001 Phishing: Spearphishing Attachment.' },
            { prompt: 'Paso 3: ejecución de PowerShell codificado. (ID)', answers: ['T1059.001', 'T1059'], explanation: 'T1059.001 Command and Scripting Interpreter: PowerShell. El -enc además sugiere T1027 (ofuscación).' },
            { prompt: 'Paso 4: persistencia con tarea programada. (ID)', answers: ['T1053.005', 'T1053'], explanation: 'T1053.005 Scheduled Task/Job: Scheduled Task.' },
            { prompt: 'Paso 6: lectura de la memoria de LSASS para obtener credenciales. (ID)', answers: ['T1003.001', 'T1003'], explanation: 'T1003.001 OS Credential Dumping: LSASS Memory.' },
            { prompt: 'Paso 7: cifrado de archivos para extorsionar. (ID)', answers: ['T1486'], explanation: 'T1486 Data Encrypted for Impact (táctica Impacto).' },
          ],
        },
        {
          type: 'memory',
          title: 'Comportamiento ↔ táctica de ATT&CK',
          pairs: [
            { term: 'Acceso inicial', definition: 'El correo con el adjunto llega a tesorería.' },
            { term: 'Ejecución', definition: 'La macro lanza PowerShell.' },
            { term: 'Persistencia', definition: 'La tarea programada sobrevive al reinicio.' },
            { term: 'Comando y control', definition: 'Conexión HTTPS periódica a un dominio del atacante.' },
            { term: 'Acceso a credenciales', definition: 'Volcado de la memoria de lsass.exe.' },
            { term: 'Impacto', definition: 'Archivos cifrados con extensión .andes.' },
          ],
        },
      ],
    },
    {
      id: 'ctii_analysis',
      title: '5. ⚖️ Hipótesis competidoras y sesgos',
      content: [
        { type: 'text', icon: 'BrainCircuitIcon', text: 'Los errores de inteligencia casi nunca son por falta de datos: son por sesgos. El de confirmación (buscar lo que apoya la primera idea), el de anclaje (no soltar la primera hipótesis) y el de espejo (suponer que el adversario piensa como nosotros). El ACH los contrarresta: se listan todas las hipótesis, se cruza cada evidencia con cada hipótesis y se descarta la que tiene más evidencia en contra.' },
        { type: 'text', icon: 'PointerIcon', text: 'Toda conclusión lleva dos cosas: la probabilidad estimada (lenguaje estimativo) y el nivel de confianza (alto, moderado o bajo), que depende de la calidad y cantidad de las fuentes. Se puede tener una conclusión «probable» con confianza baja: eso también es información útil para quien decide.' },
        {
          type: 'scenario',
          title: 'La tentación de la atribución',
          intro: 'Un ataque afectó a una entidad pública (caso ficticio). La dirección quiere un nombre para el comunicado de esta tarde.',
          start: 'a1',
          maxPoints: 30,
          passPoints: 20,
          steps: {
            a1: {
              text: 'El malware tiene comentarios en ruso y el servidor de control está en un país de Europa del Este. El director pregunta: «¿Fue un Estado extranjero?». ¿Qué responde?',
              evidence: 'Evidencia disponible:\n• Comentarios en ruso dentro del código.\n• Servidor de C2 alquilado en un proveedor de Europa del Este.\n• El malware es una familia comercial que se vende en foros criminales.\n• Se pidió rescate en criptomonedas.',
              choices: [
                { text: '«Sí: el idioma y la ubicación lo confirman.»', next: 'a_mal', points: 0, feedback: 'Idioma y ubicación del servidor se falsifican o alquilan fácilmente: son evidencia débil para atribuir.' },
                { text: '«Todavía no podemos atribuir. Evaluemos las hipótesis con la evidencia.»', next: 'a2', points: 10, feedback: 'Correcto: primero el análisis, después la conclusión.' },
              ],
            },
            a2: {
              text: 'Plantea tres hipótesis: H1 actor estatal, H2 grupo criminal con fines económicos, H3 actor interno. ¿Qué evidencia es más diagnóstica, es decir, distingue mejor entre hipótesis?',
              choices: [
                { text: 'Los comentarios en ruso.', next: 'a2b', points: 0, feedback: 'Son consistentes con H1 y H2 (y fáciles de plantar): no discriminan.' },
                { text: 'La petición de rescate y el uso de una familia de malware comercial.', next: 'a3', points: 10, feedback: 'Exacto: apuntan con fuerza a motivación económica (H2) y son inconsistentes con la mayoría de operaciones estatales de espionaje.' },
              ],
            },
            a2b: {
              text: 'Un colega le recuerda que la evidencia diagnóstica es la que es consistente con una hipótesis e inconsistente con las otras. ¿Cuál elige ahora?',
              choices: [
                { text: 'La petición de rescate y el malware comercial.', next: 'a3', points: 5, feedback: 'Bien corregido.' },
              ],
            },
            a3: {
              text: '¿Cómo redacta la conclusión para el comunicado interno?',
              choices: [
                { text: '«Es probable que el ataque haya sido obra de un grupo criminal con motivación económica (confianza moderada). No hay evidencia que respalde la participación de un Estado.»', next: 'a_bien', points: 10, feedback: 'Lenguaje estimativo, nivel de confianza y lo que no se sabe: así se escribe inteligencia.' },
                { text: '«Fue el grupo criminal X, sin duda.»', next: 'a_regular', points: 0, feedback: 'Sobreafirma: no hay evidencia para nombrar a un grupo específico ni para decir «sin duda».' },
              ],
            },
            a_mal: { text: 'El comunicado señala a un Estado y días después aparece el mismo malware en ataques criminales contra comercios. La entidad pierde credibilidad. Lección: el idioma y la geografía no atribuyen.' },
            a_regular: { text: 'La conclusión va en la dirección correcta, pero la sobreafirmación expone a la entidad si aparece evidencia nueva. Use lenguaje estimativo y declare la confianza.' },
            a_bien: { text: '¡Muy bien! Evaluó hipótesis, buscó evidencia diagnóstica y comunicó con probabilidad y confianza. Ahora aplíquelo en su propio entregable.' },
          },
        },
        {
          type: 'deliverable',
          id: 'ctii_d2',
          title: 'Entregable 2 · Matriz de hipótesis competidoras',
          description: 'Aplique ACH a un caso: el de este módulo, el del laboratorio de pivoteo o uno real anonimizado.',
          fields: [
            { key: 'pregunta', label: 'Pregunta de inteligencia', hint: '¿Qué intenta responder? P. ej. «¿Quién está detrás de la campaña de phishing contra tesorerías y con qué objetivo?».', min: 80 },
            { key: 'hipotesis', label: 'Hipótesis (mínimo tres)', hint: 'Incluya al menos una que le parezca poco probable: el ACH sirve para descartar, no para confirmar.', min: 200, rows: 5 },
            { key: 'matriz', label: 'Evidencia contra hipótesis', hint: 'Para cada evidencia, marque si es consistente (C), inconsistente (I) o neutra (N) con cada hipótesis. Puede escribirla como tabla de texto.', min: 300, rows: 8, example: 'E1 Petición de rescate | H1: I | H2: C | H3: N' },
            { key: 'conclusion', label: 'Conclusión con lenguaje estimativo y nivel de confianza', hint: 'Qué hipótesis queda en pie, con qué probabilidad («probable», «muy probable»…) y qué confianza (alta, moderada, baja) y por qué.', min: 200 },
            { key: 'indicadores', label: 'Qué evidencia cambiaría su conclusión', hint: 'Indicadores que vigilaría y sesgos que pudo tener en este análisis.', min: 150 },
          ],
          rubric: [
            'Planteé al menos tres hipótesis, incluida una alternativa incómoda.',
            'Identifiqué qué evidencia es diagnóstica y cuál no discrimina.',
            'La conclusión usa lenguaje estimativo y declara el nivel de confianza.',
            'Dije qué evidencia nueva me haría cambiar de opinión.',
          ],
        },
      ],
    },
    {
      id: 'ctii_report',
      title: '6. 📝 Producir inteligencia que se lea',
      content: [
        { type: 'text', icon: 'DocumentTextIcon', text: 'Un informe de inteligencia empieza por el final: el BLUF (bottom line up front), la conclusión y la acción recomendada en dos o tres líneas. Luego vienen los hallazgos con su confianza, el contexto, los TTP en ATT&CK, los indicadores (con su TLP) y las brechas de inteligencia: lo que aún no sabemos. Se escribe para el lector: la junta no necesita hashes, el SOC sí.' },
        {
          type: 'flashcards',
          title: 'Las partes de un buen informe',
          cards: [
            { front: 'BLUF', back: 'Conclusión y acción en las primeras líneas. Si el lector solo lee eso, debe saber qué hacer.' },
            { front: 'Hallazgos clave', back: 'Tres a cinco afirmaciones, cada una con lenguaje estimativo y nivel de confianza.' },
            { front: 'TTP e indicadores', back: 'Técnicas en ATT&CK para los defensores; indicadores depurados y marcados con TLP para las herramientas.' },
            { front: 'Brechas de inteligencia', back: 'Lo que falta saber y cómo se piensa obtener. Muestra honestidad analítica y orienta la próxima recolección.' },
            { front: 'Recomendaciones', back: 'Acciones concretas, priorizadas y con responsable. Una recomendación genérica («concientizar») no ayuda a decidir.' },
          ],
        },
        {
          type: 'deliverable',
          id: 'ctii_d3',
          title: 'Entregable 3 · Informe de inteligencia (táctico-operacional)',
          description: 'Escriba el informe de la campaña de los laboratorios 3 y 4 para el CISO y el SOC de su organización (o la ficticia del entregable 1).',
          fields: [
            { key: 'bluf', label: 'BLUF', hint: 'Dos o tres líneas: qué pasa, qué tan probable es que nos afecte y qué hacer ya.', min: 150 },
            { key: 'hallazgos', label: 'Hallazgos clave con confianza', hint: 'Tres a cinco hallazgos con lenguaje estimativo y nivel de confianza.', min: 300, rows: 6 },
            { key: 'ttp', label: 'TTP en ATT&CK', hint: 'Técnicas observadas con su ID y qué detección o control propone para cada una.', min: 250, rows: 5 },
            { key: 'ioc', label: 'Indicadores y su TLP', hint: 'Dominios, IP o correos de la campaña (ficticios), depurados, con el TLP con que los compartiría y con quién.', min: 150 },
            { key: 'reco', label: 'Recomendaciones priorizadas y brechas de inteligencia', hint: 'Qué hacer primero, quién lo hace, y qué no sabemos todavía.', min: 250, rows: 5 },
          ],
          rubric: [
            'El BLUF se entiende solo y dice qué hacer.',
            'Cada hallazgo tiene probabilidad y nivel de confianza.',
            'Los TTP tienen ID de ATT&CK y una detección o control asociado.',
            'Excluí falsos positivos (como el dominio de alojamiento compartido) y marqué los indicadores con TLP.',
          ],
        },
      ],
    },
    {
      id: 'ctii_exam',
      title: '7. 📝 Examen del Nivel Intermedio',
      content: [
        { type: 'text', icon: 'CheckCircleIcon', text: 'El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70 %. El badge del nivel se emite cuando también estén enviados sus tres entregables.' },
        {
          type: 'exam',
          title: 'Examen: Analista de Inteligencia de Amenazas · Intermedio',
          description: 'Evalúa requisitos, pivoteo, ATT&CK, análisis estructurado y producción de informes.',
          passPercent: 70,
          questionsPerAttempt: 10,
          questions: [
            { question: '¿Qué hace útil a un requisito prioritario de inteligencia (PIR)?', options: [{ id: 'ci1a', text: 'Que apoye una decisión concreta de alguien y se pueda responder.', isCorrect: true, score: 10 }, { id: 'ci1b', text: 'Que cubra todas las amenazas posibles.', isCorrect: false, score: 0 }, { id: 'ci1c', text: 'Que lo defina solo el analista.', isCorrect: false, score: 0 }], feedback: 'Un PIR existe para apoyar una decisión.' },
            { question: 'Inteligencia sobre tendencias de riesgo para la junta directiva es…', options: [{ id: 'ci2a', text: 'Estratégica.', isCorrect: true, score: 10 }, { id: 'ci2b', text: 'Técnica.', isCorrect: false, score: 0 }, { id: 'ci2c', text: 'Táctica.', isCorrect: false, score: 0 }], feedback: 'La estratégica orienta decisiones de alto nivel.' },
            { question: 'Dos dominios de phishing comparten el correo de registro. Eso permite…', options: [{ id: 'ci3a', text: 'Pivotear y vincularlos a la misma campaña, con otras evidencias que lo confirmen.', isCorrect: true, score: 10 }, { id: 'ci3b', text: 'Atribuir la campaña a un Estado.', isCorrect: false, score: 0 }, { id: 'ci3c', text: 'Nada: el WHOIS no sirve.', isCorrect: false, score: 0 }], feedback: 'Es un vínculo útil, no una atribución.' },
            { question: 'Un dominio antiguo coincidió un día con la IP de la campaña en un alojamiento compartido. ¿Qué hace?', options: [{ id: 'ci4a', text: 'No lo incluye sin más evidencia: sería un falso positivo probable.', isCorrect: true, score: 10 }, { id: 'ci4b', text: 'Lo bloquea de inmediato en toda la red.', isCorrect: false, score: 0 }, { id: 'ci4c', text: 'Lo publica como malicioso.', isCorrect: false, score: 0 }], feedback: 'Las IP compartidas exigen criterio al pivotear.' },
            { question: '¿Qué ID de ATT&CK corresponde a un adjunto malicioso enviado por correo dirigido?', options: [{ id: 'ci5a', text: 'T1566.001', isCorrect: true, score: 10 }, { id: 'ci5b', text: 'T1486', isCorrect: false, score: 0 }, { id: 'ci5c', text: 'T1003.001', isCorrect: false, score: 0 }], feedback: 'Phishing: Spearphishing Attachment.' },
            { question: 'Lectura de la memoria de lsass.exe para obtener credenciales:', options: [{ id: 'ci6a', text: 'T1003.001 OS Credential Dumping: LSASS Memory.', isCorrect: true, score: 10 }, { id: 'ci6b', text: 'T1059.001 PowerShell.', isCorrect: false, score: 0 }, { id: 'ci6c', text: 'T1053.005 Scheduled Task.', isCorrect: false, score: 0 }], feedback: 'Táctica: acceso a credenciales.' },
            { question: 'Al mapear a ATT&CK se debe…', options: [{ id: 'ci7a', text: 'Mapear lo que muestra la evidencia, con la subtécnica si el detalle lo permite.', isCorrect: true, score: 10 }, { id: 'ci7b', text: 'Mapear todo lo que el actor suele hacer, aunque no se haya visto.', isCorrect: false, score: 0 }, { id: 'ci7c', text: 'Usar solo tácticas, nunca técnicas.', isCorrect: false, score: 0 }], feedback: 'Lo observado, no lo supuesto.' },
            { question: 'El sesgo de confirmación consiste en…', options: [{ id: 'ci8a', text: 'Buscar y valorar más la evidencia que apoya la idea inicial.', isCorrect: true, score: 10 }, { id: 'ci8b', text: 'Confirmar cada dato con dos fuentes.', isCorrect: false, score: 0 }, { id: 'ci8c', text: 'Pedir confirmación a la dirección.', isCorrect: false, score: 0 }], feedback: 'El ACH ayuda a contrarrestarlo.' },
            { question: 'En el ACH, la evidencia diagnóstica es la que…', options: [{ id: 'ci9a', text: 'Es consistente con una hipótesis e inconsistente con las otras.', isCorrect: true, score: 10 }, { id: 'ci9b', text: 'Es consistente con todas las hipótesis.', isCorrect: false, score: 0 }, { id: 'ci9c', text: 'Viene de una fuente cara.', isCorrect: false, score: 0 }], feedback: 'Es la que permite descartar.' },
            { question: '¿Por qué los comentarios en ruso en un malware no bastan para atribuir?', options: [{ id: 'ci10a', text: 'Se pueden plantar o venir de una herramienta comercial; no discriminan entre hipótesis.', isCorrect: true, score: 10 }, { id: 'ci10b', text: 'Porque nadie programa en ruso.', isCorrect: false, score: 0 }, { id: 'ci10c', text: 'Sí bastan.', isCorrect: false, score: 0 }], feedback: 'Son fáciles de falsificar: evidencia débil.' },
            { question: 'En lenguaje estimativo, «probable» equivale aproximadamente a…', options: [{ id: 'ci11a', text: '55 % a 80 %.', isCorrect: true, score: 10 }, { id: 'ci11b', text: '100 %.', isCorrect: false, score: 0 }, { id: 'ci11c', text: '5 % a 20 %.', isCorrect: false, score: 0 }], feedback: 'Usar rangos acordados evita interpretaciones distintas.' },
            { question: 'Una conclusión puede ser «probable» con confianza baja porque…', options: [{ id: 'ci12a', text: 'La probabilidad y la confianza en las fuentes son cosas distintas.', isCorrect: true, score: 10 }, { id: 'ci12b', text: 'Es una contradicción: no se puede.', isCorrect: false, score: 0 }, { id: 'ci12c', text: 'La confianza siempre es alta.', isCorrect: false, score: 0 }], feedback: 'La confianza refleja la calidad de la base de evidencia.' },
            { question: '¿Qué es el BLUF de un informe?', options: [{ id: 'ci13a', text: 'La conclusión y la acción recomendada al inicio.', isCorrect: true, score: 10 }, { id: 'ci13b', text: 'El anexo de indicadores.', isCorrect: false, score: 0 }, { id: 'ci13c', text: 'La bibliografía.', isCorrect: false, score: 0 }], feedback: 'Lo primero que lee quien decide.' },
            { question: '¿Para qué sirve declarar las brechas de inteligencia?', options: [{ id: 'ci14a', text: 'Muestra lo que falta saber y orienta la próxima recolección.', isCorrect: true, score: 10 }, { id: 'ci14b', text: 'Para alargar el informe.', isCorrect: false, score: 0 }, { id: 'ci14c', text: 'No sirve: debilita el informe.', isCorrect: false, score: 0 }], feedback: 'La honestidad analítica fortalece la credibilidad.' },
          ],
        },
      ],
    },
  ],
};

export const CTI_AVANZADO: LearningPath = {
  title: 'Analista de Inteligencia de Amenazas · Nivel Avanzado',
  description: 'Inteligencia que se convierte en defensa: threat hunting guiado por inteligencia, ingeniería de detección, seguimiento de actores, intercambio estructurado con STIX 2.1 y la dirección de un programa de CTI. Tres entregables, caso integrador y examen con nota mínima del 80 %.',
  lastUpdated: 'Noviembre 2026',
  modules: [
    {
      id: 'ctia_intro',
      title: '1. 🎯 Nivel Avanzado: inteligencia que cambia la defensa',
      content: [
        { type: 'text', icon: 'SpyIcon', text: 'En el Nivel Avanzado la pregunta ya no es «qué sabemos del atacante» sino «qué cambia en nuestra defensa gracias a eso». Va a buscar al atacante en sus propios registros antes de que lo encuentre una alerta, a convertir TTP en detecciones, a seguir actores en el tiempo, a compartir en formatos que las máquinas entienden y a dirigir un programa de CTI con métricas.' },
        { type: 'text', icon: 'CheckCircleIcon', text: 'Requisitos para el badge: tres entregables (detecciones, plan del programa CTI e informe estratégico del caso integrador) y el examen con 80 %. Cuente con 8 a 10 horas. Es exigente a propósito: es el nivel que lo diferencia en una entrevista.' },
        {
          type: 'interactive',
          title: 'Conceptos del nivel',
          items: [
            { term: 'Threat hunting', definition: 'Búsqueda proactiva de actividad maliciosa que las herramientas no alertaron, partiendo de una hipótesis basada en inteligencia.' },
            { term: 'Ingeniería de detección', definition: 'Diseñar, probar, documentar y mantener reglas de detección como si fueran software, con control de versiones y medición de falsos positivos.' },
            { term: 'Sigma', definition: 'Formato abierto (YAML) para escribir reglas de detección sobre registros, independiente de la herramienta SIEM.' },
            { term: 'Intrusion set', definition: 'Conjunto de actividad y recursos atribuidos a un mismo actor, aunque no se sepa quién es. Los proveedores le ponen nombres distintos al mismo grupo.' },
            { term: 'STIX 2.1 y TAXII', definition: 'STIX es el lenguaje estructurado (JSON) para describir amenazas; TAXII es el protocolo para intercambiarlo entre organizaciones.' },
            { term: 'Programa de CTI', definition: 'La capacidad organizacional: requisitos, fuentes, personas, herramientas, productos, métricas y mejora continua.' },
          ],
        },
      ],
    },
    {
      id: 'ctia_hunting',
      title: '2. 🔎 Laboratorio: threat hunting guiado por inteligencia',
      content: [
        { type: 'text', icon: 'UserSearchIcon', text: 'Una cacería útil empieza con una hipótesis comprobable derivada de inteligencia: «Si el grupo que ataca a nuestro sector usa tareas programadas con PowerShell codificado para persistir, deberíamos ver procesos schtasks.exe creando tareas que invocan powershell -enc». Marcos como PEAK (preparar, ejecutar, actuar con conocimiento) ordenan el trabajo y obligan a dejar un producto: una detección nueva, un hallazgo o una brecha de visibilidad.' },
        {
          type: 'challenge',
          title: 'Cace la persistencia en los registros',
          brief: 'Hipótesis: el actor de la campaña de tesorerías persiste con tareas programadas que lanzan PowerShell codificado. Revise los eventos (ficticios) y responda.',
          artifacts: [
            { name: 'eventos_windows.txt', content: `hora   equipo     evento  detalle
09:02  TES-PC07   4688    proceso: excel.exe  padre: explorer.exe
09:03  TES-PC07   4688    proceso: powershell.exe -nop -w hidden -enc SQBFAFgA...  padre: excel.exe
09:03  TES-PC07   4698    tarea creada: \\ActualizadorOffice  acción: powershell.exe -enc SQBFAFgA...
09:10  CONT-PC02  4698    tarea creada: \\GoogleUpdateTaskMachineUA  acción: C:\\Program Files (x86)\\Google\\Update\\GoogleUpdate.exe /ua
10:03  TES-PC07   4688    proceso: powershell.exe -enc SQBFAFgA...  padre: svchost.exe
10:41  TES-PC11   4688    proceso: rundll32.exe C:\\Users\\Public\\upd.dll,Start  padre: winword.exe
11:03  TES-PC07   4688    proceso: powershell.exe -enc SQBFAFgA...  padre: svchost.exe` },
          ],
          questions: [
            { prompt: '¿Qué ID de evento de Windows registra la creación de una tarea programada? (número)', answers: ['4698'], explanation: 'El evento 4698 (Security) registra la creación de tareas programadas. Requiere habilitar la auditoría de objetos.' },
            { prompt: '¿Cómo se llama la tarea maliciosa? (nombre, sin barra)', answers: ['actualizadoroffice', '\\actualizadoroffice'], explanation: 'ActualizadorOffice ejecuta PowerShell codificado: coincide con la hipótesis. La tarea de Google Update es legítima.' },
            { prompt: 'La cacería encontró algo que la hipótesis no buscaba: ¿en qué otro equipo hay actividad sospechosa? (nombre del equipo)', answers: ['tes-pc11'], explanation: 'TES-PC11: Word lanza rundll32 con una DLL en C:\\Users\\Public (T1218.011). Es otro hallazgo: amplía el alcance del incidente y merece su propia investigación.' },
            { prompt: '¿Cada cuánto se ejecuta la persistencia en TES-PC07? (en minutos)', answers: ['60', '60 minutos', 'cada 60 minutos'], explanation: 'A las 10:03 y 11:03, lanzado por svchost (el servicio de tareas): cada hora. Ese patrón sirve para una detección por periodicidad.' },
          ],
        },
      ],
    },
    {
      id: 'ctia_detection',
      title: '3. 🛠️ Ingeniería de detección: de TTP a reglas',
      content: [
        { type: 'text', icon: 'ShieldCheckIcon', text: 'La Pirámide del Dolor enseña dónde invertir: bloquear un hash o una IP le cuesta poco al atacante; detectar un comportamiento (un TTP) lo obliga a cambiar su forma de operar. Una buena detección documenta la técnica de ATT&CK, la fuente de datos que necesita, la lógica, los falsos positivos esperados, la severidad y qué debe hacer el analista cuando salta.' },
        {
          type: 'challenge',
          title: 'Lea la regla Sigma',
          brief: 'Esta regla (simplificada) se escribió con la cacería del módulo anterior. Responda sobre su lógica.',
          artifacts: [
            { name: 'tarea_powershell_codificado.yml', content: `title: Tarea programada que ejecuta PowerShell codificado
status: experimental
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4698
    TaskContent|contains|all:
      - 'powershell'
      - '-enc'
  condition: selection
falsepositives:
  - Herramientas de administración que usan comandos codificados (validar con TI)
level: high
tags:
  - attack.persistence
  - attack.t1053.005` },
          ],
          questions: [
            { prompt: '¿Qué técnica de ATT&CK detecta la regla? (ID)', answers: ['T1053.005', 't1053.005'], explanation: 'Scheduled Task/Job: Scheduled Task, en la táctica de persistencia.' },
            { prompt: '¿Cuántas condiciones de texto debe contener el contenido de la tarea para que la regla salte? (número)', answers: ['2', 'dos'], explanation: 'El modificador contains|all exige que aparezcan las dos cadenas: «powershell» y «-enc».' },
            { prompt: '¿En qué nivel de la Pirámide del Dolor está esta detección? (una palabra o sigla)', answers: ['ttp', 'ttps'], explanation: 'Detecta un comportamiento (TTP), no un indicador: el atacante no lo evade cambiando de IP o de dominio.' },
          ],
        },
        {
          type: 'deliverable',
          id: 'ctia_d1',
          title: 'Entregable 1 · Tres detecciones basadas en TTP',
          description: 'Diseñe tres detecciones para técnicas de la campaña del curso o de un actor relevante para su sector.',
          fields: [
            { key: 'd1', label: 'Detección 1', hint: 'Técnica ATT&CK (ID), fuente de datos, lógica (pseudocódigo o Sigma), falsos positivos esperados, severidad y respuesta del analista.', min: 300, rows: 8 },
            { key: 'd2', label: 'Detección 2', hint: 'Misma estructura. Elija otra táctica distinta a la de la detección 1.', min: 300, rows: 8 },
            { key: 'd3', label: 'Detección 3', hint: 'Misma estructura. Idealmente basada en comportamiento de red o de identidad.', min: 300, rows: 8 },
            { key: 'pruebas', label: 'Cómo las probaría y mantendría', hint: 'Cómo simularía la técnica para validar (p. ej. pruebas atómicas en un laboratorio), qué métrica de falsos positivos aceptaría y cada cuánto las revisaría.', min: 200 },
          ],
          rubric: [
            'Cada detección tiene técnica de ATT&CK y fuente de datos concreta.',
            'Las tres detecciones apuntan a comportamientos (TTP), no solo a indicadores.',
            'Documenté falsos positivos y la respuesta esperada del analista.',
            'Propuse cómo probarlas en un entorno controlado, nunca en producción sin autorización.',
          ],
        },
      ],
    },
    {
      id: 'ctia_actors',
      title: '4. 🧬 Seguimiento de actores y atribución',
      content: [
        { type: 'text', icon: 'BrainCircuitIcon', text: 'Seguir a un actor es agrupar actividad: intrusiones que comparten infraestructura, herramientas, víctimas y forma de operar se agrupan en un intrusion set, aunque no se sepa quién está detrás. Distintos proveedores le dan nombres distintos al mismo grupo, y sus agrupaciones no siempre coinciden: compare con cuidado antes de decir «es el mismo».' },
        { type: 'text', icon: 'PointerIcon', text: 'La atribución tiene niveles: técnica (es el mismo intrusion set), organizacional (es tal grupo) y estatal (lo dirige tal gobierno). Cada nivel exige más evidencia y tiene más consecuencias. Para la mayoría de las organizaciones, lo accionable es el nivel técnico: qué hace el actor y cómo defenderse.' },
        {
          type: 'scenario',
          title: 'El nombre que pide la junta',
          intro: 'Su equipo agrupó tres intrusiones en el sector financiero (casos ficticios). La junta pregunta si es el «Grupo Cóndor» del que habla la prensa.',
          start: 'b1',
          maxPoints: 30,
          passPoints: 20,
          steps: {
            b1: {
              text: 'Las tres intrusiones comparten la tarea «ActualizadorOffice», la misma IP de C2 y víctimas del mismo sector. La prensa atribuye al «Grupo Cóndor» ataques con otro malware y otro sector. ¿Qué concluye?',
              choices: [
                { text: 'Las tres intrusiones forman un mismo intrusion set; no hay evidencia suficiente para vincularlo al «Grupo Cóndor».', next: 'b2', points: 10, feedback: 'Correcto: agrupación técnica bien sustentada; la vinculación con un nombre público no lo está.' },
                { text: 'Es el «Grupo Cóndor»: la prensa lo confirma.', next: 'b2', points: 0, feedback: 'La prensa no es evidencia técnica y además describe otro malware y otro sector.' },
              ],
            },
            b2: {
              text: 'Un proveedor comercial dice que su grupo «FIN-Andes» usa la misma IP de C2. ¿Cómo lo trata?',
              choices: [
                { text: 'Lo registro como posible solapamiento y comparo más elementos (herramientas, horario, víctimas) antes de fusionar los grupos.', next: 'b3', points: 10, feedback: 'Una IP compartida es un vínculo débil: pudo ser alquilada por varios actores.' },
                { text: 'Fusiono los grupos: misma IP, mismo actor.', next: 'b3', points: 0, feedback: 'La infraestructura se recicla y se alquila: fusionar por una IP contamina el seguimiento.' },
              ],
            },
            b3: {
              text: '¿Qué le entrega a la junta?',
              choices: [
                { text: 'Lo que el actor hace contra nuestro sector, el riesgo para la entidad y las acciones de defensa, con la atribución en el nivel técnico y su confianza.', next: 'b_bien', points: 10, feedback: 'Accionable y honesto.' },
                { text: 'Un nombre de grupo para el comunicado.', next: 'b_mal', points: 0, feedback: 'Un nombre no protege a la entidad y puede ser falso.' },
              ],
            },
            b_bien: { text: '¡Muy bien! Separó agrupación técnica de atribución pública y entregó lo que sirve para decidir.' },
            b_mal: { text: 'El nombre se repite en medios y luego resulta equivocado. Lección: la atribución pública exige evidencia de otro nivel y rara vez es lo que la organización necesita.' },
          },
        },
      ],
    },
    {
      id: 'ctia_stix',
      title: '5. 🔗 Laboratorio: intercambio estructurado con STIX 2.1',
      content: [
        { type: 'text', icon: 'ServerIcon', text: 'STIX 2.1 describe la amenaza con objetos (indicator, malware, attack-pattern, intrusion-set, campaign, vulnerability…) unidos por relaciones (relationship) y avistamientos (sighting). Las marcas de TLP viajan dentro del objeto. Plataformas como MISP u OpenCTI importan y exportan STIX, y TAXII lo transporta entre organizaciones de una comunidad de confianza.' },
        {
          type: 'challenge',
          title: 'Interprete el paquete STIX',
          brief: 'Un CSIRT sectorial le comparte este paquete (simplificado y ficticio). Respóndale al SOC qué contiene.',
          artifacts: [
            { name: 'bundle.json', content: `{
  "type": "bundle",
  "objects": [
    { "type": "indicator", "id": "indicator--a1", "name": "Dominio de phishing a tesorerías",
      "pattern": "[domain-name:value = 'portal.bancoandino-seguro.example']",
      "pattern_type": "stix", "valid_from": "2026-11-02T00:00:00Z",
      "object_marking_refs": ["marking-definition--tlp-amber"] },
    { "type": "attack-pattern", "id": "attack-pattern--b2", "name": "Spearphishing Attachment",
      "external_references": [{ "source_name": "mitre-attack", "external_id": "T1566.001" }] },
    { "type": "intrusion-set", "id": "intrusion-set--c3", "name": "Campaña Tesorerías Andinas" },
    { "type": "relationship", "relationship_type": "uses",
      "source_ref": "intrusion-set--c3", "target_ref": "attack-pattern--b2" },
    { "type": "relationship", "relationship_type": "indicates",
      "source_ref": "indicator--a1", "target_ref": "intrusion-set--c3" }
  ]
}` },
          ],
          questions: [
            { prompt: '¿Qué tipo de objeto STIX representa la técnica del atacante? (escríbalo como en el JSON)', answers: ['attack-pattern'], explanation: 'attack-pattern describe TTP y se enlaza con ATT&CK mediante external_references.' },
            { prompt: '¿Qué relación une el intrusion set con la técnica? (una palabra en inglés)', answers: ['uses'], explanation: 'intrusion-set «uses» attack-pattern.' },
            { prompt: '¿Con qué TLP viene marcado el indicador? (solo el color)', answers: ['amber', 'ambar', 'ámbar'], explanation: 'TLP:AMBER: puede compartirse dentro de su organización (y con sus clientes) solo según necesidad de conocer; no en canales públicos.' },
            { prompt: '¿Desde qué fecha es válido el indicador? (AAAA-MM-DD)', answers: ['2026-11-02'], explanation: 'valid_from indica desde cuándo aplica. Los indicadores de red envejecen rápido: conviene definir también hasta cuándo revisarlo.' },
          ],
        },
      ],
    },
    {
      id: 'ctia_program',
      title: '6. 🏗️ Dirigir un programa de CTI',
      content: [
        { type: 'text', icon: 'HappyUsersIcon', text: 'Un programa de CTI maduro tiene requisitos vivos (revisados con los stakeholders), fuentes evaluadas, productos con calendario, integración con el SOC, respuesta a incidentes, gestión de vulnerabilidades y fraude, y métricas que muestran valor: decisiones apoyadas, detecciones creadas a partir de inteligencia, tiempo hasta acción, retroalimentación de los consumidores. Modelos como el CTI-CMM ayudan a medir la madurez por dominio.' },
        {
          type: 'flashcards',
          title: 'Métricas que sí muestran valor',
          cards: [
            { front: 'Mala métrica: «número de indicadores ingeridos».', back: 'Mide volumen, no valor. Un millón de indicadores sin depurar genera ruido y falsos positivos.' },
            { front: 'Detecciones creadas a partir de inteligencia', back: 'Muestra que la CTI cambia la defensa: cuántas reglas nuevas nacieron de un informe o una cacería.' },
            { front: 'Requisitos respondidos a tiempo', back: 'Porcentaje de PIR con respuesta en el plazo acordado: mide la utilidad para quien decide.' },
            { front: 'Retroalimentación de los consumidores', back: 'Encuestas cortas o reuniones trimestrales: ¿el producto se usó? ¿para qué decisión?' },
          ],
        },
        {
          type: 'deliverable',
          id: 'ctia_d2',
          title: 'Entregable 2 · Plan del programa de CTI a 12 meses',
          description: 'Diseñe el programa de CTI para la organización de su entregable del Nivel Intermedio (o una ficticia).',
          fields: [
            { key: 'mision', label: 'Misión, alcance y stakeholders', hint: 'Para qué existe el programa, qué cubre y no cubre, y a quién sirve.', min: 200 },
            { key: 'capacidades', label: 'Personas, fuentes y herramientas', hint: 'Roles mínimos, fuentes (abiertas, comerciales, comunidades como CSIRT sectoriales y ColCERT) y plataforma (p. ej. MISP u OpenCTI).', min: 250, rows: 5 },
            { key: 'productos', label: 'Productos y calendario', hint: 'Qué entrega (alertas, boletines, informes, detecciones), a quién, con qué frecuencia y con qué TLP.', min: 200, rows: 5 },
            { key: 'integracion', label: 'Integración con SOC, respuesta a incidentes y vulnerabilidades', hint: 'Cómo la inteligencia se convierte en detecciones, prioridades de parcheo y lecciones aprendidas.', min: 200 },
            { key: 'metricas', label: 'Métricas y hoja de ruta por trimestre', hint: 'Tres a cinco métricas de valor y qué logra en cada trimestre.', min: 250, rows: 5 },
          ],
          rubric: [
            'El programa parte de requisitos y stakeholders definidos.',
            'Las fuentes incluyen comunidades de confianza y criterios de evaluación.',
            'Hay un camino claro de la inteligencia a la acción (detección, parcheo, decisión).',
            'Las métricas miden valor, no volumen.',
          ],
        },
      ],
    },
    {
      id: 'ctia_capstone',
      title: '7. 🧩 Caso integrador: campaña contra el sector financiero',
      content: [
        { type: 'text', icon: 'AlarmIcon', text: 'Integre todo: requisitos, pivoteo, ATT&CK, cacería, detecciones, seguimiento del actor e intercambio. El caso es ficticio y continúa la campaña «Tesorerías Andinas» del curso.' },
        {
          type: 'scenario',
          title: 'Tesorerías Andinas: la segunda ola',
          intro: 'Tres semanas después, el CSIRT sectorial avisa que la campaña volvió con dominios nuevos y ahora apunta a cooperativas. Usted lidera la CTI de una de ellas.',
          start: 'c1',
          maxPoints: 40,
          passPoints: 30,
          steps: {
            c1: {
              text: 'Los dominios nuevos ya no reutilizan el correo de registro ni la IP. ¿Qué pivote intenta primero?',
              choices: [
                { text: 'Certificados TLS y patrones de nombres (registros CT), además de la infraestructura de alojamiento y los horarios de registro.', next: 'c2', points: 10, feedback: 'Cuando el atacante corrige un error, se buscan otros rasgos persistentes.' },
                { text: 'Bloquear por país todo el tráfico extranjero.', next: 'c2', points: 0, feedback: 'Desproporcionado y fácil de evadir con infraestructura local.' },
              ],
            },
            c2: {
              text: 'Encuentra 9 dominios nuevos. ¿Qué hace con ellos?',
              choices: [
                { text: 'Los valida, los marca TLP:AMBER, los carga en la plataforma y los comparte con el CSIRT sectorial en STIX; el SOC los bloquea.', next: 'c3', points: 10, feedback: 'Inteligencia validada, compartida con la comunidad y convertida en acción.' },
                { text: 'Los publica en redes sociales para alertar a todos.', next: 'c3', points: 0, feedback: 'Avisa al atacante y viola la confianza de la comunidad: no es TLP:CLEAR.' },
              ],
            },
            c3: {
              text: 'Los dominios cambiarán mañana. ¿Qué inversión de defensa tiene más valor a mediano plazo?',
              choices: [
                { text: 'Las detecciones de comportamiento (macro → PowerShell codificado → tarea programada) y la cacería periódica de esa cadena.', next: 'c4', points: 10, feedback: 'Subió en la Pirámide del Dolor: obliga al actor a cambiar su forma de operar.' },
                { text: 'Seguir bloqueando dominios uno por uno.', next: 'c4', points: 0, feedback: 'Necesario, pero el actor gana esa carrera.' },
              ],
            },
            c4: {
              text: 'La junta pide un informe. ¿Qué le entrega?',
              choices: [
                { text: 'Un informe estratégico: el riesgo para la cooperativa, la tendencia en el sector, lo que se hizo, lo que falta y las decisiones que necesita de ellos.', next: 'c_bien', points: 10, feedback: 'El lenguaje del riesgo y de las decisiones.' },
                { text: 'La lista de los 9 dominios y los hashes del malware.', next: 'c_mal', points: 0, feedback: 'Es inteligencia técnica: sirve al SOC, no a la junta.' },
              ],
            },
            c_bien: { text: '¡Excelente! Cerró el ciclo completo. Ahora escriba ese informe estratégico en el entregable 3.' },
            c_mal: { text: 'La junta no puede decidir con una lista técnica. Rehaga el producto para su audiencia en el entregable 3.' },
          },
        },
        {
          type: 'deliverable',
          id: 'ctia_d3',
          title: 'Entregable 3 · Informe estratégico para la junta directiva',
          description: 'Escriba el informe de la segunda ola de la campaña para la junta de la cooperativa. Máximo una página de lectura.',
          fields: [
            { key: 'bluf', label: 'BLUF para la junta', hint: 'Riesgo para la entidad, en lenguaje de negocio, y la decisión que se les pide.', min: 200 },
            { key: 'tendencia', label: 'Contexto y tendencia en el sector', hint: 'Qué está pasando en el sector financiero, con lenguaje estimativo y confianza.', min: 200 },
            { key: 'acciones', label: 'Lo que ya se hizo y su efecto', hint: 'Detecciones, bloqueos, intercambio con el CSIRT sectorial, resultados medibles.', min: 200 },
            { key: 'decisiones', label: 'Decisiones e inversiones que se recomiendan', hint: 'Dos o tres, priorizadas, con costo aproximado o esfuerzo y riesgo de no hacerlas.', min: 200, rows: 5 },
            { key: 'brechas', label: 'Lo que aún no sabemos', hint: 'Brechas de inteligencia y cómo se van a cerrar.', min: 120 },
          ],
          rubric: [
            'No hay jerga técnica innecesaria: lo entendería un miembro de junta no técnico.',
            'El riesgo está expresado en impacto para la entidad (operación, dinero, reputación, regulador).',
            'Las recomendaciones piden decisiones concretas y priorizadas.',
            'Declaré probabilidad, confianza y brechas.',
          ],
        },
      ],
    },
    {
      id: 'ctia_exam',
      title: '8. 📝 Examen del Nivel Avanzado',
      content: [
        { type: 'text', icon: 'CheckCircleIcon', text: 'El examen toma 10 preguntas al azar de un banco de 15 y se aprueba con 80 %. El badge de Analista de Inteligencia de Amenazas · Avanzado se emite cuando también estén enviados sus tres entregables.' },
        {
          type: 'exam',
          title: 'Examen: Analista de Inteligencia de Amenazas · Avanzado',
          description: 'Evalúa threat hunting, ingeniería de detección, seguimiento de actores, STIX 2.1 y dirección de un programa de CTI.',
          passPercent: 80,
          questionsPerAttempt: 10,
          questions: [
            { question: '¿Con qué empieza una cacería útil?', options: [{ id: 'ca1a', text: 'Con una hipótesis comprobable basada en inteligencia.', isCorrect: true, score: 10 }, { id: 'ca1b', text: 'Revisando todos los registros al azar.', isCorrect: false, score: 0 }, { id: 'ca1c', text: 'Esperando una alerta del SIEM.', isCorrect: false, score: 0 }], feedback: 'La hipótesis orienta qué datos revisar.' },
            { question: 'Una cacería que no encuentra al atacante…', options: [{ id: 'ca2a', text: 'Igual deja producto: una detección, una brecha de visibilidad o una hipótesis descartada.', isCorrect: true, score: 10 }, { id: 'ca2b', text: 'Fue tiempo perdido.', isCorrect: false, score: 0 }, { id: 'ca2c', text: 'Demuestra que no hay riesgo.', isCorrect: false, score: 0 }], feedback: 'Siempre se documenta lo aprendido.' },
            { question: '¿Qué evento de Windows registra la creación de una tarea programada?', options: [{ id: 'ca3a', text: '4698', isCorrect: true, score: 10 }, { id: 'ca3b', text: '4624', isCorrect: false, score: 0 }, { id: 'ca3c', text: '4688', isCorrect: false, score: 0 }], feedback: '4624 es inicio de sesión; 4688, creación de proceso.' },
            { question: 'Según la Pirámide del Dolor, ¿qué detección le cuesta más evadir al atacante?', options: [{ id: 'ca4a', text: 'Una basada en su comportamiento (TTP).', isCorrect: true, score: 10 }, { id: 'ca4b', text: 'Una basada en el hash del archivo.', isCorrect: false, score: 0 }, { id: 'ca4c', text: 'Una basada en una IP.', isCorrect: false, score: 0 }], feedback: 'Cambiar de comportamiento es lo más costoso.' },
            { question: '¿Qué es Sigma?', options: [{ id: 'ca5a', text: 'Un formato abierto para escribir reglas de detección sobre registros, independiente del SIEM.', isCorrect: true, score: 10 }, { id: 'ca5b', text: 'Un malware.', isCorrect: false, score: 0 }, { id: 'ca5c', text: 'Un protocolo de intercambio.', isCorrect: false, score: 0 }], feedback: 'Se convierte a la sintaxis de cada herramienta.' },
            { question: 'Una buena detección documenta, además de la lógica…', options: [{ id: 'ca6a', text: 'La técnica ATT&CK, la fuente de datos, los falsos positivos y la respuesta del analista.', isCorrect: true, score: 10 }, { id: 'ca6b', text: 'Solo el nombre del autor.', isCorrect: false, score: 0 }, { id: 'ca6c', text: 'Nada más.', isCorrect: false, score: 0 }], feedback: 'Se mantiene como software.' },
            { question: '¿Qué es un intrusion set?', options: [{ id: 'ca7a', text: 'Actividad y recursos agrupados como de un mismo actor, aunque no se sepa quién es.', isCorrect: true, score: 10 }, { id: 'ca7b', text: 'Un tipo de firewall.', isCorrect: false, score: 0 }, { id: 'ca7c', text: 'La identidad confirmada del atacante.', isCorrect: false, score: 0 }], feedback: 'Es una agrupación técnica.' },
            { question: 'Dos proveedores comparten una IP de C2 en grupos con nombres distintos. Lo correcto es…', options: [{ id: 'ca8a', text: 'Registrar el posible solapamiento y comparar más elementos antes de fusionar.', isCorrect: true, score: 10 }, { id: 'ca8b', text: 'Fusionarlos de inmediato.', isCorrect: false, score: 0 }, { id: 'ca8c', text: 'Ignorar ambos informes.', isCorrect: false, score: 0 }], feedback: 'La infraestructura se recicla y se alquila.' },
            { question: 'Para la mayoría de las organizaciones, ¿qué nivel de atribución es accionable?', options: [{ id: 'ca9a', text: 'El técnico: qué hace el actor y cómo defenderse.', isCorrect: true, score: 10 }, { id: 'ca9b', text: 'El estatal.', isCorrect: false, score: 0 }, { id: 'ca9c', text: 'Ninguno.', isCorrect: false, score: 0 }], feedback: 'La atribución pública rara vez cambia la defensa.' },
            { question: 'En STIX 2.1, ¿qué objeto describe una técnica del atacante?', options: [{ id: 'ca10a', text: 'attack-pattern', isCorrect: true, score: 10 }, { id: 'ca10b', text: 'identity', isCorrect: false, score: 0 }, { id: 'ca10c', text: 'note', isCorrect: false, score: 0 }], feedback: 'Se enlaza con el ID de ATT&CK.' },
            { question: '¿Qué hace TAXII?', options: [{ id: 'ca11a', text: 'Transporta contenido STIX entre organizaciones.', isCorrect: true, score: 10 }, { id: 'ca11b', text: 'Cifra discos.', isCorrect: false, score: 0 }, { id: 'ca11c', text: 'Escanea vulnerabilidades.', isCorrect: false, score: 0 }], feedback: 'STIX es el lenguaje; TAXII, el transporte.' },
            { question: 'Un indicador marcado TLP:AMBER puede…', options: [{ id: 'ca12a', text: 'Compartirse en su organización según necesidad de conocer, no en canales públicos.', isCorrect: true, score: 10 }, { id: 'ca12b', text: 'Publicarse en redes sociales.', isCorrect: false, score: 0 }, { id: 'ca12c', text: 'Compartirse solo verbalmente con la persona presente.', isCorrect: false, score: 0 }], feedback: 'Lo último describe TLP:RED.' },
            { question: '¿Cuál es una métrica de valor para un programa de CTI?', options: [{ id: 'ca13a', text: 'Detecciones creadas a partir de inteligencia.', isCorrect: true, score: 10 }, { id: 'ca13b', text: 'Número de indicadores ingeridos.', isCorrect: false, score: 0 }, { id: 'ca13c', text: 'Número de boletines enviados.', isCorrect: false, score: 0 }], feedback: 'Mide el cambio en la defensa.' },
            { question: 'Para la junta directiva, el producto adecuado es…', options: [{ id: 'ca14a', text: 'Un informe estratégico en lenguaje de riesgo y decisiones.', isCorrect: true, score: 10 }, { id: 'ca14b', text: 'La lista de indicadores técnicos.', isCorrect: false, score: 0 }, { id: 'ca14c', text: 'Las reglas Sigma.', isCorrect: false, score: 0 }], feedback: 'Cada audiencia, su producto.' },
            { question: 'Cuando el atacante deja de reutilizar el correo de registro, conviene pivotear por…', options: [{ id: 'ca15a', text: 'Certificados TLS, patrones de nombres y rasgos de su infraestructura.', isCorrect: true, score: 10 }, { id: 'ca15b', text: 'El país del visitante de la web.', isCorrect: false, score: 0 }, { id: 'ca15c', text: 'Nada: ya no se puede.', isCorrect: false, score: 0 }], feedback: 'Siempre quedan otros rasgos persistentes.' },
          ],
        },
      ],
    },
  ],
};
