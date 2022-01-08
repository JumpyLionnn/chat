import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as bs from 'bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  public type: ("info" | "success" | "warning" | "error") = "info";
  @Input("close")
  public shouldClose: boolean;

  @Output("close")
  public closeEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClose(){
    setTimeout(() => {
      this.closeEvent.emit();
    }, 150);
  }

  public getAlertThemeClass(){
    let alertTheme: string;
    switch (this.type) {
      case "info":
        alertTheme = "primary";
        break;
      case "success":
        alertTheme = "success";
        break;
      case "warning":
        alertTheme = "warning";
        break;
      case "error":
        alertTheme = "danger";
        break;
    }
    return "alert-" + alertTheme;
  }

  public getAlertIconClass(){
    let alertIcon: string;
    switch (this.type) {
      case "info":
        alertIcon = "info-circle-fill";
        break;
      case "success":
        alertIcon = "check-circle-fill";
        break;
      case "warning":
        alertIcon = "exclamation-triangle-fill";
        break;
      case "error":
        alertIcon = "exclamation-triangle-fill";
        break;
    }
    return "bi-" + alertIcon;
  }
}
