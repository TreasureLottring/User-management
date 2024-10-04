//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Configuration; // Add this
//using Microsoft.EntityFrameworkCore;
//using User_ManagementAPI.Data; // Adjust your namespace as necessary

//namespace User_ManagementAPI
//{
//    public class Startup
//    {
//        private readonly IConfiguration _configuration;

//        public Startup(IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }

//        public void ConfigureServices(IServiceCollection services)
//        {
//            // Register DbContext with the PostgreSQL connection string
//            services.AddDbContext<UserContext>(options =>
//                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));

//            services.AddCors(options =>
//            {
//                options.AddPolicy("AllowSpecificOrigin",
//                    builder => builder.WithOrigins("http://localhost:4200") // Allow your Angular app's origin
//                                      .AllowAnyMethod()
//                                      .AllowAnyHeader());
//            });
//            // Other service configurations
//            services.AddControllers();
//        }

//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }

//            app.UseHttpsRedirection();
//            app.UseStaticFiles();

//            app.UseRouting();

//            app.UseCors("AllowSpecificOrigin"); // Enable CORS

//            app.UseAuthorization();

//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });
//        }
//    }
//}
