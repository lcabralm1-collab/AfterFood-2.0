import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface CourierLoginScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onGoogleLogin: () => void;
  onManualRegister?: () => void;
}

export const CourierLoginScreen: React.FC<CourierLoginScreenProps> = ({
  onNavigate,
  onGoogleLogin,
  onManualRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recoverySent, setRecoverySent] = useState<boolean>(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('courier_dashboard');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-20 pt-2 justify-between animate-in fade-in duration-200 bg-[#f8f9fa]  text-[#1a1d20] ">
      {/* Top Header info */}
      <div className="flex flex-col items-center text-center w-full max-w-md mx-auto">
        {/* Back to role button */}
        <div className="w-full flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onNavigate('role_selector')}
            className="flex items-center gap-1 text-xs text-[#64748b]  hover:text-[#1a1d20]  px-3 py-1.5 rounded-full bg-white  border border-slate-200  shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Cambiar de rol</span>
          </button>
          <span className="px-2.5 py-1 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-[#6C5CE7]  text-[10px] font-bold uppercase tracking-wider">
            Trujillo • 24/7
          </span>
        </div>

        {/* Ambient Glow */}
        <div className="relative w-full">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-r from-[#6C5CE7]/20 via-[#FF7A00]/15 to-[#6C5CE7]/20 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Main Card Container (Strict #1E1F2B in Dark Mode) */}
          <div className="relative bg-white  border border-slate-200  rounded-2xl p-5 shadow-xl text-left overflow-hidden w-full">
            {/* Logo & Screen Title Group - Clean transparent logo without dark boxes */}
            <div className="flex flex-col items-start gap-1 mb-3">
              <div className="flex items-center justify-between w-full mb-1">
                <img
                  src="/logo-horizontal.png"
                  alt="AfterFood Logo"
                  className="h-7 w-auto object-contain"
                />
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-[#6C5CE7]  font-extrabold text-[10px]">
                  <span className="material-symbols-outlined text-[13px]">sports_motorsports</span>
                  <span>Modo Repartidor</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl text-[#1a1d20]  tracking-tight font-extrabold leading-tight">
                Acceso para Repartidores
              </h1>
              <p className="text-xs text-[#64748b]  leading-relaxed">
                Genera ingresos flexibles entregando pedidos de día y noche en Trujillo.
              </p>
            </div>

            {/* Social Auth: Botón Continuar con Google */}
            <button
              type="button"
              onClick={onGoogleLogin}
              className="w-full h-12 px-4 bg-slate-50 hover:bg-slate-100   border border-slate-200  transition-all rounded-full flex items-center justify-center gap-2.5 group shadow-xs active:scale-[0.99] mt-2 cursor-pointer"
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
              <span className="text-xs text-[#1a1d20]  group-hover:text-[#6C5CE7] transition-colors font-bold">
                Continuar con Google
              </span>
            </button>

            {/* Botón: Registrarse manualmente */}
            <button
              type="button"
              onClick={() => {
                if (onManualRegister) onManualRegister();
                else onNavigate('courier_register');
              }}
              className="w-full h-12 mt-2.5 rounded-full bg-[#6C5CE7] hover:bg-[#5b4cdb] active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Registrarse manualmente</span>
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200 " />
              <span className="absolute bg-white  px-2.5 text-[10px] text-[#64748b]  font-semibold">
                o accede con tus credenciales
              </span>
            </div>

            {/* Toggle / Opción: Ya tengo cuenta / Iniciar sesión */}
            {!showManualLogin ? (
              <button
                type="button"
                onClick={() => setShowManualLogin(true)}
                className="w-full h-11 rounded-full bg-slate-50  hover:bg-slate-100  border border-slate-200  text-[#1a1d20]  font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">
                  login
                </span>
                <span>Ya tengo cuenta / Iniciar sesión</span>
              </button>
            ) : (
              <form onSubmit={handleManualLogin} className="flex flex-col gap-3 animate-in fade-in duration-150">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="courier-email-input"
                    className="text-xs text-[#1a1d20]  font-bold flex items-center gap-1"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#64748b]  pointer-events-none">
                      mail
                    </span>
                    <input
                      id="courier-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="tu@correo.com"
                      className="w-full h-10 pl-10 pr-3 bg-white  text-[#1a1d20]  placeholder:text-slate-400  text-xs rounded-xl outline-none focus:ring-1 focus:ring-[#6C5CE7] border border-slate-200  transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="courier-pass-input"
                      className="text-xs text-[#1a1d20]  font-bold"
                    >
                      Contraseña
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setRecoverySent(true);
                        setTimeout(() => setRecoverySent(false), 3000);
                      }}
                      className="text-[10px] text-[#FF7A00] hover:underline font-semibold cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  {recoverySent && (
                    <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700  text-[11px] font-bold flex items-center gap-1.5 animate-in fade-in">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>Enlace de recuperación enviado a tu correo</span>
                    </div>
                  )}
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#64748b]  pointer-events-none">
                      lock
                    </span>
                    <input
                      id="courier-pass-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage(null);
                      }}
                      placeholder="••••••••••••"
                      className="w-full h-10 pl-10 pr-10 bg-white  text-[#1a1d20]  placeholder:text-slate-400  text-xs rounded-xl outline-none focus:ring-1 focus:ring-[#6C5CE7] border border-slate-200  transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Mostrar u ocultar contraseña"
                      className="w-8 h-8 absolute right-1 rounded-lg flex items-center justify-center text-[#64748b]  hover:text-[#1a1d20]  transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-600  text-xs font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-full bg-[#FF7A00] hover:bg-[#e66e00] text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md mt-1 cursor-pointer"
                >
                  <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowManualLogin(false)}
                  className="text-xs text-[#64748b]  hover:text-[#1a1d20]  text-center mt-1 cursor-pointer"
                >
                  Ocultar formulario
                </button>
              </form>
            )}

            {/* Card end */}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-center text-[#64748b]  mt-4">
        Al ingresar confirmas que eres mayor de 18 años y resides en Trujillo, Perú.
      </p>
    </div>
  );
};
