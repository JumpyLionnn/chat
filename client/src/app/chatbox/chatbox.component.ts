import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @Input()
  public username: string;

  @ViewChild("messagesContainer", {static: true})
  public messagesContainerRef: ElementRef<HTMLDivElement>;
  @ViewChild(ScrollableDirective)
  public scrollableDirective: ScrollableDirective;

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
    //this.setRows(1);
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

  public onSubmit(){
    this.onSendMessage();
  }

  public onInputChange(event){
    this.messageContentInput = event.value;
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
