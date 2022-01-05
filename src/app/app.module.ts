import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatmessageComponent } from './chatbox/chatmessage/chatmessage.component';
import { AlertComponent } from './chatbox/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChatmessageComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
