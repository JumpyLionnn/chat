import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from './message.model';

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

  @ViewChild("messageContent", {static: true})
  private messapeContentPRef: ElementRef<HTMLParagraphElement>;


  @Output() 
  public replyClick = new EventEmitter<{username: string}>();

  @Output() 
  public mention = new EventEmitter<null>();

  public userMentioned: boolean = false;

  
  constructor() { }

  ngOnInit(): void {
    const content = this.removeHtml(this.message.content);
    const bold = this.formatText(content, this.boldRegexp, "b");
    const strike = this.formatText(bold, this.strikeRegexp, "s");
    const italic = this.formatText(strike, this.italicRegexp, "i");

    const mention =  italic.replace(this.mentionRegexp, value => {
      if(this.username === value.substring(1, value.length)){
        this.userMentioned = true;
        this.mention.emit();
      }
      return `<span class="mention btn btn-outline-primary p-0 border border-0">${value}</span>`
  });
  this.messapeContentPRef.nativeElement.innerHTML = mention;
  }

  public onReplyClick(){
    this.replyClick.emit({
      username: this.message.username
    });
  }
  
  private formatText(text: string, regexp: RegExp, tag:string){
    return text.replace(regexp, value => {
        return `<${tag}>${value.substring(1, value.length - 1)}</${tag}>`;
    });
  }
  
  private removeHtml(text: string): string{
    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;");
  }
  
  private readonly boldRegexp = /(?<=\s|^)\*(?!(\s))[^\*]+(?<!(\s))\*(?=\s|$)/g;
  private readonly strikeRegexp = /(?<=\s|^)\~(?!(\s))[^\~]+(?<!(\s))\~(?=\s|$)/g;
  private readonly italicRegexp = /(?<=\s|^)\_(?!(\s))[^\_]+(?<!(\s))\_(?=\s|$)/g;
  private readonly mentionRegexp = /(?<=\s|^)@[^\s@]+(?=\s|$)/g;
}


