
'use client';

import { useState } from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  isDark: boolean;
}

export default function TaskCard({ task, isDark }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Função para pegar as iniciais do nome do usuário
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Cores aleatórias para os avatares (baseado no ID)
  const avatarColors = [
    { bg: 'bg-blue-500', ring: 'ring-blue-200' },
    { bg: 'bg-purple-500', ring: 'ring-purple-200' },
    { bg: 'bg-pink-500', ring: 'ring-pink-200' },
    { bg: 'bg-orange-500', ring: 'ring-orange-200' },
    { bg: 'bg-teal-500', ring: 'ring-teal-200' },
    { bg: 'bg-indigo-500', ring: 'ring-indigo-200' },
  ];
  const avatarColor = avatarColors[task.userId % avatarColors.length];

  // Função para formatar data
  const formatDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  // Handlers de drag
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.setData('fromStatus', task.status);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className={`p-4 rounded-xl shadow-sm border transition-all duration-200 cursor-move group backdrop-blur-sm ${
        isDark 
          ? 'bg-slate-700/50 border-slate-600/60 hover:border-slate-500 hover:shadow-slate-900/50' 
          : 'bg-white border-slate-200/60 hover:border-slate-300'
      } hover:shadow-lg ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Header com ID e ações */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold tracking-wide transition-colors duration-500 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          TIS-{task.id}
        </span>
        <button className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
          isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-100'
        }`}>
          <svg className={`w-4 h-4 transition-colors duration-500 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Título da tarefa */}
      <h3 className={`font-semibold text-sm mb-2 transition-colors leading-snug ${
        isDark 
          ? 'text-white group-hover:text-blue-400' 
          : 'text-slate-800 group-hover:text-blue-600'
      }`}>
        {task.title}
      </h3>

      {/* Descrição da tarefa */}
      {task.description && (
        <div className="mb-3">
          <p 
            className={`text-xs leading-relaxed transition-all duration-800 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            } ${
              isExpanded 
                ? 'max-h-[7.5rem] overflow-y-auto pr-2 custom-scrollbar' 
                : 'line-clamp-2'
            }`}
          >
            {task.description}
          </p>
        </div>
      )}

      {/* Tags/Labels */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 text-xs rounded-md font-semibold shadow-sm">
          TASK
        </span>
        {task.status === 'em_progresso' && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs rounded-md font-semibold shadow-sm flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Em Andamento
          </span>
        )}
      </div>

      {/* Footer: Datas e Avatar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        {/* Info adicional */}
        <div className="flex items-center gap-3 text-slate-400">
          {/* Data */}
          {task.initial_date && (
            <div className="flex items-center gap-1.5" title="Data de início">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">{formatDate(task.initial_date)}</span>
            </div>
          )}
          {/* Botão Ver Mais */}
          {task.description && task.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-all duration-300"
              title={isExpanded ? 'Ver menos' : 'Ver mais'}
            >
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-800 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-xs font-medium">{isExpanded ? 'Menos' : 'Mais'}</span>
            </button>
          )}
        </div>

        {/* Avatar do usuário */}
        <div className="flex items-center gap-2">
          {task.user ? (
            <div 
              className={`w-8 h-8 rounded-full ${avatarColor.bg} ring-2 ${avatarColor.ring} flex items-center justify-center text-white text-xs font-bold shadow-sm hover:scale-110 transition-all duration-800`}
              title={task.user.name}
            >
              {getInitials(task.user.name)}
            </div>
          ) : (
            <div 
              className="w-8 h-8 rounded-full bg-slate-200 ring-2 ring-slate-100 flex items-center justify-center text-slate-500 text-xs shadow-sm hover:scale-110 transition-all duration-800"
              title="Não atribuído"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}