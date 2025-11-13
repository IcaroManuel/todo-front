// app/page.tsx
'use client'; // Necessário, pois usamos hooks (useState, useEffect)

import { useState, useEffect } from 'react';
import { Task, User } from './types'; // Nossos tipos
import { Column } from './components/Columns';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import AddTaskModal from './components/AddTaskModal';
import AddUserModal from './components/AddUserModal';
import UserList from './components/UserList';

// ⚠️ ATENÇÃO: Verifique esta URL! 
// Tem de ser a URL HTTPS que aparece no terminal da sua API C#.
const API_URL = 'http://localhost:5201';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const tasksRes = await fetch(`${API_URL}/api/tasks`);
      if (!tasksRes.ok) throw new Error('Falha ao buscar tarefas');
      const tasksData: Task[] = await tasksRes.json();

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

      const usersRes = await fetch(`${API_URL}/api/users`);
      if (!usersRes.ok) throw new Error('Falha ao buscar utilizadores');
      const usersData: User[] = await usersRes.json();
      setUsers(usersData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  const updateTasks = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  // Funções para filtrar tarefas por status
  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  // Função para adicionar tarefa
  const handleAddTask = async (taskData: { title: string; description: string; status: string; userId: number }) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        await fetchData(); // Recarrega as tarefas
      } else {
        setError('Erro ao criar tarefa');
      }
    } catch {
      setError('Erro ao criar tarefa');
    }
  };

  // Função para adicionar usuário
  const handleAddUser = async (userData: { name: string; email: string; birthday_date?: string; working?: string }) => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        await fetchData(); // Recarrega os usuários
      } else {
        setError('Erro ao criar usuário');
      }
    } catch {
      setError('Erro ao criar usuário');
    }
  };

  // Função para atualizar tarefa
  const handleUpdateTask = async (taskId: number, updates: { status?: string; initial_date?: string; finished_date?: string }) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === taskId);
      if (!taskToUpdate) return;

      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskToUpdate,
          ...updates,
        }),
      });

      if (response.ok) {
        await fetchData(); // Recarrega as tarefas
      } else {
        setError('Erro ao atualizar tarefa');
      }
    } catch {
      setError('Erro ao atualizar tarefa');
    }
  };

  // Função para lidar com o drop de uma tarefa
  const handleTaskDrop = async (taskId: number, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Não permitir mover de "concluida" para outros status
    if (task.status === 'concluida' && newStatus !== 'concluida') {
      setError('Não é possível mover uma tarefa concluída de volta');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const updates: { status: string; initial_date?: string; finished_date?: string } = {
      status: newStatus,
    };

    // Se movendo para "em_progresso", definir data inicial
    if (newStatus === 'em_progresso' && !task.initial_date) {
      updates.initial_date = new Date().toISOString();
    }

    // Se movendo para "concluida", definir data de conclusão
    if (newStatus === 'concluida') {
      updates.finished_date = new Date().toISOString();
      // Garantir que tem data inicial
      if (!task.initial_date) {
        updates.initial_date = new Date().toISOString();
      }
    }

    await handleUpdateTask(taskId, updates);
  };

  // Renderização
  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Header */}
      <Header 
        onAddTask={() => setIsTaskModalOpen(true)}
        onAddUser={() => setIsUserModalOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {loading && (
        <div className="max-w-7xl mx-auto px-6 text-center py-16">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="text-slate-600 font-medium">Carregando tarefas...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Container principal */}
      <div className="max-w-[1920px] mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* Coluna principal: Stats + Board */}
          <div className="space-y-6 min-w-0 pt-8">
            {/* Stats Bar */}
            <StatsBar 
              totalTasks={tasks.length}
              inProgressTasks={getTasksByStatus('em_progresso').length}
              completedTasks={getTasksByStatus('concluida').length}
              isDark={isDark}
            />

            {/* Board de 3 colunas */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-w-min">
                {/* Coluna 1: Não Iniciada */}
                <div className="min-w-[300px]">
                  <Column
                    title="PENDENTES"
                    count={getTasksByStatus('nao_iniciada').length}
                    tasks={getTasksByStatus('nao_iniciada')}
                    color="slate"
                    status="nao_iniciada"
                    onTaskDrop={handleTaskDrop}
                    isDark={isDark}
                  />
                </div>

                {/* Coluna 2: Em Progresso */}
                <div className="min-w-[300px]">
                  <Column
                    title="EM PROGRESSO"
                    count={getTasksByStatus('em_progresso').length}
                    tasks={getTasksByStatus('em_progresso')}
                    color="amber"
                    status="em_progresso"
                    onTaskDrop={handleTaskDrop}
                    isDark={isDark}
                  />
                </div>

                {/* Coluna 3: Concluída */}
                <div className="min-w-[300px]">
                  <Column
                    title="CONCLUÍDAS"
                    count={getTasksByStatus('concluida').length}
                    tasks={getTasksByStatus('concluida')}
                    color="green"
                    status="concluida"
                    onTaskDrop={handleTaskDrop}
                    isDark={isDark}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna lateral: Lista de usuários */}
          <div className="xl:sticky xl:top-6 xl:self-start pt-8">
            <UserList users={users} isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Modais */}
      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        users={users}
        onSubmit={handleAddTask}
        isDark={isDark}
      />

      <AddUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleAddUser}
        isDark={isDark}
      />
    </main>
  );
}

// Componente helper para renderizar uma coluna
