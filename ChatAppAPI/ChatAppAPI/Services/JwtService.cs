using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ChatAppAPI.Models;
using MongoDB.Driver;
using System.Linq;

namespace ChatAppAPI.Services
{
    public class JwtService
    {
        private readonly byte[] _secretKey; // Use byte array for the secret key
        private readonly int _expirationMinutes = 60;
        private readonly IMongoCollection<Room> _room;

        public JwtService(IMongoDatabase database)
        {
            // Read the secret key from the environment variable
            var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
                         ?? throw new InvalidOperationException("JWT secret key is not set in environment variables.");

            _secretKey = Encoding.UTF8.GetBytes(secret);

            _room = database.GetCollection<Room>("Rooms");
        }


        public async Task<string> GenerateTokenAsync(User user)
        {
            var roomIds = await GetRoomIdsForUserAsync(user.Id);

            var roomIdsString = string.Join(",", roomIds);

            var claims = new[]
            {  
                new Claim(ClaimTypes.PrimarySid, user.Id),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("RoomIds", roomIdsString) // Use a custom claim type for room IDs
                
                // Add other claims as needed
            };

            var key = new SymmetricSecurityKey(_secretKey); // Use the generated key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_expirationMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private async Task<List<string>> GetRoomIdsForUserAsync(string userId)
        {
            // Query the rooms where the user ID is a key in the Participants dictionary
            var rooms = await _room.Find(r => r.Participants.ContainsKey(userId)).ToListAsync();
            return rooms.Select(r => r.Id).ToList(); // Return a list of room IDs
        }
    }
}
