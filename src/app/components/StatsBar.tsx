'use client';

interface StatsBarProps {
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  isDark: boolean;
}

export default function StatsBar({ totalTasks, inProgressTasks, completedTasks, isDark }: StatsBarProps) {
  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-3 gap-4">
        {/* Total de Tarefas */}
        <div className={`rounded-lg p-4 border shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 animate-slide-up ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Total de Tarefas</p>
              <p className={`text-2xl font-bold transition-all duration-800 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>{totalTasks}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12 ${
              isDark ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-500 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Em Progresso */}
        <div className={`rounded-lg p-4 border shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 animate-slide-up ${
          isDark ? 'bg-slate-800 border-amber-900' : 'bg-white border-amber-200'
        }`} style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`}>Em Progresso</p>
              <p className={`text-2xl font-bold transition-all duration-800 ${
                isDark ? 'text-amber-300' : 'text-amber-700'
              }`}>{inProgressTasks}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12 ${
              isDark ? 'bg-amber-900/30' : 'bg-amber-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-500 ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Concluídas */}
        <div className={`rounded-lg p-4 border shadow-sm hover:shadow-md transition-all duration-500 hover:scale-105 animate-slide-up ${
          isDark ? 'bg-slate-800 border-green-900' : 'bg-white border-green-200'
        }`} style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>Concluídas</p>
              <p className={`text-2xl font-bold transition-all duration-800 ${
                isDark ? 'text-green-300' : 'text-green-700'
              }`}>{completedTasks}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-12 ${
              isDark ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <svg className={`w-6 h-6 transition-colors duration-500 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
