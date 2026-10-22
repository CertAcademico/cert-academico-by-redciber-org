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
              { term: 'banco-actualiza-datos.co', definition: 'Nombre de dominio.' },
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
          { type: 'text', icon: 'ServerIcon', text: "Se organiza en una matriz. La matriz Enterprise tiene 14 tácticas (el \"por qué\" de cada paso del atacante), y cada táctica contiene técnicas y subtécnicas (el \"cómo\"), cada una con un identificador. Por ejemplo, T1566 es Phishing y T1486 es Cifrado de datos para causar impacto (ransomware)." },
          {
            type: 'interactive',
            title: 'Algunas de las 14 tácticas de ATT&CK Enterprise',
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
          { type: 'text', icon: 'AlarmIcon', text: "Caso ficticio: varios funcionarios de una universidad reciben un correo \"de Rectoría\" con el asunto \"Actualización de nómina\" que lleva a un formulario en el dominio rectoria-nomina-universidad.co (registrado hace 3 días). Dos personas ingresaron su contraseña. Al día siguiente, una de esas cuentas inicia sesión desde otro país y crea una regla para reenviar todo su correo hacia afuera." },
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
                "Bloquear el dominio rectoria-nomina-universidad.co.",
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