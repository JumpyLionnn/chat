import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  @Input()
  public message: Message;

  @Output() 
  public replyClick = new EventEmitter<{username: string}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public onReplyClick(){
    this.replyClick.emit({
      username: this.message.username
    });
  }

}
