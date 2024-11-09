using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatAppAPI.Controllers
{
    using ChatAppAPI.Models;
    using ChatAppAPI.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;


    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly MessageService _messageService;

        public ChatController(MessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            var messages = await _messageService.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(string id)
        {
            var message = await _messageService.GetMessageByIdAsync(id);
            if (message == null) return NotFound();
            return Ok(message);
        }

        [HttpPost]
        public async Task<ActionResult<Message>> CreateMessage(Message message)
        {
            await _messageService.CreateMessageAsync(message);
            return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, message);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMessage(string id, Message message)
        {
            await _messageService.UpdateMessageAsync(id, message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(string id)
        {
            await _messageService.DeleteMessageAsync(id);
            return NoContent();
        }

        
        //[HttpGet("rooms/findByParticipants/{userId1}/{userId2}")]
        //public async Task<IActionResult> GetRoomByParticipants(string userId1, string userId2)
        //{
        //    var room = await _roomService.FindRoomByParticipants(userId1, userId2);
        //    return room != null ? Ok(room) : NotFound();
        //}

        //[HttpGet("messages/{roomId}")]
        //public async Task<IActionResult> GetMessagesByRoomId(string roomId)
        //{
        //    var messages = await _messageService.GetMessagesByRoomId(roomId);
        //    return Ok(messages);
        //}
    }

}
