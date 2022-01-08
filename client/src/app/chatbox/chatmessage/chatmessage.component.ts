import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from './message.model';
import { ContentPart, ContentPartType } from './messageContentParts.model';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  @Input()
  public message: Message;
  @Input()
  public username: string;

  public contentParts: ContentPart[] = [];

  @Output() 
  public replyClick = new EventEmitter<{username: string}>();

  public userMentioned: boolean = false;

  // giving the template access to this enum
  public ContentPartType = ContentPartType;
  
  constructor() { }

  ngOnInit(): void {
    const words = this.message.content.split(" ");
    let stack: string[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if(word.startsWith("@") && word.length > 2){
        console.log(this.username);
        if(this.username === word.substring(1, word.length)){
          console.log("user mentioned");
          this.userMentioned = true;
        }
        this.contentParts.push(new ContentPart(stack.join(" ") + " ", ContentPartType.Default));
        stack = [""];
        this.contentParts.push(new ContentPart(word, ContentPartType.Mention));
      }
      else{
        stack.push(word);
      }
    }
    this.contentParts.push(new ContentPart(stack.join(" "), ContentPartType.Default));
  }

  public onReplyClick(){
    this.replyClick.emit({
      username: this.message.username
    });
  }

}
