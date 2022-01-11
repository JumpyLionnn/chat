import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from './chatmessage/message.model';
import { ScrollableDirective } from '../directives/scrollable/scrollable.directive';
import { ChatService } from '../chat.service';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [ChatService]
})
export class ChatboxComponent implements OnInit, OnDestroy {
  public allowSendingMessages: boolean = false;
  public messageContentInput: string = "";
  public messages: Message[] = [];
  public alerts: {type: string, content: string}[] = [];

  private userMentionAudioId: number;
  private readonly maxVisibleRowAmount = 6;
  private readonly isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  @Input()
  public username: string;

  @ViewChild(ScrollableDirective)
  public scrollableDirective: ScrollableDirective;
  @ViewChild("textarea", {static: true})
  public textareaRef: ElementRef<HTMLTextAreaElement>;

  @ViewChild("messagesContainer", {static: true})
  public messagesContainerRef: ElementRef<HTMLDivElement>;
  constructor(private chatService: ChatService, private audioSevice: AudioService) { 
  }

  ngOnInit(): void {
    this.chatService.message.subscribe((message)=>{
      this.addMessage(message.username, message.content);
    });
    this.userMentionAudioId = this.audioSevice.load("assets/mention.mp3");
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }


  public onSendMessage(){
    // making sure the message data is valid
    const content = this.messageContentInput.trim(); 
    if(content === ""){
      this.addAlert("error", "You can not send an empty message.");
      return;
    }

    //adding the message to the list
    this.addMessage(this.username, content);
    this.chatService.sendMessage({
      username: this.username,
      content: content
    });

    //reseting the input
    this.messageContentInput = "";
    this.allowSendingMessages = false;
    this.textareaRef.nativeElement.rows = 1;
  }

  public addMessage(username: string, content: string){
    //calculating the date string
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = (hours > 12 ? hours - 12 : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours > 11 ? " PM" : " AM");

    //adding the message to the list
    this.messages.push(new Message(username, content, time));
    this.scrollableDirective.adjustScroll();
  }

  public onMessageContentInputChange(event: InputEvent){
    const textarea = this.textareaRef.nativeElement;
    this.messageContentInput = textarea.value;
    if(this.messageContentInput.trim() === ""){
      this.allowSendingMessages = false;
    }
    else{
      this.allowSendingMessages = true;
    }

    const lines = this.calculateLines(textarea);
    textarea.rows = lines > this.maxVisibleRowAmount ? this.maxVisibleRowAmount : lines;
  }

  public onInputKeyDown(event: KeyboardEvent){
    if(event.key === "Enter"){
      const textarea = this.textareaRef.nativeElement;
      if((event.shiftKey || this.isMobile)){
        if(textarea.value.split("\n").length < 10){
          const selection = textarea.selectionStart;
          const value = textarea.value;
          textarea.value = value.substring(0, selection) + "\n" + value.substring(selection, value.length);
          if(this.calculateLines(textarea) < this.maxVisibleRowAmount){
            textarea.rows++;
          }
          textarea.setSelectionRange(selection + 1, selection + 1);
          }
      }
      else if(!event.repeat){
        this.onSendMessage();
      }
      event.preventDefault();
    }
  }

  @HostListener("window:resize", ["$event"])
  public onResize(event: Event){
    const textarea = this.textareaRef.nativeElement;
    const lines = this.calculateLines(textarea);
    textarea.rows = lines > this.maxVisibleRowAmount ? this.maxVisibleRowAmount : lines;

  }

  private calculateLines(element: HTMLTextAreaElement): number{
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
    const padding = parseFloat(computedStyle.getPropertyValue('padding-top')) + 
      parseFloat(computedStyle.getPropertyValue('padding-bottom'));
    const rows = element.rows;
    element.rows = 1;
    const result = (element.scrollHeight - padding) / fontSize / 3 * 2;
    element.rows = rows;
    return result;
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

  public onMention(){
    this.audioSevice.play(this.userMentionAudioId);
  }

}
