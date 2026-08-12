import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Receipt, UtensilsCrossed, PlusCircle, ClipboardList } from 'lucide-react';
import { useCart } from '../CartContext';
import { useAuth } from '../context/AuthContext';
import { useClock } from '../hooks/useClock';
import { getPedidos } from '../services/ordersService';
import { connectPedidosHub, onHubEvent } from '../services/signalrService';
import UserSettingsModal from '../components/UserSettingsModal';
import MenuDrawer from '../components/MenuDrawer';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

// Venta por pedido (no por mesa, modelo food truck / mostrador): no hay mapa de mesas,
// el dashboard se centra en "Nuevo pedido" y en un vistazo rápido de los pedidos activos.
export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { user } = useAuth();
  const { time } = useClock();

  const [pedidosActivos, setPedidosActivos] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loadPedidosActivos = useCallback(() => {
    getPedidos({ pageSize: 50 })
      .then((res) => {
        const activos = res.items.filter((p) => p.estado !== 'Cancelado' && p.estado !== 'Entregado');
        setPedidosActivos(activos);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadPedidosActivos();
  }, [loadPedidosActivos]);

  // Tiempo real: refrescar la lista de pedidos activos cuando cambian.
  useEffect(() => {
    let unsubscribers = [];

    connectPedidosHub().then((connection) => {
      if (!connection) return;
      unsubscribers = [
        onHubEvent('NuevoPedido', loadPedidosActivos),
        onHubEvent('PedidoEstadoCambiado', loadPedidosActivos),
        onHubEvent('PedidoActualizado', loadPedidosActivos),
        onHubEvent('PagoRecibido', loadPedidosActivos),
        onHubEvent('PagoAnulado', loadPedidosActivos),
      ];
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [loadPedidosActivos]);

  // Cerrar el drawer cuando se navega de vuelta al dashboard
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.key]);

  const firstName = user?.nombreCompleto?.split(' ')[0] ?? 'Camarero';
  const initial = firstName[0]?.toUpperCase() ?? 'C';
  const puedeCobrar = user?.rol === 'CAJERO' || user?.rol === 'ADMIN';
  const esAdmin = user?.rol === 'ADMIN';

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-x-hidden">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="p-5 pt-6 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium tabular-nums">{time}</p>
          <h1 className="text-2xl font-extrabold mt-0.5 tracking-tight">
            Hola, {firstName} 👋
          </h1>
          {user?.rol && (
            <p className="text-xs text-gray-500 mt-0.5">{user.rol}</p>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          {esAdmin && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/admin')}
              className="w-12 h-12 bg-card rounded-full flex items-center justify-center border-2 border-gray-700/50 hover:bg-cardHighlight transition-colors"
              title="Panel de administración"
            >
              <UtensilsCrossed size={20} className="text-gray-300" />
            </motion.button>
          )}
          {puedeCobrar && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/caja')}
              className="w-12 h-12 bg-card rounded-full flex items-center justify-center border-2 border-gray-700/50 hover:bg-cardHighlight transition-colors"
              title="Ir a caja"
            >
              <Receipt size={20} className="text-gray-300" />
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSettingsOpen(true)}
            className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/40 hover:bg-primary/30 transition-colors"
          >
            <span className="font-extrabold text-lg text-primary">{initial}</span>
          </motion.button>
        </div>
      </div>

      {/* ── Nuevo pedido ────────────────────────────────── */}
      <div className="px-5 mb-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsMenuOpen(true)}
          className="w-full bg-primary hover:bg-primaryHover text-white font-extrabold py-6 rounded-3xl flex items-center justify-center gap-3 shadow-glow-orange transition-colors text-lg"
        >
          <PlusCircle size={24} />
          Nuevo pedido
        </motion.button>
      </div>

      {/* ── Pedidos activos ─────────────────────────────── */}
      <div className="px-5 mb-3 flex items-center gap-2">
        <ClipboardList size={15} className="text-gray-500" />
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pedidos activos</h2>
        {pedidosActivos.length > 0 && (
          <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">
            {pedidosActivos.length}
          </span>
        )}
      </div>

      {pedidosActivos.length === 0 ? (
        <p className="px-5 text-center text-sm text-gray-600 mt-4">
          No hay pedidos activos por ahora.
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="px-5 grid grid-cols-1 gap-2.5"
        >
          {pedidosActivos.map((pedido) => (
            <motion.div
              key={pedido.id}
              variants={cardVariants}
              className="bg-card border border-gray-800/50 rounded-2xl p-3.5 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-white text-sm">
                  {pedido.nombreCliente || `Pedido #${pedido.id}`}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  #{pedido.id} · {pedido.detalles.length} ítems · {pedido.estado}
                </p>
              </div>
              <p className="text-primary font-extrabold text-sm">S/ {pedido.total.toFixed(2)}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Modals ──────────────────────────────────────── */}
      <AnimatePresence>
        {isSettingsOpen && <UserSettingsModal onClose={() => setIsSettingsOpen(false)} />}
      </AnimatePresence>
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ── Floating cart button ─────────────────────────── */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/cart')}
        className={`fixed bottom-8 right-5 rounded-full w-16 h-16 flex items-center justify-center shadow-xl z-40 border-2 border-background transition-all ${
          cart.length > 0
            ? 'bg-primary shadow-glow-orange'
            : 'bg-card border-gray-700/50'
        }`}
      >
        <ShoppingCart size={24} className="text-white" />
        {cartItemCount > 0 && (
          <motion.span
            key={cartItemCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold border-2 border-background"
          >
            {cartItemCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
