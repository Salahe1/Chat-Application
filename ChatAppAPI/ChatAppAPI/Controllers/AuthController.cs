using Microsoft.AspNetCore.Mvc;
using ChatAppAPI.Models;
using ChatAppAPI.Services;

namespace ChatAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService userService; // Inject your DbContext
        private readonly JwtService _jwtService;
        
        public AuthController(UserService userService, JwtService jwtService)
        {
            this.userService = userService;
            this._jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            var user = await userService.GetUserAsync(request.Username, request.Password);


            if (user == null )
            {
                return Unauthorized();
            }

            var token = _jwtService.GenerateTokenAsync(user);
            return Ok(new { token });
        }

        // Dummy password verification, implement actual hashing verification
        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            // TODO: Implement password hashing and comparison
            return enteredPassword == storedHashedPassword; // Replace with actual hashing logic
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
