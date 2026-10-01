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
        title: "3. Video: Amenazas Comunes",
        content: [
          { type: 'video', title: "Entendiendo Malware y Phishing", videoId: "h_ljq_Al_k0" },
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
    description: "Explora las motivaciones y métodos comunes detrás de los delitos cometidos en el ciberespacio.",
    lastUpdated: "Enero 2025",
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
        title: "2. Video: ¿Por qué lo hacen?",
        content: [
           { type: 'video', title: "Las Motivaciones del Cibercriminal", videoId: "dQw4w9WgXcQ" },
           { type: 'text', icon: 'ClosedEnvelopeIcon', text: "Las motivaciones varían desde el beneficio económico y el espionaje hasta el activismo (hacktivismo)." },
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
          { type: 'text', icon: 'CheckCircleIcon', text: "Las leyes establecen el marco para perseguir el cibercrimen, que tiene consecuencias reales causando pérdidas financieras y dañando reputaciones. ¡Has finalizado la introducción al cibercrimen!" },
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
            title: "2. Video: La Psicología del Hacker",
            content: [
                { type: 'video', title: "Dentro de la Mente de un Cibercriminal", videoId: "o-YBDTqX_ZU" },
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
          { type: 'video', title: "Cómo la Computación Cuántica Rompe el Cifrado", videoId: "wUwZZl-2x34" },
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
        title: "3. Video: Herramientas del Investigador",
        content: [
          { type: 'video', title: "Introducción a Herramientas Forenses", videoId: "E-t6a5Q_pI0" },
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
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: en grupos de 3-4, los estudiantes reciben un mapa mundial y deben identificar el CSIRT nacional de 5 países asignados, su tipo de mandato (gubernamental, académico, comercial o coordinador nacional) y a qué red regional pertenece. Cierre en plenaria comparando modelos." },
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
          { type: 'text', icon: 'CalendarIcon', text: "Actividad presencial: cada grupo redacta, en formato taller, un RFC 2350 simplificado (media página) para un CSIRT ficticio de un escenario asignado por el docente (universidad, banco regional, ministerio). Se expone y se retroalimenta entre grupos." },
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