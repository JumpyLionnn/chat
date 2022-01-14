import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loggedin: boolean = false;
  public username: string;

  constructor(){
    if(JSON.parse(localStorage.getItem("save"))){
      this.loggedin = true;
      this.username = localStorage.getItem("username");
    }
  }

  public onLogin(data: {username: string, save: boolean}){
    this.loggedin = true;
    this.username = data.username;
  }
  public onDisconnectClick(){
    this.loggedin = false;
  }
}
