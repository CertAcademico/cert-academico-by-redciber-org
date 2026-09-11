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
        title: "9. [Fase III - Avanzado] Hito Final de Certificación",
        content: [
          {
            type: 'h5p_check',
            title: 'Examen Integral de Certificación RedCiber',
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