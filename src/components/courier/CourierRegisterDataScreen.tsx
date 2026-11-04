import React, { useRef, useState } from 'react';
import { AppScreen } from '../../types';

interface CourierRegisterDataScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSaveData?: (data: any) => void;
  isGoogleAuth?: boolean;
}

export type DocumentTypeOption = 'DNI' | 'Cédula de Extranjería' | 'Pasaporte' | 'PTP';

export const CourierRegisterDataScreen: React.FC<CourierRegisterDataScreenProps> = ({
  onNavigate,
  onSaveData,
  isGoogleAuth = false,
}) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [docType, setDocType] = useState<DocumentTypeOption>('DNI');
  const [docNumber, setDocNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [frontDocPhoto, setFrontDocPhoto] = useState<string | null>(null);
  const [backDocPhoto, setBackDocPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !docNumber || !phone) {
      setError('Por favor completa todos los campos personales.');
      return;
    }
    if (!frontDocPhoto || !backDocPhoto) {
      setError('Debes subir ambas fotos de tu documento.');
      return;
    }
    setError(null);
    if (onSaveData) {
      onSaveData({ firstName, lastName, docType, docNumber, phone, profilePhoto, frontDocPhoto, backDocPhoto });
    }
    onNavigate('courier_vehicle');
  };

  const simulateUpload = (type: 'avatar' | 'front' | 'back') => {
    const fakeUrl = `foto_${type}_${Date.now()}.jpg`;
    if (type === 'avatar') setProfilePhoto(fakeUrl);
    if (type === 'front') setFrontDocPhoto(fakeUrl);
    if (type === 'back') setBackDocPhoto(fakeUrl);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-24 pt-3 animate-in fade-in duration-200 bg-[#f8f9fa] dark:bg-[#12131a] text-[#1a1d20] dark:text-white">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => onNavigate('courier_login')}
          className="w-9 h-9 rounded-full bg-white dark:bg-[#252736] border border-slate-200 dark:border-gray-800 flex items-center justify-center text-[#64748b] dark:text-[#a0a0b0] hover:text-[#1a1d20] dark:hover:text-white transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#252736] px-3.5 py-1 rounded-full border border-slate-200 dark:border-gray-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
          <span className="text-[11px] font-bold text-[#FF7A00]">Paso 1 de 2: Datos</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">Tus Datos Personales</h1>
        <p className="text-xs text-[#64748b] mt-0.5">Sube tu foto y completa tu información para continuar.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-600 text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">warning</span>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="bg-white dark:bg-[#1e1f2b] border border-slate-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm">
          <div 
            onClick={() => simulateUpload('avatar')}
            className="w-24 h-24 rounded-full bg-slate-100 dark:bg-[#252736] border-2 border-dashed border-[#6C5CE7] flex items-center justify-center cursor-pointer overflow-hidden relative"
          >
             {profilePhoto ? (
               <div className="w-full h-full bg-[#6C5CE7]/20 flex items-center justify-center text-[#6C5CE7] font-bold text-xs">Foto Lista</div>
             ) : (
               <span className="material-symbols-outlined text-[32px] text-[#64748b]">add_a_photo</span>
             )}
          </div>
          <span className="text-xs font-bold text-[#FF7A00]">Subir foto de perfil</span>
        </div>

        <div className="bg-white dark:bg-[#1e1f2b] border border-slate-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
           <input type="text" placeholder="Nombres" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-slate-200 dark:border-gray-800 text-xs text-[#1a1d20] dark:text-white" />
           <input type="text" placeholder="Apellidos" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-slate-200 dark:border-gray-800 text-xs text-[#1a1d20] dark:text-white" />
           <div className="flex gap-2">
              <select value={docType} onChange={e => setDocType(e.target.value as any)} className="h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-slate-200 dark:border-gray-800 text-xs w-1/3 text-[#1a1d20] dark:text-white">
                 <option value="DNI">DNI</option>
                 <option value="Pasaporte">Pasaporte</option>
              </select>
              <input type="text" placeholder="Número" value={docNumber} onChange={e => setDocNumber(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-slate-200 dark:border-gray-800 text-xs text-[#1a1d20] dark:text-white" />
           </div>
           <input type="tel" placeholder="Celular" value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-slate-200 dark:border-gray-800 text-xs text-[#1a1d20] dark:text-white" />
        </div>

        <div className="bg-white dark:bg-[#1e1f2b] border border-slate-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
           <h2 className="text-xs font-black text-[#FF7A00] uppercase">Fotos del Documento</h2>
           <div className="grid grid-cols-2 gap-3">
              <div onClick={() => simulateUpload('front')} className="h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-gray-700 flex items-center justify-center cursor-pointer bg-slate-50 dark:bg-[#12131a]">
                 <span className="text-xs font-bold text-[#64748b]">{frontDocPhoto ? 'Frontal Listo' : 'Frente'}</span>
              </div>
              <div onClick={() => simulateUpload('back')} className="h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-gray-700 flex items-center justify-center cursor-pointer bg-slate-50 dark:bg-[#12131a]">
                 <span className="text-xs font-bold text-[#64748b]">{backDocPhoto ? 'Reverso Listo' : 'Reverso'}</span>
              </div>
           </div>
        </div>

        <button type="submit" className="w-full h-13 mt-2 rounded-full bg-[#FF7A00] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2">
           Continuar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </form>
    </div>
  );
};
