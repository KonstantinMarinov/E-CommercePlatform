using API;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class Program
{
    public static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        // Applies outstanding migrations to update the database upon startup.

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var context = services.GetRequiredService<StoreContext>();
                await context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError(ex, "An error occured during migration.");
            }
        }

        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
}