import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../CartContext';
import { getCategories, getItemsByCategory } from '../services/menuService';
import toast from 'react-hot-toast';

export default function MenuDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, cart, total } = useCart();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedIds, setAddedIds] = useState(new Set()); // para feedback visual

  // Cargar categorías al abrir
  useEffect(() => {
    if (!isOpen) return;
    getCategories().then((cats) => {
      setCategories(cats);
      setActiveCategory(cats[0]?.id ?? null);
    });
  }, [isOpen]);

  // Cargar ítems cuando cambia la categoría
  useEffect(() => {
    if (!activeCategory) {
      setItems([]);
      return;
    }
    setIsLoading(true);
    getItemsByCategory(activeCategory)
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, [activeCategory]);

  const getCartQuantity = (itemId) =>
    cart.find((i) => i.id === itemId)?.quantity ?? 0;

  const cartItemCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleAdd = (item) => {
    addToCart(item);
    // Feedback visual momentáneo
    setAddedIds((prev) => new Set(prev).add(item.id));
    setTimeout(
      () => setAddedIds((prev) => { const s = new Set(prev); s.delete(item.id); return s; }),
      600
    );
    toast.success(`${item.name} añadido`, {
      icon: '✅',
      duration: 1500,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col justify-end"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer */}
        <motion.div
          key="drawer-panel"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-10 bg-card w-full rounded-t-3xl flex flex-col shadow-2xl border-t border-gray-700/40"
          style={{ maxHeight: '90dvh' }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-700" />
          </div>

          {/* Header */}
          <div className="px-5 pb-4 pt-2 flex justify-between items-start border-b border-gray-800/60">
            <div>
              <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
                Tomando pedido
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <h2 className="text-xl font-extrabold tracking-tight">Nuevo pedido</h2>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-background/60 rounded-full hover:bg-gray-700 transition-colors mt-1"
            >
              <X size={18} className="text-gray-400" />
            </motion.button>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-800/40">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-all flex-shrink-0 flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-glow-orange'
                      : 'bg-background text-gray-400 hover:bg-cardHighlight hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-4">
            {categories.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <UtensilsCrossed size={32} className="text-gray-700 mb-3" />
                <p className="text-gray-500 text-sm">
                  Aún no hay categorías ni productos cargados en la carta.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Pídele al administrador que los agregue desde el panel.
                </p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const qty = getCartQuantity(item.id);
                const justAdded = addedIds.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-background rounded-2xl p-3 flex gap-3 items-center border border-gray-800/40"
                  >
                    <div className="w-20 h-20 rounded-xl bg-cardHighlight/60 flex items-center justify-center flex-shrink-0">
                      <UtensilsCrossed size={24} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm leading-tight">{item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <p className="text-primary font-bold text-sm mt-2">S/ {item.price.toFixed(2)}</p>
                    </div>

                    {/* Add / counter button */}
                    <div className="flex-shrink-0">
                      {qty === 0 ? (
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          animate={justAdded ? { scale: [1, 1.3, 1] } : {}}
                          onClick={() => handleAdd(item)}
                          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow-orange hover:bg-primaryHover transition-colors"
                        >
                          <Plus size={20} className="text-white" />
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-1 bg-card rounded-full px-1 py-1 border border-gray-700/50">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-full bg-background flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-5 text-center text-sm font-bold text-white">{qty}</span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            animate={justAdded ? { scale: [1, 1.2, 1] } : {}}
                            onClick={() => handleAdd(item)}
                            className="w-7 h-7 bg-primary rounded-full flex items-center justify-center hover:bg-primaryHover transition-colors"
                          >
                            <Plus size={14} className="text-white" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ── Cart summary bar ───────────────────────────── */}
          <AnimatePresence>
            {cartItemCount > 0 && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="px-5 pb-6 pt-3 border-t border-gray-800/40"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/cart')}
                  className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-2xl flex justify-between items-center px-5 shadow-glow-orange transition-all"
                >
                  <span className="bg-white/20 text-white text-sm font-bold px-2.5 py-1 rounded-full">
                    {cartItemCount}
                  </span>
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Ver pedido
                  </span>
                  <span className="font-extrabold">S/ {total.toFixed(2)}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
