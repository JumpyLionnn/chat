import { Component, OnInit, Input } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  @Input()
  public message: Message;
  
  constructor() { }

  ngOnInit(): void {
  }

}
