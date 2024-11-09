import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';

const routes: Routes = [
  { path: 'chat/window', component:ChatWindowComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/Login', component:UserLoginComponent },
  { path: 'room/list', component:RoomListComponent },
  { path: 'chat-layout', component:ChatLayoutComponent },
  { path: '', redirectTo: '/user/Login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
