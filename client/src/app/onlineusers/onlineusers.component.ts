import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-onlineusers',
  templateUrl: './onlineusers.component.html',
  styleUrls: ['./onlineusers.component.css']
})
export class OnlineusersComponent implements OnInit {

  public users = this.chatService.users;

  constructor(private chatService: ChatService) { 
    
    chatService.join.subscribe(()=>{
      this.users = this.chatService.users;
    });

    chatService.left.subscribe(()=>{
      this.users = this.chatService.users;
    });
    
  }

  ngOnInit(): void {
  }

}
