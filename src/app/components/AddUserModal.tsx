'use client';

import { useState, useEffect } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: { name: string; email: string; birthday_date?: string; working?: string }) => void;
  isDark: boolean;
}

export default function AddUserModal({ isOpen, onClose, onSubmit, isDark }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [working, setWorking] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; birthdayDate?: string }>({});

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

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; birthdayDate?: string } = {};

    // Validar nome
    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    } else if (name.trim().length < 3) {
      newErrors.name = 'O nome deve ter no mínimo 3 caracteres';
    } else if (name.trim().length > 100) {
      newErrors.name = 'O nome deve ter no máximo 100 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Email inválido';
    }

    // Validar data de aniversário (se fornecida)
    if (birthdayDate) {
      const selectedDate = new Date(birthdayDate);
      const today = new Date();
      const minDate = new Date('1900-01-01');

      if (selectedDate > today) {
        newErrors.birthdayDate = 'A data não pode ser no futuro';
      } else if (selectedDate < minDate) {
        newErrors.birthdayDate = 'Data inválida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      birthday_date: birthdayDate || undefined,
      working: working.trim() || undefined,
    });

    // Reset form
    setName('');
    setEmail('');
    setBirthdayDate('');
    setWorking('');
    setErrors({});
    onClose();
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
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Novo Usuário</h2>
                <p className="text-green-100 text-sm">Adicione um novo usuário ao sistema</p>
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
          {/* Nome */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Ex: João Silva"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-green-500 focus:border-transparent'
                } ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              required
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="joao.silva@exemplo.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-green-500 focus:border-transparent'
                } ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Data de Nascimento
            </label>
            <input
              type="date"
              value={birthdayDate}
              onChange={(e) => {
                setBirthdayDate(e.target.value);
                if (errors.birthdayDate) setErrors({ ...errors, birthdayDate: undefined });
              }}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.birthdayDate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-green-500 focus:border-transparent'
                } ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
            {errors.birthdayDate && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1 animate-fade-in">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.birthdayDate}
              </p>
            )}
          </div>

          {/* Cargo/Função */}
          <div>
            <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Cargo/Função
            </label>
            <input
              type="text"
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              placeholder="Ex: Desenvolvedor Full Stack"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
