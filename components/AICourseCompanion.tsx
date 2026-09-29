import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AICourseCompanionProps {
  currentModuleId: string;
  currentModuleIndex: number;
  completedModules: number[];
  pathId: string;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AICourseCompanion: React.FC<AICourseCompanionProps> = ({
  currentModuleId,
  currentModuleIndex,
  completedModules,
  pathId,
}) => {
  const [activeTab, setActiveTab] = useState<'bot' | 'pistas' | 'canvas' | 'herramientas'>('bot');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: '🤖 ¡Hola! Soy tu mentor virtual de IA. Estoy aquí para guiarte en este curso sobre LLMs y herramientas de Inteligencia Artificial. ¿Qué te gustaría aprender hoy?',
      timestamp: 'Ahora',
    },
  ]);
  const [userInput, setUserInput] = useState('');

  // Canvas builder state
  const [canvasRole, setCanvasRole] = useState('Experto en Ciberseguridad');
  const [canvasContext, setCanvasContext] = useState('Analizar un correo sospechoso recibido por la empresa.');
  const [canvasTask, setCanvasTask] = useState('Identificar indicadores de phishing, adjuntos peligrosos o ingeniería social.');
  const [canvasFormat, setCanvasFormat] = useState('Reporte en formato Markdown con tabla de hallazgos.');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Suggested questions for Chatbot depending on student context
  const suggestions = [
    { q: '¿Qué es un LLM (modelo de lenguaje)?', a: 'Un LLM (Large Language Model) es una red neuronal entrenada con terabytes de texto de internet para predecir la siguiente palabra de un texto. GPT-4, Claude y LLaMA son grandes ejemplos.' },
    { q: '¿Cuál es la diferencia entre ChatGPT y una API?', a: 'ChatGPT es una interfaz de usuario lista para usar. La API es una conexión directa para programadores, que permite integrar la inteligencia del modelo en sistemas externos como servidores, apps o automatizaciones.' },
    { q: '¿Cómo hago un buen Prompt (instrucción)?', a: 'Usa la estructura "Función + Contexto + Tarea + Restricciones + Formato". Por ejemplo: "Actúa como redactor forense (Función). Analiza este texto de chat (Contexto). Extrae direcciones IP (Tarea) sin incluir nombres (Restricciones) en formato Markdown (Formato)."' },
    { q: '¿Qué es Alucinación en Inteligencia Artificial?', a: 'La alucinación ocurre cuando el LLM genera información falsa de apariencia totalmente verídica con total convicción. Ocurre porque los modelos calculan probabilidades estadísticas de palabras, no comprueban hechos de forma científica.' },
    { q: '¿Cómo funcionan los agentes de IA?', a: 'Un agente de IA es un sistema autónomo que no solo chatea, sino que ejecuta acciones: puede buscar en Google, ejecutar código Python en un sandbox, hacer llamadas a bases de datos y resolver tareas complejas en bucle.' }
  ];

  // Logic to build the prompt from canvas
  useEffect(() => {
    const prompt = `[ROL O FUNCIÓN]:
Actúa como un ${canvasRole} altamente experimentado y profesional.

[CONTEXTO DE SITUACIÓN]:
${canvasContext}

[OBJETIVO O INSTRUCCIÓN DE LA TAREA]:
Tu tarea principal consiste en: ${canvasTask}

[RESTRICCIONES Y REGLAS]:
- Sé objetivo y analítico.
- Si no posees datos suficientes, indícalo claramente en lugar de inventar detalles ficticios.
- Mantén la confidencialidad técnica de los procesos.

[FORMATO DE SALIDA REQUERIDO]:
Por favor, entrega la respuesta final exactamente en: ${canvasFormat}`;

    setGeneratedPrompt(prompt);
  }, [canvasRole, canvasContext, canvasTask, canvasFormat]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      { sender: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ];
    setChatHistory(newHistory);
    setUserInput('');

    // Answer matching
    setTimeout(() => {
      let botAnswer = 'Interesante pregunta. Como tu tutor de IA, te recomiendo enfocar la teoría en cómo estructurar mejores instrucciones (prompts). ¿Deseas usar la pestaña de "Canvas" para construir un prompt profesional?';
      
      const found = suggestions.find(s => text.toLowerCase().includes(s.q.toLowerCase().slice(0, 15)));
      if (found) {
        botAnswer = found.a;
      } else {
        const query = text.toLowerCase();
        if (query.includes('prompt') || query.includes('instrucc')) {
          botAnswer = '🎯 Un prompt excelente requiere asignarle un rol (ej. "Actúa como perito judicial"), un contexto, una instrucción precisa y un formato delimitado. Prueba nuestra pestaña "Prompt Canvas" arriba para diseñar uno de forma guiada.';
        } else if (query.includes('token') || query.includes('costo')) {
          botAnswer = '🪙 Los tokens son las unidades básicas de procesamiento de los LLM (aproximadamente 1 token equivale a 4 caracteres en inglés o 3 en español). Las APIs te cobran por cantidad de tokens ingresados y generados.';
        } else if (query.includes('temperatura') || query.includes('creativ')) {
          botAnswer = '🌡️ La Temperatura (Temperature) es un parámetro numérico entre 0 y 2. Valores cercanos a 0 hacen que la IA sea sumamente determinista y exacta (ideal para matemáticas o código). Valores cercanos a 1 o más potencian la creatividad y la variedad (útil para redacción literaria).';
        } else if (query.includes('llm') || query.includes('gpt') || query.includes('llama') || query.includes('claude')) {
          botAnswer = '🧠 Los Large Language Models (LLMs) procesan texto mediante transformadores lineales. Comprenden no sólo palabras clave, sino el contexto y semántica de las frases gracias a miles de millones de parámetros entrenados.';
        } else if (query.includes('agente') || query.includes('agentic')) {
          botAnswer = '🤖 Los Agentes son la siguiente frontera: sistemas que combinan un LLM con herramientas, memoria a largo plazo y un bucle de razonamiento de planificación propia (planning). Pueden navegar por páginas web o gestionar APIs autónomamente.';
        }
      }

      setChatHistory(prev => [
        ...prev,
        { sender: 'bot', text: botAnswer, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Pre-configured lessons cues depend on module
  const getModuleHelp = () => {
    switch (currentModuleId) {
      case 'ai_intro':
        return {
          pista: 'La Inteligencia Artificial no es magia, es matemática avanzada y estadística aplicada que procesa datos de manera optimizada.',
          fallas: 'Error común: Pensar de antemano que la IA "siente" o tiene autoconciencia. Toda IA, incluidos los LLMs actuales, funciona procesando probabilidades de palabras y vectores abstractos.',
          ayuda: 'Para superar esta introducción, lee cuidadosamente los conceptos de adaptabilidad frente a la programación estática con condicionales fijos.'
        };
      case 'ai_concepts':
        return {
          pista: 'En la sección de tarjetas interactivas (Flashcards), intenta forzar tu memoria y enunciar la definición antes de voltear cada tarjeta.',
          fallas: 'Error común: Confundir Machine Learning con Deep Learning. Recuerda que Deep Learning es específicamente una de las tantas aproximaciones de Machine Learning (una subrama estructurada con múltiples capas neuronales).',
          ayuda: 'Puedes reiniciar el mazo si deseas repasar términos como GenAI o Redes Neuronales.'
        };
      case 'ai_paradigms':
        return {
          pista: 'Para el juego de parejas (Memory Puzzle): El Aprendizaje Supervisado REQUIERE datos con etiquetas previas. No confundas Aprendizaje No Supervisado (busca tendencias solo) con Aprendizaje por Refuerzo (aprende con recompensas).',
          fallas: 'Falla típica: Emparejar un concepto con una definición similar pero que corresponde a otra clase de entrenamiento. Analiza si la definición menciona recompensas (Refuerzo) o agrupar sin marcas (No supervisado).',
          ayuda: 'Si estás atascado, voltea las tarjetas del centro. Los términos y sus definiciones se ocultan con el mismo color al lograr emparejarlos.'
        };
      case 'ai_quiz':
        return {
          pista: 'En el desafío H5P: Lee con minucia la descripción técnica y la explicación correspondiente a cada caso analizado.',
          fallas: 'Pitfall común: El Sesgo de Datos no es un error de código, es un desbalance de la información histórica que los humanos proveen, alimentando la IA con prejuicios preexistentes.',
          ayuda: 'Si fallas alguna pregunta, lee nuestra Explicación Académica activa en el cuadro de feedback para responder correctamente en tu reintento.'
        };
      case 'ai_prompting_theory':
        return {
          pista: 'La ingeniería de prompts no se trata sólo de redactar, sino de estructurar. Usa la pestaña "Lienzo de Prompts" (Prompt Canvas) al lado para ver la fórmula perfecta.',
          fallas: 'Falla típica: Dar instrucciones ambiguas como "sé creativo" sin delimitar el alcance. Es mucho mejor establecer un rol claro (ej. "Actúa como auditor de ciberseguridad") e indicar restricciones de salida concretas.',
          ayuda: 'Repasa las tres técnicas clave: Zero-shot (directo), Few-shot (con ejemplos) y Chain-of-thought (razonamiento paso por paso).'
        };
      case 'ai_prompt_h5p':
        return {
          pista: 'Esta prueba mide tu asimilación de técnicas avanzadas de prompting. Recuerda que forzar al modelo a secuenciar su lógica mejora increíblemente su certeza lógica.',
          fallas: 'Error común: Confundir Few-shot con Fine-tuning. Fine-tuning cambia el peso matemático interno del modelo con entrenamiento de hardware, mientras que Few-shot solo añade ejemplos temporales dentro del chat (en la ventana de contexto).',
          ayuda: 'Identifica la técnica que obliga al modelo a desglosar su tren de razonamiento lógicamente.'
        };
      case 'ai_agents':
        return {
          pista: 'Los agentes son el futuro corporativo de la IA: son autónomos porque evalúan el resultado de sus propias llamadas a herramientas antes de concluir.',
          fallas: 'Pitfall conceptual: Pensar que un agente es sólo un chatbot veloz. Un agente tiene acceso a herramientas externas a través de APIs y decide cuándo e instalarlas sin intervención humana.',
          ayuda: 'Presta atención al bucle central ReAct (Razonar y Actuar) que gobierna los agentes de vanguardia.'
        };
      case 'ai_final_quiz':
        return {
          pista: 'El Examen Final de RedCiber reúne todas las fases: Básico, Intermedio y Avanzado. Tómate tu tiempo.',
          fallas: 'Clave del éxito: Recuerda la diferencia fundamental entre un chatbot reactivo y un Agente Autónomo (la toma de decisiones recursiva con invocación programática de APIs).',
          ayuda: 'Lee cada opción detalladamente antes de responder. Al aprobar, desbloquearás la insignia académica de la ruta.'
        };
      default:
        return {
          pista: 'Usa la barra de navegación superior o las pestañas asistentes para resolver cualquier duda conceptual durante tu proceso de estudio.',
          fallas: 'Recuerda que para dominar el temario es fundamental consolidar todo el contenido interactivo de las tres fases del curso.',
          ayuda: 'Completa la fase activa y presiona "Siguiente Módulo" para continuar con la escala de aprendizaje.'
        };
    }
  };

  const helpObj = getModuleHelp();

  return (
    <div id="ai-companion-assistant" className="w-full bg-slate-900/60 border-2 border-slate-700/60 rounded-2xl flex flex-col h-full shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Companion Title header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 p-4 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              Tutor Virtual de IA <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">REDCIBER ASISTENTE</span>
            </h4>
            <p className="text-[11px] text-slate-400">Pistas, chat y lienzo de prompts activos</p>
          </div>
        </div>
        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" title="Mentor conectado" />
      </div>

      {/* Tabs list navigation */}
      <div className="grid grid-cols-4 bg-slate-950/40 border-b border-slate-800 p-1 gap-1 text-[11px] font-semibold text-center select-none">
        <button
          onClick={() => setActiveTab('bot')}
          className={`py-2 px-1 rounded-lg transition-all ${activeTab === 'bot' ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        >
          💬 Chatbot
        </button>
        <button
          onClick={() => setActiveTab('pistas')}
          className={`py-2 px-1 rounded-lg transition-all ${activeTab === 'pistas' ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        >
          💡 Pistas
        </button>
        <button
          onClick={() => setActiveTab('canvas')}
          className={`py-2 px-1 rounded-lg transition-all ${activeTab === 'canvas' ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🎨 Canvas Prompt
        </button>
        <button
          onClick={() => setActiveTab('herramientas')}
          className={`py-2 px-1 rounded-lg transition-all ${activeTab === 'herramientas' ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🛠️ Toolkits
        </button>
      </div>

      {/* Content panes dynamic */}
      <div className="flex-grow p-4 overflow-y-auto max-h-[440px] min-h-[380px] bg-slate-900/30">
        <AnimatePresence mode="wait">
          {activeTab === 'bot' && (
            <motion.div
              key="bot"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex flex-col h-full gap-3"
            >
              <div className="flex-grow space-y-3 pr-1 max-h-[260px] overflow-y-auto">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div
                      className={`text-xs p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-amber-600/80 text-white rounded-tr-none' : 'bg-slate-800/80 border border-slate-700/60 text-slate-100 rounded-tl-none'}`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Sugerencias de FAQ interactivas */}
              <div className="border-t border-slate-800 pt-3">
                <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-wider">Preguntas Frecuentes FAQ:</span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
                  {suggestions.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.q)}
                      className="text-[10px] text-left bg-slate-950 hover:bg-slate-900 hover:text-amber-300 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors line-clamp-1 truncate block w-full"
                    >
                      ❓ {item.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Send area */}
              <div className="flex gap-2 mt-auto border-t border-slate-800 pt-3">
                <input
                  type="text"
                  placeholder="Ej. ¿Qué es un LLM?..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
                  className="flex-grow text-xs bg-slate-950 border border-slate-800 focus:border-amber-600/80 rounded-xl px-3 py-2 text-white outline-none placeholder-slate-500"
                />
                <button
                  onClick={() => handleSendMessage(userInput)}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white border border-amber-500/40 text-xs font-bold rounded-xl transition-all"
                >
                  Enviar
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'pistas' && (
            <motion.div
              key="pistas"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4 text-xs"
            >
              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                <header className="flex items-center gap-1.5 font-bold text-amber-400 mb-2">
                  <span>💡</span> Pista de Estudio Académico
                </header>
                <p className="text-slate-300 leading-relaxed italic">
                  "{helpObj.pista}"
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                <header className="flex items-center gap-1.5 font-bold text-rose-450 mb-2">
                  <span>⚠️</span> Evita este Error o Mitigación
                </header>
                <p className="text-slate-300 leading-relaxed">
                  {helpObj.fallas}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
                <header className="flex items-center gap-1.5 font-bold text-emerald-450 mb-2">
                  <span>🎯</span> Consigna Activa del Módulo
                </header>
                <p className="text-slate-300 leading-relaxed">
                  {helpObj.ayuda}
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'canvas' && (
            <motion.div
              key="canvas"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3 text-xs"
            >
              <div className="p-3 bg-indigo-950/30 border border-indigo-900/45 rounded-xl mb-1 text-[11px] text-slate-300 leading-relaxed">
                🚀 <strong>RedCiber Prompt Canvas:</strong> Rellena estas directrices formativas básicas para autoconstruir una instrucción perfecta y profesional para cualquier LLM (Claude, GPT-4, LLaMA).
              </div>

              {/* Form elements */}
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">1. Rol o Perfil Profesional</label>
                  <input
                    type="text"
                    value={canvasRole}
                    onChange={(e) => setCanvasRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-amber-500"
                    placeholder="Ej. Consultor de Ciberseguridad"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">2. Contexto de Entrada / Datos</label>
                  <textarea
                    rows={2}
                    value={canvasContext}
                    onChange={(e) => setCanvasContext(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-amber-500 resize-none"
                    placeholder="Ej. Redactar una explicación sobre phising para personal de sistemas."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">3. Instrucción de Tarea (Task)</label>
                  <input
                    type="text"
                    value={canvasTask}
                    onChange={(e) => setCanvasTask(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-amber-500"
                    placeholder="Ej. Generar los 3 pasos clave de respuesta ante incidentes"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">4. Formato de Respuesta Esperada</label>
                  <input
                    type="text"
                    value={canvasFormat}
                    onChange={(e) => setCanvasFormat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-amber-500"
                    placeholder="Ej. Tabla Markdown con columnas (Concepto, Detalle)"
                  />
                </div>
              </div>

              {/* Output area */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 relative">
                <header className="flex justify-between items-center mb-1 bg-slate-900 -mx-3.5 -mt-3.5 px-3 py-1.5 rounded-t-xl border-b border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-amber-400">PROMPT CONSTRUIDO:</span>
                  <button
                    onClick={copyToClipboard}
                    className="text-[10px] font-bold text-amber-300 hover:text-white transition-colors"
                  >
                    {isCopied ? '¡Copiado! ✓' : '📋 Copiar'}
                  </button>
                </header>
                <pre className="font-mono text-[10px] leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap text-slate-300">
                  {generatedPrompt}
                </pre>
              </div>
            </motion.div>
          )}

          {activeTab === 'herramientas' && (
            <motion.div
              key="herramientas"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3 text-xs"
            >
              <div className="text-[11px] text-slate-300 leading-relaxed mb-1">
                Aprende a diferenciar el objetivo de cada herramienta líder en Inteligencia Artificial y LLMs:
              </div>

              <div className="grid gap-2">
                <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-200">💬 ChatGPT (OpenAI)</span>
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded-full uppercase font-bold">LLM LÍDER</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Ideado para tareas lógicas, redacción creativa, refinamiento de código y debates conceptuales profundos con el modelo GPT-4o.</p>
                </div>

                <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-200">🖊️ Claude (Anthropic)</span>
                    <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-full uppercase font-bold">REDACCIÓN</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Sobresale en comprensión analítica forense, redacción literaria sofisticada de alta calidad, edición de ficheros masivos y código técnico.</p>
                </div>

                <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-200">🦙 Meta LLaMA (Open Source)</span>
                    <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full uppercase font-bold">OPEN SOURCE</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Modelos de código abierto de Meta que pueden desplegarse localmente o en servidores propios, ideales para entornos corporativos con requisitos de privacidad y control de datos.</p>
                </div>

                <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-200">🎨 Midjourney / DALL-E</span>
                    <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded-full uppercase font-bold">ARTE GEN</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Algoritmos de difusión capaces de transformar descripciones textuales minuciosas en ilustraciones y material de diseño fotorrealista hiperdetallado.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer statistics branding */}
      <div className="bg-slate-950 border-t border-slate-800 p-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>Fases: I, II y III continuas</span>
        <span>RedCiber Academy © 2026</span>
      </div>
    </div>
  );
};

export default AICourseCompanion;
