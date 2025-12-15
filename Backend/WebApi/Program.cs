namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                    policy => policy
                        .WithOrigins("http://localhost:4200") // Angular dev server
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("DevAllowAll", policy =>
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
            });




            //
            // ✅ Add MVC / API Controllers
            builder.Services.AddControllers();

            // ✅ Add the built-in OpenAPI service (replaces SwaggerGen)
            builder.Services.AddOpenApi();

            var app = builder.Build();
            //
            app.UseCors("AllowAngularApp");
            //
            // ✅ Serve the OpenAPI document in Development
            if (app.Environment.IsDevelopment())
            {
                // This exposes JSON docs at /openapi/v1.json
                app.MapOpenApi();
            }

            // ✅ Optional middleware
            app.UseHttpsRedirection();
            app.UseAuthorization();

            // ✅ Map API routes
            app.MapControllers();
            app.UseCors("DevAllowAll");

            // ✅ Start the app
            app.Run();
        }
    }
}
