using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data.Common;
using WebApi.Models;

namespace ELibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly string _config;

        public CategoriesController(IConfiguration config)
        {
            this._config = config.GetConnectionString("MyAppData");
        }


        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = new List<Category>();
            
            SqlConnection con=new SqlConnection(this._config);

            con.Open();
            var cmd = new SqlCommand("SELECT * FROM Category", con);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                categories.Add(new Category
                {
                    CategoryId = (int)reader["CategoryId"],
                    CategoryName = reader["CategoryName"].ToString()
                });
            }
            return Ok(categories);
        }





    }
}
