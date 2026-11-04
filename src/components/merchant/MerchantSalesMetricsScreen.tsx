import React, { useState } from 'react';
import { AppScreen } from '../../types';
import { MerchantBottomNav } from './MerchantBottomNav';

interface MerchantSalesMetricsScreenProps {
  onNavigate: (screen: AppScreen) => void;
}

type TimeFilter = 'hoy' | 'semana' | 'mes';
type OrderStatusFilter = 'todos' | 'entregados' | 'cancelados';

interface HistoryOrderItem {
  id: string;
  orderNumber: string;
  time: string;
  isToday: boolean;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
  paymentIcon: string;
  subtotal: number;
  deliveryFee: number;
  commission: number; // in S/
  netTotal: number;
  status: 'Entregado' | 'Cancelado';
}

export const MerchantSalesMetricsScreen: React.FC<MerchantSalesMetricsScreenProps> = ({
  onNavigate,
}) => {
  const [filter, setFilter] = useState<TimeFilter>('hoy');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>('todos');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const metricsData = {
    hoy: {
      totalSales: 'S/ 385.50',
      totalOrders: 14,
      co2Avoided: '9.8 kg',
      rating: '4.9',
      ratingCount: 12,
      topProduct: {
        name: 'Combo Hamburguesa Clásica',
        units: 22,
        revenue: 'S/ 327.80',
      },
    },
    semana: {
      totalSales: 'S/ 2,490.00',
      totalOrders: 96,
      co2Avoided: '68.5 kg',
      rating: '4.8',
      ratingCount: 84,
      topProduct: {
        name: 'Combo Hamburguesa Clásica',
        units: 148,
        revenue: 'S/ 2,205.20',
      },
    },
    mes: {
      totalSales: 'S/ 9,840.00',
      totalOrders: 380,
      co2Avoided: '275.0 kg',
      rating: '4.8',
      ratingCount: 310,
      topProduct: {
        name: 'Combo Hamburguesa Clásica',
        units: 540,
        revenue: 'S/ 8,046.00',
      },
    },
  };

  const current = metricsData[filter];

  // Historial detallado de pedidos
  const ordersHistory: HistoryOrderItem[] = [
    {
      id: 'ord-1',
      orderNumber: '#AF-4092',
      time: '11:45 PM',
      isToday: true,
      customerName: 'Carlos Mendoza',
      items: [
        { name: 'Combo Hamburguesa Clásica', quantity: 2, price: 14.5 },
        { name: 'Papas Fritas Medianas', quantity: 1, price: 6.0 },
      ],
      paymentMethod: 'Yape Móvil',
      paymentIcon: 'smartphone',
      subtotal: 35.0,
      deliveryFee: 4.5,
      commission: 0.0,
      netTotal: 35.0,
      status: 'Entregado',
    },
    {
      id: 'ord-2',
      orderNumber: '#AF-4089',
      time: '11:18 PM',
      isToday: true,
      customerName: 'Valeria Ríos',
      items: [
        { name: 'Pizza Familiar Pepperoni Nocturna', quantity: 1, price: 28.0 },
        { name: 'Gaseosa Inka Kola 500ml', quantity: 2, price: 4.5 },
      ],
      paymentMethod: 'Plin Interbancario',
      paymentIcon: 'account_balance_wallet',
      subtotal: 37.0,
      deliveryFee: 4.0,
      commission: 0.0,
      netTotal: 37.0,
      status: 'Entregado',
    },
    {
      id: 'ord-3',
      orderNumber: '#AF-4085',
      time: '10:52 PM',
      isToday: true,
      customerName: 'Diego Flores',
      items: [
        { name: 'Combo Alitas BBQ (12 und)', quantity: 1, price: 22.5 },
      ],
      paymentMethod: 'Tarjeta de Débito Visa',
      paymentIcon: 'credit_card',
      subtotal: 22.5,
      deliveryFee: 3.5,
      commission: 0.0,
      netTotal: 22.5,
      status: 'Entregado',
    },
    {
      id: 'ord-4',
      orderNumber: '#AF-4081',
      time: '10:20 PM',
      isToday: true,
      customerName: 'Ana Paula Castillo',
      items: [
        { name: 'Salchipapa Especial Nocturna', quantity: 1, price: 16.0 },
      ],
      paymentMethod: 'Efectivo',
      paymentIcon: 'payments',
      subtotal: 16.0,
      deliveryFee: 4.0,
      commission: 0.0,
      netTotal: 16.0,
      status: 'Cancelado',
    },
    {
      id: 'ord-5',
      orderNumber: '#AF-4078',
      time: '09:44 PM',
      isToday: true,
      customerName: 'Lucía Morales',
      items: [
        { name: 'Combo Hamburguesa Doble Queso', quantity: 2, price: 18.0 },
        { name: 'Porción Tequeños de Queso (8 und)', quantity: 1, price: 12.0 },
      ],
      paymentMethod: 'Yape Móvil',
      paymentIcon: 'smartphone',
      subtotal: 48.0,
      deliveryFee: 4.5,
      commission: 0.0,
      netTotal: 48.0,
      status: 'Entregado',
    },
    {
      id: 'ord-6',
      orderNumber: '#AF-4065',
      time: 'Ayer, 11:30 PM',
      isToday: false,
      customerName: 'Renzo Paredes',
      items: [
        { name: 'Combo Hamburguesa Clásica', quantity: 3, price: 14.5 },
      ],
      paymentMethod: 'Yape Móvil',
      paymentIcon: 'smartphone',
      subtotal: 43.5,
      deliveryFee: 4.5,
      commission: 0.0,
      netTotal: 43.5,
      status: 'Entregado',
    },
  ];

  // Filtrado de pedidos según filtro de tiempo y estado
  const filteredOrders = ordersHistory.filter((order) => {
    if (filter === 'hoy' && !order.isToday) return false;
    if (orderStatusFilter === 'entregados' && order.status !== 'Entregado') return false;
    if (orderStatusFilter === 'cancelados' && order.status !== 'Cancelado') return false;
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50  text-slate-900  px-4 pt-3 pb-28 relative select-none animate-in fade-in duration-200 transition-colors">
      {/* Background Ambience */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#6C5CE7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => onNavigate('merchant_dashboard')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-700  hover:text-slate-900  transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Volver al panel"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF7A00]">
            Rendimiento Financiero
          </span>
          <h1 className="text-base font-black text-slate-900 ">
            Ventas y Ganancias
          </h1>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('merchant_catalog')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-500  hover:text-slate-900  transition-all shadow-sm active:scale-95 cursor-pointer"
          title="Ver catálogo"
        >
          <span className="material-symbols-outlined text-lg">inventory_2</span>
        </button>
      </div>

      {/* Time Filter Tabs: "Hoy", "Semana", "Mes" */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/80  border border-slate-300  rounded-2xl mb-3.5">
        {(['hoy', 'semana', 'mes'] as TimeFilter[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`py-2 text-xs font-bold rounded-xl transition-all capitalize cursor-pointer ${
              filter === tab
                ? 'bg-white  text-slate-900  shadow-sm'
                : 'text-slate-600  hover:text-slate-900 '
            }`}
          >
            {tab === 'hoy' ? 'Hoy' : tab === 'semana' ? 'Esta Semana' : 'Este Mes'}
          </button>
        ))}
      </div>

      {/* Primary Revenue Card */}
      <div className="bg-white  border-2 border-[#FF7A00] rounded-3xl p-4 shadow-sm  relative overflow-hidden mb-3.5 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 ">
              Venta Total Neta
            </span>
            <div className="text-3xl font-black text-[#FF7A00] mt-0.5 font-mono tracking-tight tabular-nums">
              {current.totalSales}
            </div>
            <p className="text-xs text-emerald-600  font-bold flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +18.4% vs turno anterior
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-[#FF7A00]/15 border border-[#FF7A00]/40 flex items-center justify-center text-[#FF7A00]">
            <span className="material-symbols-outlined text-2xl">payments</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100  flex items-center justify-between text-xs">
          <span className="text-slate-500 ">Comisión AfterFood:</span>
          <span className="font-bold text-emerald-600 ">0% (Promoción 30 días)</span>
        </div>
      </div>

      {/* Operational 3-Column Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3.5">
        {/* Órdenes */}
        <div className="p-3 rounded-2xl bg-white  border border-slate-200  flex flex-col items-center text-center shadow-sm">
          <span className="material-symbols-outlined text-[#6C5CE7] text-xl mb-1">receipt_long</span>
          <span className="text-lg font-black text-slate-900  tabular-nums">
            {current.totalOrders}
          </span>
          <span className="text-[10px] text-slate-500 ">Órdenes</span>
        </div>

        {/* Rating */}
        <div className="p-3 rounded-2xl bg-white  border border-slate-200  flex flex-col items-center text-center shadow-sm">
          <span className="material-symbols-outlined text-amber-500 text-xl mb-1">star</span>
          <span className="text-lg font-black text-slate-900  tabular-nums">
            {current.rating} ★
          </span>
          <span className="text-[10px] text-slate-500 ">
            ({current.ratingCount}) Calificación
          </span>
        </div>

        {/* CO2 Evitado */}
        <div className="p-3 rounded-2xl bg-white  border border-slate-200  flex flex-col items-center text-center shadow-sm">
          <span className="material-symbols-outlined text-emerald-500 text-xl mb-1">eco</span>
          <span className="text-lg font-black text-emerald-600  tabular-nums">
            {current.co2Avoided}
          </span>
          <span className="text-[10px] text-slate-500 ">CO2 Evitado</span>
        </div>
      </div>

      {/* =========================================================================
          HISTORIAL DETALLADO DE PEDIDOS (ENFOQUE: PEDIDOS DEL DÍA)
         ========================================================================= */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#FF7A00] text-lg">history</span>
            <h2 className="text-sm font-extrabold text-slate-900 ">
              {filter === 'hoy' ? 'Pedidos del Día' : 'Historial de Pedidos'}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] text-[10px] font-black">
              {filteredOrders.length}
            </span>
          </div>

          {/* Subfiltro de estado: Todos / Entregados / Cancelados */}
          <div className="flex items-center gap-1 bg-slate-200/80  p-0.5 rounded-lg text-[10px]">
            <button
              type="button"
              onClick={() => setOrderStatusFilter('todos')}
              className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                orderStatusFilter === 'todos'
                  ? 'bg-white  text-slate-900  shadow-xs'
                  : 'text-slate-600 '
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setOrderStatusFilter('entregados')}
              className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                orderStatusFilter === 'entregados'
                  ? 'bg-white  text-slate-900  shadow-xs'
                  : 'text-slate-600 '
              }`}
            >
              Entregados
            </button>
            <button
              type="button"
              onClick={() => setOrderStatusFilter('cancelados')}
              className={`px-2 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                orderStatusFilter === 'cancelados'
                  ? 'bg-white  text-slate-900  shadow-xs'
                  : 'text-slate-600 '
              }`}
            >
              Cancelados
            </button>
          </div>
        </div>

        {/* Lista de Pedidos Desglosados */}
        <div className="space-y-2.5">
          {filteredOrders.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white  border border-slate-200  text-center">
              <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">inbox</span>
              <p className="text-xs font-bold text-slate-600 ">
                No hay pedidos para este filtro
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Cambia el período o el estado para ver más órdenes.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const isExpanded = expandedOrderId === ord.id;
              const isDelivered = ord.status === 'Entregado';

              return (
                <div
                  key={ord.id}
                  className="bg-white  border border-slate-200  rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  {/* Encabezado del Pedido */}
                  <div
                    onClick={() => toggleExpand(ord.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50  transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isDelivered
                          ? 'bg-emerald-500/15 text-emerald-600  border border-emerald-500/25'
                          : 'bg-rose-500/15 text-rose-600  border border-rose-500/25'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">
                          {isDelivered ? 'check_circle' : 'cancel'}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black font-mono text-slate-900 ">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">•</span>
                          <span className="text-[11px] font-medium text-slate-500 ">
                            {ord.time}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-700 ">
                          {ord.customerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <span className="text-xs font-black font-mono text-[#FF7A00] block">
                          S/ {ord.netTotal.toFixed(2)}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                          isDelivered
                            ? 'bg-emerald-500/15 text-emerald-700 '
                            : 'bg-rose-500/15 text-rose-700 '
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <span className={`material-symbols-outlined text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Detalle Desplegado (Ítems, Método de Pago, Comisión y Envío) */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100  bg-slate-50/60  space-y-2 text-xs">
                      {/* Lista de productos */}
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400  block mb-1">
                          Productos solicitados
                        </span>
                        <div className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-slate-800 ">
                                <strong className="text-[#FF7A00] font-mono">{it.quantity}x</strong> {it.name}
                              </span>
                              <span className="font-mono text-slate-700 ">
                                S/ {(it.price * it.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Método de pago */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 ">
                        <span className="text-slate-500  flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">{ord.paymentIcon}</span>
                          <span>Método de Pago:</span>
                        </span>
                        <span className="font-bold text-slate-800 ">
                          {ord.paymentMethod}
                        </span>
                      </div>

                      {/* Comisión y Envío */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 ">Comisión AfterFood (0%):</span>
                        <span className="font-bold text-emerald-600  font-mono">
                          S/ 0.00
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 ">Tarifa Repartidor:</span>
                        <span className="font-mono text-slate-600 ">
                          S/ {ord.deliveryFee.toFixed(2)}
                        </span>
                      </div>

                      {/* Total Neto para el Comercio */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 ">
                        <span className="font-extrabold text-slate-900 ">
                          Neto Pagado al Comercio:
                        </span>
                        <span className="text-sm font-black font-mono text-[#FF7A00]">
                          S/ {ord.netTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Merchant Bottom Navigation */}
      <MerchantBottomNav
        currentScreen="merchant_sales_metrics"
        onNavigate={onNavigate}
        activeKitchenCount={1}
      />
    </div>
  );
};
