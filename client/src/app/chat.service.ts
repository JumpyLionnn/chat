import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";



export class ChatService {
  public message: Observable<{username:string,content:string}>;
  private socket: Socket = io('http://localhost:3000');

  constructor() {
    this.message = Observable.create((observer)=>{
      this.socket.on('message', (message) =>{
        observer.next(message);
      });
    });
  }

  public sendMessage(message: {username: string, content: string}) {
    this.socket.emit('message', message);
  }

  public disconnect(){
    this.socket.disconnect();
  }

}