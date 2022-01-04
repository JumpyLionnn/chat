import { Component, OnInit } from '@angular/core';
import { Message } from '../chatmessage/message.model';
import {database, collection, setDoc, doc, onSnapshot} from '../firebase'

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
    onSnapshot(doc(database, "messages", "latest-message"), (doc) => {
      const data = doc.data();
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();
      const time = (hours > 12 ? hours - 12 : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours > 11 ? " PM" : " AM");
      this.messages.push(new Message(data.username, data.content, time));
    });
  }

  ngOnInit(): void {
  }

  public async onSendMessage(){
    setDoc(doc(database, "messages", "latest-message"), {
      username:this.nameInputContent,
      content: this.messageInputContent
    });
    this.messageInputContent = "";
  }

  public onInputKeyDown(event: KeyboardEvent){
    if(event.key === "Enter" && !event.repeat){
      this.onSendMessage();
    }
  }

}
