using CaraNegra.Domain.Common;
using CaraNegra.Domain.Enums;

namespace CaraNegra.Domain.Entities;

public class Pedido : BaseEntity
{
    public int PedidoId { get; set; }
    public decimal SubTotal { get; set; }
    public decimal Total { get; set; }
    public EstadoPedido EstadoPedido { get; set; } = EstadoPedido.Pendiente;

    // Venta por pedido (no por mesa): nombre que da el cliente al hacer el pedido, para
    // ubicarlo rápidamente (en el mostrador, en la comanda y en la boleta) sin depender de
    // una mesa asignada.
    public string? NombreCliente { get; set; }

    // Claves foraneas
    // Venta por pedido (no por mesa): en el modelo de food truck / mostrador no existen
    // mesas físicas, así que un pedido puede no tener mesa asociada. Se conserva la
    // relación opcional en vez de eliminarla por completo para no perder compatibilidad
    // con locales que sí usan mesas.
    public int? MesaId { get; set; }
    public int UsuarioId { get; set; }

    // Propiedades de navegacion
    public Mesa? Mesa { get; set; }
    public Usuario Usuario { get; set; } = null!;
    public ICollection<DetallePedido> DetallesPedidos { get; set; } = new List<DetallePedido>();
    public ICollection<Pago> Pagos { get; set; } = new List<Pago>();
    public ICollection<DetalleDescuento> DetallesDescuentos { get; set; } = new List<DetalleDescuento>();
}