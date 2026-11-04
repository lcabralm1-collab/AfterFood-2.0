import React, { useState, useMemo } from 'react';
import { STORES_DATA, STORE_CATEGORIES, StoreCategory } from '../../data/mockData';
import { Address, AppScreen, Product, Store } from '../../types';
import { FilterDropdownAccordion, FilterOptionType } from '../common/FilterDropdownAccordion';

interface HomeScreenProps {
  currentAddress?: Address;
  onNavigate: (screen: AppScreen) => void;
  onSelectProduct?: (product?: Product) => void;
  onSelectStore?: (store: Store) => void;
  onOpenAddressSelector?: () => void;
  onFilterCategory?: (category: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectStore,
  onFilterCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<FilterOptionType>(null);

  const handleCategorySelect = (category: StoreCategory) => {
    // Alterna a categoria: se já estiver selecionada, volta para 'all'
    const nextCategory = selectedCategory === category ? 'all' : category;
    setSelectedCategory(nextCategory);
    if (onFilterCategory) {
      onFilterCategory(nextCategory);
    }
  };

  const filteredStores = useMemo(() => {
    let stores = [...STORES_DATA];

    // Filtro pelas 4 categorias exatas
    if (selectedCategory !== 'all') {
      stores = stores.filter((store) => store.category === selectedCategory);
    }

    // Busca rápida opcional
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      stores = stores.filter(
        (store) =>
          store.name.toLowerCase().includes(q) ||
          store.categoryTag.toLowerCase().includes(q) ||
          store.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Aplicação do Filtro Dropdown/Accordion: "Abiertos ahora", "Más barato", "Más valorados"
    if (filterType === 'abiertos') {
      stores = stores.filter(
        (s) =>
          s.badgeTag.toLowerCase().includes('abierto') ||
          s.badgeTag.toLowerCase().includes('24h') ||
          s.badgeTag.toLowerCase().includes('abierta')
      );
    } else if (filterType === 'barato') {
      stores.sort((a, b) => a.deliveryFee - b.deliveryFee);
    } else if (filterType === 'valorados') {
      stores.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
    }

    return stores;
  }, [selectedCategory, searchQuery, filterType]);

  return (
    <div className="flex flex-col w-full pb-24 bg-gray-50 text-gray-900 animate-in fade-in duration-200">
      <div className="flex flex-col w-full px-4 pt-2 gap-3.5">
        {/* Barra de Pesquisa Minimalista */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-9 bg-white text-gray-900 placeholder:text-gray-400 text-xs rounded-xl outline-none border border-gray-200 focus:border-orange-500 shadow-sm transition-all font-medium"
            placeholder="Buscar restaurantes, mercados, farmácias, bebidas..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* ============================================================ */}
        {/* GRID DO TOPO: 4 CATEGORIAS PRINCIPAIS                        */}
        {/* Restaurantes, Market, Farmácia, Licorería                    */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>Categorias</span>
              {selectedCategory !== 'all' && (
                <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                  Filtro: {selectedCategory}
                </span>
              )}
            </h2>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 cursor-pointer"
              >
                Limpar filtro
              </button>
            )}
          </div>

          {/* Grid 2x2 com 4 botões grandes e legíveis */}
          <div className="grid grid-cols-2 gap-2.5">
            {STORE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  aria-pressed={isActive}
                  className={`relative p-3.5 rounded-xl border text-left cursor-pointer transition-all active:scale-[0.98] shadow-xs flex flex-col justify-between min-h-[105px] ${
                    isActive
                      ? 'bg-orange-50/70 border-orange-500 ring-2 ring-orange-500/20'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Ícone e Indicador */}
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {cat.icon}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isActive ? 'Ativo' : cat.badge}
                    </span>
                  </div>

                  {/* Títulos claros */}
                  <div className="flex flex-col mt-2">
                    <span
                      className={`text-sm font-bold leading-tight ${
                        isActive ? 'text-orange-600' : 'text-gray-900'
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                      {cat.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COMPONENTE DE FILTRO ACCORDION/DROPDOWN                      */}
        {/* Opções: "Abiertos ahora", "Más barato", "Más valorados"      */}
        {/* ============================================================ */}
        <FilterDropdownAccordion
          activeFilter={filterType}
          onSelectFilter={(f) => setFilterType(f)}
          className="mt-1"
        />

        {/* ============================================================ */}
        {/* LISTA VERTICAL DE LOJAS (Sem scroll horizontal)              */}
        {/* Botão de curtir (coração) removido dos cards                 */}
        {/* ============================================================ */}
        <div className="flex flex-col gap-2.5 mt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">
              {selectedCategory === 'all'
                ? 'Todos os Estabelecimentos'
                : `Lojas de ${selectedCategory}`}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              {filteredStores.length} {filteredStores.length === 1 ? 'loja' : 'lojas'}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {filteredStores.length === 0 ? (
              <div className="p-8 bg-white border border-gray-200 rounded-xl text-center flex flex-col items-center gap-2 shadow-xs">
                <span className="material-symbols-outlined text-gray-400 text-3xl">storefront</span>
                <p className="text-xs font-bold text-gray-900">Nenhum estabelecimento encontrado com este filtro</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setFilterType(null);
                  }}
                  className="mt-1 px-4 py-2 bg-orange-500 text-white text-xs rounded-lg font-bold hover:bg-orange-600 cursor-pointer shadow-sm"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              filteredStores.map((store) => (
                <article
                  key={store.id}
                  onClick={() => {
                    if (onSelectStore) {
                      onSelectStore(store);
                    }
                    onNavigate('restaurant_profile');
                  }}
                  className="group bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden cursor-pointer hover:border-orange-500/60 transition-all active:scale-[0.99]"
                >
                  {/* Imagem no Topo */}
                  <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Tag de Categoria */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-900 shadow-xs border border-gray-200">
                      {store.category}
                    </div>

                    {/* Tempo de Entrega */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-gray-900/80 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1 shadow-xs">
                      <span className="material-symbols-outlined text-[12px] text-orange-400">schedule</span>
                      <span>{store.deliveryTime}</span>
                    </div>

                    {/* Nota do Estabelecimento */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-purple-700 text-[10px] font-bold text-white flex items-center gap-0.5 shadow-xs">
                      <span className="material-symbols-outlined text-[12px] text-yellow-300" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{store.rating}</span>
                      <span className="text-purple-200 text-[9px]">({store.ratingCount})</span>
                    </div>
                  </div>

                  {/* Informações da Loja */}
                  <div className="p-3.5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {store.name}
                      </h4>
                      <span className={`text-xs font-bold ${store.isFreeDelivery ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {store.isFreeDelivery ? 'Entrega Grátis' : `S/ ${store.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Descrição e Tags */}
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {store.tags.join(' • ')}
                    </p>

                    {/* Rodapé do Card com Distância */}
                    <div className="flex items-center gap-2 pt-1 border-t border-gray-100 text-[11px] text-gray-500">
                      <span className="font-semibold text-purple-700">{store.badgeTag}</span>
                      <span>•</span>
                      <span>A {store.distanceKm} km de você</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
