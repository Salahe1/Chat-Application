import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { ChatItemComponent } from './chat-item/chat-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { RoomModule } from '../room/room.module';


@NgModule({
  declarations: [
    ChatWindowComponent,
    MessageInputComponent,
    ChatItemComponent,
    ChatLayoutComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoomModule
  ]
})
export class ChatModule { }
