import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantProductItem } from './MerchantCreateProductScreen';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantCatalogScreenProps {
  onNavigate: (screen: AppScreen) => void;
  products: MerchantProductItem[];
  onToggleProductStatus: (id: string) => void;
  onSimulateIncomingOrder: () => void;
}

export const MerchantCatalogScreen: React.FC<MerchantCatalogScreenProps> = ({
  onNavigate,
  products,
  onToggleProductStatus,
  onSimulateIncomingOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'activos' | 'agotados'>('activos');

  const activeProducts = products.filter((p) => p.isActive);
  const soldOutProducts = products.filter((p) => !p.isActive);

  const displayedProducts = activeTab === 'activos' ? activeProducts : soldOutProducts;

  return (
    <div className="flex flex-col w-full min-h-screen px-4 pb-28 pt-3 bg-slate-50  text-slate-900  transition-colors duration-200 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onNavigate('merchant_dashboard')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-600  hover:text-slate-900  transition-colors shadow-sm"
          title="Volver al Dashboard"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white  px-3 py-1 rounded-full border border-slate-200  shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-800  uppercase tracking-wider">
            Burger Night • Abierto
          </span>
        </div>
        <button
          onClick={onSimulateIncomingOrder}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FF7A00] text-[11px] font-bold hover:brightness-105 active:scale-95 transition-all shadow-sm"
          title="Simular pedido entrante"
        >
          <span className="material-symbols-outlined text-[14px]">notifications_active</span>
          <span>Simular</span>
        </button>
      </div>

      {/* Title & Quick Stats */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-black text-slate-900  tracking-tight">
            Catálogo de Productos
          </h1>
          <p className="text-xs text-slate-600 ">
            Control de stock y precios de excedentes en tiempo real
          </p>
        </div>
        <button
          onClick={() => onNavigate('merchant_create_product')}
          className="px-3 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-95 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Nuevo</span>
        </button>
      </div>

      {/* Tabs: "Activos" y "Agotados" */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-200/80  border border-slate-300  mb-3.5">
        <button
          type="button"
          onClick={() => setActiveTab('activos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'activos'
              ? 'bg-white  text-slate-900  shadow-sm'
              : 'text-slate-600  hover:text-slate-900 '
          }`}
        >
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>Activos ({activeProducts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agotados')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'agotados'
              ? 'bg-white  text-slate-900  shadow-sm'
              : 'text-slate-600  hover:text-slate-900 '
          }`}
        >
          <span className="material-symbols-outlined text-base">block</span>
          <span>Agotados ({soldOutProducts.length})</span>
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {displayedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-white  border border-dashed border-slate-300  text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
              {activeTab === 'activos' ? 'remove_shopping_cart' : 'done_all'}
            </span>
            <p className="text-sm font-bold text-slate-900 ">
              {activeTab === 'activos'
                ? 'No tienes productos activos en este momento'
                : 'No hay productos marcados como agotados'}
            </p>
            <p className="text-xs text-slate-500  mt-1 max-w-xs">
              {activeTab === 'activos'
                ? 'Usa el botón "+ Nuevo" para publicar porciones con descuento.'
                : 'Cuando agotes un lote, desactívalo y aparecerá aquí.'}
            </p>
          </div>
        ) : (
          displayedProducts.map((product) => {
            const discountPct = Math.round(
              ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                className={`p-3 rounded-2xl bg-white  border transition-all shadow-sm ${
                  product.isActive
                    ? 'border-slate-200  hover:border-[#6C5CE7]'
                    : 'border-slate-200  opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Photo */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 ">
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className={`w-full h-full object-cover ${!product.isActive ? 'grayscale' : ''}`}
                    />
                    {discountPct > 0 && product.isActive && (
                      <span className="absolute top-1 left-1 bg-[#FF7A00] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                        -{discountPct}%
                      </span>
                    )}
                    {!product.isActive && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-[9px] font-black text-rose-300 uppercase tracking-wider">
                          Agotado
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900  truncate">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-[11px] text-slate-500  line-clamp-1 mt-0.5">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm font-black text-[#FF7A00] tabular-nums">
                        S/ {product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through tabular-nums">
                        S/ {product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#6C5CE7]  bg-[#6C5CE7]/15 px-1.5 py-0.5 rounded font-bold ml-auto tabular-nums">
                        Stock: {product.quantity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 ">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 ">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        <span>{product.pickupTime}</span>
                      </div>

                      {/* Interactive Toggle Switch (Activo / Agotado) */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold ${
                            product.isActive ? 'text-emerald-600 ' : 'text-slate-400'
                          }`}
                        >
                          {product.isActive ? 'Activo' : 'Agotado'}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleProductStatus(product.id)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            product.isActive ? 'bg-[#FF7A00]' : 'bg-slate-300 '
                          }`}
                          aria-label="Toggle active status"
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              product.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Navigation */}
      <MerchantBottomNav
        currentScreen="merchant_catalog"
        onNavigate={onNavigate}
        activeKitchenCount={1}
      />
    </div>
  );
};
