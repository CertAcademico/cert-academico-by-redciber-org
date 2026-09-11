# Arquitectura — CERT Académico by RedCiber.org

## Stack tecnológico

```
React 19   TypeScript 5.8   Vite 6   Tailwind CSS (CDN)   Framer Motion 12
Sin backend — todo corre en el navegador · localStorage como base de datos
```

---

## Árbol de archivos

```
cert-académico-by-redciber.org/
│
├── index.html                ← Punto de entrada HTML (importmap CDN esm.sh)
├── index.tsx                 ← Monta React en <div id="root">
│
├── App.tsx                   ← ORQUESTADOR PRINCIPAL (rutas, auth, progreso)
├── api.ts                    ← "Base de datos" de contenido (mock estático)
├── types.ts                  ← Todos los tipos TypeScript del proyecto
├── authService.ts            ← Login / Registro / Sesión (localStorage)
├── progressService.ts        ← XP, scores, progreso por curso (localStorage)
├── constants.ts              ← (vacío, reservado)
│
├── components/
│   ├── LoginView.tsx         ← Pantalla de acceso (Login / Registro)
│   ├── ProgressBar.tsx       ← Barra de progreso animada por ruta
│   ├── VideoPlayer.tsx       ← Reproductor YouTube embebido
│   ├── QuizView.tsx          ← Pregunta única opción múltiple
│   ├── H5PCheckView.tsx      ← Cuestionario multi-pregunta con puntaje
│   ├── FlashcardsView.tsx    ← Tarjetas 3D con flip (frente / reverso)
│   ├── MemoryPuzzleView.tsx  ← Juego de memoria (términos ↔ definiciones)
│   ├── InteractiveCard.tsx   ← Tarjetas expandibles (término → definición)
│   ├── AICourseCompanion.tsx ← Panel asistente IA (chat, pistas, canvas)
│   └── icons.tsx             ← Biblioteca de iconos SVG + iconMap{}
│
├── vite.config.ts            ← Config Vite (puerto 3000, alias @)
├── tsconfig.json             ← Configuración TypeScript
├── package.json              ← Dependencias npm
├── ARCHITECTURE.md           ← Este archivo
└── .env.local                ← Variables de entorno (actualmente vacío)
```

---

## Flujo de pantallas

```
┌─────────────────────────────────────────────────────────────┐
│                     index.html → index.tsx                  │
│                          ↓ monta                            │
│                    <App> (FramerMotionWrapper)               │
└─────────────────────────────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              │  getSession()           │
              │  (lee localStorage)     │
              └────────────┬────────────┘
                           │
              ┌────────────▼────────────┐
              │  ¿Hay sesión activa?    │
              └────────────┬────────────┘
              NO ↓                    SÍ ↓
   ┌──────────────────┐    ┌──────────────────────────────┐
   │   <LoginView>    │    │  ¿Cargando datos? → Spinner  │
   │  (tab Login /    │    │                              │
   │   Registro)      │    │  ¿pathId seleccionado?       │
   └────────┬─────────┘    └──────────────┬───────────────┘
            │ onLogin()              NO ↓          SÍ ↓
            └──────────────►  <LearningPath    <LearningPath
                              Selector>         View>
                              (Dashboard)       (Curso)
```

---

## Arquitectura de capas

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA DE PRESENTACIÓN  (components/)                        │
│                                                             │
│  LoginView  ──  LearningPathSelector  ──  LearningPathView  │
│                        │                        │           │
│                   [CourseCards           [Sidebar módulos]  │
│                  + ProgressBars]         [Contenido módulo] │
│                                          [ProgressBar]      │
│                                                             │
│              Bloques de contenido (renderContentBlock):     │
│  VideoPlayer · QuizView · H5PCheckView · FlashcardsView     │
│  MemoryPuzzleView · InteractiveCard · TextBlock             │
│                                                             │
│              Solo en IA: AICourseCompanion                  │
│              (chat · pistas · canvas de prompts · toolkits) │
└────────────────────────┬────────────────────────────────────┘
                         │ usa
┌────────────────────────▼────────────────────────────────────┐
│  CAPA DE SERVICIOS  (raíz/)                                 │
│                                                             │
│  authService.ts          progressService.ts                 │
│  ─────────────           ────────────────                   │
│  registerUser()          markModuleComplete()               │
│  loginUser()             saveModuleScore()                  │
│  getSession()            resetCourseProgress()              │
│  logoutUser()            getUserProgress()                  │
│                          getUserStats() → XP                │
└────────────────────────┬────────────────────────────────────┘
                         │ persiste en
┌────────────────────────▼────────────────────────────────────┐
│  CAPA DE DATOS  (localStorage del navegador)                │
│                                                             │
│  rc_users    → [ {id, name, email, passwordHash, ...} ]     │
│  rc_session  → { id, name, email }                          │
│  rc_progress → { userId: { pathId: CourseProgress } }       │
│                                                             │
│  api.ts (mock) → objeto JS estático con los 6 cursos        │
│  (simula latencia con setTimeout 1 s)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Jerarquía de componentes

```
<App>
 ├── <LoginView>                          (si no hay sesión)
 │    ├── tabs: Login | Registro
 │    └── llama: loginUser() / registerUser()
 │
 ├── <LearningPathSelector>              (si hay sesión y ningún curso activo)
 │    ├── Header: nombre, XP total, logout
 │    └── Grid de CourseCard × 6 cursos
 │         ├── Barra de progreso individual (%)
 │         ├── XP del curso
 │         └── Botón: 🚀 Comenzar | ▶ Continuar | 🔄 Repasar
 │
 └── <LearningPathView>                  (si hay sesión y curso seleccionado)
      ├── Header: título + botón "← Volver al Panel"
      ├── <ProgressBar> (módulos completados / total)
      ├── Sidebar: lista de módulos con iconos y estados
      │    ├── 🔒 Bloqueado (quiz anterior sin completar)
      │    ├── ● Actual
      │    ├── ✓ Completado
      │    └── ○ Disponible
      ├── Panel principal (renderContentBlock):
      │    ├── TextBlock           → párrafo + icono SVG
      │    ├── <VideoPlayer>       → iframe YouTube
      │    ├── <QuizView>          → opción múltiple (1 pregunta)
      │    ├── <H5PCheckView>      → evaluación multi-pregunta + score → progressService
      │    ├── <FlashcardsView>    → mazo de tarjetas 3D con flip
      │    ├── <MemoryPuzzleView>  → tablero de parejas (términos ↔ defs)
      │    └── <InteractiveCard>   → acordeón término/definición
      ├── Botón: "Siguiente Módulo" | "Reiniciar Ruta"
      └── <AICourseCompanion>  (solo en ruta artificial_intelligence)
           ├── Tab 💬 Chatbot con FAQ
           ├── Tab 💡 Pistas del módulo activo
           ├── Tab 🎨 Canvas Builder de prompts
           └── Tab 🛠️ Toolkits (comparativa de LLMs)
```

---

## Flujo de datos — progreso de un usuario

```
Usuario responde H5P
        │
        ▼
H5PCheckView.onComplete(score, maxScore)
        │
        ▼
App.tsx → handleH5PComplete(score, maxScore)
        │
        ├──► saveModuleScore(userId, pathId, moduleId, score, maxScore)
        │         └── escribe en localStorage["rc_progress"]
        │
        └──► markModuleComplete(userId, pathId, moduleIndex, total)
                  ├── actualiza completedModules[]
                  └── si completedModules.length === total
                            └── completedAt = ahora  (+50 XP bonus)
```

---

## Los 6 cursos (definidos en `api.ts`)

| Key | Título | Módulos | Tipos de contenido |
|---|---|:---:|---|
| `cybersecurity` | Fundamentos de Ciberseguridad | 6 | texto, video, quiz, interactivo |
| `cybercrime` | Investigación del Cibercrimen | 5 | texto, video, quiz, interactivo |
| `cybercriminology` | Principios de Cibercriminología | 5 | texto, video, quiz, interactivo |
| `quantum_computing` | Computación Cuántica y Criptografía | 6 | texto, video, quiz, interactivo |
| `forensic_auditing` | Auditoría Forense Digital | 6 | texto, video, quiz, interactivo |
| `artificial_intelligence` | IA y LLMs (Fases I, II y III) | 9 | texto, video, flashcards, memory, H5P × 3 + companion |

---

## Tipos de bloques de contenido (`ContentBlockType`)

| Tipo | Componente | Descripción | ¿Bloquea avance? |
|---|---|---|:---:|
| `text` | TextBlock (inline) | Párrafo con icono SVG | No |
| `video` | `<VideoPlayer>` | Iframe YouTube responsive | No |
| `quiz` | `<QuizView>` | 1 pregunta opción múltiple con retry | Sí |
| `interactive` | `<InteractiveCard>` | Acordeón término → definición | No |
| `flashcards` | `<FlashcardsView>` | Mazo de tarjetas 3D flip | Sí |
| `memory` | `<MemoryPuzzleView>` | Tablero de memoria (pares) | Sí |
| `h5p_check` | `<H5PCheckView>` | Evaluación multi-pregunta + score | Sí |

> Los tipos marcados como **"bloquea avance"** deben completarse antes de pasar al siguiente módulo que los requiera.

---

## Sistema de puntuación (XP)

| Acción | XP |
|---|:---:|
| Módulo no interactivo completado | +10 |
| Quiz / Flashcards / Memory completado | +10 |
| Pregunta H5P respondida correctamente | +10 |
| Curso 100% completado (bonus único) | +50 |

---

## Esquema de localStorage

```json
// rc_users
[
  {
    "id": "uuid-v4",
    "name": "Juan Pérez",
    "email": "juan@correo.com",
    "passwordHash": "sha256-hex (salted)",
    "createdAt": "2026-06-03T18:00:00.000Z"
  }
]

// rc_session
{
  "id": "uuid-v4",
  "name": "Juan Pérez",
  "email": "juan@correo.com"
}

// rc_progress
{
  "uuid-v4": {
    "cybersecurity": {
      "pathId": "cybersecurity",
      "completedModules": [0, 1, 2, 3],
      "scores": {
        "cs_quiz": {
          "moduleId": "cs_quiz",
          "score": 10,
          "maxScore": 10,
          "completedAt": "2026-06-03T18:05:00.000Z"
        }
      },
      "startedAt": "2026-06-03T18:00:00.000Z",
      "lastAccessedAt": "2026-06-03T18:10:00.000Z",
      "completedAt": null
    }
  }
}
```

---

## Dependencias entre archivos

```
index.html
   └── index.tsx
          └── App.tsx
               ├── api.ts              (datos de cursos)
               ├── types.ts            (contratos de datos)
               ├── authService.ts      (auth)
               ├── progressService.ts  (XP / tracking)
               └── components/
                    ├── LoginView.tsx         → authService
                    ├── ProgressBar.tsx       → (props)
                    ├── VideoPlayer.tsx       → (props)
                    ├── QuizView.tsx          → types
                    ├── H5PCheckView.tsx      → types
                    ├── FlashcardsView.tsx    → types
                    ├── MemoryPuzzleView.tsx  → types
                    ├── InteractiveCard.tsx   → types
                    ├── AICourseCompanion.tsx → (props)
                    └── icons.tsx             → (iconMap usado en App.tsx)
```

---

## Decisiones de diseño

| Decisión | Motivo |
|---|---|
| Sin backend | Prototipo / demo desplegable sin servidor |
| localStorage como DB | Persistencia offline sin infraestructura |
| SHA-256 con `crypto.subtle` | API nativa del navegador, sin dependencias extra |
| importmap (esm.sh) en index.html | Permite correr sin `npm install` en entornos CDN |
| Framer Motion | Animaciones de transición entre módulos y componentes interactivos |
| Tailwind CSS vía CDN | Estilos utilitarios sin proceso de build adicional |
| `FramerMotionWrapper` en App | Garantiza hidratación del motor de animaciones antes del primer render |

---

*Generado el 2026-06-03 · CERT Académico by RedCiber.org*
