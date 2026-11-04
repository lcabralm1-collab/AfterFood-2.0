import React from 'react';
import { AppScreen } from '../../types';
import { AfterFoodGoogleMap } from '../maps/AfterFoodGoogleMap';
import { TRUJILLO_COORDINATES, TRUJILLO_HAZARD_ZONES } from '../maps/mapStyles';

interface CourierHeatMapScreenProps {
  isLightMode: boolean;
  onToggleLightMode: (light: boolean) => void;
  onNavigate: (screen: AppScreen) => void;
  onDisconnect: () => void;
}

export const CourierHeatMapScreen: React.FC<CourierHeatMapScreenProps> = ({
  isLightMode,
  onNavigate,
  onDisconnect
}) => {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-slate-100 dark:bg-[#12131a] flex flex-col overflow-hidden">
       {/* Interactive Google Maps: Heatmap / Courier Location */}
       <div className="absolute inset-0 z-0 overflow-hidden bg-slate-800">
         <AfterFoodGoogleMap
           center={TRUJILLO_COORDINATES.courierOnRouteToRestaurant || { lat: -8.11599, lng: -79.02708 }}
           zoom={14}
           isLightMode={isLightMode}
           markers={[
             {
               id: 'courier-loc',
               position: TRUJILLO_COORDINATES.courierOnRouteToRestaurant || { lat: -8.11599, lng: -79.02708 },
               title: 'Repartidor',
               type: 'courier',
             }
           ]}
           showRecenterButton={false}
           hazardAlerts={TRUJILLO_HAZARD_ZONES}
           showHazardLayer={true} // Using hazard layer to represent high demand zones
         />
         
         {/* Center overlay indicator */}
         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <span className="px-3 py-1 bg-[#1e1f2b] border border-[#FF7A00] text-[#FF7A00] text-xs font-bold rounded-full mt-2 shadow-lg animate-pulse">
              Buscando pedidos...
            </span>
         </div>
       </div>

       {/* Floating Top Bar */}
       <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="bg-[#1e1f2b]/90 backdrop-blur-md border border-[#34343c] px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
             <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
             <span className="text-white text-xs font-bold">En Línea</span>
          </div>
          <button onClick={() => onNavigate('courier_profile')} className="w-10 h-10 bg-[#1e1f2b]/90 border border-[#34343c] rounded-full text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer">
             <span className="material-symbols-outlined">person</span>
          </button>
       </div>

       {/* Floating Bottom Drawer */}
       <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1e1f2b] rounded-t-3xl p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] z-20 border-t border-slate-200 dark:border-[#34343c]">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-[#34343c] rounded-full mx-auto mb-4"></div>
          <h2 className="text-lg font-black text-[#1a1d20] dark:text-white mb-2">Zonas de Alta Demanda</h2>
          <p className="text-xs text-[#64748b] dark:text-[#a0a0b0] mb-4">Desplázate hacia las zonas marcadas en rojo para recibir más pedidos.</p>
          
          <div className="flex gap-2">
             <button onClick={() => onNavigate('courier_incoming_order')} className="flex-1 bg-[#6C5CE7] hover:bg-[#5e4edb] text-white py-3 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-colors cursor-pointer">
               Buscar Pedidos
             </button>
             <button onClick={onDisconnect} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-3 rounded-xl font-bold text-xs active:scale-95 transition-colors cursor-pointer">
               Desconectar
             </button>
          </div>
       </div>
    </div>
  );
};