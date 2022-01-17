import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-joinchat',
  templateUrl: './joinchat.component.html',
  styleUrls: ['./joinchat.component.css']
})
export class JoinchatComponent implements OnInit {
  
  public save: boolean = JSON.parse(localStorage.getItem("save")) || false;
  constructor(private chatService: ChatService, private router: Router) { 
    localStorage.setItem("save", "false");
  }

  ngOnInit(): void {
  }

  public onSubmit(data){
    if(data.valid){
      if(data.value.save){
        localStorage.setItem("save", "true");
        localStorage.setItem("username", data.value.username);

      }
      else{
        localStorage.setItem("save", "false");
      }
      this.chatService.connect(data.value.username);
      this.router.navigate(["/"]);
    }
  }
}
