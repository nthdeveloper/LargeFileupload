using FileUploadApi.Utils;

namespace FileUploadApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.            

            builder.Services.AddControllers();

            builder.Services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            });

            builder.Services.AddSingleton<IFileHelper, FileHelper>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.MapControllers();

            app.Run();
        }
    }
}
