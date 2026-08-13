using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CaraNegra.Infrastructure.Data;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // La cadena de conexión ya NO se hardcodea en el código fuente. Defina la variable de
        // entorno antes de ejecutar comandos de 'dotnet ef', por ejemplo:
        //   setx CARANEGRA_DB_CONNECTION "Server=localhost;Port=3306;Database=cara_negra;User=root;Password=SU_PASSWORD;"
        // (o el equivalente 'export' en Linux/macOS). También se acepta ConnectionStrings__DefaultConnection
        // por si ya está configurada para la aplicación en ejecución.
        var connectionString =
            Environment.GetEnvironmentVariable("TRUCKMAU_DB_CONNECTION")
            ?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
            ?? throw new InvalidOperationException(
                "No se encontró una cadena de conexión para las migraciones de EF Core. " +
                "Defina la variable de entorno CARANEGRA_DB_CONNECTION (o ConnectionStrings__DefaultConnection) " +
                "antes de ejecutar 'dotnet ef migrations add' / 'dotnet ef database update'.");

        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}