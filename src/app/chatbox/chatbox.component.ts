import { Component, OnInit } from '@angular/core';
import { Message } from './chatmessage/message.model';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  public allowSendingMessages: boolean = false;
  public messageContentInput: string = "";
  public nameInputContent: string = "";
  public messages: Message[] = [];
  public alerts: {type: string, content: string}[] = [];
  constructor() { 
  }

  ngOnInit(): void {
  }

  public async onSendMessage(){
    const content = this.messageContentInput.trim(); 
    const username = this.nameInputContent.trim(); 
    if(content === ""){
      this.addAlert("error", "You can not send an empty message.");
      return;
    }
    if(username === ""){
      this.addAlert("error", "You dont have a name.");
      return;
    }

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = (hours > 12 ? hours - 12 : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours > 11 ? " PM" : " AM");

    this.messages.push(new Message(username, content, time));
    this.messageContentInput = "";
    this.allowSendingMessages = false;
  }

  public onMessageContentInputChange(event: Event){
    this.messageContentInput = (<HTMLInputElement>event.target).value;
    if(this.messageContentInput.trim() === ""){
      this.allowSendingMessages = false;
    }
    else{
      this.allowSendingMessages = true;
    }
  }

  public onInputKeyDown(event: KeyboardEvent){
    if(event.key === "Enter" && !event.repeat){
      this.onSendMessage();
    }
  }

  public onReplyClick(event){
    this.messageContentInput = `@${event.username} `;
  }

  public addAlert(type: string, content: string, time: number = 5000){
    const alert = this.alerts[this.alerts.push({
      type: type,
      content: content
    })];
    setTimeout(()=>{
      this.alerts.splice(this.alerts.indexOf(alert), 1);
    }, time);
  }

  public onAlertClose(index: number){
    this.alerts.splice(index, 1);
  }

}
