import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MySharedService } from '../../services/my-shared-service.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'] // Note: It should be 'styleUrls' instead of 'styleUrl'
})
export class RoomListComponent implements OnInit {

  constructor(private sharedService:MySharedService){}

  ngOnInit(): void {
    
  }

 
  
  rooms = [
    { id: 1, name: 'General Chat' },
    { id: 2, name: 'Sports Discussion' },
    { id: 3, name: 'Technology Talk' }
  ];

  selectRoom(roomId: number) {
    this.sharedService.changeMessage(roomId);
    console.log(roomId);
  }

//  sendMessage(message: string): void {
//     this.sharedService.changeMessage(message); // Use the service to send data
//   }

}
