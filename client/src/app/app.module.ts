import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatmessageComponent } from './chatbox/chatmessage/chatmessage.component';
import { AlertComponent } from './chatbox/alert/alert.component';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { ScrollDownButtonComponent } from './directives/scrollable/scroll-down-button/scroll-down-button.component';
import { JoinchatComponent } from './joinchat/joinchat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChatmessageComponent,
    AlertComponent,
    ScrollableDirective,
    ScrollDownButtonComponent,
    JoinchatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
