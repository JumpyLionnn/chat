import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from './message.model';
import { MessageContentPart, MessageContentPartType } from './messageContentPart';

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


  @Output() 
  public replyClick = new EventEmitter<{username: string}>();

  @Output("mention") 
  public mentionEvent = new EventEmitter<null>();

  public userMentioned: boolean = false;

  public messageParts: MessageContentPart[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.parse(this.message.content);
  }

  private parse(value: string, types: MessageContentPartType[] = []) {
    let stack = "";
    let currentFormat = "";
    let mention = false;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      const before = i > 0 ? value[i - 1] : "";
      const next = i < value.length - 1 ? value[i + 1] : "";
      if(mention && this.isWhiteSpaceOrNothing(next)){
        const mentionValue = stack + char;
        this.addPart(mentionValue, types, true);
        this.mention(mentionValue.substring(1));
        mention = false;
        stack = "";
        continue;
      }
      switch (char) {
        case currentFormat:
          if(!this.isWhiteSpaceOrNothing(before) && this.isWhiteSpaceOrNothing(next)){
            this.parse(stack.substring(1), [...types, this.getFormatType(char)]);
            stack = "";
            currentFormat = "";
            continue;
          }
          break;
        case "*":
        case "~":
        case "_":
          if(currentFormat === "" && this.isWhiteSpaceOrNothing(before) && !this.isWhiteSpaceOrNothing(next)){
            this.addPart(stack, types);
            stack = "";
            currentFormat = char;
          }
          break;
        case "@":
          if(currentFormat === "" && this.isWhiteSpaceOrNothing(before) && !this.isWhiteSpaceOrNothing(next)){
            this.addPart(stack, types);
            stack = "";
            mention = true;
          }
          break;
      }
      stack += char;
    }

    if(currentFormat !== ""){
      this.addPart(stack[0], types);
      this.parse(stack.substring(1), types);
    }
    else{
      this.addPart(stack, types);
    }
  }

  private isWhiteSpaceOrNothing(char: string){
    return /\s/.test(char) || char === "";
  }

  private addPart(value: string, types: MessageContentPartType[], mention: boolean = false){
    if(value !== "")
      this.messageParts.push(new MessageContentPart(value, types, mention));
  }

  private getFormatType(char: string){
    switch (char) {
      case "*":
        return MessageContentPartType.Bold;
      case "~":
        return MessageContentPartType.Strike;
      case "_":
        return MessageContentPartType.Italic;
      default:
        throw `there is not a format type with "${char}"`;
    }
  }

  private mention(username: string){
    if(!this.userMentioned && username === this.username){
      this.mentionEvent.emit();
      this.userMentioned = true;
    }
  }

  public onReplyClick(){
    this.replyClick.emit({
      username: this.message.username
    });
  }
}


