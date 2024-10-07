using Microsoft.AspNetCore.Mvc;
using User_ManagementAPI.Data;
using User_ManagementAPI.Model;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace User_ManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;

        // Constructor
        public UserController(UserContext context)
        {
            _context = context;
        }

        // POST: api/user/register
        [HttpPost("register")]
        public async Task<ActionResult<Users>> RegisterUser(Users user)
        {
            if (ModelState.IsValid)
            {
                // Hash the password
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "User registered successfully", user });
            }
            return BadRequest(ModelState);
        }



        // POST: api/user/login
        [HttpPost("login")]
        public async Task<ActionResult<Users>> LoginUser([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            // If user is found, check if the password matches using BCrypt.Verify
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Return user details if authentication succeeds
            return Ok(new { user.Id, user.FirstName, user.Surname, user.Email, user.PhoneNum });
        }


        // PUT: api/user/update/5
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Users>> UpdateUser(int id, Users updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet("profile")]
        public async Task<ActionResult<Users>> GetProfile()
        {
            // Assuming you have authentication middleware that sets the current user
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized(new { message = "No user is logged in" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Return user details without the password
            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.Surname,
                user.Email,
                user.PhoneNum
            });
        }


        
    }

    
}
