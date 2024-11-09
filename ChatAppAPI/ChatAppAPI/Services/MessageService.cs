namespace ChatAppAPI.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MongoDB.Driver;
    using ChatAppAPI.Models; // Adjust the namespace as necessary

    public class MessageService
    {
        private readonly IMongoCollection<Message> _messages;

        public MessageService(IMongoDatabase database)
        {
            _messages = database.GetCollection<Message>("Messages");
        }

        public async Task<List<Message>> GetAllMessagesAsync()
        {
            return await _messages.Find(message => true).ToListAsync();
        }

        public async Task<Message> GetMessageByIdAsync(string id)
        {
            return await _messages.Find(message => message.Id == id).FirstOrDefaultAsync();
        } 

        public async Task CreateMessageAsync(Message message)
        {
            await _messages.InsertOneAsync(message);
        }

        public async Task UpdateMessageAsync(string id, Message message)
        {
            await _messages.ReplaceOneAsync(m => m.Id == id, message);
        }

        public async Task DeleteMessageAsync(string id)
        {
            await _messages.DeleteOneAsync(message => message.Id == id);
        }
    }

}
