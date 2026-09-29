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
          { type: 'text', icon: 'CheckCircleIcon', text: "¡Felicidades! Has completado la ruta de Fundamentos de Ciberseguridad." },
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