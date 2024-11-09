import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  newMessage: string = '';

  @Output() messageSend = new EventEmitter<string>();

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messageSend.emit(this.newMessage);
      this.newMessage = ''; // Clear the input after sending
    }
  }
}
