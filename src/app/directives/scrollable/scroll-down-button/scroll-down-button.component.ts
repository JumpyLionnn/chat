import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-down-button',
  templateUrl: './scroll-down-button.component.html',
  styleUrls: ['./scroll-down-button.component.css']
})
export class ScrollDownButtonComponent implements OnInit {
  public showScrollDownButton: boolean = false;
  public shrinkScrollDownButton: boolean = false;

  @Output("scrolldown")
  public scrollDownEvent: EventEmitter<void> = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  public scrollDown(){
    this.scrollDownEvent.emit();
  }

}
