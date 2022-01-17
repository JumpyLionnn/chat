import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Message } from './chatbox/chatmessage/message.model';

@Injectable()
export class ChatService {
  public message: Observable<{username:string,content:string}>;
  public join: Observable<{username:string}>;
  public left: Observable<{username:string}>;
  private socket: Socket;

  private onlineUsers: string[] = [];

  public messages: Message[] = [];
  
  public connected: boolean = false;
  public username: string;

  constructor() {
  }

  public get users(){
    return this.onlineUsers;
  }

  public connect(username: string){
    this.username = username;
    this.connected = true;
    this.socket = io(environment.chatHost, {
      query: {
        username: username
      }
    });
    this.socket.on("disconnect", ()=>{
      this.connected = false;
    });

    this.socket.on("connected", (data)=>{
      this.onlineUsers = data.users;
    });

    this.message = Observable.create((observer)=>{
      this.socket.on('message', (message) =>{
        observer.next(message);
      });
    });
    
    this.join = Observable.create((observer)=>{
      this.socket.on('join', (data) =>{
        this.onlineUsers = data.users;
        observer.next(data);
      });
    });

    this.left = Observable.create((observer)=>{
      this.socket.on('left', (data) =>{
        this.onlineUsers = data.users;
        observer.next(data);
      });
    });
  }

  public sendMessage(message: {content: string}) {
    this.socket.emit('message', message);
  }

  public disconnect(){
    this.connected = false;
    this.socket.disconnect();
  }

}