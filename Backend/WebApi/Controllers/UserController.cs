using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET: api/user
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            List<User> users = new List<User>();
            string query = "SELECT UserId, UserName, Email, Password FROM Users";

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    users.Add(new User
                    {
                        UserId = (int)reader["UserId"],
                        UserName = reader["UserName"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString()
                    });
                }
            }
            return Ok(users);
        }

        // POST: api/user
        [HttpPost]
        public IActionResult CreateUser([FromBody] User user)
        {
            string query = "INSERT INTO Users (UserName, Email, Password) VALUES (@UserName, @Email, @Password)";

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserName", user.UserName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                con.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("User added successfully");
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            string query = "SELECT * FROM Users WHERE Email=@Email AND Password=@Password";
            User? foundUser = null;

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    foundUser = new User
                    {
                        UserId = (int)reader["UserId"],
                        UserName = reader["UserName"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString()
                    };
                }
            }

            if (foundUser == null)
                return Unauthorized("Invalid email or password");

            return Ok(foundUser);
        }


        // GET: api/user/{id}
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User? user = null;
            string query = "SELECT UserId, UserName, Email, Password FROM Users WHERE UserId = @UserId";

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserId", id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    user = new User
                    {
                        UserId = (int)reader["UserId"],
                        UserName = reader["UserName"].ToString(),
                        Email = reader["Email"].ToString(),
                        Password = reader["Password"].ToString()
                    };
                }
            }

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            string query = "UPDATE Users SET UserName=@UserName, Email=@Email, Password=@Password WHERE UserId=@UserId";

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserId", id);
                cmd.Parameters.AddWithValue("@UserName", user.UserName);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                con.Open();
                int rows = cmd.ExecuteNonQuery();

                if (rows == 0)
                    return NotFound("User not found");
            }

            return Ok("User updated successfully");
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            string query = "DELETE FROM Users WHERE UserId = @UserId";

            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("MyAppData")))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserId", id);
                con.Open();
                int rows = cmd.ExecuteNonQuery();

                if (rows == 0)
                    return NotFound("User not found");
            }

            return Ok("User deleted successfully");
        }
    }
}