import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Coffee,
  Heart,
  Tag,
  Percent,
  X,
  CheckCircle2,
  Flame,
  PackageCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ECOMMERCE_PRODUCTS } from '../../data/ecommerceData';
import { ProductItem, CartItem } from '../../types';

export const EcommerceDemo: React.FC = () => {
  const [products] = useState<ProductItem[]>(ECOMMERCE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: ECOMMERCE_PRODUCTS[0],
      quantity: 2,
      selectedOption: 'Chicchi Interi'
    },
    {
      product: ECOMMERCE_PRODUCTS[1],
      quantity: 1,
      selectedOption: 'Moka Tradizionale'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductOptions, setSelectedProductOptions] = useState<Record<string, string>>({
    'prod-01': 'Chicchi Interi',
    'prod-02': 'Moka Tradizionale',
    'prod-03': 'Rame Satinato',
    'prod-04': 'Nero Anodizzato',
    'prod-05': 'Chicchi Interi',
    'prod-06': 'Nero Satinato'
  });
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  // Filter products by category
  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Cart Computations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 49 || subtotal === 0 ? 0 : 4.90;
  const freeShippingThreshold = 49;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleAddToCart = (product: ProductItem) => {
    const chosenOption = selectedProductOptions[product.id] || product.options?.values[0];
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedOption === chosenOption);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedOption === chosenOption
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedOption: chosenOption }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, option: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedOption === option) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'MARCO10' || code === 'VERCEL10') {
      setDiscountPercent(10);
      setCouponMessage('Coupon 10% applicato con successo!');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setCouponMessage('Coupon VIP 20% applicato!');
    } else {
      setCouponMessage('Codice coupon non valido (prova: MARCO10 o VIP20)');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutCompleted(true);
      setCart([]);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 }
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-amber-50 text-[11px] font-bold py-1.5 px-4 text-center tracking-wider shadow-sm">
        <span>☕ SPEDIZIONE GRATUITA in tutta Italia sopra i €49 • Usa il coupon </span>
        <span className="underline decoration-white/60 font-mono text-white">MARCO10</span>
        <span> per il 10% di sconto immediato</span>
      </div>

      {/* Brand Header */}
      <header className="bg-stone-950/95 backdrop-blur-md border-b border-amber-900/30 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 font-bold text-xl shadow-lg shadow-amber-500/20">
              <Coffee className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-amber-50 block">
                MONTECARLO <span className="text-orange-400">TORREFAZIONE</span>
              </span>
              <span className="text-[10px] text-amber-400/80 tracking-widest uppercase block font-semibold">
                Artisanal Specialty Coffee & Roastery
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-300">
            <button onClick={() => setSelectedCategory('all')} className="hover:text-orange-400 transition-colors cursor-pointer">Tutti i Prodotti</button>
            <button onClick={() => setSelectedCategory('caffe')} className="hover:text-orange-400 transition-colors cursor-pointer">Caffè Monorigine</button>
            <button onClick={() => setSelectedCategory('macchine')} className="hover:text-orange-400 transition-colors cursor-pointer">Macchine Espresso</button>
            <button onClick={() => setSelectedCategory('gift-box')} className="hover:text-orange-400 transition-colors cursor-pointer">Cofanetti Degustazione</button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-stone-900 hover:bg-stone-800 border border-amber-800/40 text-amber-100 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:border-orange-500"
          >
            <ShoppingBag className="w-4 h-4 text-orange-400" />
            <span>Carrello</span>
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full">
              {totalCartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 border-b border-amber-900/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=80"
            alt="Artisan Coffee"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Tostatura Artigianale a Legna in Piccoli Lotti
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-amber-50 tracking-tight leading-tight">
            L'Arte del Caffè Specialty d'Eccellenza
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Selezioniamo direttamente dai piccoli coltivatori i migliori chicchi 100% Arabica e geisha. Tostati su misura e spediti freschi entro 24 ore.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-orange-400" /> Spedizione Rapida 24/48h
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-400" /> Pagamenti Sicuri Stripe & Apple Pay
            </div>
            <div className="flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-orange-400" /> Garanzia Freschezza Sigillata
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Collezione 2026</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 mt-0.5">I Nostri Caffè & Strumenti</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tutti i Prodotti' },
              { id: 'caffe', label: 'Caffè Specialty' },
              { id: 'macchine', label: 'Macchine Espresso' },
              { id: 'accessori', label: 'Accessori & Macine' },
              { id: 'gift-box', label: 'Gift Box Degustazione' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const currentOption = selectedProductOptions[product.id] || product.options?.values[0];
            return (
              <div
                key={product.id}
                className="bg-stone-900/90 rounded-2xl border border-stone-800 hover:border-amber-700/60 transition-all p-4 sm:p-5 flex flex-col justify-between shadow-lg group hover:shadow-2xl"
              >
                <div>
                  {/* Image with badges */}
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 bg-stone-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isBestSeller && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md uppercase">
                        Bestseller
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-2 right-2 bg-stone-950/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                        -€{(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs mb-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-[11px]">({product.reviewsCount} recensioni)</span>
                  </div>

                  <h3 className="font-bold text-base text-stone-100 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Aromas & Notes */}
                  {product.notes.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {product.notes.map((note, idx) => (
                        <span key={idx} className="bg-stone-950 text-amber-200/90 text-[10px] px-2 py-0.5 rounded-md border border-amber-900/30">
                          {note}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Options selector (Macinatura / Finitura) */}
                  {product.options && (
                    <div className="mt-3">
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        {product.options.label}:
                      </label>
                      <select
                        value={currentOption}
                        onChange={(e) => setSelectedProductOptions({
                          ...selectedProductOptions,
                          [product.id]: e.target.value
                        })}
                        className="w-full text-xs bg-stone-950 border border-stone-700 text-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        {product.options.values.map(val => (
                          <option key={val} value={val}>{val}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Price & Add to Cart Button */}
                <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-extrabold text-orange-400 font-mono">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-500 line-through font-mono">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.stockLeft && product.stockLeft < 10 && (
                      <span className="text-[10px] text-amber-400 font-bold block">
                        Solo {product.stockLeft} rimasti a magazzino!
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-95 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />
                    <span>Aggiungi</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-stone-950 border-l border-amber-900/30 shadow-2xl flex flex-col">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-base text-stone-100">Il Tuo Carrello ({totalCartCount})</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-stone-100 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            <div className="bg-stone-900 p-3 px-5 border-b border-stone-800 text-xs">
              <div className="flex justify-between text-[11px] mb-1 font-medium">
                {remainingForFreeShipping > 0 ? (
                  <span>Aggiungi <strong>€{remainingForFreeShipping.toFixed(2)}</strong> per la spedizione gratuita</span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Spedizione Gratuita Raggiunta!
                  </span>
                )}
                <span className="text-stone-400 font-mono">{progressToFreeShipping.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-700" />
                  <p className="text-sm font-medium">Il tuo carrello è vuoto</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-orange-400 font-bold hover:underline cursor-pointer"
                  >
                    Continua a scoprire i prodotti →
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="bg-stone-900 rounded-xl p-3 border border-stone-800 flex gap-3 items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-800 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-100 truncate">{item.product.name}</h4>
                      {item.selectedOption && (
                        <p className="text-[10px] text-stone-400 truncate">{item.selectedOption}</p>
                      )}
                      <div className="text-xs font-mono font-bold text-orange-400 mt-1">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-lg p-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.selectedOption, -1)}
                        className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.selectedOption, 1)}
                        className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Checkout Form */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 space-y-3">
                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Codice Coupon (es. MARCO10)"
                    className="flex-1 px-3 py-1.5 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white uppercase focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Applica
                  </button>
                </form>
                {couponMessage && (
                  <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}`}>
                    {couponMessage}
                  </p>
                )}

                {/* Subtotal, Discount, Shipping */}
                <div className="space-y-1.5 text-xs text-stone-300 border-t border-stone-800 pt-2 font-medium">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Subtotale:</span>
                    <span className="font-mono">€{subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Sconto ({discountPercent}%):</span>
                      <span className="font-mono">-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-400">Spedizione:</span>
                    <span className="font-mono">{shipping === 0 ? <strong className="text-emerald-400">GRATUITA</strong> : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-stone-100 border-t border-stone-800 pt-2">
                    <span>Totale:</span>
                    <span className="text-xl text-orange-400 font-mono">€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-98 text-stone-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                >
                  {isCheckingOut ? (
                    <span>Elaborazione pagamento in corso...</span>
                  ) : (
                    <>
                      <span>Procedi al Checkout Rapido</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      {checkoutCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-stone-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-extrabold text-stone-100">Ordine Ricevuto con Successo!</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Grazie per il tuo acquisto su <strong>Montecarlo Torrefazione</strong>. Abbiamo inviato la conferma d'ordine e la tracciabilità della spedizione via email.
            </p>
            <div className="bg-stone-900 p-3 rounded-xl text-xs font-mono text-amber-400 border border-stone-800">
              Codice Ordine: #MNT-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={() => {
                setCheckoutCompleted(false);
                setIsCartOpen(false);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Torna al Negozio
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 py-8 text-center text-xs text-stone-500">
        Montecarlo Torrefazione & Specialty Coffee • P.IVA 01234567890 • Demo E-Commerce per Vercel by Marco Cerilli
      </footer>
    </div>
  );
};
