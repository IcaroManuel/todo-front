'use client';

import DropdownMenu from './DropdownMenu';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onAddTask: () => void;
  onAddUser: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ onAddTask, onAddUser, isDark, onToggleTheme }: HeaderProps) {
  return (
    <div className={`border-b shadow-sm transition-colors duration-500 ${
      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo/Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Task Board</h1>
              <p className={`text-sm font-medium transition-colors duration-500 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Gerencie seus projetos com eficiência</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            {/* Menu de três pontos */}
            <DropdownMenu
              onAddTask={onAddTask}
              onAddUser={onAddUser}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
