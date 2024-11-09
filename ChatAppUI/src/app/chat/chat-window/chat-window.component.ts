import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { MySharedService } from '../../services/my-shared-service.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
 
 
 
  messages: any[] = [];
  newMessage: string = '';
  roomid?: number;
  roomName: string = 'room name'; // Set this to the current room's name
 

  constructor(private chatService: ChatService,private sharedService:MySharedService) {}

  ngOnInit() {
    // Subscribe to incoming messages
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });

    this.sharedService.currentMessage.subscribe(message => {
      this.roomid = message; // Update the local 'message' property with the received message
       // Do something with the message (e.g., display it)
        console.log(this.roomid)
    });

    this.sharedService.selectedUserId$.subscribe((userId) => {
      if (userId) {
        
        // Handle the received user ID, e.g., load the user’s details
        console.log('Received user ID:', userId);
      }
    });
   
  }

  sendMessage(message: string) {
    if (message.trim()) {
      this.chatService.sendMessage(message);
      this.messages.push({ user: 'You', text: message }); // Add the sent message to the chat
    }
  }


}
