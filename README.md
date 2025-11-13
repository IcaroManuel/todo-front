# 📱 Todo Frontend - Sistema de Gerenciamento de Tarefas

Interface moderna e interativa estilo **Jira/Trello** para gerenciamento de tarefas, construída com Next.js 15, React 19 e Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)

---

## 📖 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura de Componentes](#-arquitetura-de-componentes)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Detalhados](#-componentes-detalhados)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [API Integration](#-api-integration)
- [Temas e Estilos](#-temas-e-estilos)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 🎯 Visão Geral

Sistema de gerenciamento de tarefas com interface moderna e intuitiva, inspirado em ferramentas como Jira e Trello. A aplicação oferece uma experiência completa de Kanban Board com drag-and-drop, tema claro/escuro e gestão de usuários.

### Características Principais

- 📊 **Kanban Board** - Três colunas: A Fazer, Em Progresso, Concluído
- 🎨 **Tema Claro/Escuro** - Toggle animado com persistência visual
- 🖱️ **Drag and Drop** - Arraste tarefas entre colunas
- 👥 **Gestão de Usuários** - Sidebar com lista completa de usuários
- 📱 **Totalmente Responsivo** - Design adaptável para mobile, tablet e desktop
- ⚡ **Animações Suaves** - Transições e animações profissionais (800ms)
- 🎭 **UI Moderna** - Gradientes, sombras e efeitos visuais
- 📈 **Dashboard de Estatísticas** - Métricas em tempo real

---

## ✨ Funcionalidades

### 🗂️ Gerenciamento de Tarefas

- ✅ **Criar Tarefas** - Modal com formulário completo
- ✅ **Editar Status** - Drag-and-drop ou atualização direta
- ✅ **Visualizar Detalhes** - Cards expansíveis com descrição completa
- ✅ **Atribuir Usuários** - Associar tarefas a usuários cadastrados
- ✅ **Timestamps Automáticos** - Data de início e conclusão
- ✅ **Validação de Regras** - Tarefas concluídas não podem voltar

### 👤 Gerenciamento de Usuários

- ✅ **Cadastro de Usuários** - Modal com validação
- ✅ **Lista Lateral** - Sidebar sticky com todos os usuários
- ✅ **Avatares Coloridos** - Iniciais com 6 cores diferentes
- ✅ **Informações Completas** - Nome, email, cargo e aniversário
- ✅ **Status Ativo** - Indicador visual de usuários ativos

### 🎨 Interface e UX

- ✅ **Tema Toggle** - Alternância suave entre claro/escuro
- ✅ **Animações CSS** - Fade-in, slide-up, scale-in (800ms)
- ✅ **Scroll Customizado** - Scrollbar estilizada
- ✅ **Estados Visuais** - Loading, hover, drag, error
- ✅ **Grid Responsivo** - Layout adaptável com CSS Grid
- ✅ **Gradientes Modernos** - Headers com cores vibrantes

---

## 🛠️ Stack Tecnológica

### Core Framework

- **Next.js 16.0.1** - App Router (React Server Components)
- **React 19.2.0** - Biblioteca UI com Hooks
- **TypeScript 5.x** - Tipagem estática

### Styling

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **@tailwindcss/postcss 4.0** - PostCSS plugin
- **CSS Modules** - Estilos customizados em `globals.css`

### Ferramentas de Desenvolvimento

- **ESLint 9.x** - Linting e code quality
- **eslint-config-next** - Configuração Next.js
- **TypeScript Compiler** - Type checking

### API Communication

- **Fetch API** - Requisições HTTP nativas
- **Async/Await** - Gerenciamento de promises
- **RESTful Integration** - Comunicação com backend C# .NET

---

## 🏗️ Arquitetura de Componentes

```
src/app/
├── page.tsx                    # Página principal (orchestrator)
├── types.ts                    # Interfaces TypeScript
├── globals.css                 # Estilos globais + animações
├── layout.tsx                  # Root layout
└── components/
    ├── Header.tsx              # Cabeçalho com logo e ações
    ├── ThemeToggle.tsx         # Toggle de tema claro/escuro
    ├── DropdownMenu.tsx        # Menu de ações (3 pontos)
    ├── StatsBar.tsx            # Dashboard de estatísticas
    ├── Columns.tsx             # Coluna Kanban (drag-drop zone)
    ├── TaskCard.tsx            # Card individual de tarefa
    ├── AddTaskModal.tsx        # Modal de criação de tarefa
    ├── AddUserModal.tsx        # Modal de criação de usuário
    └── UserList.tsx            # Lista lateral de usuários
```

### Hierarquia de Componentes

```
Home (page.tsx)
├── Header
│   ├── ThemeToggle
│   └── DropdownMenu
├── Grid Container
│   ├── Main Content
│   │   ├── StatsBar
│   │   └── Board (3 Columns)
│   │       └── Column
│   │           └── TaskCard (draggable)
│   └── Sidebar
│       └── UserList
├── AddTaskModal
└── AddUserModal
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** 18.17 ou superior
- **npm**, **yarn**, **pnpm** ou **bun**
- **Backend API** rodando em `http://localhost:5201`

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd todo-frontend
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configurar API URL

Edite o arquivo `src/app/page.tsx` e ajuste a URL da API:

```typescript
const API_URL = 'http://localhost:5201'; // Ajuste para sua URL
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: **<http://localhost:3000>**

### 5. Build para Produção

```bash
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
todo-frontend/
├── public/                     # Arquivos estáticos
├── src/
│   └── app/
│       ├── components/         # Componentes React
│       │   ├── AddTaskModal.tsx
│       │   ├── AddUserModal.tsx
│       │   ├── Columns.tsx
│       │   ├── DropdownMenu.tsx
│       │   ├── Header.tsx
│       │   ├── StatsBar.tsx
│       │   ├── TaskCard.tsx
│       │   ├── ThemeToggle.tsx
│       │   └── UserList.tsx
│       ├── page.tsx            # Página principal
│       ├── layout.tsx          # Layout root
│       ├── types.ts            # TypeScript interfaces
│       ├── globals.css         # Estilos globais
│       └── favicon.ico         # Ícone
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 🎮 Componentes Detalhados

### 1. **page.tsx** - Orchestrator Principal

**Responsabilidade:** Gerenciar estado global, fetch de dados e lógica de negócio

**Estado Gerenciado:**

```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
const [isUserModalOpen, setIsUserModalOpen] = useState(false);
const [isDark, setIsDark] = useState(false);
```

**Funções Principais:**

- `fetchData()` - Busca tarefas e usuários da API
- `handleAddTask()` - Cria nova tarefa
- `handleAddUser()` - Cria novo usuário
- `handleUpdateTask()` - Atualiza tarefa
- `handleTaskDrop()` - Gerencia drag-and-drop

**Regras de Negócio:**

- Tarefas "concluídas" não podem ser movidas para outras colunas
- Ao mover para "em_progresso", define `initial_date`
- Ao mover para "concluida", define `finished_date`
- Carrega dados do usuário junto com as tarefas

---

### 2. **Header.tsx** - Cabeçalho

```typescript
interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenTaskModal: () => void;
  onOpenUserModal: () => void;
}
```

**Características:**

- Logo com ícone de checklist
- Título "Task Manager"
- ThemeToggle integrado
- DropdownMenu para ações

---

### 3. **ThemeToggle.tsx** - Toggle de Tema

**Animações:**

- Transição suave de 500ms
- Círculo deslizante
- Ícones animados (sol/lua) com rotate e scale

**Estados:**

- **Light:** Fundo amarelo, ícone sol à esquerda
- **Dark:** Fundo roxo, ícone lua à direita

---

### 4. **StatsBar.tsx** - Dashboard de Estatísticas

**Métricas Exibidas:**

- 📊 Total de Tarefas
- ⏳ Em Progresso
- ✅ Concluídas

**Design:**

- Cards com gradientes suaves
- Ícones animados
- Números em destaque
- Suporte a tema claro/escuro

---

### 5. **Column.tsx** - Coluna Kanban

```typescript
interface ColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  color: string;
  status: "nao_iniciada" | "em_progresso" | "concluida";
  onTaskDrop: (taskId: number, fromStatus: string, toStatus: string) => void;
  isDark: boolean;
}
```

**Funcionalidades:**

- **Drag-and-Drop Zone:** `onDragOver`, `onDragLeave`, `onDrop`
- **Feedback Visual:** Scale-up e ring quando hovering
- **Header Colorido:** Gradiente personalizado por coluna
- **Contador de Tarefas:** Badge com total

**Validações:**

- Aceita drops apenas se status diferente
- Feedback visual durante drag

---

### 6. **TaskCard.tsx** - Card de Tarefa

```typescript
interface TaskCardProps {
  task: Task;
  isDark: boolean;
}
```

**Características:**

- **Draggable:** `draggable={true}`
- **Descrição Expansível:** 2 linhas → 7 linhas ao clicar
- **Badge de Status:** Colorido por status
- **Informações:**
  - Título em negrito
  - Descrição com scroll customizado
  - Nome do usuário responsável
  - Badge de status

**Estados:**

- Normal: Hover com elevação
- Dragging: Opacidade 50%
- Expanded: Descrição completa visível

---

### 7. **AddTaskModal.tsx** - Modal de Criação de Tarefa

**Campos:**

- **Título** (obrigatório)
- **Descrição** (opcional, textarea)
- **Status** (dropdown: nao_iniciada, em_progresso, concluida)
- **Usuário** (dropdown com lista de usuários)

**Validações:**

- Título obrigatório
- Usuário obrigatório
- Status padrão: "nao_iniciada"

**Características:**

- Header com gradiente azul
- Fechar com ESC ou botão
- Click fora fecha o modal
- Animação de entrada

---

### 8. **AddUserModal.tsx** - Modal de Criação de Usuário

**Campos:**

- **Nome** (obrigatório)
- **Email** (obrigatório)
- **Data de Nascimento** (opcional, date picker)
- **Cargo/Função** (opcional)

**Características:**

- Header com gradiente verde
- Validação de campos obrigatórios
- Layout similar ao AddTaskModal

---

### 9. **UserList.tsx** - Lista de Usuários

**Características:**

- **Avatar com Iniciais:** 6 cores rotativas
- **Informações:**
  - Nome completo
  - Email
  - Cargo (se disponível)
  - Data de nascimento (se disponível)
- **Indicador de Status:** Bolinha verde "Ativo"
- **Sticky no Desktop:** Fica fixo ao rolar (xl:sticky)
- **Max Height:** 600px com scroll

**Design:**

- Cards com bordas arredondadas
- Sombras suaves
- Hover effect
- Totalmente responsivo

---

### 10. **DropdownMenu.tsx** - Menu de Ações

**Opções:**

1. **Nova Tarefa** - Abre AddTaskModal
2. **Novo Usuário** - Abre AddUserModal

**Características:**

- Ícone de três pontos vertical
- Click-outside-to-close
- Animação de abertura
- Suporte a tema

---

## 🎨 Funcionalidades Implementadas

### Drag and Drop

**Implementação:**

```typescript
// Início do drag
const handleDragStart = (e: React.DragEvent) => {
  e.dataTransfer.setData('taskId', task.id.toString());
  e.dataTransfer.setData('fromStatus', task.status);
};

// Soltar na coluna
const handleDrop = (e: React.DragEvent) => {
  const taskId = parseInt(e.dataTransfer.getData('taskId'));
  const fromStatus = e.dataTransfer.getData('fromStatus');
  onTaskDrop(taskId, fromStatus, status);
};
```

**Validações:**

- Tarefas "concluídas" não podem ser movidas
- Feedback visual durante drag
- Atualização automática de datas

---

### Tema Claro/Escuro

**Implementação:**

```typescript
const [isDark, setIsDark] = useState(false);

<div className={`min-h-screen transition-colors duration-500 ${
  isDark 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
}`}>
```

**Cores por Tema:**

| Elemento | Light | Dark |
|----------|-------|------|
| Background | Gradiente azul/roxo/rosa | Gradiente cinza escuro |
| Cards | Branco | Gray-800 |
| Texto | Gray-800 | White |
| Bordas | Gray-200 | Gray-700 |

---

## 🔌 API Integration

### Endpoints Utilizados

#### Tasks

```typescript
// GET - Listar tarefas
GET http://localhost:5201/api/tasks

// POST - Criar tarefa
POST http://localhost:5201/api/tasks
Body: { title, description, status, userId }

// PUT - Atualizar tarefa
PUT http://localhost:5201/api/tasks/{id}
Body: { id, title, description, status, userId }
```

#### Users

```typescript
// GET - Listar usuários
GET http://localhost:5201/api/users

// GET - Buscar usuário por ID
GET http://localhost:5201/api/users/{id}

// POST - Criar usuário
POST http://localhost:5201/api/users
Body: { name, email, birthday_date?, working? }
```

### Fetch Implementation

```typescript
const fetchData = async () => {
  try {
    const tasksRes = await fetch(`${API_URL}/api/tasks`);
    const tasksData = await tasksRes.json();
    
    // Carregar usuário de cada tarefa
    const tasksWithUsers = await Promise.all(
      tasksData.map(async (task) => {
        const userRes = await fetch(`${API_URL}/api/users/${task.userId}`);
        const userData = await userRes.json();
        return { ...task, user: userData };
      })
    );
    
    setTasks(tasksWithUsers);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};
```

---

## 🎭 Temas e Estilos

### Animações Customizadas (globals.css)

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 800ms ease-out;
}

.animate-slide-up {
  animation: slide-up 800ms ease-out;
}

.animate-scale-in {
  animation: scale-in 800ms ease-out;
}
```

### Scrollbar Customizada

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
```

---

## 📜 Scripts Disponíveis

```json
{
  "dev": "next dev",          // Inicia servidor de desenvolvimento
  "build": "next build",      // Build para produção
  "start": "next start",      // Inicia servidor de produção
  "lint": "eslint"            // Executa linting
}
```

### Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start

# Linting
npm run lint
```

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"

**Causa:** API não está rodando ou URL incorreta

**Solução:**

1. Verifique se a API está rodando em `http://localhost:5201`
2. Confirme a URL no arquivo `page.tsx`
3. Verifique CORS na API

### Erro: CORS Policy

**Causa:** Backend não permite requisições do frontend

**Solução:** Adicione CORS no backend (`Program.cs`):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

### Tasks não aparecem

**Causa:** Banco de dados vazio ou usuários não cadastrados

**Solução:**

1. Cadastre usuários primeiro
2. Depois crie tarefas associadas aos usuários
3. Recarregue a página

---

## 🔮 Próximas Melhorias

- [ ] Autenticação JWT
- [ ] Filtros por usuário/status
- [ ] Busca de tarefas
- [ ] Edição inline de tarefas
- [ ] Comentários em tarefas
- [ ] Notificações
- [ ] Paginação
- [ ] Dark mode persistence (localStorage)
- [ ] Testes unitários (Jest + Testing Library)
- [ ] Testes E2E (Playwright)

---

## 📚 Recursos e Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

---

## 👨‍💻 Desenvolvedor

**Projeto:** Challenge Tech - Todo Frontend  
**Framework:** Next.js 16 + React 19  
**Styling:** Tailwind CSS v4  
**Ano:** 2025

---

**✨ Feito com Next.js, React e Tailwind CSS**
