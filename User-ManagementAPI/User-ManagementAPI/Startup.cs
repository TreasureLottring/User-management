using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration; // Add this
using Microsoft.EntityFrameworkCore;
using User_ManagementAPI.Data; // Adjust your namespace as necessary

namespace User_ManagementAPI
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Register DbContext with the PostgreSQL connection string
            services.AddDbContext<UserContext>(options =>
                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
