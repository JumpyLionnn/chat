import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-joinchat',
  templateUrl: './joinchat.component.html',
  styleUrls: ['./joinchat.component.css']
})
export class JoinchatComponent implements OnInit {
  @Output()
  public login: EventEmitter<{username: string, save: boolean}> = new EventEmitter();

  public save: boolean = JSON.parse(localStorage.getItem("save")) || false;
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(data){
    if(data.valid){
      this.login.emit(data.value);
      if(data.value.save){
        localStorage.setItem("save", "true");
        localStorage.setItem("username", data.value.username);

      }
      else{
        localStorage.setItem("save", "false");
      }
    }
  }

}
