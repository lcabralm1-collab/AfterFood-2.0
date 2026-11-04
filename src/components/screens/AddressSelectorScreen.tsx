import React, { useState } from 'react';
import { Address, AppScreen } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES } from '../maps/mapStyles';

interface AddressSelectorScreenProps {
  currentAddress: Address;
  onSelectAddress: (address: Address) => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenNextModal?: () => void;
  onOpenPromoModal?: () => void;
  isLightMode?: boolean;
}

export const AddressSelectorScreen: React.FC<AddressSelectorScreenProps> = ({
  currentAddress,
  onSelectAddress,
  onNavigate,
  onOpenNextModal,
  onOpenPromoModal,
  isLightMode = true,
}) => {
  const [selectedTag] = useState<string>(currentAddress.tag || 'Entrega');
  // Starts completely empty as requested - no prefilled example address
  const [street, setStreet] = useState('');
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');
  const [mapPosition, setMapPosition] = useState(TRUJILLO_COORDINATES.defaultDelivery);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRecenter = () => {
    setStreet('Calle Los Cedros 342, Trujillo');
    setReference('Posición GPS detectada • Precisión 5m');
    setMapPosition(TRUJILLO_COORDINATES.client);
  };

  const handleConfirm = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      onSelectAddress({
        ...currentAddress,
        street: street.trim() || 'Ubicación seleccionada en mapa',
        reference: reference.trim(),
        tag: selectedTag as any,
      });
      setTimeout(() => {
        // Invert navigation flow: Notificaciones modal triggers after Ubicación
        if (onOpenNextModal) {
          onOpenNextModal();
        } else if (onOpenPromoModal) {
          onOpenPromoModal();
        } else {
          onNavigate('home');
        }
      }, 600);
    }, 500);
  };

  return (
    <div className="flex flex-col w-full relative animate-in fade-in duration-200">
      {/* Search Bar & GPS Quick Action (shortcut buttons "casa, trabajo, dept, nuevo" removed) */}
      <div className="px-4 pt-2 pb-3 z-30 flex flex-col gap-2.5">
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 shadow-md flex flex-col gap-2.5 transition-colors">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined text-orange-600 absolute left-3 pointer-events-none text-[20px]">
              search
            </span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Busca tu dirección o calle..."
              className="w-full h-11 bg-white text-gray-900 placeholder:text-gray-400 text-xs pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 font-medium transition-colors"
            />
            {street && (
              <button
                type="button"
                onClick={() => setStreet('')}
                className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* GPS Quick Action */}
          <button
            type="button"
            onClick={handleRecenter}
            className="flex items-center gap-2.5 py-1 px-1 rounded-lg text-purple-700 hover:text-purple-900 transition-colors text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-700">
              <span className="material-symbols-outlined text-[18px]">
                my_location
              </span>
            </div>
            <span className="text-xs text-purple-700 hover:text-purple-900 font-bold tracking-wide">
              Usar mi ubicación actual
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Google Map Canvas Area */}
      <div className="relative w-full h-[200px] overflow-hidden bg-slate-100 select-none shadow-inner border-y border-gray-200">
        <AfterFoodGoogleMap
          center={mapPosition}
          zoom={16}
          isLightMode={isLightMode}
          height="200px"
          markers={[
            {
              id: 'selected-address-pin',
              position: mapPosition,
              title: street || 'Ubicación de entrega',
              type: 'address',
            },
          ]}
          onCenterChange={(newCenter) => {
            setMapPosition(newCenter);
          }}
          showRecenterButton={true}
        />
      </div>

      {/* Address Form Card - Clean, with inputs starting empty and high contrast confirm button */}
      <div className="relative z-30 w-full bg-white rounded-t-2xl border-t border-gray-200 -mt-2 pt-3 pb-8 px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] flex flex-col gap-3">
        <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-1" />

        {/* Escribir Dirección Exacta (campo inicia vacío) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
            <span className="material-symbols-outlined text-orange-600 text-[16px]">edit_location</span>
            <span>Dirección exacta</span>
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Calle, Av. y número (ej. Av. América Sur 1234)"
            className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        {/* Campo de Portería / Referencia / Dpto (campo inicia vacío) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
            <span className="material-symbols-outlined text-purple-700 text-[16px]">door_front</span>
            <span>Portería / Dpto / Instrucciones de entrega</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ej. Dejar en portería con guardia, Dpto 302, Timbre 4..."
            className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        {/* Referencia Adicional (campo inicia vacío) */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
            <span className="material-symbols-outlined text-gray-500 text-[16px]">flag</span>
            <span>Referencia cercana</span>
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Ej. Frente al parque, al lado de la farmacia..."
            className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        {/* Botón Confirmar Ubicación visible inmediatamente con Alto Contraste */}
        <button
          type="button"
          disabled={isSaving}
          onClick={handleConfirm}
          className={`w-full h-12 mt-1 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-700/20 active:scale-[0.98] transition-all text-white cursor-pointer ${
            savedSuccess
              ? 'bg-emerald-600'
              : 'bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isSaving ? 'refresh' : savedSuccess ? 'check' : 'check_circle'}
          </span>
          <span>
            {isSaving
              ? 'Guardando...'
              : savedSuccess
              ? '¡Ubicación confirmada!'
              : 'Confirmar ubicación'}
          </span>
        </button>
      </div>
    </div>
  );
};
