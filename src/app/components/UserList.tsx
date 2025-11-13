'use client';

import { User } from '../types';

interface UserListProps {
  users: User[];
  isDark: boolean;
}

export default function UserList({ users, isDark }: UserListProps) {
  // Cores aleatórias para os avatares
  const avatarColors = [
    { bg: 'bg-blue-500', ring: 'ring-blue-200' },
    { bg: 'bg-purple-500', ring: 'ring-purple-200' },
    { bg: 'bg-pink-500', ring: 'ring-pink-200' },
    { bg: 'bg-orange-500', ring: 'ring-orange-200' },
    { bg: 'bg-teal-500', ring: 'ring-teal-200' },
    { bg: 'bg-indigo-500', ring: 'ring-indigo-200' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className={`rounded-xl border backdrop-blur-sm shadow-sm transition-all duration-500 px-6 py-6 ${
      isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b transition-colors duration-500 ${
        isDark ? 'border-slate-700' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className={`text-lg font-bold transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>Usuários</h2>
              <p className={`text-xs transition-colors duration-500 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>{users.length} cadastrados</p>
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-500 ${
            isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>
            {users.length}
          </span>
        </div>
      </div>

      {/* Lista de usuários */}
      <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
        {users.length > 0 ? (
          <div className="p-3 space-y-2">
            {users.map((user, index) => {
              const avatarColor = avatarColors[user.id % avatarColors.length];
              return (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer animate-slide-up ${
                    isDark 
                      ? 'bg-slate-700/50 hover:bg-slate-700 border border-slate-600' 
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`${avatarColor.bg} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ${avatarColor.ring} shadow-md flex-shrink-0`}>
                      {getInitials(user.name)}
                    </div>

                    {/* Info do usuário */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm truncate transition-colors duration-500 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {user.name}
                      </h3>
                      <p className={`text-xs truncate transition-colors duration-500 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {user.email}
                      </p>
                      {user.working && (
                        <p className={`text-xs mt-1 truncate transition-colors duration-500 ${
                          isDark ? 'text-slate-500' : 'text-slate-600'
                        }`}>
                          <span className="inline-flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {user.working}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Badge de status */}
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                        isDark ? 'bg-green-400' : 'bg-green-500'
                      }`} title="Ativo"></div>
                    </div>
                  </div>

                  {/* Informações adicionais */}
                  {user.birthday_date && (
                    <div className={`mt-2 pt-2 border-t flex items-center gap-2 text-xs transition-colors duration-500 ${
                      isDark ? 'border-slate-600 text-slate-400' : 'border-slate-200 text-slate-500'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Nascimento: {formatDate(user.birthday_date)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <svg className={`w-16 h-16 mx-auto mb-3 transition-colors duration-500 ${
              isDark ? 'text-slate-600' : 'text-slate-300'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className={`text-sm font-medium transition-colors duration-500 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>Nenhum usuário cadastrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
