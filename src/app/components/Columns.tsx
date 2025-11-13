'use client';

import { useState } from 'react';
import { Task } from "../types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  color: 'slate' | 'red' | 'green' | 'blue' | 'amber';
  status: Task['status'];
  onTaskDrop: (taskId: number, newStatus: Task['status']) => void;
  isDark: boolean;
}

export function Column({ title, count, tasks, color, status, onTaskDrop, isDark }: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const colorStyles = {
    slate: {
      bg: 'bg-slate-50/50',
      border: 'border-slate-200',
      header: 'bg-slate-100',
      headerText: 'text-slate-700',
      badge: 'bg-slate-200 text-slate-700',
    },
    red: {
      bg: 'bg-red-50/30',
      border: 'border-red-200',
      header: 'bg-red-500',
      headerText: 'text-white',
      badge: 'bg-red-100 text-red-700',
    },
    green: {
      bg: 'bg-green-50/30',
      border: 'border-green-200',
      header: 'bg-green-500',
      headerText: 'text-white',
      badge: 'bg-green-100 text-green-700',
    },
    blue: {
      bg: 'bg-blue-50/30',
      border: 'border-blue-200',
      header: 'bg-blue-500',
      headerText: 'text-white',
      badge: 'bg-blue-100 text-blue-700',
    },
    amber: {
      bg: 'bg-amber-50/30',
      border: 'border-amber-200',
      header: 'bg-amber-500',
      headerText: 'text-white',
      badge: 'bg-amber-100 text-amber-700',
    },
  };

  const style = colorStyles[color];

  // Handlers de drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const fromStatus = e.dataTransfer.getData('fromStatus') as Task['status'];
    
    // Não permitir mover de "concluida" para outros status
    if (fromStatus === 'concluida' && status !== 'concluida') {
      return;
    }
    
    if (taskId && status !== fromStatus) {
      onTaskDrop(taskId, status);
    }
  };

  return (
    <div 
      className={`${isDark ? 'bg-slate-800/50 border-slate-700' : `${style.bg} ${style.border}`} rounded-xl border backdrop-blur-sm shadow-sm min-h-[600px] transition-all duration-500 hover:shadow-md ${
        isDragOver ? 'scale-105 ring-4 ring-blue-300 ring-opacity-50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header da coluna */}
      <div className="p-4 pb-3">
        <div className={`${style.header} rounded-lg px-4 py-3 flex items-center justify-between shadow-sm`}>
          <h2 className={`text-xs font-bold uppercase tracking-wider ${style.headerText}`}>
            {title}
          </h2>
          <span className={`${style.badge} px-2.5 py-1 rounded-full text-xs font-bold`}>
            {count}
          </span>
        </div>
      </div>

      {/* Cards das tarefas */}
      <div className="px-4 pb-4 space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div 
              key={task.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TaskCard task={task} isDark={isDark} />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg className={`w-12 h-12 mx-auto mb-3 transition-colors duration-500 ${
              isDark ? 'text-slate-600' : 'text-slate-300'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className={`text-sm font-medium transition-colors duration-500 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>Nenhuma tarefa aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}