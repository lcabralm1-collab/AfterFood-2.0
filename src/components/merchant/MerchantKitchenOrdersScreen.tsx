import React, { useState, useEffect } from 'react';
import { AppScreen } from '../../types';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantKitchenOrdersScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onCancelOrder?: () => void;
  onMarkReady?: () => void;
}

interface KitchenOrder {
  id: string;
  status: 'new' | 'preparing' | 'ready';
  statusLabel: string;
  customerName: string;
  address: string;
  total: number;
  items: { quantity: number; name: string; price: number }[];
  courierName?: string;
  courierVehicle?: string;
  courierEtaMin?: number;
}

export const MerchantKitchenOrdersScreen: React.FC<MerchantKitchenOrdersScreenProps> = ({
  onNavigate,
  onCancelOrder,
  onMarkReady,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(12 * 60 + 35);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<KitchenOrder | null>(null);

  // Exemplo de lista de pedidos ativas para visualização em matriz (grelha)
  const [orders] = useState<KitchenOrder[]>([
    {
      id: '#AF-1023',
      status: 'new',
      statusLabel: 'Novo Pedido',
      customerName: 'Juan Pérez',
      address: 'Trujillo Centro',
      total: 42.5,
      items: [
        { quantity: 2, name: 'Combo Smash Burger Especial', price: 32.0 },
        { quantity: 1, name: 'Batata Rústica com Cheddar', price: 10.5 },
      ],
      courierName: 'Carlos Mendoza',
      courierVehicle: 'Honda CB 125',
      courierEtaMin: 5,
    },
    {
      id: '#AF-1024',
      status: 'preparing',
      statusLabel: 'Em Preparação',
      customerName: 'Maria Silva',
      address: 'Urb. El Recreio',
      total: 28.0,
      items: [
        { quantity: 1, name: 'Pizza Broto Calabresa', price: 20.0 },
        { quantity: 1, name: 'Refrigerante 500ml', price: 8.0 },
      ],
      courierName: 'Jorge Luis',
      courierVehicle: 'Yamaha YBR',
      courierEtaMin: 12,
    },
  ]);

  // Checked items checklist no modal de detalhe
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'item-0': true,
    'item-1': false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMinutesSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} min ${s.toString().padStart(2, '0')} s`;
  };

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMarkReady = () => {
    if (onMarkReady) onMarkReady();
    setSelectedOrder(null);
    onNavigate('merchant_pickup_pin');
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    setSelectedOrder(null);
    if (onCancelOrder) onCancelOrder();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 px-4 pt-3 pb-28 relative select-none animate-in fade-in duration-200 transition-colors">
      {/* Background Ambience */}
      <div className="absolute top-10 right-5 w-72 h-72 bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. CABEÇALHO PRINCIPAL DO RESTAURANTE (Substitui a antiga Dashboard) */}
      <div className="space-y-2 mb-4">
        {/* Card do Perfil do Estabelecimento */}
        <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=120&auto=format&fit=crop&q=80"
              alt="Burger Night UPAO"
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                  Burger Night UPAO
                </h1>
                <span className="material-symbols-outlined text-[16px] text-orange-500 fill-1">
                  verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">
                Av. América Sur 1234, Trujillo
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('merchant_profile')}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Configurações da loja"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>

        {/* Status da Loja e Vendas Hoje */}
        <div className="grid grid-cols-2 gap-2">
          {/* Status Loja */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                STATUS LOJA
              </span>
              <button
                type="button"
                className="text-[11px] text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Alterar
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-emerald-600">
                Aberta (24h)
              </span>
            </div>
          </div>

          {/* Vendas Hoje */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                VENDAS HOJE
              </span>
              <button
                type="button"
                onClick={() => onNavigate('merchant_sales_metrics')}
                className="text-[11px] text-purple-600 hover:text-purple-700 font-bold cursor-pointer"
              >
                Ver
              </button>
            </div>
            <span className="text-sm font-black text-purple-700 mt-1">
              S/ 385.50
            </span>
          </div>
        </div>
      </div>

      {/* 2. TÍTULO E RESUMO DE PEDIDOS NA COZINHA */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-600 text-xl">
            skillet
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Gestão de Pedidos da Cozinha
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-extrabold border border-orange-200">
          {orders.length} em andamento
        </span>
      </div>

      {/* 3. VISUALIZAÇÃO EM MATRIZ / GRELHA (QUADRADOS MENORES LADO A LADO) */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            onClick={() => setSelectedOrder(ord)}
            className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs hover:border-orange-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-1.5">
              {/* Header do Card Quadrado */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <span className="text-xs font-black font-mono text-slate-900">
                  {ord.id}
                </span>
                <span className="text-xs font-black text-purple-700">
                  S/ {ord.total.toFixed(2)}
                </span>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                    ord.status === 'new'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  {ord.statusLabel}
                </span>
              </div>

              {/* Cliente */}
              <p className="text-[11px] text-slate-600 font-medium truncate">
                Cliente: <strong className="text-slate-900">{ord.customerName}</strong>
              </p>

              {/* Resumo de itens */}
              <div className="bg-slate-50 p-2 rounded-xl text-[10px] space-y-1 border border-slate-100">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 truncate">
                    <span className="truncate font-medium">
                      {it.quantity}x {it.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Repartidor e Ação Rápida */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 text-[9px] text-slate-500 truncate">
                <span className="material-symbols-outlined text-[13px] text-purple-600 shrink-0">
                  two_wheeler
                </span>
                <span className="truncate font-semibold">{ord.courierName}</span>
              </div>
              <button
                type="button"
                className="px-2 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-[10px] font-bold shrink-0 shadow-2xs"
              >
                Gerenciar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. MODAL DE DETALHES DO PEDIDO (Quando um quadrado é clicado) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3">
          <div className="w-full max-w-md bg-white rounded-3xl p-4 border border-slate-200 shadow-2xl space-y-3.5 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900 font-mono">
                  {selectedOrder.id}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-black uppercase">
                  {selectedOrder.statusLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Timer */}
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-orange-600 animate-spin">
                  timer
                </span>
                <span className="text-xs font-black text-slate-900 font-mono">
                  {formatMinutesSeconds(secondsRemaining)}
                </span>
              </div>
              <span className="text-[10px] font-bold text-purple-700 uppercase">
                Tempo Estimado Restante
              </span>
            </div>

            {/* Repartidor */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600 text-base">
                  two_wheeler
                </span>
                <span className="font-bold text-slate-900">
                  {selectedOrder.courierName} ({selectedOrder.courierVehicle})
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Chegada em ~{selectedOrder.courierEtaMin} min
              </span>
            </div>

            {/* Lista de Produtos Checklist */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                Itens do Pedido (Marque ao embalar)
              </span>
              {selectedOrder.items.map((it, idx) => {
                const itemKey = `item-${idx}`;
                const isChecked = !!checkedItems[itemKey];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(itemKey)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-lg ${
                          isChecked ? 'text-emerald-500 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {isChecked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {it.quantity}x {it.name}
                      </span>
                    </div>
                    <span className="text-xs font-black text-slate-900">
                      S/ {it.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Ações do Modal */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-1/3 h-11 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">cancel</span>
                <span>Cancelar</span>
              </button>

              <button
                type="button"
                onClick={handleMarkReady}
                className="flex-1 h-11 rounded-xl bg-[#6C5CE7] hover:bg-[#5b4bc4] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Listo para Recojo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de cancelamento */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-5 text-center shadow-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/15 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <h3 className="text-sm font-black text-slate-900">
              ¿Cancelar preparación del pedido?
            </h3>
            <p className="text-xs text-slate-600">
              Esta acción notificará al cliente y liberará al repartidor.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegação Inferior do Comércio */}
      <MerchantBottomNav
        currentScreen="merchant_kitchen_orders"
        onNavigate={onNavigate}
        activeKitchenCount={orders.length}
      />
    </div>
  );
};