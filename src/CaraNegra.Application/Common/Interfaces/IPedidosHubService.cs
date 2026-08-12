namespace CaraNegra.Application.Common.Interfaces;

public interface IPedidosHubService
{
    Task NotificarNuevoPedido(NuevoPedidoEvent evento);
    Task NotificarPedidoEstadoCambiado(PedidoEstadoCambiadoEvent evento);
    Task NotificarPagoRecibido(PagoRecibidoEvent evento);
    Task NotificarPagoAnulado(PagoAnuladoEvent evento);
    Task NotificarMesaEstadoCambiado(MesaEstadoCambiadoEvent evento);
    Task NotificarPedidoActualizado(PedidoActualizadoEvent evento);
}

public record NuevoPedidoEvent
{
    public int PedidoId { get; init; }
    public string MesaNumero { get; init; } = string.Empty;
    // Venta por pedido (no por mesa): para que el dashboard en tiempo real pueda mostrar de
    // quién es cada pedido activo sin depender de una mesa.
    public string? NombreCliente { get; init; }
    public string MozoNombre { get; init; } = string.Empty;
    public DateTime CreadoEn { get; init; }
    public List<PedidoDetalleEvent> Detalles { get; init; } = new();
}

public record PedidoDetalleEvent
{
    public int ProductoId { get; init; }
    public string ProductoNombre { get; init; } = string.Empty;
    public int Cantidad { get; init; }
    public string? Notas { get; init; }
}

public record PedidoEstadoCambiadoEvent
{
    public int PedidoId { get; init; }
    public string MesaNumero { get; init; } = string.Empty;
    public string EstadoAnterior { get; init; } = string.Empty;
    public string EstadoNuevo { get; init; } = string.Empty;
    public DateTime ActualizadoEn { get; init; }
}

public record PagoRecibidoEvent
{
    public int PedidoId { get; init; }
    public string MesaNumero { get; init; } = string.Empty;
    public decimal Monto { get; init; }
    public string MetodoPago { get; init; } = string.Empty;
    public bool EsPagoCompleto { get; init; }
    public string EstadoPedido { get; init; } = string.Empty;
}

public record PagoAnuladoEvent
{
    public int PedidoId { get; init; }
    public string MesaNumero { get; init; } = string.Empty;
    public decimal MontoAnulado { get; init; }
    public string NuevoEstadoPedido { get; init; } = string.Empty;
}

public record MesaEstadoCambiadoEvent
{
    public int MesaId { get; init; }
    public string NumeroMesa { get; init; } = string.Empty;
    public string EstadoAnterior { get; init; } = string.Empty;
    public string EstadoNuevo { get; init; } = string.Empty;
}

/// <summary>
/// Se emite cuando se agrega o quita un ítem de un pedido ya existente (pedido en
/// Pendiente o EnPreparacion), para que las pantallas de mozo/cocina/caja refresquen
/// el detalle sin tener que recargar manualmente.
/// </summary>
public record PedidoActualizadoEvent
{
    public int PedidoId { get; init; }
    public string MesaNumero { get; init; } = string.Empty;
    public decimal SubTotal { get; init; }
    public decimal Total { get; init; }
}