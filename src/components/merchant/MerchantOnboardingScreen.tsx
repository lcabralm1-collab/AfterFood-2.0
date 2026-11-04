import React, { useState } from 'react';
import { AppScreen } from '../../types';

interface MerchantOnboardingScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onGoogleLogin: () => void;
  onManualRegister?: (data: { email: string; pass: string }) => void;
}

type AuthMode = 'options' | 'register' | 'login';

export const MerchantOnboardingScreen: React.FC<MerchantOnboardingScreenProps> = ({
  onNavigate,
  onGoogleLogin,
  onManualRegister,
}) => {
  const [mode, setMode] = useState<AuthMode>('options');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  // Handle Google Login Flow: Redirects directly to "Configuración del Comercio"
  const handleGoogleClick = () => {
    onGoogleLogin();
  };

  // Handle Manual Registration Flow: Requires Email & Password, then navigates to "Configuración del Comercio"
  const handleManualRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico comercial válido.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage('Debes aceptar los Términos y Condiciones para registrar tu comercio.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('afterfood_merchant_email', email);
      } catch {}
      if (onManualRegister) {
        onManualRegister({ email, pass: password });
      }
      // Avanza a la pantalla de "Configuración del Comercio"
      onNavigate('merchant_register');
    }, 500);
  };

  // Handle Login Flow: Requires Email & Password, then signs in to Dashboard
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa tu correo electrónico registrado.');
      return;
    }

    if (!password) {
      setErrorMessage('Por favor ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('afterfood_merchant_email', email);
      } catch {}
      onNavigate('merchant_dashboard');
    }, 500);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-20 pt-2 bg-[#f8f9fa]  text-[#1a1d20]  transition-colors duration-200 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => {
            if (mode !== 'options') {
              setMode('options');
              setErrorMessage(null);
            } else {
              onNavigate('role_selector');
            }
          }}
          className="flex items-center gap-1 text-xs text-[#64748b]  hover:text-[#1a1d20]  px-3 py-1.5 rounded-full bg-white  border border-slate-200  shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{mode === 'options' ? 'Cambiar de rol' : 'Volver a opciones'}</span>
        </button>
        <span className="px-2.5 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/30 text-[#FF7A00]  text-[10px] font-bold uppercase tracking-wider">
          Portal Comercios
        </span>
      </div>

      {/* Unified Main Title */}
      <div className="mb-3">
        <h1 className="text-xl sm:text-2xl font-black text-[#1a1d20]  tracking-tight">
          Inicia sesión en AfterFood
        </h1>
      </div>

      {/* Main Card Container */}
      <div className="bg-white  border border-slate-200  rounded-2xl p-5 shadow-xl transition-colors">
        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-600  text-xs">
            <span className="material-symbols-outlined text-base shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* =========================================================================
            VISTA 1: OPCIONES DE ACCESO PRINCIPAL (GOOGLE, REGISTRAR, INICIAR SESIÓN)
           ========================================================================= */}
        {mode === 'options' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-150">
            {/* BOTÓN 1: Continuar con Google */}
            <button
              type="button"
              onClick={handleGoogleClick}
              className="w-full h-12 px-4 bg-slate-50 hover:bg-slate-100   border border-slate-200  transition-all rounded-full flex items-center justify-center gap-2.5 group shadow-xs active:scale-[0.99] cursor-pointer text-xs font-bold text-[#1a1d20] "
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
              <span>Continuar con Google</span>
            </button>

            {/* BOTÓN 2: Registrar tu cuenta (Registro manual) */}
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className="w-full h-12 rounded-full bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-[#FF7A00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              <span>Registrar tu cuenta</span>
            </button>

            {/* Divider */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200 " />
              <span className="absolute bg-white  px-2.5 text-[10px] text-[#64748b]  font-semibold">
                o accede si ya tienes cuenta
              </span>
            </div>

            {/* BOTÓN 3: Iniciar sesión */}
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className="w-full h-11 rounded-full bg-slate-50  hover:bg-slate-100  border border-slate-200  text-[#1a1d20]  font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF7A00]">
                login
              </span>
              <span>Iniciar sesión</span>
            </button>
          </div>
        )}

        {/* =========================================================================
            VISTA 2: REGISTRO MANUAL ("Registrar tu cuenta") -> Correo y Contraseña
           ========================================================================= */}
        {mode === 'register' && (
          <form onSubmit={handleManualRegisterSubmit} className="flex flex-col gap-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 ">
              <span className="text-xs font-black text-[#1a1d20]  uppercase tracking-wider">
                Crea tus credenciales de acceso
              </span>
              <button
                type="button"
                onClick={() => setMode('options')}
                className="text-[11px] text-[#FF7A00] hover:underline font-bold cursor-pointer"
              >
                Volver
              </button>
            </div>

            {/* Correo Electrónico Comercial */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-email" className="text-xs font-bold text-[#1a1d20] ">
                Correo electrónico comercial
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  mail
                </span>
                <input
                  id="reg-merchant-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="ejemplo@negocio.com"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#64748b]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Creación de Contraseña */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-pass" className="text-xs font-bold text-[#1a1d20] ">
                Crear contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  id="reg-merchant-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full h-11 pl-9 pr-10 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#64748b]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#64748b]  hover:text-[#1a1d20] "
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-merchant-pass-confirm" className="text-xs font-bold text-[#1a1d20] ">
                Confirmar contraseña
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  lock_reset
                </span>
                <input
                  id="reg-merchant-pass-confirm"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Repite tu contraseña"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#64748b]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Términos y Condiciones */}
            <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#FF7A00] focus:ring-[#FF7A00] accent-[#FF7A00]"
              />
              <span className="text-[11px] text-[#64748b] ">
                Acepto los Términos y Condiciones de Comercios Aliados.
              </span>
            </label>

            {/* Botón para avanzar a la pantalla de Configuración del Comercio */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continuar a Configuración del Comercio</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs text-[#64748b]  hover:text-[#FF7A00] transition-colors mt-1"
            >
              ¿Ya tienes cuenta? <span className="font-bold underline text-[#FF7A00]">Iniciar sesión</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            VISTA 3: INICIAR SESIÓN CON CREDENCIALES EXISTENTES ("Iniciar sesión")
           ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 ">
              <span className="text-xs font-black text-[#1a1d20]  uppercase tracking-wider">
                Ingresa con tu correo y contraseña
              </span>
              <button
                type="button"
                onClick={() => setMode('options')}
                className="text-[11px] text-[#FF7A00] hover:underline font-bold cursor-pointer"
              >
                Volver
              </button>
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col gap-1">
              <label htmlFor="login-merchant-email" className="text-xs font-bold text-[#1a1d20] ">
                Correo electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  mail
                </span>
                <input
                  id="login-merchant-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="ejemplo@negocio.com"
                  className="w-full h-11 pl-9 pr-3 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#64748b]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="login-merchant-pass" className="text-xs font-bold text-[#1a1d20] ">
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
                  <span>Enlace de recuperación enviado al correo</span>
                </div>
              )}

              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#64748b]  text-[18px] pointer-events-none">
                  lock
                </span>
                <input
                  id="login-merchant-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-9 pr-10 bg-slate-50  border border-slate-200  rounded-xl text-xs text-[#1a1d20]  placeholder:text-[#64748b]  outline-none focus:ring-1 focus:ring-[#FF7A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#64748b]  hover:text-[#1a1d20] "
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-1 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Ingresar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('register')}
              className="w-full text-center text-xs text-[#64748b]  hover:text-[#FF7A00] transition-colors mt-1"
            >
              ¿No tienes cuenta? <span className="font-bold underline text-[#FF7A00]">Regístrate aquí</span>
            </button>
          </form>
        )}
      </div>

      {/* Footer Support Info */}
      <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-[#64748b] ">
        <span className="material-symbols-outlined text-sm">support_agent</span>
        <span>Soporte AfterFood Comercios Trujillo:</span>
        <span className="font-bold text-slate-800 ">soporte@afterfood.pe</span>
      </div>
    </div>
  );
};
