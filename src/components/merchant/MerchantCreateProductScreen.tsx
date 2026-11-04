import React, { useState } from 'react';
import { AppScreen } from '../../types';

export interface MerchantProductItem {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
  pickupTime: string;
  isActive: boolean;
}

interface MerchantCreateProductScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onProductCreated: (product: MerchantProductItem) => void;
}

export const MerchantCreateProductScreen: React.FC<MerchantCreateProductScreenProps> = ({
  onNavigate,
  onProductCreated,
}) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPrice, setDiscountPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [pickupTime, setPickupTime] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const simulatePhotoUpload = () => {
    setPhotoUrl('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80');
  };

  const numOriginal = parseFloat(originalPrice) || 0;
  const numDiscount = parseFloat(discountPrice) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Indica el nombre del producto.');
      return;
    }
    if (!description.trim()) {
      setError('Ingresa una descripción corta.');
      return;
    }
    if (numOriginal <= 0 || numDiscount <= 0) {
      setError('Los precios deben ser mayores a S/ 0.');
      return;
    }
    if (numDiscount >= numOriginal) {
      setError('El precio con descuento debe ser menor al precio original.');
      return;
    }
    if (quantity < 1) {
      setError('La cantidad debe ser de al menos 1 unidad.');
      return;
    }

    setError(null);

    const newProduct: MerchantProductItem = {
      id: `m-prod-${Date.now()}`,
      name: name.trim(),
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
      description: description.trim(),
      originalPrice: numOriginal,
      discountPrice: numDiscount,
      quantity,
      pickupTime: pickupTime.trim() || 'Horario nocturno',
      isActive: true,
    };

    onProductCreated(newProduct);
    onNavigate('merchant_catalog');
  };

  const discountPercent = numOriginal > 0 && numDiscount > 0 && numOriginal > numDiscount
    ? Math.round(((numOriginal - numDiscount) / numOriginal) * 100)
    : 0;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] px-4 pb-24 pt-3 bg-slate-50  text-slate-900  transition-colors duration-200 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onNavigate('merchant_catalog')}
          className="w-9 h-9 rounded-full bg-white  border border-slate-200  flex items-center justify-center text-slate-600  hover:text-slate-900  transition-colors shadow-sm"
          title="Volver"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 bg-white  px-3 py-1 rounded-full border border-slate-200  shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
          <span className="text-[11px] font-bold text-slate-800  uppercase tracking-wider">
            Nuevo Excedente
          </span>
        </div>
        <button
          onClick={() => onNavigate('merchant_catalog')}
          className="text-xs text-[#FF7A00] font-bold hover:underline"
        >
          Cancelar
        </button>
      </div>

      <div className="mb-3">
        <h1 className="text-xl font-black text-slate-900  tracking-tight">
          Publicar Producto / Excedente
        </h1>
        <p className="text-xs text-slate-600  mt-0.5">
          Ingresa el plato, stock disponible y descuento para el turno noche.
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-600  text-xs">
          <span className="material-symbols-outlined text-base shrink-0">error</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white  p-4 rounded-2xl border border-slate-200  shadow-sm transition-colors">
        {/* Nombre del producto */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-700 ">
            Nombre del producto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del producto"
            className="w-full h-11 px-3 rounded-xl bg-slate-50  border border-slate-200  text-slate-900  text-xs placeholder:text-slate-400 focus:border-[#FF7A00] outline-none transition-colors"
          />
        </div>

        {/* Foto */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 ">
              Foto del producto
            </label>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              photoUrl
                ? 'bg-emerald-500/10 text-emerald-600  border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600  border border-rose-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${photoUrl ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              {photoUrl ? 'Cargado' : 'Pendiente'}
            </span>
          </div>
          <div
            onClick={simulatePhotoUpload}
            className={`h-20 rounded-xl border border-dashed flex items-center justify-center gap-2 cursor-pointer transition-all ${
              photoUrl
                ? 'border-emerald-500 bg-emerald-50/20  text-emerald-600 '
                : 'border-rose-400  hover:border-[#FF7A00] bg-slate-50  text-slate-500 '
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {photoUrl ? 'check_circle' : 'add_a_photo'}
            </span>
            <span className="text-xs font-bold">
              {photoUrl ? '✓ Foto seleccionada con éxito' : 'Subir o tomar foto del producto'}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-700 ">
            Descripción corta
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción corta"
            className="w-full p-2.5 rounded-xl bg-slate-50  border border-slate-200  text-slate-900  text-xs placeholder:text-slate-400 focus:border-[#FF7A00] outline-none transition-colors resize-none"
          />
        </div>

        {/* Precios (Original vs Descuento) */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 ">
              Precio Regular (S/)
            </label>
            <input
              type="number"
              step="0.50"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Precio en S/"
              className="w-full h-11 px-3 rounded-xl bg-slate-50  border border-slate-200  text-slate-900  text-xs font-mono font-bold placeholder:text-slate-400 focus:border-[#FF7A00] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#FF7A00]">
                Precio AfterFood (S/)
              </label>
              {discountPercent > 0 && (
                <span className="text-[10px] font-black text-emerald-600 ">
                  -{discountPercent}%
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.50"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Precio en S/"
              className="w-full h-11 px-3 rounded-xl bg-slate-50  border-2 border-[#FF7A00] text-slate-900  text-xs font-mono font-black placeholder:text-slate-400 focus:ring-1 focus:ring-[#FF7A00] outline-none"
            />
          </div>
        </div>

        {/* Cantidad disponible y Horario */}
        <div className="grid grid-cols-2 gap-2.5 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 ">
              Porciones disponibles
            </label>
            <div className="flex items-center h-11 bg-slate-50  border border-slate-200  rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={handleDecreaseQuantity}
                className="w-10 h-full flex items-center justify-center text-slate-600  hover:bg-slate-200  cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center font-bold font-mono text-xs text-slate-900 ">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncreaseQuantity}
                className="w-10 h-full flex items-center justify-center text-slate-600  hover:bg-slate-200  cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700 ">
              Horario de recojo
            </label>
            <input
              type="text"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              placeholder="Ej. 10:00 PM - 02:00 AM"
              className="w-full h-11 px-3 rounded-xl bg-slate-50  border border-slate-200  text-slate-900  text-xs placeholder:text-slate-400 focus:border-[#FF7A00] outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 mt-2 rounded-xl bg-[#FF7A00] hover:bg-[#e06c00] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#FF7A00]/25 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">publish</span>
          <span>Publicar en Catálogo Nocturno</span>
        </button>
      </form>
    </div>
  );
};
