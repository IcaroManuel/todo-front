'use client';

import { useState, useEffect } from 'react';
import { User } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onSubmit: (task: { title: string; description: string; status: string; userId: number }) => void;
  isDark: boolean;
}

export default function AddTaskModal({ isOpen, onClose, users, onSubmit, isDark }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'nao_iniciada' | 'em_progresso' | 'concluida'>('nao_iniciada');
  const [userId, setUserId] = useState<number>(0);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && userId > 0) {
      onSubmit({ title, description, status, userId });
      // Reset form
      setTitle('');
      setDescription('');
      setStatus('nao_iniciada');
      setUserId(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-backdrop">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-colors duration-500 ${
          isDark ? 'bg-black/70' : 'bg-black/50'
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className={`relative rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in transition-colors duration-500 ${
        isDark ? 'bg-slate-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Nova Tarefa</h2>
                <p className="text-blue-100 text-sm">Adicione uma nova tarefa ao board</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Título */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Título da Tarefa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Implementar autenticação"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:scale-[1.01] ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a tarefa em detalhes..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Status */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'nao_iniciada' | 'em_progresso' | 'concluida')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              required
            >
              <option value="nao_iniciada">Não Iniciada</option>
              <option value="em_progresso">Em Progresso</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          {/* Usuário */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Atribuir a <span className="text-red-500">*</span>
            </label>
            <select
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              required
            >
              <option value={0}>Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 border font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
