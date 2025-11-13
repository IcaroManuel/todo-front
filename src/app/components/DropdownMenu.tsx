'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownMenuProps {
  onAddTask: () => void;
  onAddUser: () => void;
  isDark: boolean;
}

export default function DropdownMenu({ onAddTask, onAddUser, isDark }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <div className="relative" ref={menuRef}>
      {/* Botão de três pontos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 border rounded-lg transition-all shadow-sm hover:shadow ${
          isDark 
            ? 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600' 
            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl border py-2 z-50 animate-fade-in transition-colors duration-500 ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => {
              onAddTask();
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3 font-medium ${
              isDark 
                ? 'text-slate-300 hover:bg-blue-900/30 hover:text-blue-400' 
                : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${
              isDark ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <svg className={`w-4 h-4 transition-colors duration-500 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Nova Tarefa</p>
              <p className={`text-xs transition-colors duration-500 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>Criar uma nova tarefa</p>
            </div>
          </button>

          <div className={`my-1 border-t transition-colors duration-500 ${
            isDark ? 'border-slate-700' : 'border-slate-100'
          }`}></div>

          <button
            onClick={() => {
              onAddUser();
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3 font-medium ${
              isDark 
                ? 'text-slate-300 hover:bg-green-900/30 hover:text-green-400' 
                : 'text-slate-700 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${
              isDark ? 'bg-green-900/50' : 'bg-green-100'
            }`}>
              <svg className={`w-4 h-4 transition-colors duration-500 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Novo Usuário</p>
              <p className={`text-xs transition-colors duration-500 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>Adicionar um usuário</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
