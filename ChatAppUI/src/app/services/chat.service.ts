// chat.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private messageSubject = new Subject<any>();

  constructor() {
    // Example: WebSocket connection or HTTP for real-time message receiving
    // this.webSocket.onMessage((message) => {
    //   this.messageSubject.next(message);
    // });
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: string) {
    // Send message logic here (e.g., WebSocket or HTTP POST)
    const newMessage = { user: 'User', text: message };  // Placeholder data
    this.messageSubject.next(newMessage);
  }
}