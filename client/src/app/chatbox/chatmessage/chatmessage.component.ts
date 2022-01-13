import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from './message.model';
import { MessageContentPart, MessageContentPartFormatKind, MessageContentPartType } from './messageContentPart';

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

  // exporting this enum to the html template
  public MessageContentPartType = MessageContentPartType;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.parse(this.message.content);
    console.log(this.messageParts);
  }

  private parse(value: string, kinds: MessageContentPartFormatKind[] = []) {
    let stack = "";
    let currentFormat = "";
    let mention = false;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      const before = i > 0 ? value[i - 1] : "";
      const next = i < value.length - 1 ? value[i + 1] : "";
      if(mention && this.isWhiteSpaceOrNothing(next)){
        const mentionValue = stack + char;
        this.addPart(mentionValue, kinds, MessageContentPartType.Mention);
        this.mention(mentionValue.substring(1));
        mention = false;
        stack = "";
        continue;
      }
      if(value.substring(i, i + 4) === "http" && currentFormat === ""){
        let link = "";
        let j = i;
        while(!this.isWhiteSpaceOrNothing(value[j]) && j < value.length){
          link += value[j]
          j++;
        }
        if(this.isValidUrl(link)){
          this.addPart(stack, kinds);
          stack = "";
          this.sanitizer.bypassSecurityTrustUrl(link);
          this.addPart(link, kinds, MessageContentPartType.Link);
          i = j;
          continue;
        }
      }
      switch (char) {
        case currentFormat:
          if(!this.isWhiteSpaceOrNothing(before) && this.isWhiteSpaceOrNothing(next)){
            this.parse(stack.substring(1), [...kinds, this.getFormatKind(char)]);
            stack = "";
            currentFormat = "";
            continue;
          }
          break;
        case "*":
        case "~":
        case "_":
          if(currentFormat === "" && this.isWhiteSpaceOrNothing(before) && !this.isWhiteSpaceOrNothing(next)){
            this.addPart(stack, kinds);
            stack = "";
            currentFormat = char;
          }
          break;
        case "@":
          if(currentFormat === "" && this.isWhiteSpaceOrNothing(before) && !this.isWhiteSpaceOrNothing(next)){
            this.addPart(stack, kinds);
            stack = "";
            mention = true;
          }
          break;
      }
      stack += char;
    }

    if(currentFormat !== ""){
      this.addPart(stack[0], kinds);
      this.parse(stack.substring(1), kinds);
    }
    else{
      this.addPart(stack, kinds);
    }
  }

  private isWhiteSpaceOrNothing(char: string){
    return /\s/.test(char) || char === "";
  }

  private addPart(value: string, kinds: MessageContentPartFormatKind[], type: MessageContentPartType = MessageContentPartType.Regular){
    if(value !== "")
      this.messageParts.push(new MessageContentPart(value, kinds, type));
  }

  private getFormatKind(char: string){
    switch (char) {
      case "*":
        return MessageContentPartFormatKind.Bold;
      case "~":
        return MessageContentPartFormatKind.Strike;
      case "_":
        return MessageContentPartFormatKind.Italic;
      default:
        throw `there is not a format type with "${char}"`;
    }
  }

  private isValidUrl(string: string): boolean{
    var pattern = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
    return pattern.test(string);
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


