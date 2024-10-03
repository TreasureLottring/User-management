using Microsoft.AspNetCore.Mvc;
using User_ManagementAPI.Data;
using User_ManagementAPI.Model;
using System.Threading.Tasks;

namespace User_ManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<ActionResult<User>> RegisterUser( User user)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "User registered successfully", user });
            }
            return BadRequest(ModelState);
        }
    }
}
