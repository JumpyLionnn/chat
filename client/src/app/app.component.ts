import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loggedin: boolean = false;
  public username: string;

  public onLogin(data: {username: string}){
    this.loggedin = true;
    this.username = data.username;
  }
  public onDisconnectClick(){
    this.loggedin = false;
  }
}
