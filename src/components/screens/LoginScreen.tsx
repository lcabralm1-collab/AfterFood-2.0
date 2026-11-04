import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface LoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onLoginSuccess: (email: string, isGoogleOrNew?: boolean) => void;
  onOpenAddress?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  onOpenAddress,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email || 'usuario@email.com', false);
      if (onOpenAddress) {
        onOpenAddress();
      } else {
        onNavigate('address_selector');
      }
    }, 700);
  };

  const handleGoogleAuth = () => {
    setErrorMessage(null);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('usuario.google@gmail.com', true);
      if (onOpenAddress) {
        onOpenAddress();
      } else {
        onNavigate('address_selector');
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-2 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md mx-auto pt-2">
        {/* Soft Ambient Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Main Card Container */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-lg overflow-hidden">
          {/* Logo & Screen Title Group */}
          <div className="flex flex-col items-start gap-1 mb-4">
            <img
              src="/logo-horizontal.png"
              alt="AfterFood Logo"
              className="h-7 w-auto object-contain mb-1"
              onError={(e) => {
                if (!e.currentTarget.src.includes('/assets/')) {
                  e.currentTarget.src = '/assets/logo-horizontal.png';
                }
              }}
            />
            <h1 className="text-lg sm:text-xl text-gray-900 tracking-tight font-extrabold leading-tight">
              Inicia sesión en AfterFood
            </h1>
            <p className="text-xs text-gray-500">
              Accede a tus restaurantes favoritos de día y de noche.
            </p>
          </div>

          {/* Social Auth: Google Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full h-11 px-4 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 transition-all rounded-full flex items-center justify-center gap-2.5 group shadow-xs active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.98 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-xs text-gray-800 font-bold group-hover:text-gray-900 transition-colors">
              Continuar con Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full h-px bg-gray-200" />
            <span className="absolute bg-white px-3 text-[11px] text-gray-500 font-medium">
              o continúa con tu correo
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email-input"
                className="text-xs text-gray-800 flex items-center gap-1 font-bold leading-tight"
              >
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                  mail
                </span>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="tu@correo.com"
                  className="w-full h-11 pl-10 pr-3 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password-input"
                  className="text-xs text-gray-800 font-bold leading-tight"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert('Enlace de recuperación enviado al correo')}
                  className="text-[11px] text-purple-700 hover:text-purple-900 hover:underline transition-all font-bold"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400 pointer-events-none">
                  lock
                </span>
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar u ocultar contraseña"
                  className="w-8 h-8 absolute right-1.5 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Mensaje de Error Claro */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[16px] text-red-600 shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* High Contrast Primary CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-orange-700/20 cursor-pointer"
            >
              <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con correo'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="text-xs text-[#c2410c] hover:text-[#9a3412] hover:underline font-bold ml-1 cursor-pointer"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
