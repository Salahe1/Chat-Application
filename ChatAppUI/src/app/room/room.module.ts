import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { RoomDetailsComponent } from './room-details/room-details.component';



@NgModule({
  declarations: [
    RoomListComponent,
    RoomCreateComponent,
    RoomDetailsComponent
  ],
  exports:[
    RoomListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomModule { }
