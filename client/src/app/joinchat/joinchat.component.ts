import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-joinchat',
  templateUrl: './joinchat.component.html',
  styleUrls: ['./joinchat.component.css']
})
export class JoinchatComponent implements OnInit {
  @Output()
  public login: EventEmitter<{username: string}> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(data){
    if(data.valid){
      this.login.emit(data.value);
    }
  }

}
