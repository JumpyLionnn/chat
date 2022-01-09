import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';



export class ChatService {
  public message: Observable<{username:string,content:string}>;
  private socket: Socket = io(environment.chatHost);

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