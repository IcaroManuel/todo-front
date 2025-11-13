# 🎨 Documentação Técnica dos Componentes

Esta documentação detalha a implementação técnica de todos os componentes do frontend, incluindo props, estados, eventos e lógica de negócio.

---

## 📋 Índice de Componentes

1. [page.tsx - Orchestrator](#1-pagetsx---orchestrator)
2. [Header.tsx](#2-headertsx)
3. [ThemeToggle.tsx](#3-themetoggletsx)
4. [DropdownMenu.tsx](#4-dropdownmenutsx)
5. [StatsBar.tsx](#5-statsbartsx)
6. [Columns.tsx](#6-columnstsx)
7. [TaskCard.tsx](#7-taskcardtsx)
8. [AddTaskModal.tsx](#8-addtaskmodaltsx)
9. [AddUserModal.tsx](#9-addusermodaltsx)
10. [UserList.tsx](#10-userlisttsx)

---

## 1. page.tsx - Orchestrator

### Responsabilidades
- Gerenciamento de estado global da aplicação
- Fetch e sincronização de dados com API
- Lógica de negócio (drag-and-drop, validações)
- Orquestração de componentes filhos

### Estado

```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
const [isUserModalOpen, setIsUserModalOpen] = useState(false);
const [isDark, setIsDark] = useState(false);
```

### Funções Principais

#### fetchData()
```typescript
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    // 1. Buscar todas as tarefas
    const tasksRes = await fetch(`${API_URL}/api/tasks`);
    if (!tasksRes.ok) throw new Error('Falha ao buscar tarefas');
    const tasksData: Task[] = await tasksRes.json();

    // 2. Para cada tarefa, buscar dados do usuário responsável
    const tasksWithUsers = await Promise.all(
      tasksData.map(async (task) => {
        try {
          const userRes = await fetch(`${API_URL}/api/users/${task.userId}`);
          if (userRes.ok) {
            const userData: User = await userRes.json();
            return { ...task, user: userData };
          }
          return task;
        } catch (error) {
          console.error(`Erro ao buscar usuário ${task.userId}:`, error);
          return task;
        }
      })
    );

    setTasks(tasksWithUsers);

    // 3. Buscar todos os usuários
    const usersRes = await fetch(`${API_URL}/api/users`);
    if (usersRes.ok) {
      const usersData = await usersRes.json();
      setUsers(usersData);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erro desconhecido');
  } finally {
    setLoading(false);
  }
};
```

**Características:**
- Busca tarefas com eager loading de usuários
- Tratamento de erros individual para cada usuário
- Loading state para feedback visual
- Error handling centralizado

#### handleAddTask()
```typescript
const handleAddTask = async (taskData: Omit<Task, 'id'>) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error('Erro ao criar tarefa');

    await fetchData(); // Recarrega dados
    setIsTaskModalOpen(false);
  } catch (err) {
    console.error('Erro ao adicionar tarefa:', err);
    alert('Erro ao criar tarefa. Tente novamente.');
  }
};
```

#### handleTaskDrop()
```typescript
const handleTaskDrop = async (
  taskId: number,
  fromStatus: string,
  toStatus: string
) => {
  // 1. Validação: tarefa concluída não pode voltar
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  if (task.status === 'concluida') {
    alert('⚠️ Tarefas concluídas não podem ser movidas!');
    return;
  }

  // 2. Preparar atualização com timestamps
  const updatedTask = { ...task, status: toStatus as Task['status'] };

  // Define initial_date ao mover para "em_progresso"
  if (toStatus === 'em_progresso' && !task.initial_date) {
    updatedTask.initial_date = new Date().toISOString();
  }

  // Define finished_date ao mover para "concluida"
  if (toStatus === 'concluida') {
    updatedTask.finished_date = new Date().toISOString();
  }

  // 3. Atualizar na API
  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) throw new Error('Erro ao atualizar tarefa');

    // 4. Atualizar estado local (otimistic update)
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
    );
  } catch (err) {
    console.error('Erro ao mover tarefa:', err);
    alert('Erro ao mover tarefa. Tente novamente.');
  }
};
```

**Validações:**
- ✅ Impede mover tarefas concluídas
- ✅ Define `initial_date` automaticamente
- ✅ Define `finished_date` automaticamente
- ✅ Optimistic update para UX responsiva

### Layout

```tsx
<div className="min-h-screen transition-colors duration-500 {background}">
  <Header {...headerProps} />
  
  <main className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      {/* Main Content */}
      <div>
        <StatsBar tasks={tasks} isDark={isDark} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Column status="nao_iniciada" {...props} />
          <Column status="em_progresso" {...props} />
          <Column status="concluida" {...props} />
        </div>
      </div>

      {/* Sidebar */}
      <UserList users={users} isDark={isDark} />
    </div>
  </main>

  {isTaskModalOpen && <AddTaskModal {...props} />}
  {isUserModalOpen && <AddUserModal {...props} />}
</div>
```

---

## 2. Header.tsx

### Props

```typescript
interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenTaskModal: () => void;
  onOpenUserModal: () => void;
}
```

### Implementação

```tsx
export default function Header({
  isDark,
  onToggleTheme,
  onOpenTaskModal,
  onOpenUserModal,
}: HeaderProps) {
  return (
    <header className={`${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-b transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">✅</div>
            <h1 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Task Manager
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <DropdownMenu
              isDark={isDark}
              onOpenTaskModal={onOpenTaskModal}
              onOpenUserModal={onOpenUserModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Características:**
- Border bottom com transição suave
- Logo com emoji de checklist
- Flexbox para alinhamento
- Responsivo com container

---

## 3. ThemeToggle.tsx

### Props

```typescript
interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}
```

### Implementação Completa

```tsx
export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-16 h-8 rounded-full transition-all duration-500 ${
        isDark ? 'bg-purple-600' : 'bg-yellow-400'
      }`}
      aria-label="Toggle theme"
    >
      {/* Círculo deslizante */}
      <div
        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${
          isDark ? 'left-9' : 'left-1'
        }`}
      >
        {/* Ícone (sol ou lua) */}
        {isDark ? (
          <span className="text-xs animate-[spin_1s_ease-in-out]">🌙</span>
        ) : (
          <span className="text-xs animate-[spin_1s_ease-in-out]">☀️</span>
        )}
      </div>
    </button>
  );
}
```

**Animações:**
- Transição de posição: 500ms
- Transição de cor de fundo: 500ms
- Rotação do ícone: 1s (spin)

**Estados:**
- **Light Mode:** 
  - Background: `bg-yellow-400`
  - Círculo: `left-1`
  - Ícone: ☀️
- **Dark Mode:**
  - Background: `bg-purple-600`
  - Círculo: `left-9`
  - Ícone: 🌙

---

## 4. DropdownMenu.tsx

### Props

```typescript
interface DropdownMenuProps {
  isDark: boolean;
  onOpenTaskModal: () => void;
  onOpenUserModal: () => void;
}
```

### Implementação

```tsx
export default function DropdownMenu({
  isDark,
  onOpenTaskModal,
  onOpenUserModal,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Botão de três pontos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all hover:scale-110 ${
          isDark
            ? 'hover:bg-gray-700 text-gray-300'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
          <circle cx="8" cy="2" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="14" r="1.5" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 animate-scale-in ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}
        >
          <button
            onClick={() => {
              onOpenTaskModal();
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left transition-colors ${
              isDark
                ? 'hover:bg-gray-700 text-gray-200'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            ➕ Nova Tarefa
          </button>
          
          <button
            onClick={() => {
              onOpenUserModal();
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left transition-colors ${
              isDark
                ? 'hover:bg-gray-700 text-gray-200'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            👤 Novo Usuário
          </button>
        </div>
      )}
    </div>
  );
}
```

**Características:**
- **Click outside to close:** useRef + useEffect
- **Animação de entrada:** `animate-scale-in`
- **Posicionamento:** `absolute right-0`
- **Z-index:** 50 para ficar sobre outros elementos

---

## 5. StatsBar.tsx

### Props

```typescript
interface StatsBarProps {
  tasks: Task[];
  isDark: boolean;
}
```

### Cálculo de Métricas

```tsx
export default function StatsBar({ tasks, isDark }: StatsBarProps) {
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'em_progresso').length;
  const completed = tasks.filter((t) => t.status === 'concluida').length;

  const stats = [
    {
      label: 'Total de Tarefas',
      value: totalTasks,
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Em Progresso',
      value: inProgress,
      icon: '⏳',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Concluídas',
      value: completed,
      icon: '✅',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl p-6 shadow-lg transition-all hover:scale-105 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {stat.label}
              </p>
              <p className={`text-3xl font-bold mt-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Design:**
- Grid responsivo: 1 coluna mobile, 3 desktop
- Hover effect: `scale-105`
- Gradiente no número
- Ícone decorativo grande

---

## 6. Columns.tsx

### Props

```typescript
interface ColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  color: string;
  status: 'nao_iniciada' | 'em_progresso' | 'concluida';
  onTaskDrop: (taskId: number, fromStatus: string, toStatus: string) => void;
  isDark: boolean;
}
```

### Drag and Drop Handlers

```tsx
export function Column({
  title,
  count,
  tasks,
  color,
  status,
  onTaskDrop,
  isDark,
}: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const fromStatus = e.dataTransfer.getData('fromStatus');

    if (fromStatus !== status) {
      onTaskDrop(taskId, fromStatus, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-xl transition-all ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg ${
        isDragOver ? 'scale-105 ring-4 ring-blue-400' : ''
      }`}
    >
      {/* Header com gradiente */}
      <div className={`bg-gradient-to-r ${color} p-4 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-semibold">
            {count}
          </span>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="p-4 space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}
```

**Estados Visuais:**
- **Normal:** Sombra padrão
- **Drag Over:** `scale-105` + `ring-4 ring-blue-400`
- **Drop:** Reset para normal

**Validação:**
```typescript
if (fromStatus !== status) {
  onTaskDrop(taskId, fromStatus, status);
}
```

---

## 7. TaskCard.tsx

### Props

```typescript
interface TaskCardProps {
  task: Task;
  isDark: boolean;
}
```

### Implementação Completa

```tsx
export default function TaskCard({ task, isDark }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.setData('fromStatus', task.status);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const statusColors = {
    nao_iniciada: 'bg-gray-100 text-gray-700',
    em_progresso: 'bg-yellow-100 text-yellow-700',
    concluida: 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    nao_iniciada: 'A Fazer',
    em_progresso: 'Em Progresso',
    concluida: 'Concluído',
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`rounded-lg p-4 cursor-move transition-all ${
        isDark ? 'bg-gray-700' : 'bg-gray-50'
      } hover:shadow-xl hover:-translate-y-1 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Título */}
      <h3 className={`font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {task.title}
      </h3>

      {/* Descrição expansível */}
      {task.description && (
        <div>
          <p
            className={`text-sm mb-2 transition-all custom-scrollbar ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } ${
              isExpanded ? 'max-h-[200px] overflow-y-auto' : 'line-clamp-2'
            }`}
          >
            {task.description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-500 hover:underline"
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>
      )}

      {/* Usuário responsável */}
      {task.user && (
        <p className={`text-xs mt-2 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          👤 {task.user.name}
        </p>
      )}

      {/* Badge de status */}
      <div className="mt-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>
    </div>
  );
}
```

**Características:**
- **Draggable:** Transfere `taskId` e `fromStatus`
- **Expansível:** Toggle entre 2 linhas e altura completa
- **Hover Effect:** Elevação + translate-y
- **Opacity durante drag:** 50%

---

## 8. AddTaskModal.tsx

### Props

```typescript
interface AddTaskModalProps {
  users: User[];
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'>) => void;
  isDark: boolean;
}
```

### Validação de Formulário

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim()) {
    alert('O título é obrigatório!');
    return;
  }

  if (!userId) {
    alert('Selecione um usuário responsável!');
    return;
  }

  onSubmit({
    title: title.trim(),
    description: description.trim() || undefined,
    status,
    userId: parseInt(userId),
  });

  // Reset
  setTitle('');
  setDescription('');
  setStatus('nao_iniciada');
  setUserId('');
};
```

### Fechar com ESC

```tsx
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  
  document.addEventListener('keydown', handleEsc);
  return () => document.removeEventListener('keydown', handleEsc);
}, [onClose]);
```

---

## 9. AddUserModal.tsx

Similar ao AddTaskModal, mas com campos específicos para usuário.

### Campos

```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [birthday, setBirthday] = useState('');
const [working, setWorking] = useState('');
```

### Validação

```tsx
if (!name.trim() || !email.trim()) {
  alert('Nome e email são obrigatórios!');
  return;
}
```

---

## 10. UserList.tsx

### Gerador de Cores de Avatar

```tsx
const getAvatarColor = (index: number) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500',
  ];
  return colors[index % colors.length];
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
```

### Layout

```tsx
<aside className={`xl:sticky xl:top-6 xl:self-start rounded-xl p-6 shadow-lg max-h-[600px] overflow-y-auto ${
  isDark ? 'bg-gray-800' : 'bg-white'
}`}>
  <h2 className="text-xl font-bold mb-4">Usuários</h2>
  
  <div className="space-y-4">
    {users.map((user, index) => (
      <div key={user.id} className="card">
        <div className="flex items-center gap-3">
          {/* Avatar com iniciais */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(index)}`}>
            {getInitials(user.name)}
          </div>
          
          {/* Informações */}
          <div className="flex-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.working && <p className="text-xs">💼 {user.working}</p>}
          </div>
          
          {/* Status */}
          <div className="flex items-center gap-1 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Ativo
          </div>
        </div>
      </div>
    ))}
  </div>
</aside>
```

---

## 🎨 Padrões de Design Utilizados

### 1. Compound Components
- Header contém ThemeToggle e DropdownMenu
- Column contém múltiplos TaskCards

### 2. Controlled Components
- Todos os modais são controlled
- Estado gerenciado no parent (page.tsx)

### 3. Composition over Inheritance
- Componentes compostos de componentes menores
- Props drilling minimizado

### 4. Custom Hooks (potencial melhoria)
```typescript
// Pode ser extraído
const useFetch = (url: string) => {
  // ...
};

const useClickOutside = (ref, handler) => {
  // ...
};
```

---

**✨ Documentação técnica completa dos componentes**
