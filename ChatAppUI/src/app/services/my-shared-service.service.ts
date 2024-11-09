import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject


@Injectable({
    providedIn: 'root',
})
export class MySharedService {

    subscribe(arg0: (message: any) => any) {
      throw new Error('Method not implemented.');
    }

    private messageSource = new BehaviorSubject<number>(0);  
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: number) {
        this.messageSource.next(message);
    }

    private selectedUserIdSource = new BehaviorSubject<number | null>(null);
    selectedUserId$ = this.selectedUserIdSource.asObservable();

    // Method to update the selected user ID
    selectUser(id: number) {
        this.selectedUserIdSource.next(id);
    }

  

    



}
