namespace ChatAppAPI.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using ChatAppAPI.Models; // Adjust the namespace as necessary

    public class RoomService
    {
        private readonly IMongoCollection<Room> _rooms;

        public RoomService(IMongoDatabase database)
        {
            _rooms = database.GetCollection<Room>("Rooms");
        }

        public async Task<List<Room>> GetAllRoomsAsync()
        {
            return await _rooms.Find(room => true).ToListAsync();
        }

        public async Task<Room> GetRoomByIdAsync(string id)
        {
            return await _rooms.Find(room => room.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateRoomAsync(Room room)
        {
            await _rooms.InsertOneAsync(room);
        }

        public async Task UpdateRoomAsync(string id, Room room)
        {
            await _rooms.ReplaceOneAsync(r => r.Id == id, room);
        }

        public async Task DeleteRoomAsync(string id)
        {
            await _rooms.DeleteOneAsync(room => room.Id == id);
        }
    }

}
