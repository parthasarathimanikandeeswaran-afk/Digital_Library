using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using WebApi.Models;

namespace ELibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly string connectionstring;

        public BooksController(IConfiguration con)
        {
            this.connectionstring = con.GetConnectionString("MyAppData");
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = new List<Book>();
           var sqlcon = new SqlConnection(connectionstring);
            sqlcon.Open();

            var cmd = new SqlCommand("SELECT * FROM Books", sqlcon);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                books.Add(new Book
                {
                    BookId = (int)reader["BookId"],
                    Title = reader["Title"].ToString(),
                    Author = reader["Author"].ToString(),
                    Description = reader["Description"].ToString(),
                    ImageUrl = reader["ImageUrl"].ToString(),
                    PdfUrl = reader["PdfUrl"].ToString(),
                    CategoryId = (int)reader["CategoryId"]
                });
            }
            return Ok(books);
        }





        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            Book book = null;
            using var sqlcon = new SqlConnection(connectionstring);
            sqlcon.Open();

            var cmd = new SqlCommand("SELECT * FROM Books WHERE BookId = @id", sqlcon);
            cmd.Parameters.AddWithValue("@id", id);

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                book = new Book
                {
                    BookId = (int)reader["BookId"],
                    Title = reader["Title"].ToString(),
                    Author = reader["Author"].ToString(),
                    Description = reader["Description"].ToString(),
                    ImageUrl = reader["ImageUrl"].ToString(),
                    PdfUrl = reader["PdfUrl"].ToString(),
                    CategoryId = (int)reader["CategoryId"]
                };
            }

            if (book == null)
                return NotFound(new { message = "Book not found" });

            return Ok(book);
        }




        [HttpPost]
        public IActionResult AddBook(Book b)
        {
            using var sqlcon = new SqlConnection(connectionstring);
            sqlcon.Open();
            var cmd = new SqlCommand(
                "INSERT INTO Books (Title, Author, Description, ImageUrl, PdfUrl, CategoryId) VALUES (@t,@a,@d,@i,@p,@c)",
                sqlcon);
            cmd.Parameters.AddWithValue("@t", b.Title);
            cmd.Parameters.AddWithValue("@a", b.Author);
            cmd.Parameters.AddWithValue("@d", b.Description);
            cmd.Parameters.AddWithValue("@i", b.ImageUrl);
            cmd.Parameters.AddWithValue("@p", b.PdfUrl);
            cmd.Parameters.AddWithValue("@c", b.CategoryId);
            cmd.ExecuteNonQuery();
            return Ok("Book added successfully");
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetBooksByCategory(int categoryId)
        {
            var books = new List<Book>();
            using var sqlcon = new SqlConnection(connectionstring);
            sqlcon.Open();

            var cmd = new SqlCommand("SELECT * FROM Books WHERE CategoryId=@c", sqlcon);
            cmd.Parameters.AddWithValue("@c", categoryId);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                books.Add(new Book
                {
                    BookId = (int)reader["BookId"],
                    Title = reader["Title"].ToString(),
                    Author = reader["Author"].ToString(),
                    Description = reader["Description"].ToString(),
                    ImageUrl = reader["ImageUrl"].ToString(),
                    PdfUrl = reader["PdfUrl"].ToString(),
                    CategoryId = (int)reader["CategoryId"]
                });
            }
            return Ok(books);
        }




    }
}
