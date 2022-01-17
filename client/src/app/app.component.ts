import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public username: string;

  constructor(public chatService: ChatService, private router: Router){
    if(JSON.parse(localStorage.getItem("save"))){
      this.username = localStorage.getItem("username");
      this.chatService.connect(this.username);
    this.router.navigate(["/"]);
    }
  }


  public onDisconnectClick(){
    this.chatService.disconnect();
    this.router.navigate(["/login"]);
  }
}
