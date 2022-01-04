import { Component, OnInit } from '@angular/core';
import { Message } from '../chatmessage/message.model';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  public allowSendingMessages: boolean = true;
  public messageInputContent: string = "";
  public nameInputContent: string = "";
  public messages: Message[] = [];
  constructor() { 
  }

  ngOnInit(): void {
  }

  public async onSendMessage(){
    const content = this.messageInputContent.trim(); 
    const username = this.nameInputContent.trim(); 
    if(content === "" || username === "")
      return;

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = (hours > 12 ? hours - 12 : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours > 11 ? " PM" : " AM");

    this.messages.push(new Message(username, content, time));
    this.messageInputContent = "";
  }

  public onInputKeyDown(event: KeyboardEvent){
    if(event.key === "Enter" && !event.repeat){
      this.onSendMessage();
    }
  }

  public onReplyClick(event){
    this.messageInputContent = `@${event.username} `;
  }

}
